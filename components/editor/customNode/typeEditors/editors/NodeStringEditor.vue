<script setup>
const props = defineProps({
  paramName: String,
  shapeDefinition: Object,
  data: Object,
  updateData: Function,
});

const text = ref(props.data[props.paramName]);
watch(text, (newText) => {
  props.updateData(props.paramName, newText);
});
</script>

<template>
  <UInput class="text-sky-100" v-model="text"></UInput>
</template>
