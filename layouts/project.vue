<script setup lang="ts">

</script>

<template>
  <div class="flex flex-col min-h-screen">
    <ProjectHeader />
    <div class="flex-grow">
    <slot class=""/>
    </div>
    <AppFooter/>
  </div>
</template>
