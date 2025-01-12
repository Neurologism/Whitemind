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

let options = [];
for (let i = 0; i < props.shapeDefinition.options.length; i++) {
  options.push(props.shapeDefinition.options[i]);
}
</script>

<template>
  <USelect
    variant="outline"
    v-model="value"
    :options="shapeDefinition.options"
  />
</template>
