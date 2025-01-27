<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);

const sessionStore = useSessionStore();

watch(
  () => props.modelValue,
  (newValue) => {
    isOpen.value = newValue;
  }
);

watch(isOpen, (newValue) => {
  emit('update:modelValue', newValue);
});
</script>

<template>
  <USlideover v-model="isOpen">
    <UCard
      class="flex flex-col flex-1"
      :ui="{
        body: { base: 'flex-1' },
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <UAvatar
            size="lg"
            :src="sessionStore.hasPfp ? sessionStore.pfpUrl : '/user.svg'"
            :alt="sessionStore.sessionData.user.displayname ?? ''"
            class="flex-initial"
          />
          <h2
            class="flex-auto mx-4 text-lg font-semibold leading-6 text-gray-900 dark:text-white"
          >
            {{ sessionStore.sessionData?.user.displayname }}
          </h2>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="isOpen = false"
          />
        </div>
      </template>
      <div class="columns-1">
        <UButton
          variant="ghost"
          icon="i-heroicons-user"
          color="gray"
          size="md"
          class="w-full"
          @click="
            () => {
              navigateTo('/profile');
              isOpen = false;
            }
          "
        >
          Your profile
        </UButton>
        <UButton
          variant="ghost"
          icon="i-heroicons-folder"
          color="gray"
          size="md"
          class="w-full"
          @click="
            () => {
              navigateTo('/projects');
              isOpen = false;
            }
          "
        >
          Your Projects
        </UButton>
        <UButton
          variant="ghost"
          icon="i-heroicons-academic-cap"
          color="gray"
          size="md"
          class="w-full"
          @click="
            () => {
              navigateTo('/tutorials');
              isOpen = false;
            }
          "
        >
          Tutorials
        </UButton>
        <UButton
          variant="ghost"
          icon="i-heroicons-cog-6-tooth"
          color="gray"
          size="md"
          class="w-full"
          @click="
            () => {
              navigateTo('/settings');
              isOpen = false;
            }
          "
        >
          Settings
        </UButton>
        <UButton
          variant="ghost"
          icon="i-heroicons-arrow-uturn-right"
          color="gray"
          size="md"
          class="w-full"
          @click="
            () => {
              isOpen = false;
              sessionStore.signOut();
            }
          "
        >
          Sign out
        </UButton>
      </div>
    </UCard>
  </USlideover>
</template>
