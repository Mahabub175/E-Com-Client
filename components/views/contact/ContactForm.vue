<template>
  <section
    class="bg-center bg-no-repeat bg-cover"
    :style="{
      backgroundImage: `url(https://www.ansonika.com/foores/img/pattern_menu.jpg)`,
    }"
  >
    <div class="py-20 grid grid-cols-1 lg:grid-cols-3 small-container mx-auto">
      <div class="w-full p-4">
        <h2 class="text-xl font-medium mb-3">Envíanos un Mensaje</h2>
        <form v-if="!showSuccess" @submit.prevent="submitForm">
          <div class="mb-4">
            <input
              type="text"
              id="name"
              v-model="formData.name"
              required
              placeholder="Nombre"
              class="pl-4 py-3 border border-primary/20 w-full focus:outline-none focus:ring-[2.5px] focus:ring-gray-200 focus:rounded"
            />
            <div v-if="v$?.formData.name.$error">
              <p class="text-red-500 text-sm mt-3 max-w-[300px]">
                The field is required.
              </p>
            </div>
          </div>
          <div class="mb-4">
            <input
              type="email"
              id="email"
              v-model="formData.email"
              required
              placeholder="Correo Electrónico"
              class="pl-4 py-3 border border-primary/20 w-full focus:outline-none focus:ring-[2.5px] focus:ring-gray-200 focus:rounded"
            />
            <div v-if="v$?.formData.email.$error">
              <p class="text-red-500 text-sm mt-3 max-w-[300px]">
                The field is required.
              </p>
            </div>
          </div>
          <div class="mb-4">
            <textarea
              id="message"
              v-model="formData.message"
              required
              placeholder="Mensaje"
              class="pl-4 py-3 border border-primary/20 w-full focus:outline-none focus:ring-[2.5px] focus:ring-gray-200 focus:rounded"
              rows="4"
            ></textarea>
            <div v-if="v$?.formData.message.$error">
              <p class="text-red-500 text-sm mt-3 max-w-[300px]">
                The field is required.
              </p>
            </div>
          </div>
          <div class="mb-4">
            <input
              type="number"
              id="quiz"
              v-model="formData.quiz"
              required
              :placeholder="`¿Eres humano? ${number1} + ${number2} = `"
              class="pl-4 py-3 border border-primary/20 w-full focus:outline-none focus:ring-[2.5px] focus:ring-gray-200 focus:rounded"
            />
            <div v-if="v$?.formData.quiz.$error">
              <p class="text-red-500 text-sm mt-3 max-w-[300px]">
                El número de verificación que ingresaste es incorrecto.
              </p>
            </div>
          </div>
          <button
            type="submit"
            class="w-full btn btn-primary flex justify-center items-center"
          >
            <span v-if="!loading">Enviar</span>
            <div v-else class="flex items-center justify-between">
              <div></div>
              <span>Enviar</span>
              <div class="loader"></div>
            </div>
          </button>
        </form>
        <div
          v-if="showSuccess"
          class="flex flex-col justify-center items-center mt-6"
        >
          <IconsSuccess />
          <p class="font-medium mt-4 mb-1 text-xl">¡Gracias!</p>
          <p class="font-medium text-lg mb-4">¡Solicitud enviada con éxito!</p>
          <p>Te responderemos en breve.</p>
        </div>
      </div>

      <div class="w-full col-span-2 p-4 mt-6">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.1652519990156!2d-122.41941578468192!3d37.77492927975917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c8d2b7b79%3A0x3f3e8f06c42c3b09!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1615260992034!5m2!1sen!2sus"
          width="100%"
          height="380"
          class="rounded-lg"
          style="border: 0"
          allowfullscreen="true"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import emailjs from "@emailjs/browser";
const loading = ref(false);
const showSuccess = ref(false);
const number1 = ref(0);
const number2 = ref(0);
const formData = ref({
  name: "",
  email: "",
  message: "",
  quiz: "",
});
const generateRandomNumber = () => {
  number1.value = Math.floor(Math.random() * 10);
  number2.value = Math.floor(Math.random() * 10);
};

const rules = {
  formData: {
    name: { required },
    message: { required },
    quiz: {
      required,
      $expr: (value: number) => value === number1.value + number2.value,
    },
    email: { required, email },
  },
};
const v$ = useVuelidate(rules, { formData });
const submitForm = async () => {
  v$.value.formData.$touch();
  if (v$.value.formData.$error) {
    return;
  }
  try {
    loading.value = true;
    await emailjs.send(
      "laceiba_email_service",
      // 'contact_service',
      "laceiba-contact-template",
      // 'template_sv5pz78',
      formData.value,
      {
        publicKey: "rBnhrJvqJn0OPUZmA",
        // publicKey: 'Js29lGfa9uFr9RA1E',
      }
    );
    // router.push('/');
  } catch (error) {
  } finally {
    loading.value = false;
    showSuccess.value = true;
    formData.value = {
      name: "",
      email: "",
      message: "",
      quiz: "",
    };
    v$.value.$reset();
  }
};
onMounted(() => {
  generateRandomNumber();
});
</script>

<style scoped>
.loader {
  width: 20px;
  aspect-ratio: 1;
  display: grid;
  mask: conic-gradient(from 15deg, #0000, #000);
  -webkit-mask: conic-gradient(from 15deg, #0000, #000);
  animation: l26 1s infinite steps(12);
}

.loader,
.loader:before,
.loader:after {
  background: radial-gradient(closest-side at 50% 12.5%, #ffffff 96%, #0000) 50%
      0/20% 80% repeat-y,
    radial-gradient(closest-side at 12.5% 50%, #ffffff 96%, #0000) 0 50%/80% 20%
      repeat-x;
}

.loader:before,
.loader:after {
  content: "";
  grid-area: 1/1;
  transform: rotate(30deg);
}

.loader:after {
  transform: rotate(60deg);
}

@keyframes l26 {
  100% {
    transform: rotate(1turn);
  }
}
</style>
