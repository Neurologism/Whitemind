<script setup lang="ts">
const sessionStore = useSessionStore();

// smooth edges needs to be set to 0 and changed afterwards
// if it is initialized with a value different from zero, tab content won't show (probably due to a bug in nuxtUI)
const smoothEdges = ref(0);

onMounted(() => {
  smoothEdges.value = Number(sessionStore.sessionData.smoothEdges);
  setEdgesImgBlur(0);
});

function setEdgesImgBlur(duration: number = 0.3) {
  if (smoothEdges.value) {
    gsap.to('.smoothEdgesImg', {
      duration: duration,
      filter: 'blur(3px)',
    });
    gsap.to('.hardEdgesImg', {
      duration: duration,
      filter: 'blur(0px)',
    });
  } else {
    gsap.to('.smoothEdgesImg', {
      duration: duration,
      filter: 'blur(0px)',
    });
    gsap.to('.hardEdgesImg', {
      duration: duration,
      filter: 'blur(3px)',
    });
  }
}

watch(smoothEdges, (value, oldValue) => {
  setEdgesImgBlur();
  sessionStore.sessionData.smoothEdges = Boolean(value);
});

const smoothEdgesTabs = [
  {
    label: 'Hard',
  },
  {
    label: 'Smooth',
  },
];
</script>
<template>
  <Settings :in-project="false">
    <SettingsHeader>Local Settings</SettingsHeader>
    <SettingsHeader :weight="2" class="mt-8">Edge display</SettingsHeader>
    <SettingsText>
      Hard edge display is recommended on low end devices as smooth can
      occasionaly cause lags.
    </SettingsText>
    <UTabs :items="smoothEdgesTabs" v-model="smoothEdges" class="w-[32rem]">
      <template #item="{ item }">
        <div class="flex flex-row">
          <img
            src="~/assets/img/hardEdges.png"
            class="smoothEdgesImg rounded-3xl w-60 ml-4"
          />
          <img
            src="~/assets/img/softEdges.png"
            class="hardEdgesImg rounded-3xl w-60 ml-2"
          />
        </div>
      </template>
    </UTabs>
  </Settings>
</template>
