<template>
  <div
    class="flex flex-col-reverse lg:flex-row justify-center gap-20 items-center bg-cover bg-center py-10 lg:py-20 lg:pt-32"
    :style="{
      backgroundImage: `url(https://www.ansonika.com/foores/img/pattern_menu.jpg)`,
    }"
  >
    <div class="relative hidden lg:block">
      <NuxtImg
        src="https://laceibapr.com/img/home_1.png"
        alt="about us"
        class="lg:w-[350px] h-[440px] mb-10"
      />
      <button
        class="absolute bottom-14 right-4 bg-white p-2 rounded-full shadow-lg hover:scale-105 duration-500 transition-transform"
        @click="openModal"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
          class="w-6 h-6 animate-pulse"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
    </div>

    <div class="w-[90%] lg:w-[530px]">
      <div class="flex items-center mb-6">
        <span class="bg-primary h-[2px] w-20"></span>
        <span class="h-[2px] w-20 bg-grey"></span>
      </div>
      <h2 class="text-3xl font-medium">Sobre Nosotros</h2>
      <p class="mb-10 text-base text-textColor">
        Desde 1962, creando delicias que cautivan.
      </p>
      <p class="text-base mb-6 text-textColor">
        Bienvenidos a La Ceiba Panadería y Repostería, donde cada día elaboramos
        nuestros famosos quesitos y auténticos sándwiches cubanos con
        ingredientes frescos y de la más alta calidad. Nuestra pasión por la
        repostería y la dedicación a nuestras raíces puertorriqueñas nos han
        hecho un nombre reconocido internacionalmente.
      </p>
      <p class="text-base mb-6 text-textColor">
        En La Ceiba, nos enorgullecemos de ofrecer una experiencia gastronómica
        única que combina tradición y sabor. Te invitamos a visitarnos y
        descubrir por qué somos una parte esencial de la cultura culinaria de
        Puerto Rico.
      </p>
      <NuxtImg
        src="https://laceibapr.com/img/signature.png"
        alt="about us"
        class="w-40"
      />
    </div>

    <Transition name="fade">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10"
        @click.self="closeModal"
      >
        <div class="rounded-lg relative">
          <button
            class="absolute -top-8 right-1 text-white text-2xl"
            @click="closeModal"
          >
            &times;
          </button>
          <iframe
            width="full"
            height="315"
            src="https://www.youtube.com/embed/DUaOHsSvtvk?si=cRk16sWpLmDjR5wB"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write;
            encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="lg:w-[1000px] lg:h-[600px]"
          ></iframe>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
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
