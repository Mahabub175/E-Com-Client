<template>
  <div class="h-[60vh] relative">
    <Swiper
      :modules="[SwiperAutoplay, SwiperEffectFade, SwiperNavigation]"
      :slides-per-view="1"
      :loop="true"
      :pagination="{ clickable: true }"
      effect="fade"
    >
      <SwiperSlide v-for="slide in menus" :key="slide.title">
        <div
          class="relative h-[100vh] flex justify-center items-center bg-cover bg-center"
          :style="{ backgroundImage: `url(${slide.images})` }"
        >
          <div class="absolute inset-0 bg-black bg-opacity-50"></div>
          <div class="text-white relative text-center">
            <NuxtImg
              src="/images/logos/la-ceiba-dark.svg"
              alt="logo"
              class="w-32 mx-auto"
            />
            <h2 class="text-3xl lg:text-5xl font-bold mb-2 mt-6">
              We will be back soon!
            </h2>
            <p class="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eius!
            </p>
            <div class="flex items-center justify-center gap-6 max-w-xl mt-10">
              <div class="flex flex-col gap-1">
                <div class="border p-5 border-white rounded-xl text-xl">
                  100
                </div>
                <p>Days</p>
              </div>
              <div class="flex flex-col gap-1">
                <div class="border p-5 border-white rounded-xl text-xl">
                  100
                </div>
                <p>Hours</p>
              </div>
              <div class="flex flex-col gap-1">
                <div class="border p-5 border-white rounded-xl text-xl">
                  100
                </div>
                <p>Minutes</p>
              </div>
              <div class="flex flex-col gap-1">
                <div class="border p-5 border-white rounded-xl text-xl">
                  100
                </div>
                <p>Seconds</p>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
const menus = [
  {
    title: "Reserve A Table Now",
    subtitle: "Cooking Delicious Food Since 2005",
    images: "https://www.ansonika.com/foores/img/slides/slide_home_2.jpg",
    position: "left",
    path: "/",
  },
  {
    title: "Enjoy A Friendly Dinner",
    subtitle: "Cooking Delicious Food Since 2005",
    images: "https://www.ansonika.com/foores/img/slides/slide_home_3.jpg",
    position: "center",
    path: "/",
  },
  {
    title: "Taste Unique Food",
    subtitle: "Cooking Delicious Food Since 2005",
    images: "https://www.ansonika.com/foores/img/slides/slide_home_1.jpg",
    position: "right",
    path: "/",
  },
];
</script>

<style scoped></style>
