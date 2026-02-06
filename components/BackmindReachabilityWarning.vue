<script setup lang="ts">
const backmindHost = useRuntimeConfig().public.backmindHost as string;
const sessionStore = useSessionStore();

const isUnreachable = ref(false);
const isChecking = ref(false);
const toast = useToast();
const toastId = 'backmind-unreachable';
const authFailureTick = useState<number>('backmind-auth-failure', () => 0);
const showUnreachableModal = useState<boolean>(
  'backmind-unreachable-modal',
  () => false
);
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
    await sessionStore.fetch(backmindHost, {
      method: 'HEAD',
      mode: 'no-cors',
      cache: 'no-store',
      signal: controller.signal,
      skipAuthHeader: true,
      skipAuthRedirect: true,
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

watch(authFailureTick, () => {
  showUnreachableModal.value = true;
  void checkReachable();
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

<template>
  <UModal v-model="showUnreachableModal">
    <UCard class="w-full">
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="mdi:server-off" class="h-5 w-5 text-amber-500" />
          <span class="font-semibold">Backmind servers unreachable</span>
        </div>
      </template>
      <p class="text-text-2">
        Backmind servers are unreachable at the moment. Please try again in a
        bit.
      </p>
      <template #footer>
        <UButton color="gray" variant="solid" @click="showUnreachableModal = false">
          Close
        </UButton>
      </template>
    </UCard>
  </UModal>
</template>
