import { defineStore } from 'pinia'
import type { AnswerOption , SlotItem } from '@/utils/types'
import {checkIfSorted} from "@/utils/helpers"

export const useGiraffeStore = defineStore('giraffe', {
  state: () => ({
    answers: [] as AnswerOption[],
    slottedItems : [] as SlotItem[],
  }),
  getters: {
    getAnswers: (state) => state.answers,
    isSortedAscending: (state) => {

      return checkIfSorted(state.slottedItems.map(item => parseInt(item.item)))
    },
    hasWon(): boolean {
      return this.isSortedAscending
    }
  },
  actions: {

    rearrange(newSlotItems: SlotItem[]){
      this.slottedItems = newSlotItems

    },


    generateAnswers(newAnswers: AnswerOption[]) {
      this.answers= newAnswers
      this.slottedItems = newAnswers.map((answer) => ({
        slot: `slot-${answer.id}`,
        item: answer.value,
      }))
    }

  },


})
