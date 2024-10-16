<script setup lang="ts">
import { ref } from 'vue';
import { useSessionStore } from "~/stores/SessionStore";

const sessionStore = useSessionStore();

const username = ref('');
const usernameOrEmailTaken = ref(false);

const email = ref('');
const password = ref('');
const password2 = ref('');
const legalStuff = ref(false);

async function onUsernameOrEmailChange() {
  if (username.value.length < 3) {
    usernameOrEmailTaken.value = false;
    return;
  }
  let result = await sessionStore.fetch('/api/user/is-taken', {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: {
        'brainet_tag': username.value,
        'email': email.value
      }
    })
  });
  usernameOrEmailTaken.value = !result.ok;
}

</script>

<template>
  <div class="flex w-screen justify-center flex-row conte">
    <div class="md:basis-2/3 lg:basis-2/5 sm:basis-full basis-full dark:divide-slate-700 mx-5">
      <UCard class="sm:m-10 m-2 mt-10">
        <template #header>
          <h1 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Register</h1>
          <small class="text-gray-500 dark:text-gray-300">Start your journey now</small>
        </template>
          <div class="input-tile">
            <HintBox>
              <UInput v-model="username" label="Username" placeholder="Enter your username" @input="onUsernameOrEmailChange"/>
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
            <HintBox>
              <UInput v-model="email" label="Email" placeholder="Enter your email" type="email"/>
              <template #hint>
                <div class="text-sm text-gray-500 dark:text-gray-300">Your username must be unique</div>
              </template>
            </HintBox>
          </div>
          <div class="input-tile">
            <HintBox>
              <UInput v-model="password" label="Password" placeholder="Enter your password" type="password"/>
              <template #hint>
                <div class="text-sm text-gray-500 dark:text-gray-300">Your username must be unique</div>
              </template>
            </HintBox>
          </div>
          <div class="input-tile">
            <HintBox>
              <UInput v-model="password2" label="Confirm Password" placeholder="Confirm your password" type="password"/>
              <template #hint>
                <div class="text-sm text-gray-500 dark:text-gray-300">Your passwords must match</div>
              </template>
            </HintBox>
          </div>
          <div class="input-tile">
            <UCheckbox v-model="legalStuff" label="I agree to the terms and conditions"/>
          </div>
        <div v-if="usernameOrEmailTaken" class="input-tile">
          <UAlert
              icon="mdi-alert"
              color="red"
              title="Username or email already in use!"
              message="Please choose a unique username or email"
          />
        </div>
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