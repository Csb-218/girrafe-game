<script setup lang="ts">
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import Girrafe_game from "@/assets/ripple-game/Compare-and-Order-Preview.json?url"
import IconEscape from "@/components/icons/IconEscape.vue"
import PreviewModalWithButton from '@/components/Modals/PreviewModalWithButton.vue';
</script>

<template>
  <main class="bg-yellow-200 p-2 h-full">
    <header class="flex items-center gap-x-24 ">
      <IconEscape/>
      <h1 class="text-lg font-bold text-center">The Tall Girrafe</h1>
    </header>

    <div class="flex justify-center items-center mt-10">
      <section class="rounded-xl border-[1px] border-[#E4E4E4] overflow-clip h-[342px] w-[312px] flex items-center justify-center">

        <DotLottieVue
          style="height: 362px; width: 332px; object-fit: cover;"
          :src="Girrafe_game"
          :autoplay="true"
          :loop="true"
        />
      </section>
    </div>

    <!-- CTA button section -->
    <div class="flex justify-center mt-4">
      <section class="flex items-center justify-between w-[312px] bg-amber-300 rounded-lg">
        <button class="bg-white px-[16px] py-[8px] rounded-lg shadow-[#919191] shadow-md">
          Play Game
        </button>
        <button class="button-primary">
          Assign to Child
        </button>
        <PreviewModalWithButton/>
      </section>
    </div>
    <p></p>

  </main>
</template>
