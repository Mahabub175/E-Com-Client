<template>
  <div
    class="border-2 border-grey rounded-lg border-dashed col-span-2 lg:col-span-1 lg:sticky lg:top-20 w-full lg:w-1/3"
  >
    <p
      class="text-2xl font-normal mb-4 text-center bg-grey py-6 border-b-2 border-dashed"
    >
      Resumen del Pedido
    </p>
    <div class="p-5 flex flex-col gap-4">
      <div class="flex items-center justify-between">
        <NuxtLink
          to="/menu"
          class="text-[#978667] flex items-center gap-2"
          :class="!isCheckoutPage ? 'invisible' : ''"
        >
          <IconsEditIcon />
          <p class="text-[13px] text-[#978667]">Edit</p>
        </NuxtLink>
        <button
          @click="handleClearCart"
          v-if="cartData && cartData.length > 0"
          class="text-[#978667] flex items-center gap-2 justify-end"
        >
          <IconsTrashIcon />
          <p class="text-[13px] text-[#978667]">Eliminate</p>
        </button>
      </div>

      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <p>Fecha</p>
          <p>{{ selectedDate }}</p>
        </div>
        <div class="flex items-center justify-between">
          <p>Hora</p>
          <p>{{ selectedTime }}</p>
        </div>
        <div class="flex items-center justify-between">
          <p>Tipo</p>
          <p>{{ deliveryMethod }}</p>
        </div>
      </div>

      <hr />

      <div v-for="(cartItem, index) in cartData" :key="index" class=" ">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <button
              @click="handleRemoveFromCart(cartItem)"
              v-if="cartItem?.quantity > 1"
            >
              <IconsPrimaryMinus />
            </button>
            <button
              @click="handleRemoveFromCart(cartItem)"
              v-if="cartItem?.quantity == 1"
              class="text-[#978667]"
            >
              <IconsTrashIcon />
            </button>
            <span class="text-sm">{{ cartItem?.quantity }}</span>
            <button @click="handleAddToCart(cartItem)">
              <IconsPrimaryPlus />
            </button>
            <p class="flex items-center gap-2 text-sm">
              {{ cartItem.title }} ({{ cartItem.quantity }}x)
            </p>
          </div>
          <p class="text-sm">${{ cartItem.basePrice }}</p>
        </div>
        <p class="text-[13px] text-[#978667] mt-2 font-light">
          {{ cartItem.description }}
        </p>
        <template v-if="cartItem.customizations">
          <template
            class=""
            v-for="(key, index) in Object.keys(cartItem.customizations)"
            :key="index"
          >
            <div
              class="flex gap-3 flex-wrap items-center mt-2"
              v-if="cartItem.customizations[key]?.length > 0"
            >
              <p class="text-[13px] text-[#978667] capitalize">{{ key }}:</p>
              <div class="">
                <span
                  class="text-[13px] text-[#978667]"
                  v-if="key !== 'removed'"
                >
                  {{
                    cartItem.customizations[key]
                      .map((item: any) => item.name)
                      .join(", ")
                  }}
                </span>
                <span
                  class="text-[13px] text-[#978667]"
                  v-if="key === 'removed'"
                >
                  {{
                    cartItem.customizations[key]
                      .map((item: any) => item)
                      .join(", ")
                  }}
                </span>
              </div>
            </div>
            <!-- {{ cartItem.customizations }} -->
            <div
              class="flex gap-3 flex-wrap items-center mt-2"
              v-if="
                (key === 'cheese' || key === 'bread') &&
                cartItem.customizations[key]
              "
            >
              <p class="text-[13px] text-[#978667] capitalize">{{ key }}:</p>
              <span class="text-[13px] text-[#978667]">
                {{ cartItem.customizations[key]?.name }}
              </span>
            </div>
          </template>
        </template>
      </div>

      <div class="mt-4">
        <textarea
          v-model="notes"
          class="border focus:outline-none p-2 w-full"
          rows="4"
          placeholder="Ingrese sus notas del pedido aquí"
        ></textarea>
      </div>
      <p class="text-[13px] font-medium text-[#e74747]" v-if="message">
        {{ message }}
      </p>
      <div class="flex items-center justify-between text-sm font-normal mt-6">
        <p>Subtotal</p>
        <p>${{ subTotalData.toFixed(2) }}</p>
      </div>
      <div class="flex items-center justify-between text-sm font-normal">
        <p>Taxes</p>
        <p>${{ taxData }}</p>
      </div>
      <div
        class="flex items-center justify-between text-lg font-normal text-red-500"
      >
        <p>Total</p>
        <p>${{ totalData.toFixed(2) }}</p>
      </div>
      <button
        class="btn btn-primary w-full disabled:opacity-50"
        @click="proceedToCheckout"
        :disabled="cartData.length === 0"
      >
        Ordenar Ahora
      </button>
      <p class="text-xs text-center">
        O Llámanos al
        <NuxtLink
          to="tel:+17871234567"
          class="primary-text hover:text-black font-semibold duration-500"
        >
          +1 787-123-4567
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { loadStripe } from "@stripe/stripe-js";

const config = useRuntimeConfig();
const stripePk = config.public.STRIPE_PUBLISHABLE_KEY;

const route = useRoute();
const catId = () => `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`; // Get the cat ID from the URL
const isProcessing = ref(false);
let stripe;
let elements;
let paymentElement;
let clientSecret;
interface MenuItem {
  title: string;
  description: string;
  basePrice: number;
  sizes?: { size: string; price: number }[];
  type?: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const props = defineProps({
  isCheckoutPage: {
    type: Boolean,
    default: false,
  },
});
const cartStore = useCartStore();
const cart = ref<CartItem[]>([]);
const selectedDate = ref<string>(cartStore?.date);
const deliveryMethod = ref("Para llevar");

const router = useRouter();

const selectedTime = ref<string | null>(cartStore?.time);
const notes = ref<string>(cartStore?.notes);

const proceedToCheckout = () => {
  router.push("/success");
};

const cartData = computed(() => cartStore.getCart || []);

const handleAddToCart = (item: any) => {
  cartStore.addToCart(item);
};

const handleRemoveFromCart = (product: any) => {
  cartStore.removeFromCart(product);
};

const handleClearCart = () => {
  cartStore.clearCart();
};

const appearance = {
  theme: "stripe",
  variables: {
    colorPrimary: "#978667",
    colorBackground: "#ffffff",
    colorText: "#444",
    colorDanger: "#e74747",
    fontSizeBase: "14px",
    fontFamily: "Poppins, Helvetica, sans-serif",
    spacingUnit: "4px",
    borderRadius: "3px",
    gridColumnSpacing: "24px",
    gridRowSpacing: "16px",
  },
  rules: {
    ".Label": {
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: 1.7,
    },
    ".Input": {
      color: "#212529",
      boxShadow: "none",
      borderRadius: "3px",
      border: "1px solid #d2d8dd",
    },
    ".Error": {},
  },
};
const fonts = [
  {
    cssSrc:
      "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap",
  },
];

const subTotalData = computed(() => cartStore.getSubtotal);
const totalData = computed(() => cartStore.getCartTotal);
const taxData = computed(() => cartStore.getTaxRate);

const initializeStripe = async () => {
  stripe = await loadStripe(
    "pk_test_51N5WcSDOcQTPK206mkopzILFGWOzJWMUb3CPVHiWoZGJJW2rWcFg6YLsFpPPWPi49PctAgAqxhfbrhY01odolJZa00LRXPfcVR"
  );

  // Create a payment intent on your server
  const res = await fetch("/api/stripe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: cartData.value,
      paymentIntentId: catId, // Fixed amount in cents
    }),
  });
  const result = await res.json();
  clientSecret = result.client_secret;
  elements = stripe.elements({ clientSecret, appearance, fonts });

  // Create and mount the Payment Element
  paymentElement = elements.create("payment");
  paymentElement.mount("#payment-element");

  isProcessing.value = false;
};

onMounted(() => {
  if (props.isCheckoutPage) {
    initializeStripe();
  }
});
</script>
<style scoped>
input[type="radio"]:checked {
  accent-color: #7d6e4d;
}

input[type="radio"]:checked + label {
  color: #7d6e4d;
}

.primary-text {
  color: #7d6e4d;
}
</style>
