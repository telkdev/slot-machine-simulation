<template>
  <ul class="reel-list" :class="getClass">
    <li class="reel-item" v-for="(reel, i) in reels" :key="i">
      <img
        :src="getImageUrl(reel.image)"
        :alt="reel.name"
        width="141"
        height="121"
      />
    </li>
  </ul>
</template>

<script>
export default {
  name: "ReelItem",
  props: {
    gameStarted: {
      type: Boolean,
      required: true,
    },
    isSpinning: {
      type: Boolean,
      required: true,
    },
    result: {
      type: Array,
    },
    reels: {
      type: Array,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  computed: {
    getClass() {
      let delayClasss = `reel-list--freeze--${this.index}`;
      return {
        [delayClasss]: !this.isSpinning && this.gameStarted,
        "reel-list--spinning": this.isSpinning,
        "reel-list--freeze": !this.isSpinning && this.gameStarted,
      };
    },
  },
  methods: {
    getImageUrl(imageName = "3xBar") {
      return require(`@/assets/${imageName}.png`);
    },
  },
  watch: {
    isSpinning: function (newVal) {
      if (newVal) {
        //  splice here
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.reel-list {
  transform: translateY(-847px);
  transition: 0.5s;
  animation-fill-mode: forwards;

  &--spinning {
    animation-name: spinning;
    animation-duration: 0.5s;
    animation-iteration-count: 4;
    animation-timing-function: linear;
  }

  &--freeze {
    animation-name: slow-down;
    animation-duration: 0.5s;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;

    &--0 {
      animation-delay: 0s;
    }

    &--1 {
      animation-delay: 0.5s;
    }

    &--2 {
      animation-delay: 1s;
    }
  }
}
</style>
