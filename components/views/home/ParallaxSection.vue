<template>
  <div
    class="flex flex-col justify-center items-center h-[900px] lg:h-[800px] bg-fixed"
    :style="{
      backgroundImage: `url(https://laceibapr.com/img/bg_call_section_2.jpg)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }"
  >
    <div class="container">
      <p class="text-3xl lg:text-4xl font-normal mb-10 text-white text-center">
        Opiniones de Nuestros Clientes
      </p>
      <div class="text-center w-full text-white lg:max-w-[800px] mx-auto">
        <Swiper
          :modules="[
            SwiperAutoplay,
            SwiperEffectCreative,
            SwiperNavigation,
            SwiperPagination,
          ]"
          :slides-per-view="1"
          :loop="true"
          :pagination="{ clickable: true }"
          effect="flip"
          autoplay
          class="!pb-10"
        >
          <SwiperSlide
            v-for="slide in reviews"
            :key="slide.name"
            class="bg-[#262626] z-10 pb-10"
          >
            <div
              class="flex flex-col lg:flex-row items-center lg:items-start gap-5 lg:gap-20 p-10"
            >
              <div class="flex items-center gap-4 pr-5">
                <NuxtImg
                  :src="slide.images"
                  alt="about us"
                  class="size-20 rounded-full"
                />

                <div class="text-start">
                  <h3 class="font-medium text-sm whitespace-nowrap">
                    {{ slide.name }}
                  </h3>
                  <p class="font-medium text-sm whitespace-nowrap">
                    Google Reviews
                  </p>
                </div>
              </div>
              <div class="relative lg:border-l lg:pl-5 mt-2">
                <p class="text-[21px] font-normal font-lora text-start italic">
                  "{{ slide.quote }}"
                </p>
                <p
                  class="absolute -bottom-10 text-xs border border-white p-1 rounded-full right-4"
                >
                  Traducido al Español
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const reviews = [
  {
    name: "Segio",
    date: "3 Dec",
    quote:
      "Algunas de las mejores comidas españolas fuera de la Madre Patria. Auténticas Empanada Gallega,.",
    images: "https://eu.ui-avatars.com/api/?name=Sergio&size=250",
    bottomName: "Traducido al Español",
  },
  {
    name: "Jason Aros",
    date: "2 Dec",
    quote:
      "No nam indoctum accommodare, vix ei discere civibus philosophia. Vis ea dicant diceret ocurreret.",
    images: "https://eu.ui-avatars.com/api/?name=Jason&size=250",
    bottomName: "Traducido al Español",
  },
  {
    name: "Peter Exre",
    date: "1 Dec",
    quote:
      "No nam indoctum accommodare, vix ei discere civibus philosophia. Vis ea dicant diceret ocurreret.",
    images: "https://eu.ui-avatars.com/api/?name=Peter&size=250",
    bottomName: "Traducido al Español",
  },
  {
    name: "Eylin",
    date: "1 Dec",
    quote:
      "No nam indoctum accommodare, vix ei discere civibus philosophia. Vis ea dicant diceret ocurreret.",
    images: "https://eu.ui-avatars.com/api/?name=Eylin&size=250",
    bottomName: "Traducido al Español",
  },
];
</script>

<style scoped>
::v-deep .swiper-pagination-bullet {
  background-color: transparent !important;
  border: 2px solid #fff !important;
  opacity: 0.7 !important;
  width: 14px !important;
  height: 14px !important;
  margin: 0px 5px !important;
  transition: transform 0.3s ease, opacity 0.3s ease;
  position: relative;
  box-sizing: border-box;
}

::v-deep .swiper-pagination-bullet-active {
  background-color: transparent !important;
  border: 2px solid #978667 !important;
  opacity: 1 !important;
  transform: scale(1.5) !important;
}

::v-deep .swiper-pagination-bullet-active::before {
  content: "";
  position: absolute;
  top: 1px;
  left: 1px;
  right: 1px;
  bottom: 1px;
  background-color: #978667 !important;
  border-radius: 50%;
  z-index: -1;
}
</style>
