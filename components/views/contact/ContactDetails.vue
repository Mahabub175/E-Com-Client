<template>
  <div class="py-20 bg-grey/40">
    <div class="small-container">
      <div class="grid gri1 lg:grid-cols-3 gap-10">
        <div
          class="bg-white rounded-lg p-10 text-center flex flex-col justify-center items-center gap-2"
        >
          <IconsPriceTag />
          <h3 class="text-2xl font-normal">Contacto</h3>
          <NuxtLink to="tel:+17871234567">+1 787-123-4567</NuxtLink>
          <NuxtLink to="mailto:info@laceibapr.com">info@laceibapr.com</NuxtLink>
          <p>- O use el formulario en línea -</p>
        </div>
        <div
          class="bg-white rounded-lg p-10 text-center flex flex-col justify-center items-center gap-2"
        >
          <IconsLocation />
          <h3 class="text-2xl font-normal">Dirección</h3>
          <nuxtLink
            href="https://www.google.com/maps/search/?api=1&query=1239+Avenida+F.D.+Roosevelt,+San+Juan,+00920,+Puerto+Rico"
            target="_blank"
          >
            <p>1239 Avenida F.D. Roosevelt</p>
            <p>San Juan, 00920, Puerto Rico</p>
          </nuxtLink>
          <p>- Obtener Direcciones -</p>
        </div>
        <div
          class="bg-white rounded-lg p-10 text-center flex flex-col justify-center items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-14 primary-text"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="6" x2="12" y2="12" />
            <line x1="12" y1="12" x2="18" y2="12" />
          </svg>
          <h3 class="text-2xl font-normal">Horario de Apertura</h3>
          <p>Lunes - Domingo:</p>
          <p>6am - 9pm</p>
          <p>- Abierto todos los días -</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
