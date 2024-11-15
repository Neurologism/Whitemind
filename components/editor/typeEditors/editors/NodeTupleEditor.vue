<script setup>
const props = defineProps({
  paramName: String,
  shapeDefinition: Object,
  data: Object,
  updateData: Function,
});

const value = ref(JSON.stringify(props.data[props.paramName]));
watch(value, (newVal) => {
  try {
    newVal = JSON.parse(newVal);
    props.updateData(props.paramName, newVal);
  } catch (e) {
    console.info("Did not update data because of invalid JSON");
  }
});
</script>

<template>
  <UInput v-model="value"></UInput>
</template>
