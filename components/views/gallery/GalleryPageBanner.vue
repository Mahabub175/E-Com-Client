<template>
  <div
    class="relative flex justify-center items-center bg-cover bg-center h-[600px]"
    :style="{
      backgroundImage: `url(https://laceibapr.com/img/hero_general.jpg)`,
    }"
  >
    <div class="absolute inset-0 bg-black bg-opacity-65"></div>
    <div class="p-10 text-center text-white relative">
      <div class="flex justify-center items-center gap-2 mb-5">
        <span class="w-12 h-[2px] bg-white"></span>
        <span class="size-4 rounded-full bg-white"></span>
        <span class="w-12 h-[2px] bg-white"></span>
      </div>
      <h2 class="text-5xl font-medium">Nuestro Arte Culinario</h2>
      <p class="text-xl mb-6 font-lora">Un vistazo a nuestra delicia</p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
