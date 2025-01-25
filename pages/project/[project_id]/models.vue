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
    datelastUpdated: '2024-12-07T21:26:03.706Z',
    dateQueued: '2024-12-07T21:02:18.303Z',
    dateStarted: '2024-12-07T21:02:19.501Z',
    dateFinished: null,
    projectId: '675367e40a29e18025fd1d92',
    ownerId: '675364cf0a29e18025fd1d0b',
    name: 'Model 1',
  },
  {
    _id: '6754b7da527860ba96ed1e3e',
    status: 'queued',
    datelastUpdated: '2024-12-07T21:26:03.706Z',
    dateQueued: '2024-12-07T21:02:18.303Z',
    dateStarted: '2024-12-07T21:02:19.501Z',
    dateFinished: null,
    projectId: '675367e40a29e18025fd1d92',
    ownerId: '675364cf0a29e18025fd1d0b',
    name: 'Model 3',
  },
  {
    _id: '6754b7da527860ba96ed1e3e',
    status: 'queued',
    datelastUpdated: '2024-12-07T21:26:03.706Z',
    dateQueued: '2024-12-07T21:02:18.303Z',
    dateStarted: '2024-12-07T21:02:19.501Z',
    dateFinished: null,
    projectId: '675367e40a29e18025fd1d92',
    ownerId: '675364cf0a29e18025fd1d0b',
    name: 'Model 4',
  },
  {
    _id: '6754b7da527860ba96ed1e3e',
    status: 'queued',
    datelastUpdated: '2024-12-07T21:26:03.706Z',
    dateQueued: '2024-12-07T21:02:18.303Z',
    dateStarted: '2024-12-07T21:02:19.501Z',
    dateFinished: null,
    projectId: '675367e40a29e18025fd1d92',
    ownerId: '675364cf0a29e18025fd1d0b',
    name: 'Model 5',
  },
  {
    _id: '6754b7da527860ba96ed1e3e',
    status: 'queued',
    datelastUpdated: '2024-12-07T21:26:03.706Z',
    dateQueued: '2024-12-07T21:02:18.303Z',
    dateStarted: '2024-12-07T21:02:19.501Z',
    dateFinished: null,
    projectId: '675367e40a29e18025fd1d92',
    ownerId: '675364cf0a29e18025fd1d0b',
    name: 'Model 6',
  },
]);
</script>

<template>
  <div style="height: calc(100vh - 4rem)" class="w-screen flex flex-row">
    <div
      class="w-[32rem] bg-slate-800 h-full overflow-y-scroll flex flex-col p-2 space-y-1"
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
        class="w-full border-slate-700 border p-3 bg-slate-900 rounded-lg hover:scale-[102%] transition-all duration-200 hover:border-logoBlueBright cursor-pointer"
        v-for="task in tasks"
      >
        <h3 class="text-lg font-bold">{{ task.name }}</h3>
        <span class="text-gray-500 text-sm">
          {{ new Date(task.dateStarted).toDateString() }}
        </span>
      </div>
    </div>
    <div class="w-full h-full bg-slate-900"></div>
  </div>
</template>
