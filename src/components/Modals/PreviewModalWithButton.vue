<template>
  <button type="button" @click="openModal" class="bg-white px-[16px] py-[10px] rounded-lg shadow-[#919191] shadow-md">
    <IconSave />
  </button>

  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black/25"></div>
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-screen items-center justify-center p-4">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel
              class="w-[313px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <section class="flex">
                 <DialogTitle as="h3" class="text-sm font-medium leading-6 text-gray-900">
                Compare the numbers and find out who is taller
              </DialogTitle>
              <button type="button" @click="closeModal">
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.0771 8.45996L8.99715 15.54" stroke="#000D26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16.0771 15.54L8.99715 8.45996" stroke="#000D26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              </section>




              <div class="mt-2 border border-[#E4E4E4] rounded-lg overflow-clip ">
                <DotLottieVue
        style="height: 152px; width: 213px; object-fit: cover;"
        :src="Girrafe_game"
        :autoplay="true"
        :loop="true"
      />
              </div>

              <div class="mt-4">
                <RouterLink to="/compare-and-order">
                   <button type="button"
                  class="button-primary w-full"
                  >
                  Let's Go
                </button>
                </RouterLink>

              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from "vue-router";
import IconSave from '@/components/icons/IconSave.vue';
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import Girrafe_game from "@/assets/ripple-game/Compare-and-Order-Preview.json?url"

const isOpen = ref(true)

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}
</script>
