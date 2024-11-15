<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 w-full py-[15px] bg-transparent main-header transition-transform ease duration-500 text-white"
  >
    <div class="container flex justify-between items-center">
      <div class="lg:hidden">
        <div @click="toggleMobileMenu" class="focus:outline-none">
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
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </div>
      </div>
      <NuxtLink href="/" class="flex items-center gap-2 header__logo">
        <IconsTreeIcon class="w-10" />
        <IconsLogoTitle class="w-20" />
      </NuxtLink>

      <div class="hidden lg:flex">
        <div class="flex items-center gap-[15px]">
          <NuxtLink
            v-for="menu in menus"
            :key="menu.path"
            :href="menu.path"
            class="px-[5px] font-normal hover:text-[#978667] duration-300"
          >
            {{ menu.name }}
          </NuxtLink>
        </div>
        <div class="ml-4 rotate-90 cursor-pointer" @click="toggleSearchModal">
          <IconsSearch />
        </div>
        <div class="ml-4 cursor-pointer">
          <SharedCartBag />
        </div>
      </div>
      <div class="flex items-center gap-4 lg:hidden">
        <div class="rotate-90 cursor-pointer" @click="toggleSearchModal">
          <IconsSearch />
        </div>
        <div class="cursor-pointer">
          <SharedCartBag />
        </div>
      </div>
    </div>

    <transition name="slide">
      <div
        v-if="showMobileMenu"
        class="fixed inset-0 bg-opacity-75 z-40"
        @click="toggleMobileMenu"
      >
        <div
          class="absolute inset-y-0 left-0 bg-white w-full h-screen shadow-lg transition-transform"
          :class="{
            'translate-x-0': showMobileMenu,
            'translate-x-[-100%]': !showMobileMenu,
          }"
          @click.stop
        >
          <div class="flex items-center justify-between bg-primary p-4">
            <NuxtImg
              src="/images/logos/la-ceiba-dark.svg"
              alt="logo"
              class="w-14"
            />
            <button
              @click="toggleMobileMenu"
              class="text-gray-200 hover:text-gray-100 text-2xl"
            >
              &times;
            </button>
          </div>
          <nav class="flex flex-col mt-8 px-5">
            <NuxtLink
              v-for="menu in menus"
              :key="menu.path"
              :href="menu.path"
              class="py-2 text-gray-800 hover:primary-text duration-300 text-xl"
              @click="toggleMobileMenu"
            >
              {{ menu.name }}
            </NuxtLink>
          </nav>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 flex justify-center bg-black bg-opacity-90 z-50 h-[120vh]"
        @click.self="toggleSearchModal"
      >
        <div
          class="rounded-lg p-6 lg:w-1/2 mt-[50px] lg:mt-[100px] text-2xl lg:text-4xl"
        >
          <input
            type="text"
            placeholder="Search..."
            class="w-full p-3 border-b border-gray-300 text-white focus:outline-none bg-transparent"
            v-model="search"
            @input="performSearch"
          />
          <template v-if="searchResults.length > 0">
            <NuxtLink
              v-for="result in searchResults"
              :key="result.name"
              :href="result.path"
              class="flex flex-col justify-center items-center"
            >
              <div class="text-white first:mt-6 text-3xl mt-4">
                {{ result.name }}
              </div>
            </NuxtLink>
          </template>
        </div>

        <div
          class="ml-4 rotate-90 cursor-pointer absolute top-8 right-10"
          @click="toggleSearchModal"
        >
          <IconsCancel />
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
const navigationStore = useNavigationStore();
const menus = computed(() => navigationStore.getMenus);
const showMobileMenu = ref(false);
const isModalOpen = ref(false);
const route = useRoute();
const search = ref();
const searchResults = ref([]);

const toggleSearchModal = () => {
  isModalOpen.value = !isModalOpen.value;
};

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};

const performSearch = () => {
  if (search.value === "") {
    searchResults.value = [];
  } else {
    const filteredMenus = menus.value.filter((menu) =>
      menu.name.toLowerCase().includes(search.value.toLowerCase())
    );

    searchResults.value = filteredMenus;
  }
};

const headerAnimation = () => {
  let lastScrollTop = 0;

  window.addEventListener("scroll", () => {
    const currentScrollTop = window.scrollY;
    const header = document.querySelector(".main-header");
    const headerLogo = document.querySelector(".header__logo");

    if (currentScrollTop <= 0) {
      header.classList.remove("show-bg");
    } else if (currentScrollTop === 0) {
      hideHeader();
    } else {
      showHeader();
    }
  });
};

const hideHeader = () => {
  const header = document.querySelector(".main-header");
  if (header) {
    header.style.transform = "translateY(-100%)";
  }
};

const showHeader = () => {
  const header = document.querySelector(".main-header");
  const headerLogo = document.querySelector(".header__logo");
  if (header) {
    header.classList.add("show-bg");
    // header.style.transform = "translateY(0)";
    // headerLogo.style.color = "#008934";
    // header.style.boxShadow =
    //   "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)";
  }
};

const onScroll = () => {
  if (route.path !== "/") return;
  const st = window.pageYOffset || document.documentElement.scrollTop;
};

onMounted(() => {
  window.addEventListener("scroll", onScroll);
  headerAnimation();
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter {
  transform: translateX(-100%);
}
.slide-enter-to {
  transform: translateX(0);
}
.slide-leave {
  transform: translateX(0);
}
.slide-leave-to {
  transform: translateX(-100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-leave {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}

.main-header {
  transition: all 0.3s ease-in-out;
}

.show-bg {
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  transform: translateY(0);
  color: black;
  background-color: #fff;
}

.show-bg .header__logo {
  color: #008934;
}
</style>
