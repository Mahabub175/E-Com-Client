<template>
  <div
    class="flex mt-10 lg:mt-0 justify-center items-center bg-cover bg-center py-10 lg:py-16 px-4"
    :style="{
      backgroundImage: `url(https://www.ansonika.com/foores/img/pattern_menu.jpg)`,
    }"
  >
    <div class="lg:w-5/12 text-center">
      <div class="flex justify-center items-center mb-6">
        <span class="h-[2px] w-12 bg-grey"></span>
        <span class="bg-primary h-[2px] w-20"></span>
        <span class="h-[2px] w-12 bg-grey"></span>
      </div>
      <h2 class="text-3xl lg:text-4xl font-medium">Nuestra Historia</h2>
      <p class="mb-10 text-xl text-textColor">
        Un legado de excelencia y dedicación
      </p>
      <p class="text-base mb-6 text-textColor">
        La Ceiba fue fundada por Manuel María Ceide Ríos, quien nació en Lugo,
        España, y emigró a Cuba a los 17 años. Después de establecer cuatro
        panaderías exitosas en Cuba, Manuel se trasladó a Puerto Rico en 1962.
        Comenzó trabajando como repartidor de pan en Martin Bakery y, poco
        después, compró la panadería y la renombró La Ceiba.
      </p>
      <p class="text-base mb-6 text-textColor">
        La dedicación de Manuel a la salud, la honestidad, el trabajo arduo y el
        respeto por todos sentó las bases para el éxito de La Ceiba. Durante el
        huracán María, nos aseguramos de que nadie se quedara sin comida, a
        pesar de las largas filas. Hoy, el 25% de las panaderías en San Juan
        fueron iniciadas por antiguos empleados de La Ceiba, un testimonio del
        impacto y la mentoría de Manuel.
      </p>
      <p class="text-base mb-6 text-textColor">
        Actualmente, el restaurante es dirigido por la familia de Manuel,
        quienes continúan su legado de excelencia y dedicación, manteniendo
        vivos los valores y la pasión que él inculcó desde el principio.
      </p>
      <NuxtImg
        src="https://laceibapr.com/img/signature.png"
        alt="about us"
        class="w-40 mx-auto"
      />
    </div>
  </div>
</template>

<script setup lang="ts"></script>
