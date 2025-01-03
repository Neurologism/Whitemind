<script setup lang="ts">
import type { User } from '~/types/user';

const props = defineProps<{
  brainetTag: string;
}>();

const sessionStore = useSessionStore();
const userStore = useUserStore();
const backmindHost = useRuntimeConfig().public.backmindHost as string;
const user = ref<User | undefined>(undefined);
const userLoading = ref(true);
const pfpUrl = ref<string>('https://whitemind.icinoxis.net/user.svg');

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
    userLoading.value = false;
  }
});

onMounted(() => {
  sessionStore.loading = false;
});

loadUser();
</script>

<template>
  <div class="w-full">
    <div class="w-2/3 mx-auto flex mt-6">
      <div class="w-52">
        <ProfilePicture
          :loading="userLoading"
          :pfp-url="pfpUrl"
          :is-self="isSelf"
        ></ProfilePicture>
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
