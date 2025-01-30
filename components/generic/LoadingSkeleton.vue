<script setup lang="ts">
const props = defineProps({
  active: Boolean,
  inline: { type: Boolean, default: false },
  rounded: {
    type: String,
    default: 'xl',
  },
});

const emit = defineEmits(['update:modelValue']);

onMounted(() => {
  if (props.active) {
    initGsap();
  }
});

watch(
  () => props.active,
  (newVal) => {
    if (newVal) {
      initGsap();
    } else {
      gsap.killTweensOf('.skeleton');
      gsap.to('.skeleton', {
        backgroundColor: 'transparent',
        duration: 0,
        ease: 'power1.inOut',
      });
    }
  }
);

function initGsap() {
  gsap.to('.skeleton', {
    backgroundColor: '#334155',
    duration: 1,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut',
    repeatDelay: 0,
  });
}
</script>

<template>
  <div>
    <div
      class="skeleton"
      :class="{
        'bg-bg-3': props.active,
        'inline-block': props.inline,
        block: !props.inline,
        'bg-transparent': !props.active,
        'rounded-full': props.active && props.rounded === 'full',
        'rounded-3xl': props.active && props.rounded === '3xl',
        'rounded-2xl': props.active && props.rounded === '2xl',
        'rounded-xl': props.active && props.rounded === 'xl',
        'rounded-lg': props.active && props.rounded === 'lg',
        'rounded-md': props.active && props.rounded === 'md',
        'rounded-sm': props.active && props.rounded === 'sm',
      }"
    >
      <div :class="{ invisible: props.active }">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
