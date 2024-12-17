<template>
  <div class="py-24 sm:py-32 md:py-40 relative md:pb-24 h-screen">
    <div class="text-center relative">
      <h1
        class="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl"
      >
        <span>WhiteMind</span> <br />
        <span class="text-primary">The lighter way to AI. </span>
      </h1>
      <div
        class="mt-6 text-md md:text-lg tracking-tight text-gray-600 dark:text-gray-300"
      >
        Welcome to WhiteMind
      </div>
      <div class="mt-10 justify-center gap-x-6 gap-y-3">
        <UButton
          to="/tutorials"
          class="px-6 py-3 text-lg font-semibold text-white"
        >
          Get Started
        </UButton>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
