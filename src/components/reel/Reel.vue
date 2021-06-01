<template>
  <div class="reel">
    <div class="reel-box">
      <reel-item
        ref="col"
        v-for="(reelColumn, i) in reelsData"
        :key="i"
        :index="i"
        :gameStarted="isGameStarted"
        :isSpinning="isSpinning"
        :reels="reelColumn"
      />

      <div
        v-show="winData.winRows.indexOf(0) !== -1"
        class="blinked blinked_row blinked_row--top"
      ></div>
      <div
        v-show="winData.winRows.indexOf(1) !== -1"
        class="blinked blinked_row blinked_row--center"
      ></div>
      <div
        v-show="winData.winRows.indexOf(2) !== -1"
        class="blinked blinked_row blinked_row--bottom"
      ></div>
    </div>

    <button
      @click="handleClick"
      :disabled="isSpinning || isPending"
      class="spin_button"
      :class="{ 'spin_button--disabled': isSpinning || isPending }"
    >
      Spin me
    </button>
  </div>
</template>

<script>
import REELS from "@/constants/reels.js";

import ReelItem from "@/components/reel/ReelItem.vue";

export default {
  name: "Reel",
  components: {
    "reel-item": ReelItem,
  },
  props: {
    gameMode: {
      type: String,
      default: () => "random",
    },
    winData: {
      type: Object,
      required: false,
    },
    fixedResult: {
      type: Array,
      required: false,
    },
    isSpinning: {
      type: Boolean,
      default: () => false,
    },
    isPending: {
      type: Boolean,
      default: () => false,
    },
    isGameStarted: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      reelsCount: REELS.REELS_COUNT,
      reelsDefaultData: REELS.REELS_DEFAULT_DATA,
      reelsData: [],
    };
  },
  computed: {
    result() {
      let resultInCol = [
        this.reelsData[0].slice(5, 8),
        this.reelsData[1].slice(5, 8),
        this.reelsData[2].slice(5, 8),
      ];
      let resultInRow = [
        [resultInCol[0][0], resultInCol[1][0], resultInCol[2][0]],
        [resultInCol[0][1], resultInCol[1][1], resultInCol[2][1]],
        [resultInCol[0][2], resultInCol[1][2], resultInCol[2][2]],
      ];
      return resultInRow;
    },
  },
  methods: {
    randomizeResult() {
      return Math.round(Math.random() * (this.reelsDefaultData.length - 1));
    },
    fillResult() {
      for (let i = 0; i < this.reelsCount; i++) {
        let RANDOM_POSITION = this.randomizeResult();

        if (RANDOM_POSITION === 0) {
          this.reelsData.splice(
            i,
            1,
            this.reelsDefaultData.concat(this.reelsDefaultData)
          );
          continue;
        }

        if (RANDOM_POSITION === 4) {
          let randomArray = this.reelsDefaultData
            .slice(4)
            .concat(this.reelsDefaultData.slice(0, 4));
          this.reelsData.splice(i, 1, randomArray.concat(randomArray));
          continue;
        }

        let randomArray = this.reelsDefaultData
          .slice(RANDOM_POSITION)
          .concat(this.reelsDefaultData.slice(0, RANDOM_POSITION));
        this.reelsData.splice(i, 1, randomArray.concat(randomArray));
      }
    },
    fillFixedResult() {
      for (let i = 0; i < this.reelsCount; i++) {
        this.reelsData[i].splice(5, 3, ...this.fixedResult[i]);
      }
    },
    handleClick() {
      this.$emit("update-spinning-status", true);
      this.$emit("update-game-status", true);

      if (this.gameMode === "fixed") {
        this.fillFixedResult();
      }
      if (this.gameMode === "random") {
        this.fillResult();
      }

      this.$emit("update-win-data");
      this.$emit("update-balance", -1);
      // Should be 2 sec
      setTimeout(() => {
        this.$emit("update-pending-status", true);
        this.$emit("update-spinning-status", false);
      }, 2000);

      setTimeout(() => {
        this.$emit("pass-result", this.result);
        this.$emit("update-pending-status", false);
      }, 3500);
    },
    shuffleReel() {
      for (let i = 0; i < this.reelsCount; i++) {
        this.reelsData.push(
          this.reelsDefaultData.concat(this.reelsDefaultData)
        );
      }
    },
  },
  created() {
    this.shuffleReel();
  },
};
</script>

<style lang="scss" scoped>
.reel {
  display: flex;
  flex-direction: column;
  gap: 2em;

  &-box {
    // test
    position: relative;
    height: 363px;
    overflow: hidden;

    display: flex;
    gap: 1em;
  }
}

// temp
.spin_button {
  text-decoration: none;
  border: 2px solid $font-active;
  position: relative;
  overflow: hidden;
  font-size: 2rem;
  padding: 1em 3em;
  color: $font-primary;
  text-transform: uppercase;
  background: none;
  cursor: pointer;

  &:hover {
    box-shadow: 1px 1px 25px 10px $font-active;

    &:before {
      left: 100%;
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(120deg, transparent, $font-active, transparent);
    transition: left 650ms;
  }

  &--disabled {
    cursor: wait;
    color: $font-active;
  }
}

.blinked_row {
  position: absolute;
  left: 0;
  right: 0;
  height: $one-row-height;
  z-index: -1;

  &--top {
    top: 0;
  }

  &--center {
    top: $one-row-height;
  }

  &--bottom {
    top: $two-row-height;
  }
}
</style>
