<template>
  <div
    class="pt-10 lg:py-20 bg-no-repeat bg-cover"
    :style="{
      backgroundImage: `url(https://www.ansonika.com/foores/img/pattern_menu.jpg)`,
    }"
  >
    <div
      class="hidden lg:flex lg:flex-wrap max-w-[80rem] mx-auto justify-center mt-10 gap-6"
    >
      <div
        v-for="menu in menus"
        :key="menu.id"
        class="cursor-pointer pb-2"
        @click="activeTab = menu.id"
      >
        <p
          :class="{
            'border-b-2 border-primary primary-text': activeTab === menu.id,
            'border-b-2 border-transparent': activeTab !== menu.id,
          }"
          class="text-center text-base uppercase hover:text-[#7d6e4d] duration-300"
        >
          {{ menu.category }}
        </p>
      </div>
    </div>

    <div class="lg:hidden">
      <div v-for="menu in menus" :key="menu.id" class="mb-2">
        <div
          class="cursor-pointer flex justify-between items-center py-3 px-4 bg-grey/30 rounded-lg"
          @click="toggleAccordion(menu.id)"
        >
          <p class="text-lg font-medium">{{ menu.category }}</p>
          <span>
            <span v-if="activeTab === menu?.id"> <IconsPlus /></span>
            <span v-else> <IconsMinus /></span>
          </span>
        </div>
        <transition
          @before-enter="beforeEnter"
          @enter="enter"
          @leave="leave"
          name="slide"
        >
          <div v-show="activeTab === menu.id" class="bg-grey/30 rounded-lg p-4">
            <div
              v-for="item in menu.items"
              :key="item.id"
              class="flex items-center gap-4 mb-6"
            >
              <div class="w-[80px] h-[80px] overflow-hidden rounded-full">
                <img
                  :src="item.imgPlaceholder"
                  alt="menu item"
                  class="w-full h-full object-cover hover:scale-110 transition-all duration-300 cursor-pointer"
                  @click="openModal(item?.imgPlaceholder as string, item.title)"
                />
              </div>
              <div class="flex-1 mt-6">
                <div class="flex items-center justify-between">
                  <h3
                    class="text-lg lg:text-[20px] font-medium lg:w-1/2 text-left"
                  >
                    {{ item.title }}
                  </h3>
                  <hr class="w-1/2 lg:w-12 border-dashed border-[#d5d5d5]" />
                  <p class="text-right">{{ formatPrice(item) }}</p>
                </div>
                <p
                  v-if="item.description"
                  class="text-[14px] font-normal mb-3 text-textColor font-lora italic"
                >
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <div
      class="lg:grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-5 mt-2 max-w-[80rem] px-5 mx-auto hidden bg-[#f9f9f9] p-10 border-t rounded-lg"
    >
      <div
        v-for="item in selectedMenuItems"
        :key="item.id"
        class="flex items-center gap-4 mb-6"
      >
        <div class="w-[80px] h-[80px] overflow-hidden rounded-full">
          <img
            :src="item.imgPlaceholder"
            alt="menu item"
            class="w-full h-full object-cover hover:scale-110 transition-all duration-300 cursor-pointer"
            @click="openModal(item.imgPlaceholder as string, item.title)"
          />
        </div>
        <div class="flex-1 mt-4">
          <div class="flex items-center justify-between">
            <h3 class="text-[20px] font-medium w-1/2 text-left">
              {{ item.title }}
            </h3>
            <hr class="w-64 border-dashed border-[#d5d5d5]" />
            <p class="text-right">{{ formatPrice(item) }}</p>
          </div>
          <p
            v-if="item.description"
            class="text-[14px] font-normal mb-3 text-textColor font-lora italic"
          >
            {{ item.description }}
          </p>
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
            class="max-w-full max-h-screen rounded-lg"
          />
          <div class="flex items-center justify-between text-white mt-2 px-4">
            <p class="text-white tex-lg">{{ currentTitle }}</p>
            <p>{{ currentIndex + 1 }} / {{ galleryData.length }}</p>
          </div>
          <div
            class="absolute top-[40%] lg:top-1/2 left-0 md:-left-[10%] lg:-left-[15%] right-0 flex justify-between"
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
            class="absolute top-[40%] lg:top-1/2 right-0 md:-right-[10%] lg:-right-[15%] flex justify-between"
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

    <div class="flex justify-center my-10">
      <button
        @click="downloadMenuPdf"
        class="px-6 py-1.5 text-black bg-transparent border-2 border-black rounded font-medium hover:text-[#7d6e4d] hover:border-[#7d6e4d] duration-500"
      >
        Descargar Menú
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const completeMenuStore = useCompleteMenuStore();
const menus = computed(() => completeMenuStore.getAllMenus);

const activeTab = ref(1);
const isModalOpen = ref(false);
const currentImage = ref("");
const currentTitle = ref("");
const currentIndex = ref(0);
const galleryData = ref([]);

const openModal = (image: string, title: string) => {
  currentImage.value = image;
  currentTitle.value = title;
  currentIndex.value = galleryData.value.findIndex(
    (item) => item.image === image
  );
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const prevImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    currentImage.value = galleryData.value[currentIndex.value].image;
    currentTitle.value = galleryData.value[currentIndex.value].title;
  }
};

const nextImage = () => {
  if (currentIndex.value < galleryData.value.length - 1) {
    currentIndex.value++;
    currentImage.value = galleryData.value[currentIndex.value].image;
    currentTitle.value = galleryData.value[currentIndex.value].title;
  }
};

watch(
  activeTab,
  (newTab) => {
    const selectedMenu = menus.value.find((menu) => menu.id === newTab);
    galleryData.value = selectedMenu
      ? selectedMenu.items.map((item) => ({
          image: item.imgPlaceholder,
          title: item.title,
        }))
      : [];
  },
  { immediate: true }
);

const selectedMenuItems = computed(() => {
  const selectedMenu = menus.value.find((menu) => menu.id === activeTab.value);
  return selectedMenu ? selectedMenu.items : [];
});

const globalOptions = computed(() => {
  const selectedMenu = menus.value.find((menu) => menu.id === activeTab.value);
  return selectedMenu ? selectedMenu.globalOptions : null;
});

const formatPrice = (item: any) => {
  if (item.type === "sizes" && item.sizes) {
    return `$${Math.min(...item.sizes.map((size: any) => size.price)).toFixed(
      2
    )}`;
  }
  return `$${item.basePrice.toFixed(2)}`;
};

const downloadMenuPdf = () => {
  generatePdf(menus.value);
};

const toggleAccordion = (id: number) => {
  activeTab.value = activeTab.value === id ? -1 : id;
};

const beforeEnter = (el) => {
  el.style.height = "0";
  el.style.opacity = "0";
};

const enter = (el) => {
  const height = el.scrollHeight;
  el.style.height = height + "px";
  el.style.opacity = "1";
  el.style.transition = "height 0.3s ease-in-out, opacity 0.3s ease-in-out";
};

const leave = (el) => {
  el.style.height = el.scrollHeight + "px";
  el.style.opacity = "1";
  requestAnimationFrame(() => {
    el.style.height = "0";
    el.style.opacity = "0";
  });
  el.style.transition = "height 0.3s ease-in-out, opacity 0.3s ease-in-out";
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.size-10 {
  width: 40px;
  height: 40px;
}
.slide-enter-active,
.slide-leave-active {
  overflow: hidden;
}
</style>
