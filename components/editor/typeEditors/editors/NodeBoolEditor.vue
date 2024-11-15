<script setup>
const props = defineProps({
  paramName: String,
  shapeDefinition: Object,
  data: Object,
  updateData: Function,
});

const value = ref(props.data[props.paramName] === true ? 0 : 1);
watch(value, (newVal) => {
  props.updateData(props.paramName, newVal === 0);
});

const items = [
  {
    label: "true",
    value: true,
    icon: "mdi-check",
  },
  {
    label: "false",
    value: false,
    icon: "mdi-close",
  },
];
</script>

<template>
  <UTabs v-model="value" :items="items" />
</template>
