<script setup lang="ts">
import axios from 'axios';
const props = defineProps({
  loading: Boolean,
  pfpUrl: { type: String, default: '' },
  isSelf: { type: Boolean, default: false },
});

const sessionStore = useSessionStore();
const fileInput = ref<HTMLInputElement | null>(null);
const toast = useToast();
const hasPfp = ref(false);

async function checkForPfp() {
  if (!props.pfpUrl) {
    hasPfp.value = false;
    return;
  }
  await axios
    .get(props.pfpUrl)
    .then((response) => (hasPfp.value = response.status === 200))
    .catch(() => (hasPfp.value = false));
}

function triggerFileInput() {
  if (fileInput.value) {
    fileInput.value.click();
  }
}

async function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files ? target.files[0] : null;

  if (file) {
    try {
      const formData = new FormData();
      formData.append('pfp', file);

      const response = await sessionStore.fetch(
        `/users/${sessionStore.sessionData.user._id}/upload-pfp`,
        {
          method: 'PUT',
          body: formData,
        }
      );

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

watch(() => props.pfpUrl, checkForPfp);

onMounted(() => {
  checkForPfp();
});
</script>

<template>
  <input
    ref="fileInput"
    type="file"
    name="pfp"
    accept="image/*"
    @change="handleFileChange"
    class="hidden"
    style="width: 0; height: 0"
  />
  <GenericLoadingSkeleton :active="loading" :class="`w-52 h-52`" rounded="full">
    <div
      :class="`w-52 h-52 rounded-full overflow-hidden relative hover:cursor-pointer`"
      @click="triggerFileInput"
      v-if="isSelf"
    >
      <div
        class="z-10 absolute w-full h-full bg-bg-1 transition-all duration-300 bg-opacity-0 hover:bg-opacity-50 hover:opacity-100 opacity-0"
      >
        <UIcon
          name="fluent:edit-32-filled"
          class="text-text-1 w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
        />
      </div>
      <NuxtImg
        :src="hasPfp ? props.pfpUrl : '/user.svg'"
        class="w-full h-full"
      />
    </div>
    <NuxtImg
      v-else
      :src="hasPfp ? props.pfpUrl : '/user.svg'"
      :class="`w-52 h-52 rounded-full`"
    />
  </GenericLoadingSkeleton>
</template>
