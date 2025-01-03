<script setup lang="ts">
import axios from 'axios';
import type { User } from '~/types/user';

const props = defineProps<{
  brainetTag: string;
}>();

const sessionStore = useSessionStore();
const userStore = useUserStore();
const fileInput = ref<HTMLInputElement | null>(null);
const backmindHost = useRuntimeConfig().public.backmindHost as string;
const user = ref<User | undefined>(undefined);
const userLoading = ref(true);
const pfpUrl = ref<string>('https://whitemind.icinoxis.net/user.svg');
const hasPfp = ref(true);
const toast = useToast();

function triggerFileInput() {
  if (fileInput.value) {
    fileInput.value.click();
  }
}

async function checkForPfp() {
  const response = await axios
    .get(pfpUrl.value)
    .then((response) => (hasPfp.value = response.status === 200))
    .catch(() => (hasPfp.value = false));
}

async function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files ? target.files[0] : null;

  if (file) {
    try {
      const formData = new FormData();
      formData.append('pfp', file);

      const response = await sessionStore.fetch('/api/user/upload-pfp', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.add({
          title: 'Profile picture uploaded',
          icon: 'mdi-check',
          color: 'green',
        });
        window.location.reload();
      } else {
        toast.add({
          title: "Project picture couldn't be uploaded",
          icon: 'mdi-alert-circle',
          color: 'red',
        });
        console.error(data);
      }
    } catch (error) {
      toast.add({
        title: "Project picture couldn't be uploaded",
        icon: 'mdi-alert-circle',
        color: 'red',
      });
      console.error(error);
    }
  }
}

const isSelf = computed(() => {
  return (
    props.brainetTag === '' ||
    props.brainetTag === sessionStore.sessionData.user.brainetTag
  );
});

async function loadUser() {
  if (isSelf.value) {
    user.value = sessionStore.sessionData.user as any;
    return;
  }

  user.value = await userStore.getUserByBrainetTag(props.brainetTag);
}

watch(user, async () => {
  if (user.value) {
    pfpUrl.value = backmindHost + '/api/user/get-pfp/' + user.value._id;
    checkForPfp();
    userLoading.value = false;
  }
});

onMounted(() => {
  sessionStore.loading = false;
});

loadUser();
</script>

<template>
  <input
    ref="fileInput"
    type="file"
    name="pfp"
    accept="image/*"
    @change="handleFileChange"
    class="hidden"
  />
  <div class="w-full">
    <div class="w-2/3 mx-auto flex mt-6">
      <div class="w-52">
        <LoadingSkeleton :active="userLoading" class="w-52 h-52" rounded="full">
          <div
            class="w-52 h-52 rounded-full overflow-hidden relative hover:cursor-pointer"
            @click="triggerFileInput"
            v-if="isSelf"
          >
            <div
              class="z-10 absolute w-full h-full bg-black transition-all duration-300 bg-opacity-0 hover:bg-opacity-50 hover:opacity-100 opacity-0"
            >
              <UIcon
                name="fluent:edit-32-filled"
                class="text-white w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
              />
            </div>
            <NuxtImg src="/user.svg" class="w-full h-full" v-if="!hasPfp" />
            <NuxtImg :src="pfpUrl" class="absolute w-full h-full" v-else />
          </div>
          <NuxtImg v-else :src="pfpUrl" class="w-52 h-52 rounded-full" />
        </LoadingSkeleton>

        <div class="mt-6">
          <LoadingSkeleton :active="userLoading" :inline="true" rounded="full">
            <h2 class="text-3xl font-bold inline">
              {{ userLoading ? 'username' : user?.displayname }}
            </h2>
          </LoadingSkeleton>

          <LoadingSkeleton
            :active="userLoading"
            class="mt-1"
            :inline="true"
            rounded="full"
          >
            <h3 class="text-lg text-slate-400">
              {{ userLoading ? 'username' : user?.brainetTag }}
            </h3>
          </LoadingSkeleton>

          <div class="flex mt-4">
            <LoadingSkeleton
              :active="userLoading"
              :inline="true"
              rounded="full"
            >
              <span class="hover:cursor-pointer">
                <span class="font-bold">{{ user?.followerIds?.length }}</span>
                followers
              </span></LoadingSkeleton
            >

            <div class="flex-grow"></div>
            <LoadingSkeleton
              :active="userLoading"
              :inline="true"
              rounded="full"
            >
              <span class="hover:cursor-pointer">
                <span class="font-bold">{{ user?.followingIds?.length }}</span>
                following
              </span></LoadingSkeleton
            >
          </div>
          <LoadingSkeleton :active="userLoading" class="mt-6">
            <p class="text-md text-slate-100 line-clamp-5 break-words w-52">
              {{ userLoading ? 's'.repeat(200) : user?.aboutYou }}
            </p></LoadingSkeleton
          >
        </div>

        <div class="w-full mt-6 flex" v-if="!userLoading && isSelf">
          <UButton
            class="justify-center mr-2 flex-grow"
            color="gray"
            size="sm"
            icon="mdi:pencil"
            >Edit profile</UButton
          >
          <UIcon
            name="fluent:settings-28-regular"
            class="w-8 h-8 hover:cursor-pointer"
            @click="navigateTo('/settings')"
          />
        </div>
        <div
          class="w-full mt-6 flex"
          v-if="!userLoading && !isSelf && sessionStore.isAuthorized"
        >
          <UButton class="justify-center mr-2 flex-grow" color="blue" size="sm"
            >Follow</UButton
          >
        </div>
      </div>
    </div>
  </div>
</template>
