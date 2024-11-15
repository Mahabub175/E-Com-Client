<template>
  <div class="relative">
    <div class="hover:bg-transparent p-0">
      <IconsBag />
      <span
        class="absolute -bottom-2 -right-2 bg-black text-white rounded-full size-5 flex items-center justify-center"
      >
        {{ cartData?.length || 0 }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const cartStore = useCartStore();
const cartData = computed(() => cartStore.getCart || []);
</script>

<style scoped></style>
