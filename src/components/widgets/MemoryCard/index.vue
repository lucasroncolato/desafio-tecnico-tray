<template>
  <div
    :class="[
      'card',
      'w-16 h-20 sm:w-20 sm:h-24 md:w-[90px] md:h-[96px]',
      { 'flipped': isFlipped, 'matched': isMatched }
    ]"
    @click="flipCard"
  >
    <div class="card-inner">
      <div class="card-face card-front">
        <img :src="card.imageUrl" alt="Card Image" class="card-image" />
      </div>
      <div class="card-face card-back">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

interface Card {
  id: number;
  imageUrl: string;
}

const props = defineProps({
  card: {
    type: Object as () => Card,
    required: true,
  },
  isFlipped: {
    type: Boolean,
    required: true,
  },
  isMatched: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits(["flip"]);

function flipCard() {
  emit("flip");
}
</script>

<style scoped>
.card {
  perspective: 600px;
  background: none;
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  box-shadow: 0 4px 16px 0 rgba(0,0,0,0.12);
  margin: 0.2rem;
  transition: box-shadow 0.2s;
}

.card-inner {
  width: 100%;
  height: 100%;
  transition: transform 0.6s cubic-bezier(0.4,0.2,0.2,1);
  transform-style: preserve-3d;
  position: relative;
}

.card.flipped .card-inner,
.card.matched .card-inner {
  transform: none;
}

.card-inner {
  transform: rotateY(180deg);
}

.card.flipped .card-inner,
.card.matched .card-inner {
  transform: rotateY(0deg);
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-front {
  background: #fff;
  z-index: 2;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.08);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
}

.card-back {
  background: #fff;
  transform: rotateY(180deg);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.10);
  background: #fff;
  display: block;
}

.card.matched {
  opacity: 0.5;
  pointer-events: none;
  box-shadow: none;
}
</style>
