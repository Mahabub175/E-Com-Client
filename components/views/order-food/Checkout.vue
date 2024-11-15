<template>
  <div
    class="items-center bg-cover bg-center py-32 -mt-40"
    :style="{
      backgroundImage: `url(https://www.ansonika.com/foores/img/pattern_menu.jpg)`,
    }"
  >
    <div
      class="small-container mx-auto px-4 flex flex-col lg:flex-row gap-10 items-center -mt-10"
    >
      <div class="p-4">
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
        <div class="rounded-lg bg-white shadow-lg">
          <h2
            class="text-xl font-medium text-white text-center bg-primary py-6 mb-6 rounded-t-lg"
          >
            Método de Pago
          </h2>
          <form class="p-4">
            <div class="mb-4">
              <label class="font-medium">Card number</label>
              <input
                type="text"
                id="name"
                required
                placeholder="1234 1234 1234 1234"
                class="pl-4 py-3 border border-primary/20 w-full focus:outline-none mt-2"
              />
            </div>
            <div class="mb-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label class="font-medium">Expiration date</label>

                <input
                  type="text"
                  id="email"
                  required
                  placeholder="MM / YY"
                  class="pl-4 py-3 border border-primary/20 w-full focus:outline-none mt-2"
                />
              </div>
              <div>
                <label class="font-medium">Security code</label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="CVC"
                  class="pl-4 py-3 border border-primary/20 w-full focus:outline-none mt-2"
                />
              </div>
            </div>
            <div class="mb-4">
              <label class="font-medium">Country</label>

              <select
                v-model="selectedCountry"
                placeholder="Select a country"
                class="px-4 py-3 border border-primary/20 w-full focus:outline-none mt-2"
              >
                <option disabled value="">Select a country</option>
                <option
                  v-for="country in countries"
                  :key="country"
                  :value="country"
                >
                  {{ country }}
                </option>
              </select>
            </div>
          </form>
        </div>
      </div>

      <div class="border-2 border-grey rounded-lg border-dashed lg:w-1/3">
        <div class="mb-6">
          <p
            class="text-2xl font-semibold mb-4 text-center bg-grey py-6 border-b-2 border-dashed"
          >
            Resumen del Pedido
          </p>
        </div>
        <div class="bg-white shadow rounded-lg p-6 max-w-2xl mx-auto">
          <h3 class="text-xl font-medium mb-4">Order Summary</h3>
          <div
            v-for="(item, index) in orderDetails.cart"
            :key="index"
            class="mb-4"
          >
            <div class="flex items-center justify-between">
              <p>{{ item.title }} ({{ item.quantity }}x)</p>
              <p>${{ (item.basePrice * item.quantity).toFixed(2) }}</p>
            </div>
          </div>
          <div
            class="flex items-center justify-between text-lg font-medium mt-6"
          >
            <p>Subtotal</p>
            <p>${{ subtotal.toFixed(2) }}</p>
          </div>
          <div class="flex items-center justify-between text-lg font-medium">
            <p>Delivery Fee</p>
            <p>$10.00</p>
          </div>
          <div
            class="flex items-center justify-between text-lg font-medium text-red-500 mt-4"
          >
            <p>Total</p>
            <p>${{ (subtotal + 10).toFixed(2) }}</p>
          </div>

          <div class="mt-6">
            <p>
              <span class="font-medium">Fecha:</span>
              {{ orderDetails.date }}
            </p>
            <p>
              <span class="font-medium">Hora:</span>
              {{ orderDetails.time }}
            </p>
            <p>
              <span class="font-medium">Tipo:</span>
              {{ orderDetails.deliveryMethod }}
            </p>
            <p>
              <span class="font-medium">Notes:</span>
              {{ orderDetails.notes || "None" }}
            </p>
          </div>

          <div class="my-6 flex gap-4">
            <button @click="confirmPayment" class="btn btn-primary w-full">
              Ordenar Ahora
            </button>
          </div>
          <p class="text-center text-xs">O Llámanos al +1 787-123-4567</p>
        </div>

        <transition name="fade">
          <div
            v-if="isProcessing"
            class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          >
            <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h3 class="text-xl font-semibold text-center mb-4">
                Processing Payment...
              </h3>
              <p class="text-center">
                Please wait while we process your payment.
              </p>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface OrderDetails {
  cart: Array<{ title: string; quantity: number; basePrice: number }>;
  date: string;
  time: string;
  deliveryMethod: string;
  notes: string;
}

const props = defineProps<{
  orderDetails: OrderDetails;
}>();

const router = useRouter();

const isProcessing = ref(false);

const subtotal = computed(() => {
  return props.orderDetails.cart.reduce(
    (acc, item) => acc + item.basePrice * item.quantity,
    0
  );
});

const confirmPayment = () => {
  isProcessing.value = true;

  setTimeout(() => {
    isProcessing.value = false;
    alert("Payment successful! Thank you for your order.");
    router.push("/success");
  }, 3000);
};

const selectedCountry = ref<string>("Bangladesh");

const countries = [
  "Bangladesh",
  "United States",
  "Canada",
  "Mexico",
  "United Kingdom",
  "Germany",
  "France",
  "Australia",
  "India",
  "Japan",
  "China",
  "Brazil",
  "South Africa",
];
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
