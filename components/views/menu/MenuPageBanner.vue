<template>
  <div
    class="relative flex justify-center items-center bg-cover bg-center h-[600px]"
    :style="{ backgroundImage: `url(${backgroundImage})` }"
  >
    <div class="absolute inset-0 bg-black bg-opacity-65"></div>
    <div class="p-10 text-center text-white relative">
      <div
        v-if="dividerSrc"
        class="flex justify-center items-center gap-2 mb-5"
      >
        <NuxtImg
          src="https://laceibapr.com/img/divider.svg"
          alt="logo"
          class="w-28"
        />
      </div>
      <h2 class="text-5xl font-medium">{{ title }}</h2>
      <p v-if="subtitle" class="text-xl mb-6 font-lora">
        {{ subtitle }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  backgroundImage: string;
  title: string;
  subtitle?: string;
  dividerSrc?: string;
}>();
</script>

<style scoped></style>
