<template>
  <div>
    <SharedLoading v-if="loading" />
    <template v-else>
      <LayoutsTopBar />
      <slot />
      <LayoutsFooter />
    </template>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const loading = ref(true);
watch(
  () => route.path,
  () => {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  }
);

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 1000);
});
</script>

<style></style>
