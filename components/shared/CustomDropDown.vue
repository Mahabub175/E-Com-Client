<script setup lang="ts">
import { Popover, PopoverContent } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
const cartStore = useCartStore();

const props = defineProps({
  menuData: {
    type: Object as () => any,
    default: () => {
      return {};
    },
  },
});

const selectedItemList = ref<any[]>([]);

// Handle checkbox selection manually
const handleSelection = (index: any) => {
  if (selectedItemList.value.includes(index)) {
    selectedItemList.value = selectedItemList.value.filter(
      (item) => item !== index
    );
  } else {
    selectedItemList.value.push(index);
  }
};

const handleAddToCart = (item: any) => {
  if (props.menuData.items?.allowRemoval) {
    if (selectedItemList.value.length > 0) {
      const removedItems: any[] = [];
      selectedItemList.value.forEach((item) => {
        removedItems.push(props.menuData.items.defaultIngredients[item]);
      });

      cartStore.addToCart({
        ...props.menuData.items,
        id: props.menuData.id,
        category: props.menuData.category,
        variants_id: props.menuData.items.id,
        customizations: {
          removed: removedItems,
        },
      });
    } else {
      cartStore.addToCart({
        ...props.menuData.items,
        id: props.menuData.id,
        variants_id: props.menuData.items.id,
        category: props.menuData.category,
      });
    }
  }

  if (props.menuData.items?.allowAddons) {
    if (selectedItemList.value.length > 0) {
      const addons: any[] = [];
      selectedItemList.value.forEach((item) => {
        addons.push(props.menuData.globalOptions.addons[item]);
      });

      cartStore.addToCart({
        ...props.menuData.items,
        id: props.menuData.id,
        variants_id: props.menuData.items.id,
        category: props.menuData.category,
        customizations: {
          addons,
        },
      });
    } else {
      cartStore.addToCart({
        ...props.menuData.items,
        id: props.menuData.id,
        variants_id: props.menuData.items.id,
        category: props.menuData.category,
      });
    }
  }

  if (props.menuData.items?.type === "sizes") {
    cartStore.addToCart({
      ...props.menuData.items,
      category: props.menuData.category,
      id: props.menuData.id,
      variants_id: props.menuData.items.id,
      customizations: {
        sizes: [item],
      },
    });
  }

  if (props.menuData.items?.type === "options") {
    cartStore.addToCart({
      ...props.menuData.items,
      category: props.menuData.category,
      id: props.menuData.id,
      variants_id: props.menuData.items.id,
      customizations: {
        options: [item],
      },
    });
  }

  selectedItemList.value = [];
};

const productQuantity = computed(() => {
  return cartStore.getProductsById(props.menuData.id);
});

const handleRemoveFromCart = (product: any) => {
  cartStore.removeFromCart({
    ...props.menuData.items,
    id: props.menuData.id,
    variants_id: props.menuData.items.id,
    category: props.menuData.category,
    customizations: {
      sizes: [product],
    },
  });
  // cartStore.removeFromCart(product);
};

const removerItems = ref<any[]>([]);

const handleRemove = (item: any) => {
  if (removerItems.value.includes(item)) {
    removerItems.value = removerItems.value.filter((i) => i !== item);
  } else {
    removerItems.value.push(item);
  }
};

const selectCheese = ref<any>(null);

const changeCheese = (e: any) => {
  selectCheese.value = e;
};
const selectedBread = ref<any>(null);

const changeBread = (e: any) => {
  selectedBread.value = e;
};

const handleAddToCartForCustomization = () => {
  const removalList = [];
  if (removerItems.value.length > 0) {
    for (let i = 0; i < removerItems.value.length; i++) {
      removalList.push(props.menuData.items.defaultIngredients[i]);
    }
  }
  const admonsList = [];
  if (selectedItemList.value.length > 0) {
    for (let i = 0; i < selectedItemList.value.length; i++) {
      admonsList.push(props.menuData.globalOptions.addons[i]);
    }
  }
  cartStore.addToCart({
    ...props.menuData.items,
    id: props.menuData.id,
    variants_id: props.menuData.items.id,
    category: props.menuData.category,
    customizations: {
      removed: removalList,
      addons: admonsList,
      cheese: selectCheese.value
        ? props.menuData.globalOptions.cheeseOptions[selectCheese.value]
        : null,
      bread: selectedBread.value
        ? props.menuData.globalOptions.breadOptions[selectedBread.value]
        : null,
    },
  });

  selectedItemList.value = [];
  removerItems.value = [];
  selectCheese.value = null;
  selectedBread.value = null;
};

// Function to handle open/close events
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <button class="text-primary text-right ml-auto">
        <IconsMenu />
      </button>
    </PopoverTrigger>
    <PopoverContent class="w-80">
      <p
        class="text-sm font-normal border-b border-[#ededed] pb-[10px] mb-[10px]"
      >
        Customize {{ menuData.category }}
      </p>
      <div
        class=""
        v-if="menuData.items?.allowRemoval && menuData.items?.allowAddons"
      >
        <p class="text-[13px] font-light text-[#978667] mb-2">
          Ingredientes a remover:
        </p>
        <div class="space-y-2">
          <div
            class="flex items-center space-x-2"
            v-for="(data, index) in menuData.items.defaultIngredients"
          >
            <Checkbox
              :id="`${data}${index}`"
              :checked="removerItems.includes(data)"
              @update:checked="handleRemove(data)"
              :value="data"
            />
            <label
              :for="`${data}${index}`"
              class="text-[13px] font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {{ data }}
            </label>
          </div>
        </div>
        <p class="text-[13px] font-light text-[#978667] mb-2 mt-4">
          Cambiar Queso suizo:
        </p>
        <div class="">
          <Select @update:modelValue="changeCheese($event)">
            <SelectTrigger>
              <SelectValue placeholder="No cambiar" />
            </SelectTrigger>
            <SelectContent>
              <template
                v-for="(data, index) in menuData.globalOptions.cheeseOptions"
                :key="index"
              >
                <SelectItem :value="index + ''">
                  {{ data.name }} (+${{ data.price.toFixed(2) }})
                </SelectItem>
              </template>
            </SelectContent>
          </Select>
        </div>
        <p class="text-[13px] font-light text-[#978667] mb-2 mt-4">
          Ingredientes adicionales:
        </p>
        <div class="space-y-2">
          <div
            class="flex items-center space-x-2"
            v-for="(data, index) in menuData.globalOptions.addons"
          >
            <Checkbox
              :id="data.name"
              :checked="selectedItemList.includes(index)"
              @update:checked="handleSelection(index)"
              :value="data.name"
            />
            <label
              :for="data.name"
              class="text-[13px] font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {{ data.name }} (+${{ data.price.toFixed(2) }})
            </label>
          </div>
        </div>
        <p class="text-[13px] font-light text-[#978667] mb-2 mt-4">
          Tipo de pan:
        </p>
        <div class="">
          <Select @update:modelValue="changeBread($event)">
            <SelectTrigger>
              <SelectValue placeholder="Pan de agua" />
            </SelectTrigger>
            <SelectContent>
              <template
                v-for="(data, index) in menuData.globalOptions.breadOptions"
                :key="index"
              >
                <SelectItem :value="index + ''">
                  {{ data.name }} (+${{ data.price.toFixed(2) }})
                </SelectItem>
              </template>
            </SelectContent>
          </Select>
        </div>

        <button
          @click="handleAddToCartForCustomization"
          class="bg-[#978667] text-white font-medium text-sm py-2 px-3 w-full rounded-[3px] mt-5"
        >
          Añadir al carrito
        </button>
      </div>
      <div class="" v-else-if="menuData.items?.allowRemoval">
        <p class="text-[13px] font-light text-[#978667] mb-2">
          Ingredients to remove:
        </p>
        <div class="">
          <div
            class="flex items-center space-x-2 mb-5"
            v-for="data in menuData.items.defaultIngredients"
          >
            <Checkbox
              :id="data"
              :checked="selectedItemList.includes(data)"
              @update:checked="handleSelection(data)"
              :value="data"
            />
            <label
              :for="data"
              class="text-[13px] font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {{ data }}
            </label>
          </div>
          <button
            @click="handleAddToCart"
            class="bg-[#978667] text-white font-medium text-sm py-2 px-3 w-full rounded-[3px]"
          >
            Add To Cart
          </button>
        </div>
      </div>
      <div class="" v-else-if="menuData.items?.allowAddons">
        <p class="text-[13px] font-light text-[#978667] mb-2">
          Additional Ingredients:
        </p>
        <div class="space-y-2 mb-5">
          <div
            class="flex items-center space-x-2"
            v-for="(data, index) in menuData?.globalOptions.addons"
          >
            <Checkbox
              :id="data.name"
              :checked="selectedItemList.includes(index)"
              @update:checked="handleSelection(index)"
            />
            <label
              :for="data.name"
              class="text-[13px] font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {{ data.name }} (+${{ data.price }})
            </label>
          </div>
        </div>
        <button
          @click="handleAddToCart"
          class="bg-[#978667] text-white font-medium text-sm py-2 px-3 w-full rounded-[3px]"
        >
          Add To Cart
        </button>
      </div>
      <div class="" v-else-if="menuData.items?.type === 'sizes'">
        <p class="text-[13px] font-light text-[#978667] mb-2">Select size</p>
        <div class="space-y-2 mb-5">
          <div
            class="flex items-center space-x-2 justify-between"
            v-for="(data, index) in menuData?.items.sizes"
          >
            <p class="text-[13px] font-light">
              {{ data.name }}
            </p>
            <div class="flex gap-4 items-center justify-end">
              <button
                v-if="productQuantity && productQuantity[index]?.quantity > 1"
                @click="handleRemoveFromCart(data)"
              >
                <IconsPrimaryMinus />
              </button>
              <button
                v-if="productQuantity && productQuantity[index]?.quantity == 1"
                @click="handleRemoveFromCart(data)"
              >
                <IconsTrashIcon />
              </button>
              <span
                v-if="productQuantity && productQuantity[index]?.quantity > 0"
              >
                {{ productQuantity[index].quantity }}
              </span>
              <button @click="handleAddToCart(data)">
                <IconsPrimaryPlus />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="" v-else-if="menuData.items?.type === 'options'">
        <p class="text-[13px] font-light text-[#978667] mb-2">
          Seleccionar opción
        </p>
        <div class="space-y-2 mb-5">
          <div
            class="flex items-center space-x-2 justify-between"
            v-for="(data, index) in menuData?.items.options"
          >
            <p class="text-[13px] font-light">
              {{ data.name }} (${{ data.price }})
            </p>
            <div class="flex gap-4 items-center justify-end">
              <button
                v-if="productQuantity && productQuantity[index]?.quantity > 1"
                @click="handleRemoveFromCart(data)"
              >
                <IconsPrimaryMinus />
              </button>
              <button
                v-if="productQuantity && productQuantity[index]?.quantity == 1"
                @click="handleRemoveFromCart(data)"
              >
                <IconsTrashIcon />
              </button>
              <span
                v-if="productQuantity && productQuantity[index]?.quantity > 0"
              >
                {{ productQuantity[index].quantity }}
              </span>
              <button
                class="text-primary border rounded-full p-1 border-primary"
                @click="handleAddToCart(data)"
              >
                <IconsPrimaryPlus />
              </button>
            </div>
          </div>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>
