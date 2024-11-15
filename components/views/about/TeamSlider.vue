<template>
  <div
    class="flex mt-10 lg:mt-0 justify-center items-center bg-cover bg-center py-20 px-4"
    :style="{
      backgroundImage: `url(https://www.ansonika.com/foores/img/pattern_menu.jpg)`,
    }"
  >
    <div class="w-full">
      <div class="flex justify-center items-center mb-6">
        <span class="h-[2px] w-12 bg-grey"></span>
        <span class="bg-primary h-[2px] w-20"></span>
        <span class="h-[2px] w-12 bg-grey"></span>
      </div>
      <h2 class="text-3xl lg:text-4xl font-medium text-center mb-10">
        Our Chefs and staff
      </h2>
      <Swiper
        @slideChange="handleSlideChange"
        :slides-per-view="4.7"
        :space-between="20"
        centeredSlides="false"
        loop="true"
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        :pagination="{ clickable: true }"
        :modules="[Pagination, Autoplay]"
        class="mySwiper container mx-auto"
      >
        <SwiperSlide
          v-for="(data, i) in sliderData"
          :key="data.id"
          :class="`relative flex items-center justify-center h-[500px] mx-auto pb-10 transition-transform duration-300 ${
            i === activeIndex ? 'scale-105' : 'scale-90 opacity-60'
          }`"
        >
          <img
            class="object-cover center-img rounded-lg"
            :src="data.image"
            alt="slider image"
          />

          <div v-if="i === activeIndex">
            <p
              class="absolute bottom-10 lg:px-6 py-3 text-white lg:left-[25%] flex flex-col text-center bg-[#262626] rounded-t-md"
            >
              <span class="font-bold">{{ data.title }}</span>
              <span>{{ data.subTitle }}</span>
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Pagination, Autoplay } from "swiper/modules";

const sliderData = [
  {
    id: 1,
    subTitle: "Chef",
    title: "Julia Holmes",
    image: "https://www.ansonika.com/foores/img/staff/staff_3.jpg",
  },
  {
    id: 2,
    subTitle: "Chef",
    title: "Julia Holmes",
    image: "https://www.ansonika.com/foores/img/staff/staff_5.jpg",
  },
  {
    id: 3,
    subTitle: "Chef",
    title: "Julia Holmes",
    image: "https://www.ansonika.com/foores/img/staff/staff_2.jpg",
  },
  {
    id: 4,
    subTitle: "Chef",
    title: "Julia Holmes",
    image: "https://www.ansonika.com/foores/img/staff/staff_4.jpg",
  },
  {
    id: 5,
    subTitle: "Chef",
    title: "Julia Holmes",
    image: "https://www.ansonika.com/foores/img/staff/staff_1.jpg",
  },
];

const activeIndex = ref(0);

const handleSlideChange = (swiper) => {
  activeIndex.value = swiper.realIndex;
};
</script>

<style scoped>
.mySwiper {
  width: 100%;
  height: 550px;
}

.center-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}
</style>
