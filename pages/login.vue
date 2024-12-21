<script setup lang="ts">
import { ref } from 'vue';
import { useSessionStore } from '~/stores/SessionStore';
const toast = useToast();

definePageMeta({
  layout: 'plain',
});

const sessionStore = useSessionStore();
if (sessionStore.doesSessionIdExist) {
  navigateTo('/profile');
}

enum LoginTab {
  EMAIL = 0,
  USERNAME = 1,
}

let selectedTab = ref(0);
const loginTabOptions = [
  {
    label: 'Email',
    icon: 'mdi-email',
  },
  {
    label: 'Username',
    icon: 'mdi-account',
  },
];
const onTabChange = (index: number) => {
  selectedTab.value = index;
};

const username = ref('');
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
    toast.add({
      title: 'Login failed',
      description: data.msg,
      color: 'red',
      icon: 'mdi-alert-circle',
    });
  }
};
</script>

<template>
  <div class="w-screen bg-black min-h-screen pt-8 px-8 flex flex-col">
    <img
      src="/android-chrome-512x512.png"
      width="128"
      height="128"
      class="mx-auto mb-8 hover:cursor-pointer"
      @click="navigateTo('/')"
    />
    <h1 class="text-3xl font-semibold text-white text-center mb-8">
      Login to WhiteMind
    </h1>
    <UCard class="md:w-3/5 lg:w-2/5 xl:w-4/12 2xl:w-3/12 mx-auto">
      <!-- <div class="input-tile">
        <UTabs :items="loginTabOptions" @change="onTabChange" />
      </div> -->
      <div v-if="selectedTab == LoginTab.EMAIL" class="input-tile">
        <UInput
          v-model="email"
          label="Email"
          placeholder="Enter your email or username"
          type="email"
        />
      </div>
      <div v-if="selectedTab == LoginTab.USERNAME" class="input-tile">
        <HintBox>
          <UInput
            v-model="username"
            label="Username"
            type="username"
            placeholder="Enter your username"
          />
          <template #hint>
            <UAlert
              v-if="username.length < 3"
              icon="mdi-info"
              color="red"
              variant="outline"
              title="Username must be at least 3 characters long"
              message="Please choose a unique username"
            />
          </template>
        </HintBox>
      </div>
      <div class="input-tile">
        <UInput
          v-model="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
        />
      </div>
      <div class="input-tile">
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
        <ULink
          to="/profile/register"
          class="text-blue-500 hover:underline ml-1"
        >
          Sign up</ULink
        >
      </template>
    </UCard>
    <div class="flex-grow"></div>
    <AppFooter />
  </div>
</template>

<style scoped>
.input-tile {
  @apply mb-4 ml-5 mr-5;
}
</style>
