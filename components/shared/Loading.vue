<template>
  <div
    class="loading-container items-center bg-cover bg-center py-32 flex justify-center h-screen bg-white"
  >
    <div class="loading-spinner"></div>
  </div>
</template>

<script></script>

<style scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-spinner {
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-top: 2px solid #7d6e4d;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
