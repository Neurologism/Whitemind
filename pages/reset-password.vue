<script setup lang="ts">
const toast = useToast();

definePageMeta({
  layout: 'plain',
});

enum ResetPasswordState {
  INITIALIZING,
  ENTER_NEW_PASSWORD,
  SUCCESS,
  FAILED,
  INVALID_LINK,
}

const sessionStore = useSessionStore();
const route = useRoute();

const token = (route.query.token as string) ?? '';
const userId = (route.query.user_id as string) ?? '';

const resetPasswordState = ref<ResetPasswordState>(
  ResetPasswordState.INITIALIZING
);
const firstPassword = ref('');
const secondPassword = ref('');

const resetPassword = async () => {
  let response = await sessionStore.fetch(
    '/auth/reset-password?' +
      new URLSearchParams({
        token: token,
        user_id: userId,
      }).toString(),
    {
      method: 'PATCH',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        plainPassword: firstPassword.value,
      }),
    }
  );
  if (response.ok) {
    resetPasswordState.value = ResetPasswordState.SUCCESS;
  } else {
    resetPasswordState.value = ResetPasswordState.FAILED;
  }
};

onMounted(() => {
  sessionStore.loading = false;
  gsap.from('.wm-path', {
    duration: 1,
    drawSVG: 0,
  });
});
</script>

<template>
  <div class="w-screen bg-bg-1 min-h-screen pt-8 px-8 flex flex-col">
    <img
      src="/whitemindLogo.svg"
      width="128"
      height="128"
      class="mx-auto mb-8 hover:cursor-pointer"
      @click="navigateTo('/')"
    />
    <h1 class="text-3xl font-semibold text-text-1 text-center mb-8">
      Reset password
    </h1>
    <UCard class="md:w-3/5 lg:w-2/5 xl:w-4/12 2xl:w-3/12 mx-auto">
      <div class="mb-4 ml-5 mr-5">
        <UInput
          v-model="firstPassword"
          label="Password"
          placeholder="Enter new password"
          type="password"
          @keyup.enter="resetPassword"
        />
      </div>
      <div class="mb-4 ml-5 mr-5">
        <UInput
          v-model="secondPassword"
          label="Password"
          placeholder="Repeat new password"
          type="password"
          @keyup.enter="resetPassword"
        />
      </div>
      <div class="mb-4 ml-5 mr-5" v-if="firstPassword !== secondPassword">
        <UAlert
          icon="mdi-alert"
          color="red"
          title="Passwords do not match"
          message="Please make sure to enter the same password twice."
        />
      </div>
      <div
        class="mb-4 ml-5 mr-5"
        v-if="firstPassword.length > 1 && firstPassword.length < 8"
      >
        <UAlert
          icon="mdi-alert"
          color="red"
          title="Password too short"
          message="Password should be at least 8 characters."
        />
      </div>
      <UButton
        block
        :disabled="!firstPassword || firstPassword.length < 8"
        color="primary"
        @click="resetPassword"
      >
        Set new password
      </UButton>
    </UCard>
    <div class="flex-grow"></div>
    <AppFooter />
  </div>
</template>
