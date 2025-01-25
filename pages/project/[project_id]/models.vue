<script setup lang="ts">
definePageMeta({
  layout: 'project',
});

const selectedTaskIndex = ref<number | null>(null);

const selectedTask = computed(() => {
  return tasks.value[selectedTaskIndex.value ?? 0];
});

const tasks = ref([
  {
    _id: '6754b7da527860ba96ed1e3e',
    status: 'queued',
    dateLastUpdated: '2024-12-07T21:26:03.706Z',
    dateQueued: '2024-12-07T21:02:18.303Z',
    dateStarted: '2024-12-07T21:02:19.501Z',
    dateFinished: null,
    projectId: '675367e40a29e18025fd1d92',
    ownerId: '675364cf0a29e18025fd1d0b',
    name: 'Model 7',
  },
  {
    _id: '6754b7da527860ba96ed1e3e',
    status: 'training',
    dateLastUpdated: '2024-12-07T21:26:03.706Z',
    dateQueued: '2024-12-07T21:02:18.303Z',
    dateStarted: '2024-12-07T21:02:19.501Z',
    dateFinished: null,
    projectId: '675367e40a29e18025fd1d92',
    ownerId: '675364cf0a29e18025fd1d0b',
    name: 'Model 6',
  },
  {
    _id: '6754b7da527860ba96ed1e3e',
    status: 'finished',
    dateLastUpdated: '2024-12-07T21:26:03.706Z',
    dateQueued: '2024-12-07T21:02:18.303Z',
    dateStarted: '2024-12-07T21:02:19.501Z',
    dateFinished: null,
    projectId: '675367e40a29e18025fd1d92',
    ownerId: '675364cf0a29e18025fd1d0b',
    name: 'Model 5',
  },
  {
    _id: '6754b7da527860ba96ed1e3e',
    status: 'finished',
    dateLastUpdated: '2024-12-07T21:26:03.706Z',
    dateQueued: '2024-12-07T21:02:18.303Z',
    dateStarted: '2024-12-07T21:02:19.501Z',
    dateFinished: null,
    projectId: '675367e40a29e18025fd1d92',
    ownerId: '675364cf0a29e18025fd1d0b',
    name: 'Model 4',
  },
  {
    _id: '6754b7da527860ba96ed1e3e',
    status: 'finished',
    dateLastUpdated: '2024-12-07T21:26:03.706Z',
    dateQueued: '2024-12-07T21:02:18.303Z',
    dateStarted: '2024-12-07T21:02:19.501Z',
    dateFinished: null,
    projectId: '675367e40a29e18025fd1d92',
    ownerId: '675364cf0a29e18025fd1d0b',
    name: 'Model 3',
  },
  {
    _id: '6754b7da527860ba96ed1e3e',
    status: 'finished',
    dateLastUpdated: '2024-12-07T21:26:03.706Z',
    dateQueued: '2024-12-07T21:02:18.303Z',
    dateStarted: '2024-12-07T21:02:19.501Z',
    dateFinished: null,
    projectId: '675367e40a29e18025fd1d92',
    ownerId: '675364cf0a29e18025fd1d0b',
    name: 'Model 2',
  },
  {
    _id: '6754b7da527860ba96ed1e3e',
    status: 'finished',
    dateLastUpdated: '2024-12-07T21:26:03.706Z',
    dateQueued: '2024-12-07T21:02:18.303Z',
    dateStarted: '2024-12-07T21:02:19.501Z',
    dateFinished: null,
    projectId: '675367e40a29e18025fd1d92',
    ownerId: '675364cf0a29e18025fd1d0b',
    name: 'Model 1',
  },
]);

onMounted(() => {
  gsap.to('.dumbbell', {
    y: -10,
    duration: 0.5,
    yoyo: true,
    repeat: -1,
    ease: 'power1.inOut',
  });
});
</script>

<template>
  <div style="height: calc(100vh - 4rem)" class="w-screen flex flex-row">
    <div
      class="w-[32rem] border-r-2 border-slate-600 bg-slate-800 h-full overflow-y-scroll flex flex-col p-3 space-y-1"
    >
      <div
        class="w-full border-customBlue-700 text-customBlue-700 border-2 p-3 bg-transparent rounded-lg cursor-pointer flex flex-row pointer-events-auto z-10"
      >
        <span class="flex flex-row items-center">
          <UIcon class="mr-2" name="mdi:plus" style="font-size: 34px"></UIcon>
          <h3 class="text-xl font-semibold">New Model</h3>
        </span>
      </div>
      <div
        class="w-full border bg-slate-900 rounded-lg hover:scale-[102%] transition-all duration-200 hover:border-logoBlueBright cursor-pointer flex flex-row items-center"
        :class="{
          'border-logoBlueDark': task === selectedTask,
          'border-slate-700': task !== selectedTask,
        }"
        v-for="task in tasks"
        @click="selectedTaskIndex = tasks.indexOf(task)"
      >
        <div
          class="bg-logoBlueDark w-[6px] h-full rounded-l-lg"
          v-if="task === selectedTask"
        ></div>
        <div class="w-full h-full p-3">
          <h3 class="text-lg font-bold">{{ task.name }}</h3>
          <span class="text-gray-500 text-sm">
            {{ new Date(task.dateStarted).toDateString() }}
          </span>
        </div>
        <UIcon
          name="solar:dumbbell-large-bold-duotone"
          class="mr-4 dumbbell mt-[5px]"
          style="font-size: 4rem; transform: rotate(45deg)"
          v-if="task.status === 'training'"
        ></UIcon>
        <UIcon
          name="eos-icons:hourglass"
          class="mr-4"
          style="font-size: 4rem"
          v-if="task.status === 'queued'"
        ></UIcon>
      </div>
    </div>
    <div class="w-full h-full bg-slate-900 p-8 pt-16">
      <h1 class="text-4xl font-bold">{{ selectedTask.name }}</h1>
      <hr class="border-slate-600" />
    </div>
  </div>
</template>
