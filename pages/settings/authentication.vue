<script setup lang="ts">
const openChangePasswordModal = ref(false);
const sessionStore = useSessionStore();
const toast = useToast();

const inputCurrentPassword = ref('');
const inputNewPassword = ref('');
const inputConfirmNewPassword = ref('');

async function changePassword() {
  openChangePasswordModal.value = false;
  const success = await sessionStore.modifyAccountData({
    newPassword: inputNewPassword.value,
    oldPassword: inputCurrentPassword.value,
  });

  if (success) {
    toast.add({
      color: 'green',
      icon: 'material-symbols:done',
      title: 'Password changed',
      description: 'Your password has been successfully changed.',
    });
  } else {
    toast.add({
      color: 'red',
      icon: 'material-symbols:error',
      title: 'Failed to change password',
      description: 'An error occurred while changing your password.',
    });
  }

  inputCurrentPassword.value = '';
  inputNewPassword.value = '';
  inputConfirmNewPassword.value = '';
}

const newPasswordsMatch = computed(() => {
  return inputNewPassword.value === inputConfirmNewPassword.value;
});
</script>
<template>
  <Modal v-model="openChangePasswordModal">
    <template #title>Change password</template>
    <template #text>
      Prove your identity by entering your current password and then choose a
      new one.
    </template>
    <template #bottom>
      <div class="w-96">
        <SettingsInput
          label="Current password"
          type="password"
          v-model="inputCurrentPassword"
          :set-width="false"
          class="w-full"
        >
        </SettingsInput>
        <HintBox>
          <SettingsInput
            label="New password"
            type="password"
            v-model="inputNewPassword"
            :set-width="false"
          >
          </SettingsInput
          ><template #hint>
            <UProgress
              :value="sessionStore.scorePassword(inputNewPassword) * 100"
              :color="
                sessionStore.getPasswordColor(
                  sessionStore.scorePassword(inputNewPassword)
                )
              "
            />
            <div class="pt-2">
              <UAlert
                v-if="sessionStore.scorePassword(inputNewPassword) < 0.5"
                icon="mdi-info"
                color="red"
                variant="outline"
                title="Password too weak!"
                message="Please choose a stronger password"
              />
            </div>
          </template>
        </HintBox>
        <HintBox class="mb-8">
          <SettingsInput
            label="Confirm new password"
            type="password"
            v-model="inputConfirmNewPassword"
            :set-width="false"
          >
          </SettingsInput>
          <template #hint>
            <UAlert
              v-if="inputNewPassword !== inputConfirmNewPassword"
              icon="mdi-info"
              color="red"
              variant="outline"
              title="The passwords do not match!"
            />
          </template>
        </HintBox>
        <UButton
          color="gray"
          :disabled="
            !newPasswordsMatch ||
            sessionStore.scorePassword(inputNewPassword) < 0.5
          "
          @click="changePassword"
          >Change your password</UButton
        >
      </div>
    </template>
  </Modal>
  <Settings :in-project="false">
    <SettingsHeader>Password</SettingsHeader>
    <SettingsText
      >You can change your password by clicking the button below.
    </SettingsText>
    <div>
      <UButton color="gray" @click="openChangePasswordModal = true"
        >Change your password</UButton
      >
    </div>
  </Settings>
</template>
