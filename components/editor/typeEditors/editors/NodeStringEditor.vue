<script setup>

const props = defineProps({
  paramName: String,
  shapeDefinition: Object,
  data: Object,
  updateData: Function
});

const text = ref(props.data[props.paramName]);
watch(text, (newText) => {
  props.updateData(props.paramName, newText);
});

</script>

<template>
  <UInput v-model="text"></UInput>
</template>