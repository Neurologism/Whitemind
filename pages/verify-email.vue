<script setup lang="ts">
const route = useRoute();

const token = route.query.token as string | undefined;
const sessionStore = useSessionStore();

enum VerificationStatus {
  LOADING = 10,
  FAILED = 20,
  SUCCESS = 30,
  INVALID_LINK = 40,
  ALREADY_VERIFIED = 50,
}

const displayText = {
  10: 'Verifying your email...',
  20: 'Verification failed',
  30: 'Verification successful',
  40: 'Invalid link',
  50: 'Already verified',
};

const displayIcon = {
  10: 'mdi:envelope',
  20: 'mdi:warning',
  30: 'mdi:tick',
  40: 'mdi:bug',
  50: 'mdi:tick',
};

const verificationStatus = ref<VerificationStatus>(VerificationStatus.LOADING);

async function verifyEmail() {
  if (!token) {
    verificationStatus.value = VerificationStatus.INVALID_LINK;
    return;
  }
  const res = await sessionStore.fetch(
    `/auth/verify-email?${new URLSearchParams({
      token,
    })}`,
    {
      method: 'PATCH',
      cache: 'no-cache',
    }
  );
  if (res.status === 208) {
    verificationStatus.value = VerificationStatus.ALREADY_VERIFIED;
  } else if (res.ok) {
    verificationStatus.value = VerificationStatus.SUCCESS;
  } else {
    verificationStatus.value = VerificationStatus.FAILED;
  }
}

verifyEmail();
</script>

<template>
  <div class="text-5xl text-center mt-8">
    <h2 class="block">{{ displayText[verificationStatus] }}</h2>
    <UIcon
      :name="displayIcon[verificationStatus]"
      class="mt-6"
      style="font-size: 6rem"
    ></UIcon>
  </div>
</template>
