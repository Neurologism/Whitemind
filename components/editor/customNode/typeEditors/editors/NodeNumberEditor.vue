<script setup>
const props = defineProps({
  paramName: String,
  shapeDefinition: Object,
  data: Object,
  updateData: Function,
});

const value = ref(props.data[props.paramName]);
watch(value, (value) => {
  props.updateData(props.paramName, value);
});
</script>

<template>
  <UInput type="number" v-model="value"></UInput>
</template>
