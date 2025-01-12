<script lang="ts" setup>
const props = defineProps({
  icon: {
    type: String,
    required: true,
    default: 'mdi:book-open-variant',
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const clicked = ref(false);
</script>

<template>
  <div
    class="relative group inline-block"
    :class="{
      'cursor-pointer': true,
    }"
    @mousedown="clicked = true"
    @mouseup="clicked = false"
  >
    <div
      class="w-[70px] h-14 overflow-hidden absolute z-10 transition-all text-center justify-center flex"
      :class="{
        'group-hover:mt-[4px]': active && !clicked,
        'duration-300': active && !clicked,
        'mt-[10px]': clicked,
        'duration-0': clicked,
        'bg-button-blue': active,
        'bg-gray-600': !active,
      }"
      style="border-radius: 50%"
    >
      <UIcon
        :name="props.icon"
        class="text-[40px] my-auto"
        :class="{ 'text-gray-400': !active }"
      ></UIcon>
    </div>
    <div
      class="w-[70px] h-14 overflow-hidden mt-[10px]"
      :class="{
        'bg-button-blue-dark': active,
        'bg-gray-700': !active,
      }"
      style="
        border-bottom-right-radius: 50%;
        border-bottom-left-radius: 50%;
        border-top-right-radius: 40%;
        border-top-left-radius: 40%;
      "
    ></div>
  </div>
</template>
