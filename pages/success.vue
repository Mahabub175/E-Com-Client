<template>
  <div
    class="items-center bg-cover bg-center py-32 flex justify-center h-screen"
    :style="{
      backgroundImage: `url(https://www.ansonika.com/foores/img/pattern_menu.jpg)`,
    }"
  >
    <div class="rounded-lg bg-white shadow-lg mb-10">
      <div
        class="text-3xl font-medium text-white text-center bg-[#978667] p-6 mb-6 rounded-t-lg"
      >
        <p class="mb-2">La Ceiba</p>
        <p class="text-base">
          1239 Avenida F.D. Roosevelt -
          <NuxtLink
            href="https://www.google.com/maps/place/1239+Avenida+F.D.+Roosevelt,+San+Juan,+00920,+Puerto+Rico/@18.4139392,-66.0877852,17z/data=!3m1!4b1!4m6!3m5!1s0x8c0368e49f085649:0x5ff0c6cc9f1f8ea9!8m2!3d18.4139392!4d-66.0877852!16s%2Fg%2F11b8_qw5_q?entry=ttu&g_ep=EgoyMDI0MTAyMi4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            class="underline"
            >Obtener Direcciones</NuxtLink
          >
        </p>
      </div>
      <div
        class="text-center px-10 py-20 flex justify-center items-center flex-col font-light"
      >
        <IconsSuccess />

        <h2 class="text-4xl font-medium mt-6 mb-4">¡Pedido Confirmado!</h2>
        <div class="text-center flex flex-col gap-6">
          <p>Su pedido ha sido confirmado con éxito.</p>
          <p>
            Recibirá un correo electrónico con la <br />
            información detallada de su pedido.
          </p>
          <p>
            Si tiene alguna pregunta o inquietud, no dude <br />
            en contactarnos.
          </p>
          <NuxtLink href="/">
            <button class="btn btn-primary">Volver al Inicio</button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script></script>

<style scoped></style>
