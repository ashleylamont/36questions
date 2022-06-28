<template>
  <div class="h-screen w-screen flex flex-col justify-center items-center">
    <div
      v-if="!timerDone"
      class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
    >
      {{ timerText }}
    </div>
    <div
      v-if="!timerDone"
      class="text-xl sm:text-2xl md:text-3xl lg:text-4xl"
    >
      Stare into each-other's eyes
    </div>
    <div
      v-if="timerDone"
      class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
    >
      Done.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const timerEndTime = Date.now() + (4 * 60 + 10) * 1000;
const timerText = ref('4:10');
const timerDone = ref(false);

setInterval(() => {
  const now = Date.now();
  const timeRemaining = timerEndTime - now;
  if (timeRemaining <= 0) {
    timerDone.value = true;
  }
  const minutes = Math.floor(timeRemaining / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
  timerText.value = `${minutes.toString().padStart(1, '0')}:${seconds.toString().padStart(2, '0')}`;
}, 1000);
</script>

<style scoped>

</style>
