<script setup lang="ts">
const sessionStore = useSessionStore();
const toast = useToast();

const primaryEmail = ref({
  address: '',
  verified: false,
  type: 'primary',
  ...sessionStore.getEmailByType('primary'),
});
const secondaryEmail = ref({
  address: '',
  verified: false,
  type: 'secondary',
  ...sessionStore.getEmailByType('secondary'),
});

async function saveSecondary() {
  if (await sessionStore.updateSecondaryEmail(secondaryEmail.value.address)) {
    toast.add({
      title: 'Secondary email saved',
      icon: 'mdi-check',
      color: 'green',
    });
  } else {
    toast.add({
      title: 'Secondary email could not be saved',
      icon: 'mdi-alert-circle',
      color: 'red',
    });
  }
}

async function swapPrimarySecondary() {}
</script>
<template>
  <Settings :in-project="false">
    {{ primaryEmail.verified }}
    <SettingsHeader>Mail & Phone</SettingsHeader>
    <div
      v-if="!primaryEmail.verified"
      class="flex flex-col space-y-2"
      :key="'primaryUnverified'"
    >
      <SettingsInput label="Primary Email" v-model="primaryEmail.address">
        You can still change your primary email address if you did not provide
        the correct one.
      </SettingsInput>
      <div>
        <UButton color="gray" icon="material-symbols:save"
          >Save & resend verification</UButton
        >
      </div>
    </div>
    <div v-else class="flex flex-col space-y-2" :key="'primaryVerified'">
      <SettingsInput
        label="Primary Email"
        disabled
        v-model="primaryEmail.address"
      >
        You can only change the primary email address by swapping it with a
        verified secondary email address.
      </SettingsInput>
      <SettingsInput label="Secondary Email" v-model="secondaryEmail.address">
      </SettingsInput>
      <div class="flex flex-row space-x-2">
        <UButton
          color="gray"
          icon="material-symbols:save"
          @click="saveSecondary"
          >Save secondary</UButton
        >
        <UButton
          color="gray"
          icon="mdi:swap-vertical"
          @click="swapPrimarySecondary"
          >Swap with primary</UButton
        >
      </div>
      <!-- <SettingsInput label="Phone Number"> </SettingsInput> -->
    </div></Settings
  >
</template>
