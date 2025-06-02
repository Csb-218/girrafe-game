<script lang="ts" setup>
import giraffe_medium from "@/assets/ripple-game/game-characters/Giraffe/giraffe_medium.svg"
import giraffe_sad from "@/assets/ripple-game/game-characters/Giraffe/GiraffeSad.svg"
import giraffe_idle from "@/assets/ripple-game/game-characters/Giraffe/GiraffeIdle.svg"
import giraffe_happy from "@/assets/ripple-game/game-characters/Giraffe/GiraffeHappy.svg"
import giraffe_confused from "@/assets/ripple-game/game-characters/Giraffe/GiraffeConfused.svg"
</script>

<template>

  <div class="relative h-[210px] w-[82px] overflow-hidden ">
    <img
      :src="giraffe_idle"
      class=" object-contain z-20 relative"
      alt="Giraffe Idle"
    />
    <img
      :src="giraffe_medium"
      class="w-[34px] absolute left-[30%] -bottom-5 object-contain z-10"
      alt="Giraffe"
    />
  </div>

</template>
<style scoped>
</style>
