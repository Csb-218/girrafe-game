<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import CompareOrder from '@/views/CompareOrder.vue'

const showGame = ref<boolean>(false)
const countdown = ref<number>(4)
let countdownInterval: ReturnType<typeof setInterval> | null = null

watch(showGame, (newValue) => {
  if (newValue) {
    // Logic to handle when the game is shown
    console.log('Game is not visible');
  } else {
    // Logic to handle when the game is hidden
    console.log('Game is now hidden');
  }
}
, { immediate: true }
);

onMounted(() => {
  countdownInterval = setInterval(() => {
    if (countdown.value >= 1) {
      console.log(countdown.value)
      countdown.value--
    } else {
        showGame.value = true
    }
  }, 1000)
});

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
    countdownInterval = null
  }
})


</script>

<template>

<section v-if="showGame" class="h-full bg-[#F5FBFF]">
  <CompareOrder />
</section>

<section v-else class="bg-[#F5FBFF] p-2 h-full font-gabarito-bold text-6xl color-primary-text flex items-center justify-center">
  <Transition name="fade" mode="out-in">
    <p v-if="!(countdown<4)" key="ready">Ready</p>
    <p v-else-if="countdown===3" key="3">3</p>
    <p v-else-if="countdown===2" key="2">2</p>
    <p v-else-if="countdown===1" key="1">1</p>

  </Transition>
</section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
