<script setup lang="ts">
const toast = useToast();

definePageMeta({
  layout: 'plain',
});

const sessionStore = useSessionStore();
if (sessionStore.isAuthorized) {
  navigateTo('/profile');
}

const email = ref('');
const password = ref('');

const validateEmail = (email: string): boolean => {
  return (
    (
      String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) ?? []
    ).length > 0
  );
};

const onLogin = async () => {
  sessionStore.showLoadingAnimation('Logging in...');
  let response = await sessionStore.fetch('/api/auth/login', {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user:
        // selectedTab.value == LoginTab.EMAIL
        email.value.includes('@')
          ? {
              email: email.value,
              plainPassword: password.value,
            }
          : {
              // brainetTag: username.value,
              brainetTag: email.value,
              plainPassword: password.value,
            },
    }),
  });
  let data = await response.json();
  if (response.ok) {
    await sessionStore.loginWithSessionToken(data.token);
    navigateTo('/profile');
  } else {
    sessionStore.loading = false;
    toast.add({
      title: 'Login failed',
      description: data.msg,
      color: 'red',
      icon: 'mdi-alert-circle',
    });
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
  <div class="w-screen bg-black min-h-screen pt-8 px-8 flex flex-col">
    <img
      src="/whitemindLogo.svg"
      width="128"
      height="128"
      class="mx-auto mb-8 hover:cursor-pointer"
      @click="navigateTo('/')"
    />
    <h1 class="text-3xl font-semibold text-white text-center mb-8">
      Login to WhiteMind
    </h1>
    <UCard class="md:w-3/5 lg:w-2/5 xl:w-4/12 2xl:w-3/12 mx-auto">
      <UInput
        v-model="email"
        label="Email or Username"
        placeholder="Enter your email or username"
        type="email"
        class="mb-4 ml-5 mr-5"
        @keyup.enter="onLogin"
      />
      <div class="mb-4 ml-5 mr-5">
        <UInput
          v-model="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          @keyup.enter="onLogin"
        />
      </div>
      <div class="mb-4 ml-5 mr-5">
        <UButton
          block
          :disabled="
            !password || email.includes('@')
              ? !validateEmail(email)
              : email.length < 3
          "
          color="primary"
          @click="onLogin"
        >
          Login
        </UButton>
        <UAlert
          v-if="email.includes(`@`) && !validateEmail(email)"
          icon="mdi-info"
          color="red"
          variant="outline"
          title="Invalid email"
          message="Please enter a valid email adress!"
          class="mt-4"
        ></UAlert>
      </div>
      <template #footer>
        Don't have an account yet?
        <ULink to="/signup" class="text-blue-500 hover:underline ml-1">
          Sign up</ULink
        >
      </template>
    </UCard>
    <div class="flex-grow"></div>
    <AppFooter />
  </div>
</template>

<style scoped></style>
