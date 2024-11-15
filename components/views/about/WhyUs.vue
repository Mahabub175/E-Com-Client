<template>
  <div class="bg-[#f4f4f4] py-20">
    <div
      class="small-container flex flex-col-reverse lg:flex-row items-center justify-center gap-20"
    >
      <div class="flex flex-col lg:flex-row items-center gap-10 px-2 lg:px-0">
        <div>
          <div
            class="bg-white p-5 lg:py-10 rounded-lg shadow-lg mb-10 text-center lg:w-[320px] flex flex-row-reverse lg:flex-col items-center gap-5 lg:gap-0"
          >
            <NuxtImg
              src="https://laceibapr.com/img/how_1.svg"
              alt="about us"
              class="lg:mb-10 mx-auto"
            />
            <div class="text-start lg:text-center">
              <p class="text-lg lg:text-2xl font-medium mb-2">
                Para Todos los Gustos
              </p>
              <p class="text-xs lg:text-base text-textColor">
                Nuestro diverso menú satisface todos los gustos, asegurando una
                experiencia culinaria deliciosa para todos
              </p>
            </div>
          </div>
          <div
            class="bg-white p-5 lg:py-10 rounded-lg shadow-lg text-center lg:w-[320px] flex flex-row-reverse lg:flex-col items-center gap-5 lg:gap-0"
          >
            <NuxtImg
              src="https://laceibapr.com/img/how_2.svg"
              alt="about us"
              class="lg:mb-10 mx-auto"
            />
            <div class="text-start lg:text-center">
              <p class="text-lg lg:text-2xl font-medium mb-2">
                Ingredientes Frescos
              </p>
              <p class="text-xs lg:text-base text-textColor">
                Utilizamos solo los ingredientes más frescos para crear nuestros
                platos, manteniendo los más altos estándares de calidad.
              </p>
            </div>
          </div>
        </div>
        <div
          class="bg-white p-5 lg:py-10 rounded-lg shadow-lg mb-10 text-center lg:w-[320px] flex flex-row-reverse lg:flex-col items-center gap-5 lg:gap-0"
        >
          <NuxtImg
            src="https://laceibapr.com/img/how_3.svg"
            alt="about us"
            class="lg:mb-10 mx-auto"
          />
          <div class="text-start lg:text-center">
            <p class="text-lg lg:text-2xl font-medium mb-2">
              Chefs Experimentados
            </p>
            <p class="text-xs lg:text-base text-textColor">
              Nuestros chefs capacitados aportan años de experiencia y una
              pasión por la excelencia culinaria a cada plato que preparan.
            </p>
          </div>
        </div>
      </div>
      <div class="px-2">
        <div class="flex items-center mb-6">
          <span class="bg-primary h-[2px] w-20"></span>
          <span class="h-[2px] w-20 bg-grey"></span>
        </div>
        <h2 class="text-3xl lg:text-4xl font-medium text-textColor">
          Por Qué Elegir La Ceiba
        </h2>
        <p class="text-lg my-6 text-textColor">
          Descubre las mejores cocinas española y gallega con ingredientes
          frescos y recetas tradicionales.
        </p>
        <p class="text-base mb-6 text-textColor">
          En La Ceiba, priorizamos la calidad y la satisfacción del cliente,
          asegurándonos de que cada plato cumpla con nuestros altos estándares.
        </p>
        <NuxtLink to="/contact">
          <button class="btn btn-primary">Contáctanos Hoy</button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
