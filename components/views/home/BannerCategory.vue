<template>
  <div class="mt-2 grid grid-cols-1 lg:grid-cols-3 gap-2">
    <div v-for="item in bannerCategories" :key="item.title">
      <div
        class="relative flex justify-center items-center bg-cover bg-center h-[250px] overflow-hidden transition-transform duration-700 hover:scale-95 cursor-pointer"
        :style="{ backgroundImage: `url(${item.images})` }"
      >
        <div class="absolute inset-0 bg-black bg-opacity-65"></div>
        <div class="relative z-10 text-center text-white">
          <h3 class="text-[24px] font-bold">{{ item.title }}</h3>
          <p class="text-[18px] font-normal mb-3">{{ item.subtitle }}</p>
          <NuxtLink :href="item.path" class="btn btn-primary"
            >Order now</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const bannerCategories = [
  {
    title: "Our Menu",
    subtitle: "View Our Specialties",
    images: "https://www.ansonika.com/foores/img/banner_1.jpg",
    path: "/",
  },
  {
    title: "Delivery",
    subtitle: "Home Delivery Or Take Away Food",
    images: "https://www.ansonika.com/foores/img/banner_2.jpg",
    path: "/",
  },
  {
    title: "Inside Floors",
    subtitle: "View The Gallery",
    images: "https://www.ansonika.com/foores/img/banner_3.jpg",
    path: "/",
  },
];
</script>
