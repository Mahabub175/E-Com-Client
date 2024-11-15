<template>
  <div
    class="relative bg-cover bg-center h-[500px] lg:h-[650px] transition-opacity duration-500"
  >
    <!-- <div
      class="absolute inset-0 bg-cover bg-center duration-500"
      :style="{
        backgroundImage: `url(${selectedBanner.bgImage})`,
        opacity: fadingOut ? 0.5 : 1,
      }"
    ></div> -->
    <NuxtImg
      :src="selectedBanner.bgImage"
      alt="Banner"
      class="w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500"
      loading="lazy"
      :style="{
        opacity: fadingOut ? 0.5 : 1,
      }"
    />
    <div
      class="absolute bottom-0 left-0 w-full h-[3px] z-10"
      style="
        background-image: url('https://laceibapr.com/img/frame_white.png');
        background-repeat: repeat-x;
        background-size: auto 100%;
      "
    ></div>
    <div class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50">
      &nbsp;
    </div>
    <div class="flex flex-col justify-end h-full container pb-10 relative">
      <template v-if="selectedBanner.image">
        <NuxtImg
          :src="selectedBanner.image"
          alt="Banner"
          class="w-full h-auto object-cover hidden"
          loading="lazy"
        />
      </template>
      <div
        class="flex flex-col justify-center items-start text-white mb-5 lg:mb-0"
      >
        <h2 class="text-3xl lg:text-5xl font-medium">
          {{ selectedBanner.name }}
        </h2>
        <p class="mt-2 text-lg">{{ selectedBanner.description }}</p>
        <p v-if="selectedBanner.bannerDescription" class="mt-2 text-lg">
          {{ selectedBanner.bannerDescription }}
        </p>
        <button
          v-if="selectedBanner.offer"
          class="mt-4 py-3 px-6 font-medium rounded bg-primary"
        >
          Ver Ofertas
        </button>
      </div>
      <div class="relative mt-10 hidden md:block">
        <client-only>
          <swiper
            class=""
            :loop="true"
            :space-between="10"
            :slides-per-view="6"
            :free-mode="true"
            :watch-slides-progress="true"
            :modules="modules"
            :navigation="{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }"
            :breakpoints="{
              '350': {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              '768': {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              '1024': {
                slidesPerView: 4,
                spaceBetween: 25,
              },
              '1280': {
                slidesPerView: 6,
                spaceBetween: 30,
              },
            }"
          >
            <swiper-slide
              v-for="(banner, index) in bannerData"
              :key="index"
              class="relative cursor-pointer group"
              @click="setSelectedBanner(banner)"
            >
              <div class="overflow-hidden rounded-lg">
                <img
                  :src="banner.image"
                  alt="Thumbnail"
                  class="w-full lg:w-[270px] h-[135px] group-hover:scale-110 duration-700"
                />
              </div>

              <div
                class="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-between text-white p-4 rounded-lg"
              >
                <div>
                  <p class="text-xl font-semibold">
                    {{ banner.name }}
                  </p>
                  <p class="text-base">{{ banner.type }}</p>
                </div>
                <div
                  class="mt-2 transform translate-y-16 group-hover:translate-y-2 transition duration-700 ease-in-out"
                >
                  <p class="text-base">{{ banner.price }}</p>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </client-only>

        <div class="absolute top-1/2 left-0 right-0 flex justify-center">
          <button class="swiper-button-prev custom-nav-button"></button>
          <button class="swiper-button-next custom-nav-button"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { FreeMode, Navigation } from "swiper/modules";
const homeBannerStore = useHomeBannerStore();
const selectedBanner = ref("");
const fadingOut = ref(false);

const bannerData = computed(() => {
  if (homeBannerStore.getBanners) {
    selectedBanner.value = homeBannerStore.getBanners[0];
    return homeBannerStore.getBanners;
  } else {
    return [];
  }
});

const setSelectedBanner = (banner) => {
  fadingOut.value = true;
  setTimeout(() => {
    selectedBanner.value = banner;
    fadingOut.value = false;
  }, 500);
};

const modules = [FreeMode, Navigation];
</script>

<style scoped>
.custom-nav-button {
  color: #fff;
  cursor: pointer;
  z-index: 10;
}

.swiper-button-prev {
  left: 50px;
}

.swiper-button-next {
  right: 50px;
}
</style>
