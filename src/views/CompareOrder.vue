<script setup lang="ts">
import { onMounted, onUnmounted, onBeforeMount, ref, useTemplateRef, computed, watch } from 'vue'
import gsap from 'gsap'
import { Draggable } from "gsap/Draggable";
// import { useEventListener } from '@vueuse/core';
import { createSwapy, type Swapy } from 'swapy';
import { useGiraffeStore } from "@/stores/giraffes"
import { storeToRefs } from 'pinia'
import { useEventListener } from '@vueuse/core';
// Assets
import mascot from '@/assets/ripples.png'
import IconPause from '@/assets/pauseButton.png'
import IconOptionsThreeDots from '@/assets/optionsButton.png'
import giraffe_long from "@/components/icons/IconGiraffeBig.vue"
import giraffe_medium from "@/components/icons/IconGiraffeMedium.vue"
import giraffe_short from "@/components/icons/IconGiraffeShort.vue"
import AnswerButton from '@/components/miscellaneous/AnswerButton.vue';

gsap.registerPlugin(Draggable);

const show = ref(false)
const showInstruction = ref(false)
// const answersContainer = ref<HTMLElement | null>(null)

// Destructure the actions and state from the store
const { generateAnswers, rearrange } = useGiraffeStore()
const { isSortedAscending, answers } = storeToRefs(useGiraffeStore())

const swapy = ref<Swapy | null>(null)
const answersContainer = useTemplateRef('answersContainer')
// const giraffeComponents = computed(() => {
//   return answers.value.map(answer => answer.giraffe);
// });

const shortRef = useTemplateRef('shortRef')
const AnswerButton1 = useTemplateRef<HTMLDivElement>('AnswerButton1')

const button1X = ref(0)
const isDragging = ref(false)

const startX = ref(0) // To store the initial X position

const startTracking = (event: PointerEvent) => {
  isDragging.value = true
  startX.value = event.clientX // Capture the initial X position
}

const trackPosition = (event: PointerEvent) => {
  if (isDragging.value && AnswerButton1.value) {
    // Calculate the new X position based on the initial position and mouse movement
    const currentX = event.clientX - startX.value
    button1X.value = currentX // Update the button1X ref
    console.log('Button 1 X:', button1X.value)
  }
}

const stopTracking = () => {
  isDragging.value = false
}

// watch(() => button1X.value, (newX) => {
//   if (AnswerButton1.value) {
//     // Update the position of AnswerButton1 based on the new X value
//     if (shortRef.value && shortRef.value.$el) {
//       shortRef.value.$el.style.transform = `translateX(${newX}px)`;
//     }
//   }
// console.log(shortRef.value?.$el.style,AnswerButton1.value)
// })

watch(() => button1X.value, (newX) => {
  console.log('Button 1 X new:', newX)
  if (shortRef.value) { // Check if shortRef is available
    console.log('shortRef is available:', shortRef.value.$el)
    if (AnswerButton1.value) { // Check if AnswerButton1 is available
      // Get AnswerButton1's width
      const buttonWidth = 320
      // AnswerButton1.value.offsetWidth;

      // Calculate the boundaries
      const minX = 0;
      const maxX = buttonWidth - shortRef.value.$el.offsetWidth;

      // Clamp the newX value
      const clampedX = Math.max(minX, Math.min(maxX, newX));

      // Update the position of shortRef
      shortRef.value.$el.style.transform = `translateX(${clampedX}px)`;

    } else {
      console.warn('AnswerButton1 is not yet available.');
    }
  } else {
    console.warn('shortRef is not yet available.');
  }
});



function onBeforeEnterHeader(el: Element) {
  gsap.set(el, {
    opacity: 0,
    y: 0
  })
}

function onBeforeEnter(el: Element) {
  gsap.set(el, {
    opacity: 0,
    y: 311
  })
}

function onEnterHeader(el: Element, done: () => void) {
  const tl = gsap.timeline({
    onComplete: done
  })

  tl.to(el, {
    opacity: 1,
    y: 0,
    duration: 1.0,
    ease: 'circ.in(0.7)'
  })

}

function onEnter(el: Element, done: () => void) {
  const tl = gsap.timeline({
    onComplete: done
  })

  tl.to(el, {
    opacity: 1,
    y: 311,
    duration: 1.0,
    ease: 'back.out(0.7)'
  })

}

function onAfterEnter(el: Element) {
  // Animation completed
  console.log('Animation completed')
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    ease: 'back.out(0.7)'
  })
}


onBeforeMount(() => {
  const answers = [
    { id: 1, value: '1', giraffe: giraffe_short, message: "I'm the shortest", order: 0, x: 0 },
    { id: 3, value: '4', giraffe: giraffe_long, message: "I'm the tallest", order: 1, x: 150 },
    { id: 2, value: '2', giraffe: giraffe_medium, message: "I'm taller than 1", order: 2, x: 250 }
  ]
  generateAnswers(answers)
  console.log('Initial answers generated:', answers)
})

onMounted(() => {
  // Show content after initial delay
  showInstruction.value = true
  setTimeout(() => {
    show.value = true
  }, 1500)

})

onMounted(() => {
  if (answersContainer.value) {

    swapy.value = createSwapy(answersContainer.value, {
      dragAxis: 'x', // This locks movement to x-axis only
      swapMode: 'drop',
      animation: 'dynamic',
      // manualSwap: true,
    })

    swapy.value.onBeforeSwap((event) => {
      console.log('beforeSwap', event)
      // This is for dynamically enabling and disabling swapping.
      // Return true to allow swapping, and return false to prevent swapping.
      return true
    })



    swapy.value.onSwapStart(event => {
      console.log('start', event)
    })

    swapy.value.onSwap(event => {
      console.log('swap', event)
    })

    swapy.value.onSwapEnd(event => {
      console.log('end', event.slotItemMap.asArray)
      rearrange(event.slotItemMap.asArray)
    })

  }
})

onUnmounted(() => {
  swapy.value?.destroy()

})


useEventListener(AnswerButton1,'pointerdown', startTracking)
useEventListener(AnswerButton1,'pointermove', trackPosition)
useEventListener(AnswerButton1,'pointerup', stopTracking)
useEventListener(AnswerButton1,'pointerleave', stopTracking)

</script>

<template>

  <header class="flex items-center justify-between gap-x-5 min-h-10 p-1">
    <!-- mascot -->
    <Transition @enter="onEnterHeader" @before-enter="onBeforeEnterHeader" :css="false">

      <img v-if="show" :src="mascot" alt="Ripples" />
    </Transition>

    <!-- Controls -->
    <Transition @enter="onEnterHeader" @before-enter="onBeforeEnterHeader" :css="false">
      <span v-if="show" class="flex items-center gap-x-3">
        <img :src="IconPause" class="aspect-square min-h-5" alt="pause" />
        <img :src="IconOptionsThreeDots" class="aspect-square min-h-5" alt="options" />
      </span>
    </Transition>

  </header>
  <main class=" h-11/12 flex flex-col">
    <!-- Instruction -->
    <Transition @before-enter="onBeforeEnter" @enter="onEnter" @after-enter="onAfterEnter" :css="false">
      <p v-if="showInstruction" class="text-lg text-center font-gabarito-bold color-primary-text ">Order the giraffes
        based on their Height
      </p>
    </Transition>

    <!-- Game Area -->
    <section aria-label="Game Area" class="game_area flex flex-col items-center justify-end w-full h-full bg-pink-20">


      <!-- giraffe area -->
      <div class="flex items-end  w-full h-48 gap-x-3">
        <!-- <component
          v-for="(answer, index) in answers"
          :key="answer.id"
          :is="giraffeComponents[index]"
          :ref="el => giraffeRefs[index] = el"
        /> -->

        <giraffe_short ref="shortRef" aria-label="giraffe_short" />


      </div>



      <!-- grass -->
      <div class="grass text-center ">
        <!-- grass border -->
        <div class="grass-deep"></div>

        <div aria-label="answer-box" class="p-5 bg-[#83CA54] h-full flex flex-col justify-between">
          <!-- Answers Container -->
          <div ref="answersContainer" class=" flex items-end justify-between gap-x-3 bg-sky-30">

            <!-- <div
              v-for="answer in answers"
              :key="answer.id"
              :data-swapy-slot="answer.value"
              class="flex flex-col bg-amber-30 h-full w-full "
            > -->
            <!-- answer option -->
            <!-- <AnswerButton :answer="answer" :data-swapy-item="answer.value"  /> -->
            <!-- </div> -->
            <!-- </div> -->

            <div :data-swapy-slot="answers[0].value" class="flex flex-col bg-amber-30 h-full w-full ">
              <!-- answer option -->
              <AnswerButton :answer="answers[0]" :data-swapy-item="answers[0].value" ref="AnswerButton1" />
            </div>

            <div :data-swapy-slot="answers[1].value" class="flex flex-col bg-amber-30 h-full w-full ">
              <!-- answer option -->
              <AnswerButton :answer="answers[1]" :data-swapy-item="answers[1].value" ref="AnswerButton2" />
            </div>
          </div>

          <!-- Submit Button -->
          <button type="button" @click="() => console.log(isSortedAscending)" class="submit-button text-md py-3  ">
            Let's Check
          </button>
        </div>



      </div>

    </section>
  </main>
</template>

<style scoped>
.game_area {


  position: relative;

  /* Ensure stacking context for pseudo-element */
}

.submit-button {
  background-color: #FFFFFF;
  border: 1px solid #E4E4E4;
  border-bottom: 4px solid #E4E4E4;
  border-radius: 10px;
  z-index: 50;

}

.grass-deep {
  width: 100%;
  height: 16px;
  background-color: #4FAB4C;
}

.grass {
  width: 100%;
  height: 238px;
  background-color: #83CA54;
}

.answer-item {
  touch-action: none;
  user-select: none;
  position: relative;
  transition: transform 0.2s ease;
}
</style>
