<!-- JS intended -->
<script setup>
import { onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  paramName: String,
  shapeDefinition: Object,
  data: Object
});

const submenuRef = ref(null);

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

function handleClickOutside(event) {
  if (submenuRef.value && !submenuRef.value.contains(event.target)) {
    submenuOpen.value = false;
  }
}

const submenuOpen = ref(false);

</script>

<template>
  <div ref="submenuRef" style="pointer-events: bounding-box">
    <div class="hover:bg-customPrimary-700 hover:scale-105 hover:border-2 hover:rounded transition-transform border-blue-200 p-1 cursor-pointer" @click="submenuOpen = !submenuOpen">
      {{ paramName }}
      <UIcon name="mdi-arrow-right" />
    </div>
    <div v-if="submenuOpen" class="nested-menu bg-customPrimary-950 border-2 border-blue-400 rounded p-1">
      <!-- Content of the nested menu -->
      {{ paramName }} (val: {{ data[paramName] }})
      <UDivider />
      <pre>{{ JSON.stringify(shapeDefinition, null, 1) }}</pre>
    </div>
  </div>
</template>

<style scoped>
.nested-menu {
  position: absolute;
  min-width: 200px;
  left: 105%;
  top: 0;
  z-index: 1000;
}
</style>