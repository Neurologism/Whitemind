<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  icon: string;
  title: string;
  color: string;
  onMainClick: () => void;
  onSubClick: (subTitle: string) => void;
  isSelected: boolean;
  children: {
    icon: string;
    name: string;
  }[];
}>();

const isHovered = ref(false);

const backgroundColor = computed(() => {
  const tempElement = document.createElement('div');
  tempElement.style.color = props.color;
  document.body.appendChild(tempElement);

  const computedColor = getComputedStyle(tempElement).color;
  document.body.removeChild(tempElement);
  const rgb = computedColor.match(/\d+/g)!.map(Number).toString();
  const alpha = 0.3;

  return `rgba(${rgb}, ${alpha})`;
});
</script>

<template>
  <div
    class="flex flex-col justify-center items-center rounded-2xl transition-all"
    :style="{
      backgroundColor: isHovered ? backgroundColor : '',
    }"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div
      class="w-12 h-12 flex justify-center items-center rounded-2xl hover:rounded-lg transition-all cursor-pointer"
      :style="{ backgroundColor: color }"
      @click="onMainClick"
    >
      <UIcon :name="icon" size="32" />
    </div>
    <transition name="expand">
      <div v-if="isHovered">
        <div
          v-for="(child, index) in children"
          :key="index"
          class="w-12 h-12 border-2 border-slate-600 bg-slate-800 mt-1 flex justify-center items-center rounded-2xl hover:rounded-lg transition-all cursor-pointer"
          @click="onSubClick(child.name)"
        >
          <UIcon :name="child.icon" size="32" />
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.expand-enter-active {
  transition: all 0.3s ease;
}

.expand-leave-active {
  transition: all 0.1s ease;
}

.expand-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.expand-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
