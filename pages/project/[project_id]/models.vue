<script setup lang="ts">
definePageMeta({
  layout: 'project',
});

const statusIcons = {
  queued: 'f7:hourglass',
  training: 'solar:dumbbell-large-bold-duotone',
  error: 'mdi:bug',
} as { [key: string]: string };

const statusCardStats = computed(() => {
  if (selectedTask.value.status === 'queued') {
    return [
      {
        title: 'Position',
        value: 1,
      },
      {
        title: 'Remaining Time',
        value: '4m',
      },
    ];
  } else if (selectedTask.value.status === 'training') {
    return [
      {
        title: 'Current Epoch',
        value: 20,
      },
      {
        title: 'Total Epochs',
        value: 70,
      },
      {
        title: 'Remaining Time',
        value: '40s',
      },
      {
        title: 'Credits Used',
        value: '0.42',
      },
    ];
  }
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
    status: 'error',
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
      class="w-[32rem] border-r-2 border-accent-6 bg-bg-3 h-full overflow-y-scroll flex flex-col p-3 space-y-1"
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
        class="w-full border bg-bg-2 rounded-lg hover:scale-[102%] transition-all duration-200 hover:border-logoBlueBright cursor-pointer flex flex-row items-center"
        :class="{
          'border-logoBlueDark': task === selectedTask,
          'border-accent-7': task !== selectedTask,
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
          <span class="text-text-3 text-sm">
            {{ new Date(task.dateStarted).toDateString() }}
          </span>
        </div>
        <UIcon
          :name="statusIcons[task.status] ?? ''"
          class="mr-4"
          style="font-size: 3rem"
        ></UIcon>
      </div>
    </div>
    <div class="w-full h-full bg-bg-2 p-8 pt-16">
      <h1 class="text-4xl font-bold mb-6">{{ selectedTask.name }}</h1>
      <div
        class="bg-bg-2 border border-accent-6 w-full rounded-lg flex flex-col"
      >
        <div class="w-full p-4 flex flex-row items-center">
          <UIcon
            :name="statusIcons[selectedTask.status] ?? ''"
            style="font-size: 4rem"
            class="mr-4"
          ></UIcon>
          <h2 class="text-4xl mr-12 mb-2">{{ selectedTask.status }}</h2>
          <UProgress
            class="w-full"
            animation="carousel"
            v-if="selectedTask.status === 'queued'"
          ></UProgress>
          <UProgress
            color="primary"
            :indicator="false"
            :value="35"
            v-else-if="selectedTask.status === 'training'"
          />
        </div>
        <hr class="border-accent-6" />
        <div class="w-full p-4 flex flex-row items-center space-x-8">
          <div
            class="flex flex-col items-center"
            v-for="statItem in statusCardStats"
          >
            <h3 class="text-lg">{{ statItem.title }}</h3>
            <span class="font-bold text-2xl">{{ statItem.value }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
