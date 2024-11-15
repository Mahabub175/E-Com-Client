<template>
  <div
    class="bg-cover bg-center lg:pt-20 px-4"
    :style="{
      backgroundImage: `url(https://www.ansonika.com/foores/img/pattern_menu.jpg)`,
    }"
  >
    <div
      class="flex flex-col-reverse lg:flex-row mt-10 lg:mt-0 justify-center gap-20 items-center container mx-auto"
    >
      <div>
        <NuxtImg
          src="https://www.ansonika.com/foores/img/chef.png"
          class="lg:w-[440px] h-full"
        />
      </div>
      <div class="lg:w-1/2">
        <div class="flex items-center mb-2">
          <span class="bg-primary h-[2px] w-20"></span>
          <span class="h-[2px] w-20 bg-grey"></span>
        </div>
        <h2 class="text-3xl lg:text-4xl font-medium">Reserve a table</h2>
        <p class="mb-10 text-xl">or Call us at 0344 32423453</p>
        <div class="bg-grey p-5 rounded-lg">
          <div v-if="step === 1" class="flex flex-col">
            <h2 class="text-2xl mb-4">Select a Date</h2>
            <div class="mb-4 flex gap-4 lg:items-center">
              <select v-model="currentMonth" @change="updateCalendar">
                <option
                  v-for="(month, index) in monthNames"
                  :key="index"
                  :value="index"
                >
                  {{ month }}
                </option>
              </select>
              <input
                type="number"
                v-model="currentYear"
                @change="updateCalendar"
                class="w-20 text-center"
              />
            </div>
            <div class="custom-calendar">
              <div class="calendar-grid">
                <div class="day-label" v-for="day in dayLabels" :key="day">
                  {{ day }}
                </div>
                <div
                  v-for="(date, index) in daysInMonth"
                  :key="index"
                  class="calendar-day"
                  :class="{
                    'selected-date': isSelectedDate(date),
                    today: isToday(date),
                  }"
                  @click="selectDate(date)"
                >
                  {{ date.getDate() }}
                </div>
              </div>
            </div>
            <div class="mt-4 flex justify-end">
              <button
                @click="goToNextStep"
                class="btn btn-primary"
                :disabled="!selectedDate"
              >
                Next
              </button>
            </div>
            <p v-if="!selectedDate && showError" class="text-red-500 mt-2">
              Please select a date to proceed.
            </p>
          </div>

          <div v-if="step === 2" class="flex flex-col">
            <h2 class="text-2xl mb-4">Select Time & Number of People</h2>
            <div class="mb-4 w-full">
              <h3 class="text-lg mb-2">Time Slots</h3>
              <div class="flex flex-wrap gap-2">
                <div
                  v-for="time in timeSlots"
                  :key="time"
                  @click="selectedTime = time"
                  :class="[
                    'px-4 py-2 rounded-lg cursor-pointer',
                    selectedTime === time
                      ? 'bg-primary text-white'
                      : 'bg-gray-100',
                  ]"
                >
                  {{ time }}
                </div>
              </div>
            </div>
            <div class="mb-4 w-full">
              <h3 class="text-lg mb-2">Number of People</h3>
              <div class="flex flex-wrap gap-2">
                <div
                  v-for="n in 10"
                  :key="n"
                  @click="peopleCount = n"
                  :class="[
                    'px-4 py-2 rounded-lg cursor-pointer',
                    peopleCount === n ? 'bg-primary text-white' : 'bg-gray-100',
                  ]"
                >
                  {{ n }}
                </div>
              </div>
            </div>
            <div class="flex justify-end mt-10 gap-4">
              <button @click="goToPreviousStep" class="btn btn-outlined">
                Previous
              </button>
              <button
                @click="goToNextStep"
                class="btn btn-primary"
                :disabled="!selectedTime || !peopleCount"
              >
                Next
              </button>
            </div>
            <p
              v-if="(!selectedTime || !peopleCount) && showError"
              class="text-red-500 mt-2"
            >
              Please select a time and specify the number of people.
            </p>
          </div>

          <div v-if="step === 3" class="flex flex-col items-center">
            <h2 class="text-2xl mb-4">Your Information</h2>
            <form @submit.prevent="submitReservation" class="w-full">
              <input
                v-model="userInfo.name"
                type="text"
                placeholder="Your Name"
                class="pl-4 py-3 border border-primary/20 w-full focus:outline-none"
                required
              />
              <div class="flex gap-4 my-4">
                <input
                  v-model="userInfo.phone"
                  type="text"
                  placeholder="Your Phone"
                  class="pl-4 py-3 border border-primary/20 w-full focus:outline-none"
                  required
                />
                <input
                  v-model="userInfo.email"
                  type="email"
                  placeholder="Your Email"
                  class="pl-4 py-3 border border-primary/20 w-full focus:outline-none"
                  required
                />
              </div>
              <textarea
                id="message"
                v-model="userInfo.message"
                required
                placeholder="Your Message"
                class="pl-4 py-3 border border-primary/20 w-full focus:outline-none"
                rows="4"
              ></textarea>
              <div class="flex justify-end gap-4 mt-10">
                <button @click="goToPreviousStep" class="btn btn-outlined">
                  Previous
                </button>
                <button type="submit" class="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const step = ref(1);
const selectedDate = ref<Date | null>(null);
const selectedTime = ref("");
const peopleCount = ref(1);
const showError = ref(false);

const timeSlots = [
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
];

const userInfo = ref({
  name: "",
  phone: "",
  email: "",
  message: "",
});

const today = new Date();
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
const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const currentYear = ref(today.getFullYear());
const currentMonth = ref(today.getMonth());
const daysInMonth = ref(getDaysInMonth(currentYear.value, currentMonth.value));

watch([currentYear, currentMonth], updateCalendar);

function getDaysInMonth(year: number, month: number) {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

function isSelectedDate(date: Date) {
  return (
    selectedDate.value &&
    date.toDateString() === selectedDate.value.toDateString()
  );
}

function isToday(date: Date) {
  return date.toDateString() === today.toDateString();
}

function selectDate(date: Date) {
  selectedDate.value = date;
}

function updateCalendar() {
  daysInMonth.value = getDaysInMonth(currentYear.value, currentMonth.value);
}

const goToNextStep = () => {
  if (step.value === 1 && !selectedDate.value) {
    showError.value = true;
    return;
  }
  if (step.value === 2 && (!selectedTime.value || !peopleCount.value)) {
    showError.value = true;
    return;
  }
  showError.value = false;
  step.value++;
};

const goToPreviousStep = () => {
  if (step.value > 1) step.value--;
};

const submitReservation = () => {
  alert(
    `Reservation for ${
      userInfo.value.name
    } on ${selectedDate.value?.toDateString()} at ${selectedTime.value} for ${
      peopleCount.value
    } people.`
  );
};
</script>

<style scoped>
.custom-calendar {
  background: white;
  border-radius: 8px;
  padding: 5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  border: 1px solid #ccc;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
}

@media (max-width: 640px) {
  .calendar-grid {
    grid-template-columns: repeat(7, 1fr);
  }
}

@media (max-width: 480px) {
  .calendar-grid {
    grid-template-columns: repeat(7, 1fr);
  }
  .custom-calendar {
    padding: 2rem;
  }
}

.day-label {
  text-align: center;
  font-weight: bold;
  padding: 0.5rem 0;
}

.calendar-day {
  text-align: center;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.calendar-day:hover {
  background-color: #e2e8f0;
}

.selected-date {
  background-color: #7d6e4d;
  color: white;
}

.today {
  border: 2px solid #7d6e4d;
}

.calendar-day:not(.selected-date):not(.today) {
  background-color: #f9f9f9;
}

.btn-primary:disabled {
  background-color: #bbb;
}
</style>
