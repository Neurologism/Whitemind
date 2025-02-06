<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  icon: string;
  title: string;
  color: string;
  onMainClick: () => void;
  onSubClick: (groupIndex: number) => void;
  activeElementId: {
    domId: string;
    category: string;
    subCategory: string;
  } | null;
  children: {
    icon: string;
    name: string;
  }[];
}>();

const isOpen = ref(false);
const isAnimating = ref(false);

const isScrolledTo = computed(() => {
  if (props.activeElementId) {
    return props.activeElementId.category === props.title;
  }
  return false;
});

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

const visibleChildren = computed(() => {
  return props.children.filter((child) => child.name !== 'UNCATEGORIZED');
});

function toggle() {
  if (isOpen.value === false || visibleChildren.value.length === 0) {
    props.onMainClick();
  }
  if (!isScrolledTo.value) {
    isOpen.value = !isOpen.value;
  }
}
</script>

<template>
  <div
    class="flex flex-col justify-center items-center rounded-2xl transition-all"
    :style="{
      backgroundColor: isOpen || isScrolledTo ? backgroundColor : undefined,
    }"
  >
    <UTooltip :popper="{ placement: 'right' }">
      <template #text>
        <span class="font-mono font-semibold text-sm">{{ title }}</span>
      </template>
      <div
        class="w-11 h-11 flex justify-center items-center rounded-2xl hover:rounded-lg hover:scale-105 transition-all cursor-pointer"
        :style="{ backgroundColor: color }"
        @click="toggle"
      >
        <UIcon :name="icon" size="32" />
      </div>
    </UTooltip>
    <transition
      name="expand"
      @before-enter="isAnimating = true"
      @after-enter="isAnimating = false"
      @before-leave="isAnimating = true"
      @after-leave="isAnimating = false"
    >
      <div v-if="isOpen || isScrolledTo">
        <div
          v-for="(child, index) in visibleChildren"
          :key="index"
          @click="onSubClick(index)"
        >
          <UTooltip
            :popper="{ placement: 'right', strategy: 'fixed' }"
            :prevent="isAnimating"
          >
            <template #text>
              <span class="font-mono font-semibold text-sm">{{
                child.name
              }}</span>
            </template>
            <div
              class="w-11 h-11 border-2 border-gray-600 bg-bg-3 mt-1 flex justify-center items-center rounded-2xl hover:rounded-lg transition-all cursor-pointer"
              :class="{
                'scale-110 border-3':
                  activeElementId?.subCategory === child.name && isScrolledTo,
              }"
            >
              <UIcon :name="child.icon" size="32" />
            </div>
          </UTooltip>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.2s ease;
}

.expand-leave-active {
  transition-duration: 0.1s;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
