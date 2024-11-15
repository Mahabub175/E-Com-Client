<template>
  <div
    class="items-center bg-cover bg-center py-32"
    :style="{
      backgroundImage: `url(https://www.ansonika.com/foores/img/pattern_menu.jpg)`,
    }"
  >
    <div class="small-container flex flex-col lg:flex-row items-center">
      <div class="w-full lg:w-1/2 mx-auto">
        <div class="rounded-lg bg-white shadow-lg mb-10">
          <h2
            class="text-xl font-medium text-white text-center bg-primary py-6 mb-6 rounded-t-lg"
          >
            Envíanos un Mensaje
          </h2>
          <form class="p-4">
            <div class="mb-4">
              <label class="font-medium">Nombre y Apellido</label>
              <input
                type="text"
                id="name"
                required
                placeholder="Nombre y Apellido"
                class="pl-4 py-3 border border-primary/20 w-full focus:outline-none mt-2"
              />
            </div>
            <div class="mb-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label class="font-medium">Correo Electrónico</label>

                <input
                  type="text"
                  id="email"
                  required
                  placeholder="Correo Electrónico"
                  class="pl-4 py-3 border border-primary/20 w-full focus:outline-none mt-2"
                />
              </div>
              <div>
                <label class="font-medium">Teléfono</label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="Teléfono"
                  class="pl-4 py-3 border border-primary/20 w-full focus:outline-none mt-2"
                />
              </div>
            </div>
            <div class="mb-4">
              <label class="font-medium">Dirección Completa</label>

              <input
                type="text"
                id="email"
                required
                placeholder="Dirección Completa"
                class="pl-4 py-3 border border-primary/20 w-full focus:outline-none mt-2"
              />
            </div>
            <div class="mb-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label class="font-medium">Ciudad</label>

                <input
                  type="text"
                  id="email"
                  required
                  placeholder="Ciudad"
                  class="pl-4 py-3 border border-primary/20 w-full focus:outline-none mt-2"
                />
              </div>
              <div>
                <label class="font-medium">Código Postal</label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="0123"
                  class="pl-4 py-3 border border-primary/20 w-full focus:outline-none mt-2"
                />
              </div>
            </div>
          </form>
        </div>
        <div class="rounded-lg bg-white shadow-lg mb-10">
          <h2
            class="text-xl font-medium text-white text-center bg-primary py-6 mb-6 rounded-t-lg"
          >
            Envíanos un Mensaje
          </h2>
          <div class="p-5">
            <p
              id="payment-error"
              role="alert"
              class="text-red-700 text-center font-semibold"
            ></p>
            <div id="payment-element"></div>
          </div>
        </div>
      </div>

      <ViewsCheckoutOrderDetails :is-checkout-page="true" />
    </div>
  </div>
</template>

<script>
// Accessing environment variables
</script>

<style scoped></style>
