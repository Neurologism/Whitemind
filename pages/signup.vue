<script setup lang="ts">
definePageMeta({
  layout: 'plain',
});

const sessionStore = useSessionStore();

const username = ref('');
const usernameOrEmailTaken = ref(false);

const email = ref('');
const password = ref('');
const password2 = ref('');

const legalStuff = ref(false);

const toast = useToast();

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

    usernameOrEmailTaken.value = await sessionStore.isUserTaken(
      username.value,
      email.value
    );
  }, 300);
}

const validateEmail = (email: string) => {
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

const onRegister = async () => {
  sessionStore.showLoadingAnimation('Registering...');
  let response = await sessionStore.fetch('/api/auth/register', {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      agreedToTermsOfServiceAndPrivacyPolicy: legalStuff.value,
      user: {
        brainetTag: username.value,
        email: email.value,
        plainPassword: password.value,
      },
    }),
  });
  if (response.ok) {
    console.log('Registration successful');
    console.log(response.body);
    let data = await response.json();
    console.log(data);
    await sessionStore.loginWithSessionToken(data.token);
    navigateTo('/tutorials');
  } else {
    sessionStore.loading = false;
    toast.add({
      title: 'Registration failed',
      description: 'Please try again',
      color: 'red',
      icon: 'mdi-alert-circle',
    });
  }
};
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
      Sign up to WhiteMind
    </h1>
    <UCard class="md:w-3/5 lg:w-2/5 xl:w-4/12 2xl:w-3/12 mx-auto">
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
              :value="sessionStore.scorePassword(password) * 100"
              :color="
                sessionStore.getPasswordColor(
                  sessionStore.scorePassword(password)
                )
              "
            />
            <div class="pt-2">
              <UAlert
                v-if="sessionStore.scorePassword(password) < 0.5"
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
            @keyup.enter="onRegister"
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
        <UCheckbox v-model="legalStuff" required>
          <template #label>
            I have read and agree to Whitemind's
            <ULink to="/terms-and-conditions" class="text-blue-500">
              Terms and Conditions
            </ULink>
            and
            <ULink to="/privacy-policy" class="text-blue-500"
              >Privacy Policy
            </ULink>
          </template>
        </UCheckbox>
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
            sessionStore.scorePassword(password) < 0.5
          "
          color="primary"
          @click="onRegister"
        >
          Sign up
        </UButton>
      </div>
      <template #footer>
        Already have an account?
        <ULink to="/login" class="text-blue-500 hover:underline ml-1">
          Login</ULink
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
