<script setup lang="ts">
import { onMounted, ref ,useTemplateRef} from 'vue'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'

// Assets
import mascot from '@/assets/ripples.png'
import IconPause from '@/assets/pauseButton.png'
import IconOptionsThreeDots from '@/assets/optionsButton.png'


interface AnswerOption {
  id: number
  value: string
  order: number
}

// Register the Draggable plugin
gsap.registerPlugin(Draggable)

const show = ref(false)
const showInstruction = ref(false)
const answersContainer = ref<HTMLElement | null>(null)
const answers = ref<AnswerOption[]>([
  { id: 1, value: '1', order: 0 },
  { id: 2, value: '4', order: 1 },
  { id: 3, value: '2', order: 2 }
])
const answerRefs = useTemplateRef('answersRef')

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

onMounted(() => {
  // Show content after initial delay
  showInstruction.value = true
  setTimeout(() => {
    show.value = true
  }, 1500)
})


onMounted(() => {
  // Initialize GSAP Draggable
  if (answersContainer.value) {
    Draggable.create('.answer-item', {
      type: 'x',
      bounds: answersContainer.value,
      inertia: true,
      onDragStart: function() {
        gsap.to(this.target, { opacity: 0.6, scale: 1.05, duration: 0.2 })
      },

      onDragEnd: function() {
        gsap.to(this.target, { opacity: 1, scale: 1, duration: 0.2 })
        console.log('Drag Ended:', this.target)
        console.log(answerRefs.value)
        // Get new order based on positions
        const items = answerRefs.value || []

        console.log('Items:', items)

        const newOrder = items
          .map(item => {
            console.log('Item:', item)
            return({
            id: parseInt(item.getAttribute('data-id') || '0'),
            x: gsap.getProperty(item, 'x')
          })
        })
          .sort((a, b) => Number(a.x) - Number(b.x))

        console.log('New Order:', newOrder)

        // Update answers array
        const reorderedAnswers = newOrder.map((item, index) => {
          const answer = answers.value.find(a => a.id === item.id)
          return { ...answer!, order: index }
        })
        console.log('Reordered Answers:', reorderedAnswers)

        answers.value = reorderedAnswers

        // Reset positions
        gsap.set(items, { x: 0 })
      }
    })
  }
})
</script>

<template>

  <header class="flex items-center justify-between gap-x-5 h-14 p-2">
    <!-- mascot -->
    <Transition @enter="onEnterHeader" @before-enter="onBeforeEnterHeader" :css="false">

      <img v-if="show" :src="mascot" alt="Ripples" />
    </Transition>

    <!-- Controls -->
    <Transition @enter="onEnterHeader" @before-enter="onBeforeEnterHeader" :css="false">
      <span v-if="show" class="flex items-center gap-x-3">
        <img :src="IconPause" class="h-11" alt="pause" />
        <img :src="IconOptionsThreeDots" class="h-11" alt="options" />
      </span>
    </Transition>

  </header>
  <main class="bg-red-100">
    <!-- Instruction -->
    <Transition @before-enter="onBeforeEnter" @enter="onEnter" @after-enter="onAfterEnter" :css="false">
      <p v-if="showInstruction" class="text-lg text-center font-gabarito-bold color-primary-text ">Order the giraffes
        based on their Height
      </p>
    </Transition>

    <!-- Game Area -->
    <section aria-label="Game Area" class="flex flex-col items-center justify-end bg-amber-300 w-full h-full">

      <!-- grass -->
      <div class="grass text-center">
        <!-- grass border -->
        <div class="grass-deep"></div>

        <div aria-label="answer-box" class="p-5 bg-[#83CA54] h-full flex flex-col justify-between">
          <div ref="answersContainer" class="flex items-center justify-between gap-x-3">
            <div v-for="answer in answers"
                  ref="answersRef"
                 :key="answer.id"
                 :data-id="answer.id"
                 class="answer-item flex flex-col justify-center items-center gap-y-4 w-1/3">
              <button class="answer-button flex items-center justify-center font-gabarito-bold text-3xl color-primary-text">
                {{ answer.value }}
              </button>
              <svg width="21" height="10" viewBox="0 0 21 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20.0595 4.62409C20.012 4.50134 19.9406 4.3892 19.8495 4.29409L15.8495 0.294092C15.7563 0.200853 15.6456 0.126893 15.5238 0.0764322C15.402 0.0259719 15.2714 0 15.1395 0C14.8732 0 14.6178 0.105788 14.4295 0.294092C14.2412 0.482395 14.1355 0.73779 14.1355 1.00409C14.1355 1.27039 14.2412 1.52579 14.4295 1.71409L16.7295 4.00409H3.54954L5.84955 1.71409C5.94278 1.62085 6.01674 1.51016 6.0672 1.38834C6.11766 1.26652 6.14364 1.13595 6.14364 1.00409C6.14364 0.872233 6.11766 0.741665 6.0672 0.619843C6.01674 0.498021 5.94278 0.38733 5.84955 0.294092C5.75631 0.200853 5.64562 0.126893 5.52379 0.0764322C5.40197 0.0259719 5.2714 -9.82427e-10 5.13954 0C5.00769 9.82428e-10 4.87712 0.0259719 4.7553 0.0764322C4.63347 0.126893 4.52278 0.200853 4.42954 0.294092L0.429545 4.29409C0.338504 4.3892 0.267139 4.50134 0.219545 4.62409C0.119527 4.86755 0.119527 5.14063 0.219545 5.38409C0.267139 5.50684 0.338504 5.61899 0.429545 5.71409L4.42954 9.71409C4.52251 9.80782 4.63311 9.88221 4.75497 9.93298C4.87683 9.98375 5.00753 10.0099 5.13954 10.0099C5.27156 10.0099 5.40226 9.98375 5.52412 9.93298C5.64598 9.88221 5.75658 9.80782 5.84955 9.71409C5.94327 9.62113 6.01767 9.51053 6.06844 9.38867C6.1192 9.26681 6.14534 9.1361 6.14534 9.00409C6.14534 8.87208 6.1192 8.74137 6.06844 8.61951C6.01767 8.49765 5.94327 8.38706 5.84955 8.29409L3.54954 6.00409H16.7295L14.4295 8.29409C14.3358 8.38706 14.2614 8.49765 14.2107 8.61951C14.1599 8.74137 14.1337 8.87208 14.1337 9.00409C14.1337 9.1361 14.1599 9.26681 14.2107 9.38867C14.2614 9.51053 14.3358 9.62113 14.4295 9.71409C14.5225 9.80782 14.6331 9.88221 14.755 9.93298C14.8768 9.98375 15.0075 10.0099 15.1395 10.0099C15.2716 10.0099 15.4023 9.98375 15.5241 9.93298C15.646 9.88221 15.7566 9.80782 15.8495 9.71409L19.8495 5.71409C19.9406 5.61899 20.012 5.50684 20.0595 5.38409C20.1596 5.14063 20.1596 4.86755 20.0595 4.62409Z"
                fill="#3A8737" />
              </svg>
            </div>
          </div>

          <!-- Submit Button -->
          <button class="submit-button text-md py-3 w-full ">
            Let's Check
          </button>
        </div>



      </div>

    </section>
  </main>
</template>

<style scoped>
.submit-button {
  background-color: #FFFFFF;
  border: 1px solid #E4E4E4;
  border-bottom: 4px solid #E4E4E4;
  border-radius: 10px;

}


.answer-button {
  background-color: #BAEA93;
  color: #3A8737;
  aspect-ratio: 98/61;
  width: 98px;
  /* Base width */
  height: 61px;
  /* Base height */
  border: #3A8737 solid 1.5px;
  border-bottom: #3A8737 solid 4.5px;
  border-radius: 12px;
  width: 100%;
  height: 100%;

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

[draggable="true"] {
  cursor: move;
  user-select: none;
}

.dragging {
  opacity: 0.5;
}

/* Add touch-specific styles */
.touch-none {
  touch-action: none;
}

/* Add smooth transitions for touch dragging */
[draggable="true"] {
  transition: transform 0.1s ease;
  touch-action: none;
}

.answer-item {
  touch-action: none;
  user-select: none;
}
</style>
