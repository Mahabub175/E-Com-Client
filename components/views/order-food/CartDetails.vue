<template>
  <div
    class="border-2 border-grey rounded-lg border-dashed col-span-2 lg:col-span-1 lg:sticky lg:top-24"
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

      <div class="flex gap-20 mt-6 items-center border-y py-4">
        <label class="flex items-center gap-2">
          <input type="radio" v-model="deliveryMethod" value="Para llevar" />
          Para llevar
        </label>
        <label class="flex items-center gap-2">
          <input type="radio" v-model="deliveryMethod" value="Delivery" />
          Delivery
        </label>
      </div>

      <div
        @click="toggleCalendar"
        class="flex justify-between items-center border border-primary/20 p-2 cursor-pointer"
      >
        <p class="font-medium">Día</p>
        <IconsCalender />
      </div>
      <div v-if="showCalender" class="bg-grey/40 p-4 border border-grey -mt-3">
        <div class="flex justify-between items-center mb-2">
          <button @click="prevMonth" class="text-gray-500">Prev</button>
          <span class="text-lg font-semibold">
            {{ currentMonthName }} {{ currentYear }}
          </span>
          <button @click="nextMonth" class="text-gray-500">Next</button>
        </div>
        <div class="grid grid-cols-7 gap-1 text-center">
          <span class="text-sm" v-for="day in days" :key="day">{{ day }}</span>
          <div
            v-for="(day, index) in daysInMonth"
            :key="index"
            class="py-2 cursor-pointer rounded hover:bg-gray-200 border border-dashed"
            :class="{
              'bg-[#978667] text-white': isSelected(day),
              'text-gray-300 cursor-not-allowed': !isDateSelectable(day),
            }"
            @click="selectDate(day)"
          >
            {{ day }}
          </div>
        </div>
      </div>

      <div
        @click="toggleTimeSlots"
        class="flex justify-between items-center border border-primary/20 p-2 cursor-pointer -mt-3"
      >
        <p class="font-medium">Hora</p>
        <IconsClock />
      </div>

      <div v-if="showTimeSlots" class="bg-grey/40 p-4 border border-grey -mt-3">
        <label class="block text-lg font-medium">Select Time</label>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="time in timeSlots"
            :key="time"
            @click="selectTime(time)"
            :class="[
              'border hover:bg-gray-200 border-grey rounded p-2 flex-1 text-center',
              { 'bg-primary text-white': selectedTime === time },
            ]"
          >
            {{ time }}
          </button>
        </div>
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
      <button
        class="btn btn-primary w-full disabled:opacity-50"
        @click="proceedToCheckout"
        :disabled="cartData.length === 0"
      >
        Ordenar Ahora
      </button>
      <p class="text-xs text-center">No se cobrará dinero en este paso</p>
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
const today = new Date();
const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const showTimeSlots = ref(false);
const showCalender = ref(false);
const timeSlots = ["10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM"];
const currentMonth = ref(today.getMonth());
const currentYear = ref(today.getFullYear());
const selectedDate = ref<string>(cartStore?.date);
const deliveryMethod = ref("Para llevar");
const message = ref<string>("");

const router = useRouter();

const selectedTime = ref<string | null>(cartStore?.time);
const notes = ref<string>(cartStore?.notes);
const toggleCalendar = () => {
  showCalender.value = !showCalender.value;
};

const toggleTimeSlots = () => {
  showTimeSlots.value = !showTimeSlots.value;
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentMonthName = computed(() => {
  return monthNames[currentMonth.value];
});

const daysInMonth = computed(() => {
  const date = new Date(currentYear.value, currentMonth.value + 1, 0);
  return Array.from({ length: date.getDate() }, (_, i) => i + 1);
});

const isSelected = (day: number) => {
  const formattedDay = `${currentYear.value}-${String(
    currentMonth.value + 1
  ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  return selectedDate.value === formattedDay;
};
const prevMonth = () => {
  if (currentMonth.value > 0) currentMonth.value--;
  else {
    currentMonth.value = 11;
    currentYear.value--;
  }
};

const nextMonth = () => {
  if (currentMonth.value < 11) currentMonth.value++;
  else {
    currentMonth.value = 0;
    currentYear.value++;
  }
};

const selectTime = (time: string) => {
  selectedTime.value = time;
  // cartStore.setTimeToStore(time);
};

const selectDate = (day: number) => {
  if (isDateSelectable(day)) {
    selectedDate.value = `${currentYear.value}-${String(
      currentMonth.value + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }

  // cartStore.setDateToStore(selectedDate.value);
};

const isDateSelectable = (day: number) => {
  const date = new Date(currentYear.value, currentMonth.value, day);
  const diffDays = Math.floor(
    (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  return diffDays >= -1 && diffDays <= 29;
};

const proceedToCheckout = () => {
  if (!selectedDate.value) {
    message.value = "Please select a date.";
    // setTimeout((message.value = ""), 1000);
    return;
  } else if (!selectedTime.value) {
    message.value = "Please select a time.";
    // setTimeout((message.value = ""), 1000);
    return;
  }

  cartStore.addCartDetails(selectedDate.value, selectedTime.value, notes.value);

  if (router.currentRoute.value.name === "checkout") {
    router.push("/success");
    return;
  } else {
    router.push("/checkout");
  }
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

const subTotalData = computed(() => cartStore.getSubtotal);
const totalData = computed(() => cartStore.getCartTotal);
const taxData = computed(() => cartStore.getTaxRate);
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
