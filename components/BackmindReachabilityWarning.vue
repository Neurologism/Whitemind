<script setup lang="ts">
const backmindHost = useRuntimeConfig().public.backmindHost as string;

const isUnreachable = ref(false);
const isChecking = ref(false);
const toast = useToast();
const toastId = 'backmind-unreachable';
let intervalId: ReturnType<typeof setInterval> | undefined;

const checkReachable = async () => {
  if (!import.meta.client || isChecking.value) return;

  if (!backmindHost) {
    isUnreachable.value = true;
    return;
  }

  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    isUnreachable.value = true;
    return;
  }

  isChecking.value = true;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);

  try {
    await fetch(backmindHost, {
      method: 'HEAD',
      mode: 'no-cors',
      cache: 'no-store',
      signal: controller.signal,
    });
    isUnreachable.value = false;
  } catch {
    isUnreachable.value = true;
  } finally {
    clearTimeout(timeoutId);
    isChecking.value = false;
  }
};

watch(isUnreachable, (unreachable) => {
  if (unreachable) {
    toast.remove(toastId);
    toast.add({
      id: toastId,
      title: 'Backend servers unreachable',
      description: 'Some features may not work until the connection returns.',
      icon: 'mdi-alert-circle',
      color: 'amber',
      timeout: 0,
    });
  } else {
    toast.remove(toastId);
  }
});

const handleNetworkChange = () => {
  void checkReachable();
};

onMounted(() => {
  void checkReachable();
  intervalId = setInterval(checkReachable, 10000);
  window.addEventListener('online', handleNetworkChange);
  window.addEventListener('offline', handleNetworkChange);
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
  window.removeEventListener('online', handleNetworkChange);
  window.removeEventListener('offline', handleNetworkChange);
  toast.remove(toastId);
});
</script>

<template></template>
