<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import { _backdropInvert } from "#tailwind-config/theme";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  email: undefined,
  brainet_tag: undefined,
  password: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data);
}

const showModal = ref(false);

const emit = defineEmits(["toggle"]);

const props = defineProps({
  showModalProp: Boolean,
});

watch(
  () => props.showModalProp,
  (value) => {
    showModal.value = value;
  },
);

watch(
  () => showModal.value,
  (value) => {
    emit("toggle", value);
  },
);
</script>

<template>
  <UModal v-model="showModal" prevent-close>
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            Register
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="showModal = false"
          />
        </div>
      </template>

      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" />
        </UFormGroup>

        <UFormGroup label="Brainet Tag" name="username">
          <UInput v-model="state.brainet_tag" />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>

        <UButton type="submit"> Submit </UButton>
      </UForm>
    </UCard>
  </UModal>
</template>
