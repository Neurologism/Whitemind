<script setup lang="ts"></script>

<template>
  <footer class="w-full">
    <div class="container p-4 mx-auto">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="flex flex-col md:flex-row items-center">
          <div class="text-white text-lg font-bold">
            <a href="/">WhiteMind</a>
          </div>
          <div class="text-gray-400 ml-0 md:ml-4 mt-2 md:mt-0">
            © {{ new Date().getFullYear() }}
          </div>
        </div>
        <div class="flex sm:grid-cols-2 md:flex-row items-center mt-4 md:mt-0">
          <div class="grid text-gray-400">
            <a href="/privacy">Privacy Policy</a>
          </div>
          <div class="text-gray-400 ml-4">
            <a href="/terms">Terms of Service</a>
          </div>
          <div class="text-gray-400 ml-4">
            <a href="/contact">Contact Us</a>
          </div>
          <div class="text-gray-400 ml-4 items-center">
            <a href="https://github.com/neurologism" target="_blank">
              <UIcon name="i-mdi-github" class="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
