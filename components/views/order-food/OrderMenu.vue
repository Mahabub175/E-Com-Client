<template>
  <div
    class="py-20 small-container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 items-start"
  >
    <div class="col-span-2">
      <Accordion
        type="single"
        class="w-full"
        collapsible
        :default-value="defaultValue"
      >
        <AccordionItem
          v-for="(item, index) in allMenus"
          :key="item.id"
          :value="'' + item.id"
          class="mb-5"
        >
          <AccordionTrigger
            class="group"
            :class="isAccordionOpen === index && 'bg-gray-100 py-3 '"
            @click="toggleAccordion(index)"
          >
            <div
              class="text-[26px] group font-medium cursor-pointer flex items-center justify-between text-[#978667] group-hover:!text-[#111111]"
            >
              <div class="flex gap-4 items-center">
                <p class="">
                  {{ item.category }}
                </p>
                <span
                  class="text-xs group-hover:text-[#111111] text-[#978667] border-2 font-medium group-hover:border-[#111111] border-[#978667] rounded-full px-1.5 flex"
                  v-if="
                    handleGetItemByCategory(item.category) &&
                    handleGetItemByCategory(item.category).length > 0
                  "
                >
                  {{ handleGetItemByCategory(item.category).length }}
                </span>
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent>
            <div class="mb-4 mt-3">
              <p class="mb-4 pl-3">{{ item.description }}</p>
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="bg-grey-100">
                    <th class="px-4 py-2 font-light">Item</th>
                    <th class="px-4 py-2 font-light">Precio</th>
                    <th class="px-4 py-2 font-light text-right">Ordenar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="menu in item.items"
                    :key="menu.title"
                    class="border-y odd:bg-black/5"
                  >
                    <td class="px-4 py-2 flex items-center gap-6">
                      <img
                        :src="item.imgPlaceholder"
                        alt="menu image"
                        class="h-16 w-16 object-cover rounded-full"
                        @click="
                          openSliderModal(item.imgPlaceholder, menu.title)
                        "
                      />
                      <div class="flex flex-col">
                        <span class="font-normal lg:text-[16px]">{{
                          menu.title
                        }}</span>
                        <span class="text-[13px] font-light">{{
                          menu.description
                        }}</span>
                      </div>
                    </td>
                    <td class="px-4 py-2 font-normal">${{ menu.basePrice }}</td>
                    <td class="px-4 py-2 text-right">
                      <div
                        class="flex gap-4 items-center justify-end"
                        v-if="menu.type == 'simple'"
                      >
                        <button
                          @click="handleRemoveFromCart(menu)"
                          v-if="quantityById(menu.id, menu.title) > 1"
                        >
                          <IconsPrimaryMinus />
                        </button>
                        <button
                          @click="handleRemoveFromCart(menu)"
                          v-if="quantityById(menu.id, menu.title) == 1"
                        >
                          <IconsTrashIcon />
                        </button>
                        <span v-if="quantityById(menu.id, menu.title) > 0">
                          {{ quantityById(menu.id, menu.title) }}
                        </span>
                        <button
                          @click="
                            handleAddToCart({
                              ...menu,
                              category: item.category,
                            })
                          "
                        >
                          <IconsPrimaryPlus />
                        </button>
                      </div>
                      <div class="flex" v-else>
                        <span
                          class="text-xs text-[#978667] border-2 font-medium border-[#978667] rounded-full px-1.5 flex"
                          v-if="
                            handleGetProductsById(item.id) &&
                            handleGetProductsById(item.id).length > 0 &&
                            handleGetProductsById(item.id)[0]?.variants_id ==
                              menu.id
                          "
                        >
                          {{ handleGetProductsById(item.id).length }}
                        </span>
                        <!-- <button class="text-primary text-right ml-auto">
                          <IconsMenu />
                        </button> -->
                        <SharedCustomDropDown
                          :menu-data="{
                            ...item,
                            items: menu,
                          }"
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>

    <transition name="fade">
      <div
        v-if="isSliderModalOpen"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-10"
        @click.self="closeSliderModal"
      >
        <div class="relative">
          <img
            :src="currentImage"
            :alt="currentTitle"
            class="max-w-full max-h-screen rounded-lg"
          />
          <div class="flex items-center justify-between text-white mt-2 px-4">
            <p class="text-white tex-lg">{{ currentTitle }}</p>
            <p>{{ currentIndex + 1 }} / {{ galleryData.length }}</p>
          </div>
          <div
            class="absolute top-[40%] lg:top-1/2 left-0 md:-left-[15%] right-0 flex justify-between"
          >
            <button
              v-if="currentIndex > 0"
              @click="prevImage"
              class="text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="size-10 bg-black/50 p-2 rounded-full"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>
          <div
            class="absolute top-[40%] lg:top-1/2 right-0 md:-right-[15%] flex justify-between"
          >
            <button
              v-if="currentIndex < galleryData.length - 1"
              @click="nextImage"
              class="text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="size-10 bg-black/50 p-2 rounded-full"
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
    </transition>

    <ViewsOrderFoodCartDetails />
  </div>
</template>

<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const cartStore = useCartStore();
const completeMenuStore = useCompleteMenuStore();
const allMenus = computed(() => completeMenuStore.getAllMenus);
const defaultValue = "1";

const isAccordionOpen = ref(-1);

const isSliderModalOpen = ref(false);
const currentImage = ref("");
const currentTitle = ref("");
const currentIndex = ref<any>(0);
const galleryData = ref<any>([]);

const openSliderModal = (image: string, title: string) => {
  currentImage.value = image;
  currentTitle.value = title;
  currentIndex.value = galleryData.value.findIndex(
    (item: any) => item.image === image
  );
  isSliderModalOpen.value = true;
};

const closeSliderModal = () => {
  isSliderModalOpen.value = false;
};

const prevImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    currentImage.value = galleryData.value[currentIndex.value].image;
    currentTitle.value = galleryData.value[currentIndex.value].title;
  }
};

const nextImage = () => {
  if (currentIndex.value < galleryData.value.length - 1) {
    currentIndex.value++;
    currentImage.value = galleryData.value[currentIndex.value].image;
    currentTitle.value = galleryData.value[currentIndex.value].title;
  }
};

watch(
  isAccordionOpen,
  (newTab) => {
    const selectedMenu = allMenus.value[newTab];
    galleryData.value = selectedMenu
      ? selectedMenu.items.map((item) => ({
          image: item.imgPlaceholder,
          title: item.title,
        }))
      : [];
  },
  { immediate: true }
);

const toggleAccordion = (index: number) => {
  isAccordionOpen.value = isAccordionOpen.value === index ? -1 : index;
};

const handleAddToCart = (item: any) => {
  cartStore.addToCart(item);
};

const quantityById = computed(() => (id: number, title: string) => {
  return cartStore.getQuantityById(id, title);
});

const handleRemoveFromCart = (product: any) => {
  cartStore.removeFromCart(product);
};

const handleGetItemByCategory = computed(() => (category: string) => {
  return cartStore.getItemByCategory(category);
});

const handleGetProductsById = (id: number) => {
  return cartStore.getProductsById(id);
};
</script>
