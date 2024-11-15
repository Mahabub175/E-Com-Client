<template>
  <footer class="bg-[#262626] py-20 relative">
    <div
      class="absolute -top-[3px] left-0 w-full h-[3px]"
      style="
        background-image: url('https://laceibapr.com/img/frame_footer.png');
        background-repeat: repeat-x;
        background-size: auto 100%;
      "
    ></div>
    <div class="small-container text-white !pl-2">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div>
          <div class="flex items-start gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="hidden lg:block size-8"
            >
              <path
                d="M21 10.5C21 4.48 16.52 0 12 0S3 4.48 3 10.5c0 6 9 13.5 9 13.5s9-7.5 9-13.5z"
              />
              <circle cx="12" cy="10.5" r="3.5" />
            </svg>
            <NuxtLink
              href="https://www.google.com/maps/search/?api=1&query=1239+Avenida+F.D.+Roosevelt,+San+Juan,+00920,+Puerto+Rico"
              target="_blank"
              class="text-[#ffffff99]"
            >
              <p class="text-xl text-white">Dirección</p>
              <p class="mt-2 hover:text-white duration-500">
                1239 Avenida F.D. Roosevelt San Juan, 00920, Puerto Rico
              </p>
            </NuxtLink>
          </div>
        </div>
        <div>
          <div class="flex items-start gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="hidden lg:block size-6 mt-1"
            >
              <path
                d="M6 2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z"
              />
              <path d="M8 2v4h8V2" />
              <path d="M9 14h6" />
              <path d="M9 18h6" />
              <path d="M4 2h2v4H4z" />
            </svg>
            <div>
              <p class="text-xl mb-2">Contacto</p>
              <NuxtLink
                to="tel:+17871234567"
                class="text-[#ffffff99] hover:text-white duration-500"
              >
                +1 787-123-4567
              </NuxtLink>
              <NuxtLink
                to="mailto:info@laceibapr.com"
                class="text-[#ffffff99] hover:text-white duration-500"
              >
                info@laceibapr.com
              </NuxtLink>
            </div>
          </div>
        </div>
        <div>
          <div class="flex items-start gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="hidden lg:block size-6 mt-1"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="6" x2="12" y2="12" />
              <line x1="12" y1="12" x2="18" y2="12" />
            </svg>
            <div>
              <p class="text-xl">Horario de Apertura</p>
              <p class="mt-2 text-[#ffffff99]">Lunes - Domingo: 6am - 9pm</p>
            </div>
          </div>
        </div>
        <div>
          <div>
            <p class="text-xl">Mantente en contacto</p>
            <div class="mt-4 flex items-center">
              <input
                type="email"
                id="email"
                required
                placeholder="Tu correo electrónico"
                class="pl-4 py-3 w-full focus:outline-none bg-[#2d2f31]"
              />
              <button class="bg-primary px-4 py-3.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-4"
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
      </div>
      <hr class="mt-10 border-[#33373b]" />
      <div class="lg:flex justify-between mt-10">
        <p class="text-[#ffffff99]">
          © La Ceiba Panadería y Repostería - Todos los derechos reservados
        </p>
        <div class="flex gap-2 lg:gap-4 mt-4 lg:mt-0">
          <NuxtLink
            to="https://www.facebook.com/laceibapr"
            target="_blank"
            class="hover:-translate-y-1 duration-300"
          >
            <IconsFacebook />
          </NuxtLink>
          <NuxtLink
            to="https://www.instagram.com/laceibapr/"
            target="_blank"
            class="hover:-translate-y-1 duration-300"
          >
            <IconsInstagram />
          </NuxtLink>

          <NuxtLink
            to="https://www.tiktok.com/@laceibapr"
            target="_blank"
            class="hover:-translate-y-1 duration-300"
          >
            <IconsTiktok />
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>
