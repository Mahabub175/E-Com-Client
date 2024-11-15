<template>
  <div
    class="relative flex justify-center items-center h-[600px] mb-20 bg-fixed"
    :style="{
      backgroundImage: `url(https://www.ansonika.com/foores/img/bg_call_section_2.jpg)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }"
  >
    <div class="absolute inset-0 bg-black bg-opacity-50"></div>
    <div class="relative z-10 text-white container mx-auto">
      <h2 class="text-4xl font-semibold text-center">What Our Clients Says</h2>
      <div
        class="bg-[#262626] p-10 text-center text-white max-w-4xl mt-10 mx-auto"
      >
        <Swiper
          :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperNavigation]"
          :slides-per-view="1"
          :loop="true"
          :pagination="{ clickable: true }"
        >
          <SwiperSlide v-for="slide in reviews" :key="slide.name">
            <div
              class="relative z-10 text-white flex flex-col lg:flex-row items-center gap-10 p-4"
            >
              <div class="flex items-center gap-4">
                <NuxtImg
                  :src="slide.images"
                  alt="about us"
                  class="w-20 h-20 rounded-full"
                />
                <div>
                  <h3 class="font-medium text-base">
                    {{ slide.name }}
                  </h3>
                  <p class="font-medium">
                    {{ slide.date }}
                  </p>
                </div>
              </div>
              <div class="w-[2px] h-20 bg-white ml-20 hidden lg:block"></div>
              <p class="text-[18px] font-normal">"{{ slide.quote }}"</p>
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
    name: "Roberta",
    date: "3 Dec",
    quote:
      "No nam indoctum accommodare, vix ei discere civibus philosophia. Vis ea dicant diceret ocurreret.",
    images: "https://www.ansonika.com/foores/img/testimonial_1.jpg",
  },
  {
    name: "Angela",
    date: "2 Dec",
    quote:
      "No nam indoctum accommodare, vix ei discere civibus philosophia. Vis ea dicant diceret ocurreret.",
    images: "https://www.ansonika.com/foores/img/testimonial_1.jpg",
  },
  {
    name: "John",
    date: "1 Dec",
    quote:
      "No nam indoctum accommodare, vix ei discere civibus philosophia. Vis ea dicant diceret ocurreret.",
    images: "https://www.ansonika.com/foores/img/testimonial_1.jpg",
  },
];
</script>
