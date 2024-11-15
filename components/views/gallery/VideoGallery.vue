<template>
  <div class="pt-10 pb-20 bg-grey">
    <div class="container mx-auto text-center">
      <div class="flex justify-center items-center mb-6">
        <span class="h-[2px] w-12 bg-white"></span>
        <span class="bg-primary h-[2px] w-20"></span>
        <span class="h-[2px] w-12 bg-white"></span>
      </div>
      <h2 class="text-3xl lg:text-4xl font-medium">Here some videos</h2>
      <p class="mb-10 text-xl">
        Cum doctus civibus efficiantur in imperdiet deterruisset.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="item in galleryData"
          :key="item.id"
          class="relative cursor-pointer"
          @click="openModal(item.id)"
        >
          <NuxtImg :src="item.image" :alt="item.title" class="w-full h-auto" />
          <div
            class="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300"
          ></div>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60"
        @click.self="closeModal"
      >
        <div class="relative max-w-4xl w-full">
          <button @click="closeModal" class="absolute top-2 right-2 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div class="flex justify-center">
            <iframe
              v-if="currentVideo"
              :src="currentVideo"
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen
              class="lg:w-[1000px] h-[400px] lg:h-[600px]"
            ></iframe>
            <img
              v-else
              :src="currentImage"
              :alt="currentTitle"
              class="max-w-full max-h-screen"
            />
          </div>
          <p class="text-white tex-lg mt-4 text-center">{{ currentTitle }}</p>
          <div
            class="absolute top-1/2 left-0 lg:-left-[20%] right-0 flex justify-between"
          >
            <button
              v-if="currentIndex > 0"
              @click="prevImage"
              class="text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="size-16 bg-black/50 p-2 rounded-full"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>
          <div
            class="absolute top-1/2 right-0 lg:-right-[20%] flex justify-between"
          >
            <button
              v-if="currentIndex < galleryData.length - 1"
              @click="nextImage"
              class="text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="size-16 bg-black/50 p-2 rounded-full"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
const galleryData = [
  {
    id: 1,
    image: "https://www.ansonika.com/foores/img/gallery/large/pic_1.jpg",
    video: "https://www.youtube.com/embed/eP1EvHzbcNM?si=xhKChhSqVuUk6yzb",
    title: "Title One",
  },
  {
    id: 2,
    image: "https://www.ansonika.com/foores/img/gallery/large/pic_2.jpg",
    video: "https://www.youtube.com/embed/eP1EvHzbcNM?si=xhKChhSqVuUk6yzb",
    title: "Title Two",
  },
  {
    id: 3,
    image: "https://www.ansonika.com/foores/img/gallery/large/pic_3.jpg",
    video: "https://www.youtube.com/embed/eP1EvHzbcNM?si=xhKChhSqVuUk6yzb",
    title: "Title Three",
  },
];

const isModalOpen = ref(false);
const currentIndex = ref(0);

const openModal = (id) => {
  currentIndex.value = galleryData.findIndex((item) => item.id === id);
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const currentImage = computed(() => galleryData[currentIndex.value].image);
const currentTitle = computed(() => galleryData[currentIndex.value].title);
const currentVideo = computed(() => galleryData[currentIndex.value].video);

const prevImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

const nextImage = () => {
  if (currentIndex.value < galleryData.length - 1) {
    currentIndex.value++;
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
