<script setup lang="ts">
import { computed, ref } from 'vue';
import CreatePlayer from './components/CreatePlayer.vue';
import questions from './testQuestions';
import QuestionCard from './components/Question.vue';

interface Player {
  name: string;
  colourA: string;
  colourB: string;
}

const playerA = ref<Player|null>(null);
const playerB = ref<Player|null>(null);

const bothAsked = ref(false);
const currentQuestion = ref(0);
const currentSet = ref(0);
const currentSetStartTime = ref(0);

function addPlayer(player: Player) {
  if (playerA.value === null) {
    playerA.value = player;
  } else {
    playerB.value = player;
    currentSetStartTime.value = Date.now();
  }
}

const currentQuestionText = computed(() => questions[currentSet.value][currentQuestion.value]);
const currentPlayerObject = computed(() => ((currentQuestion.value % 2 === 0) !== bothAsked.value ? playerA.value : playerB.value));

function nextQuestion() {
  if (bothAsked.value) {
    const currentSetLength = questions[currentSet.value].length;
    if (currentQuestion.value === currentSetLength - 1) {
      currentSetStartTime.value = Date.now();
      currentSet.value += 1;
      currentQuestion.value = 0;
    } else {
      currentQuestion.value += 1;
    }
    bothAsked.value = false;
  } else {
    bothAsked.value = true;
  }
}
</script>

<template>
  <!-- Just define two components and re-render between.
  It shouldn't have a crazy high performance overhead.
  and it means I can be lazy and not reset the components every time. -->
  <create-player
    v-if="playerA === null"
    @create-player="addPlayer"
  />
  <create-player
    v-else-if="playerB === null"
    @create-player="addPlayer"
  />
  <question-card
    v-else-if="currentSet < questions.length"
    :set-number="currentSet"
    :question-number="currentQuestion"
    :set-time="currentSetStartTime"
    :question="currentQuestionText"
    :person="currentPlayerObject.name"
    :colour-a="currentPlayerObject.colourA"
    :colour-b="currentPlayerObject.colourB"
    @next-question="nextQuestion"
  />
  <div v-else>
    Done
  </div>
</template>

<style>
</style>
