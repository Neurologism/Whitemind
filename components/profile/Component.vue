<script setup lang="ts">
import type { User } from '~/types/user.interface';

const props = defineProps<{
  brainetTag: string;
}>();

const sessionStore = useSessionStore();
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

  const result = await sessionStore.getUserByBrainetTag(props.brainetTag);
  if (result) {
    user.value = result;
  }
}

watch(user, async () => {
  if (user.value) {
    pfpUrl.value = backmindHost + `/users/${user.value._id}/get-pfp`;
    userLoading.value = false;
  }
});

onMounted(() => {
  sessionStore.loading = false;
});

loadUser();

function limit<T>(arr: T[], limit: number): T[] {
  return arr.slice(0, limit);
}

const showIngRatio = computed(() => {
  const totalProjects = user.value?.projectIds?.length ?? 0;
  const displayedProjects = Math.min(user.value?.projectIds?.length ?? 0, 12);
  return `${displayedProjects}/${totalProjects}`;
});
</script>

<template>
  <div class="w-full p-4 md:p-0">
    <div class="container mx-auto flex md:flex-row flex-col flex-nowrap mt-6">
      <div class="flex-none flex flex-col items-center">
        <ProfilePicture
          :loading="userLoading"
          :pfp-url="pfpUrl"
          :is-self="isSelf"
        ></ProfilePicture>
        <div class="mt-6">
          <GenericLoadingSkeleton
            :active="userLoading"
            :inline="true"
            rounded="full"
          >
            <h2 class="text-3xl font-bold inline">
              {{ userLoading ? 'username' : user?.displayname }}
            </h2>
          </GenericLoadingSkeleton>

          <GenericLoadingSkeleton
            :active="userLoading"
            class="mt-1"
            :inline="true"
            rounded="full"
          >
            <span class="text-lg text-slate-400">
              {{ userLoading ? 'username' : user?.brainetTag }}
            </span>
          </GenericLoadingSkeleton>

          <div class="flex flex-row flex-nowrap mt-4">
            <GenericLoadingSkeleton
              :active="userLoading"
              :inline="true"
              rounded="full"
            >
              <span class="hover:cursor-pointer">
                <span class="font-bold">{{ user?.followerIds?.length }}</span>
                followers
              </span></GenericLoadingSkeleton
            >

            <div class="flex-grow"></div>
            <GenericLoadingSkeleton
              :active="userLoading"
              :inline="true"
              rounded="full"
            >
              <span class="hover:cursor-pointer">
                <span class="font-bold">{{ user?.followingIds?.length }}</span>
                following
              </span></GenericLoadingSkeleton
            >
          </div>
          <GenericLoadingSkeleton :active="userLoading" class="mt-6">
            <p class="text-md text-slate-100 line-clamp-5 break-words w-52">
              {{ userLoading ? 's'.repeat(200) : user?.aboutYou }}
            </p></GenericLoadingSkeleton
          >
        </div>
        <div
          class="w-full flex flex-col flex-nowrap mt-6"
          v-if="!userLoading && isSelf"
        >
          <UButton
            class="justify-center mr-2 flex-grow"
            color="gray"
            size="sm"
            icon="mdi:pencil"
            block
            @click="navigateTo('/settings/public')"
            >Edit profile</UButton
          >
          <UButton
            block
            color="gray"
            icon="fluent:settings-28-regular"
            @click="navigateTo('/settings/account')"
            class="mt-1.5"
            >Account settings</UButton
          >
        </div>
        <div
          class="w-full mt-6 flex"
          v-if="!userLoading && !isSelf && sessionStore.isAuthorized"
        >
          <!-- <UButton class="justify-center mr-2 flex-grow" color="blue" size="sm"
            >Follow</UButton
          >
          <UButton class="justify-center mr-2 flex-grow" color="blue" size="sm"
            >Unollow</UButton
          > -->
        </div>
      </div>
      <UDivider class="flex-none ml-8 mr-8" orientation="vertical" />
      <div class="mt-4 md:mt-0 flex-1 flex flex-col flex-nowrap h-max">
        <div v-if="isSelf" class="flex flex-row flex-nowrap mb-2">
          <UButton
            block
            color="primary"
            variant="outline"
            icon="mdi:plus"
            @click="navigateTo('/projects/new')"
            class="flex-1 m-0.5 mr-2"
            >Create new project</UButton
          >
          <UButton
            block
            color="primary"
            variant="outline"
            icon="i-heroicons:academic-cap"
            @click="navigateTo('/tutorials')"
            class="flex-1 m-0.5 ml-2"
            >Visit tutorials</UButton
          >
        </div>
        <div v-if="(user?.projectIds?.length ?? 0) !== 0" class="w-full">
          <div class="font-semibold text-lg mb-4 text-left w-full">
            {{ showIngRatio }} Projects
          </div>
          <div
            class="h-max grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4"
          >
            <ProjectCard
              :id="projectId"
              v-for="projectId in limit(user?.projectIds ?? [], 12)"
              :key="projectId"
            />
          </div>
        </div>
        <div class="text-center w-full mt-2" v-else>
          <span class="font-semibold text-xl text-center"
            >No public projects found for this user.</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
