// import type { Component } from "vue"
import giraffe_long from "@/components/icons/IconGiraffeBig.vue"
import giraffe_medium from "@/components/icons/IconGiraffeMedium.vue"
import giraffe_short from "@/components/icons/IconGiraffeShort.vue"

export interface AnswerOption {
  id: number ;
  value: string ;
  giraffe : typeof giraffe_long | typeof giraffe_medium | typeof giraffe_short ;
  message : string ;
  order?: number ;
  height?: 'short' | 'medium' | 'long' ;
  x?: number ;
}

export interface SlotItem {
  slot : string;
  item: string;
}
