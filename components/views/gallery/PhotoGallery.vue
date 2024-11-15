<template>
  <div class="py-10 bg-grey/20">
    <div class="small-container text-center mt-10">
      <div class="flex justify-center items-center mb-6">
        <span class="h-[2px] w-12 bg-white"></span>
        <span class="bg-primary h-[2px] w-20"></span>
        <span class="h-[2px] w-12 bg-white"></span>
      </div>
      <h2 class="text-3xl lg:text-4xl font-medium">
        ¡Imágenes que te encantarán!
      </h2>
      <p class="mb-10 text-xl text-textColor">
        Descubre la belleza de nuestros platos típicos españoles, cubanos y
        puertorriqueños.
      </p>
      <div
        class="columns-1 md:columns-2 lg:grid grid-cols-3"
        v-if="galleryData && galleryData.length > 0"
      >
        <div
          v-for="item in galleryData"
          :key="item.id"
          class="relative cursor-pointer"
          @click="openModal(item.id)"
        >
          <NuxtImg :src="item.image" :alt="item.title" class="w-full h-auto" />
          <div
            class="absolute inset-1 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300 p-5 flex justify-center items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-white -rotate-[130deg]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 12h16m-8-8l8 8-8 8"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-white rotate-[47deg] mt-9 -ml-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 12h16m-8-8l8 8-8 8"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-10"
        @click.self="closeModal"
      >
        <div class="relative">
          <img
            :src="currentImage"
            :alt="currentTitle"
            class="max-w-full max-h-screen"
          />
          <p class="text-white tex-lg mt-4 text-center">{{ currentTitle }}</p>
          <div
            class="absolute top-[40%] lg:top-1/2 left-0 lg:-left-[15%] right-0 flex justify-between"
          >
            <button
              v-if="currentIndex > 0"
              @click="prevImage"
              class="text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="size-10 bg-black/50 p-2 rounded-full"
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
            class="absolute top-[40%] lg:top-1/2 right-0 lg:-right-[15%] flex justify-between"
          >
            <button
              v-if="currentIndex < galleryData.length - 1"
              @click="nextImage"
              class="text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="size-10 bg-black/50 p-2 rounded-full"
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
interface GalleryItem {
  id: number;
  image: string;
  title: string;
}

const photoGalleryStore = usePhotoGalleryStore();

const galleryData = computed<GalleryItem[]>(
  () => photoGalleryStore.getPhotoGalleries
);

const isModalOpen = ref(false);
const currentIndex = ref(0);

const openModal = (id: number) => {
  currentIndex.value = galleryData.value.findIndex(
    (item: GalleryItem) => item.id === id
  );
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const currentImage = computed(
  () => galleryData.value[currentIndex.value].image
);
const currentTitle = computed(
  () => galleryData.value[currentIndex.value].title
);

const prevImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

const nextImage = () => {
  if (currentIndex.value < galleryData.value.length - 1) {
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
