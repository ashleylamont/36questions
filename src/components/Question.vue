<template>
  <div
    class="w-screen h-screen flex items-center justify-center flex-col"
    :style="{ backgroundImage: gradient}"
  >
    <div class="fixed top-0 w-screen  flex items-center justify-center flex-col">
      <div class="mt-2 text-md">
        Set {{ setNumber + 1 }}, Question {{ questionNumber + 1 }}
      </div>
      <div class="mt-2 text-xl">
        {{ setTimeRemaining }}
      </div>
    </div>
    <div class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
      {{ question }}
    </div>
    <div class="font-bold text-md">
      {{ person }}
    </div>
    <button
      class="mt-6 px-4 py-2 rounded-lg
                   border-2 border-solid border-gray-800 sm:border-0
                   text-gray-800 sm:hover:bg-[rgba(255,255,255,0.25)]"
      @click="emit('next-question')"
    >
      Next Question
    </button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'QuestionCard',
};
</script>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { cssGradient } from '../colours';

const emit = defineEmits<{(e: 'next-question'): void;}>();

const props = defineProps<{
  setNumber: number;
  setTime: number;
  questionNumber: number;
  question: string;
  person: string;
  colourA: string;
  colourB: string;
}>();

const gradient = computed(() => cssGradient(
  props.colourA,
  props.colourB,
));

const setTimeRemaining = ref('15:00');

setInterval(() => {
  const setStartTime = new Date(props.setTime);
  const fifteenMinutesFromSetStart = new Date(setStartTime.getTime() + 15 * 60 * 1000);
  const now = new Date();
  const timeRemaining = fifteenMinutesFromSetStart.getTime() - now.getTime();
  const minutes = Math.floor(timeRemaining / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
  setTimeRemaining.value = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}, 1000);
</script>

<style scoped>
</style>
