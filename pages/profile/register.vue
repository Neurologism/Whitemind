<script setup lang="ts">
import { ref } from "vue";
import { useSessionStore } from "~/stores/SessionStore";

const sessionStore = useSessionStore();

const username = ref("");
const usernameOrEmailTaken = ref(false);

const email = ref("");
const password = ref("");
const password2 = ref("");

const legalStuff = ref(false);

let usernameOrEmailChangeTimeout: NodeJS.Timeout | null = null;

function onUsernameOrEmailChange() {
  if (usernameOrEmailChangeTimeout) {
    clearTimeout(usernameOrEmailChangeTimeout);
  }
  usernameOrEmailChangeTimeout = setTimeout(async () => {
    if (username.value.length < 3) {
      usernameOrEmailTaken.value = false;
      return;
    }
    let result = await sessionStore.fetch("/api/user/is-taken", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          brainetTag: username.value,
          email: email.value,
        },
      }),
    });
    usernameOrEmailTaken.value = !result.ok;
  }, 300);
}

const validateEmail = (email: string) => {
  return (
    (
      String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ) ?? []
    ).length > 0
  );
};

const scorePassword = (pass: string): number => {
  let score = 0;
  if (!pass) return score;

  // Award points for length
  const lengthScore = Math.min(1, pass.length / 20);
  score += lengthScore;

  // Award points for containing numbers
  const numberScore = /\d/.test(pass) ? 0.1 : 0;
  score += numberScore;

  // Award points for containing special characters
  const specialCharScore = /[!@#$%^&*(),.?":{}|<>]/.test(pass) ? 0.1 : 0;
  score += specialCharScore;

  // Award points for containing both lowercase and uppercase letters
  const lowerUpperScore = /[a-z]/.test(pass) && /[A-Z]/.test(pass) ? 0.2 : 0;
  score += lowerUpperScore;

  // Normalize score to be between 0 and 1
  return Math.min(1, score);
};

const getPasswordColor = (score: number) => {
  if (score < 0.3) return "red";
  if (score < 0.5) return "orange";
  if (score < 0.7) return "yellow";
  return "green";
};

const onRegister = async () => {
  let response = await sessionStore.fetch("/api/auth/register", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: {
        brainetTag: username.value,
        email: email.value,
        plainPassword: password.value,
      },
    }),
  });
  if (response.ok) {
    console.log("Registration successful");
    console.log(response.body);
    let data = await response.json();
    console.log(data);
    await sessionStore.loginWithSessionToken(data.token);
    navigateTo("/projects");
  } else {
    console.log("Registration failed");
  }
};
</script>

<template>
  <div class="flex w-screen justify-center flex-row conte">
    <div
      class="md:basis-2/3 lg:basis-2/5 sm:basis-full basis-full dark:divide-slate-700 mx-5"
    >
      <UCard class="sm:m-10 m-2 mt-10">
        <template #header>
          <h1 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Register
          </h1>
          <small class="text-gray-500 dark:text-gray-300"
            >Start your journey now</small
          >
        </template>
        <div class="input-tile">
          <HintBox>
            <UInput
              v-model="username"
              label="Username"
              type="username"
              placeholder="Enter your username"
              @change="onUsernameOrEmailChange"
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
          <HintBox>
            <UInput
              v-model="email"
              label="Email"
              placeholder="Enter your email"
              type="email"
              @change="onUsernameOrEmailChange"
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
        <div class="input-tile">
          <HintBox>
            <UInput
              v-model="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
            <template #hint>
              <UProgress
                :value="scorePassword(password) * 100"
                :color="getPasswordColor(scorePassword(password))"
              />
              <div class="pt-2">
                <UAlert
                  v-if="scorePassword(password) < 0.5"
                  icon="mdi-info"
                  color="red"
                  variant="outline"
                  title="Password too weak!"
                  message="Please choose a stronger password"
                />
              </div>
            </template>
          </HintBox>
        </div>
        <div class="input-tile">
          <HintBox>
            <UInput
              v-model="password2"
              label="Confirm Password"
              placeholder="Confirm your password"
              type="password"
            />
            <template #hint>
              <UAlert
                v-if="password != password2"
                icon="mdi-info"
                color="red"
                variant="outline"
                title="The passwords do not match!"
              />
            </template>
          </HintBox>
        </div>
        <div class="input-tile">
          <UCheckbox
            v-model="legalStuff"
            label="I agree to the terms and conditions"
          />
        </div>
        <div v-if="usernameOrEmailTaken" class="input-tile">
          <UAlert
            icon="mdi-alert"
            color="red"
            title="Username or email already in use!"
            message="Please choose a unique username or email"
          />
        </div>
        <div class="input-tile">
          <UButton
            block
            :disabled="
              usernameOrEmailTaken ||
              username.length < 3 ||
              !validateEmail(email) ||
              password != password2 ||
              !legalStuff ||
              scorePassword(password) < 0.5
            "
            color="primary"
            @click="onRegister"
          >
            Register
          </UButton>
        </div>
        <template #footer>
          <div class="flex justify-between">
            <ULink to="/profile/login" class="text-blue-500 hover:underline"
              >Already have an account? Login here!</ULink
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
