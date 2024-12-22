<script setup lang="ts">
import type { User } from '~/types/user';

const props = defineProps<{
  brainetTag: string;
}>();

const sessionStore = useSessionStore();

const userStore = useUserStore();

const user = ref<User | undefined>();

const userLoading = computed(() => {
  return user.value === undefined;
});

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

loadUser();
</script>

<template>
  <div class="w-full">
    <div class="w-2/3 mx-auto flex mt-6">
      <div class="w-52">
        <LoadingSkeleton :active="userLoading" :inline="true" rounded="full">
          <div
            class="w-52 h-52 rounded-full overflow-hidden relative hover:cursor-pointer"
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
            <img :src="'/testpfp.jpg'" class="absolute w-full h-full" />
          </div>
          <img v-else :src="'/testpfp.jpg'" class="w-52 h-52 rounded-full" />
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
            @click="navigateTo('/profile/settings')"
          />
        </div>
        <div class="w-full mt-6 flex" v-else-if="sessionStore.isAuthorized">
          <UButton class="justify-center mr-2 flex-grow" color="blue" size="sm"
            >Follow</UButton
          >
        </div>
      </div>
    </div>
  </div>
</template>
