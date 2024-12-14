<script setup lang="ts">
import { ref } from 'vue';
import { useSessionStore } from '~/stores/SessionStore';
const toast = useToast();

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
        selectedTab.value == LoginTab.EMAIL
          ? {
              email: email.value,
              plainPassword: password.value,
            }
          : {
              brainetTag: username.value,
              plainPassword: password.value,
            },
    }),
  });
  let data = await response.json();
  if (response.ok) {
    await sessionStore.loginWithSessionToken(data.token);
    window.location.href = '/profile';
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
  <div class="flex w-screen justify-center flex-row conte">
    <div
      class="md:basis-4/5 lg:basis-3/5 xl:basis-2/5 basis-full dark:divide-slate-700 mx-5"
    >
      <UCard class="sm:m-10 m-2 mt-10">
        <template #header>
          <h1 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Login
          </h1>
          <small class="text-gray-500 dark:text-gray-300"
            >Login with <b>username</b> or <b>email</b>.</small
          >
        </template>
        <div class="input-tile">
          <UTabs :items="loginTabOptions" @change="onTabChange" />
        </div>
        <div v-if="selectedTab == LoginTab.EMAIL" class="input-tile">
          <HintBox>
            <UInput
              v-model="email"
              label="Email"
              placeholder="Enter your email"
              type="email"
            />
            <template #hint>
              <UAlert
                v-if="!validateEmail(email)"
                icon="mdi-info"
                color="red"
                variant="outline"
                title="Invalid email"
                message="Please enter a valid email adress!"
              />
            </template>
          </HintBox>
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
              !password ||
              (!validateEmail(email) && selectedTab == 0) ||
              (username.length < 3 && selectedTab == 1)
            "
            color="primary"
            @click="onLogin"
          >
            Login
          </UButton>
        </div>
        <template #footer>
          <div class="flex justify-between">
            <ULink to="/profile/register" class="text-blue-500 hover:underline"
              >Don't have an account yet? Create on here!</ULink
            >
          </div>
        </template>
      </UCard>
      <div></div>
    </div>
  </div>
</template>

<style scoped>
.input-tile {
  @apply mb-4 ml-5 mr-5;
}
</style>
