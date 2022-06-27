<template>
  <div
    class="w-screen h-screen flex items-center justify-center flex-col"
    :style="{ backgroundImage: gradient}"
  >
    <input
      v-model="playerName"
      class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl
              border-black border-solid border-b-2 bg-transparent
              text-black placeholder:text-gray-500"
      placeholder="Player Name"
    >
    <button
      :disabled="playerName.trim().length === 0"
      :style="{
        border: playerName.trim().length === 0 ? '1px #a63232 dashed' : 'inherit',
        color: playerName.trim().length === 0 ? '#555' : 'inherit',
      }"
      class="mt-6 px-4 py-2 rounded-lg text-xl
             border-2 border-solid border-gray-800 sm:border-0
             text-gray-800 sm:hover:bg-[rgba(255,255,255,0.25)]"
      @click="createPlayer"
    >
      Create Player
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import colours, { cssGradient } from '../colours';

const emit = defineEmits<{(e: 'create-player', player: {
    name: string;
    colourA: string;
    colourB: string;
  }): void;
}>();

// Pick random colour a and b for the gradient.
const randomColour = () => {
  const index = Math.floor(Math.random() * colours.length);
  return colours[index];
};

const a = randomColour();
const b = randomColour();

const gradient = cssGradient(
  a,
  b,
);

const playerName = ref('');

function createPlayer() {
  if (playerName.value.trim().length === 0) {
    return;
  }

  emit('create-player', {
    name: playerName.value,
    colourA: a,
    colourB: b,
  });
}
</script>

<style scoped>

</style>
