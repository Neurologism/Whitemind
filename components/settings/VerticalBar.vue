<script setup lang="ts">
export interface Item {
  label: string;
  icon: string;
  click: (...args: any[]) => void;
}

const props = defineProps<{
  items: Item[];
}>();
</script>

<template>
  <div class="flex flex-col w-40 mr-10 pt-14">
    <UButton
      v-for="item in props.items"
      color="gray"
      variant="ghost"
      :icon="item.icon"
      @click="item.click"
      :key="item.label"
    >
      {{ item.label }}
    </UButton>
  </div>
</template>
