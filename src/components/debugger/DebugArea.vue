<template>
  <fieldset
    class="debug_area"
    :class="{ 'debug_area--disabled': isSpinning || isPending }"
    :disabled="isSpinning || isPending"
  >
    <div class="mode">
      <div class="mode-field">
        <input
          id="random-type"
          type="radio"
          value="random"
          v-model="gameMode"
          class="mode-radio"
        />
        <label for="random-type" class="mode-label">Random mode</label>
      </div>
      <div class="mode-field">
        <input
          id="fixed-type"
          type="radio"
          value="fixed"
          v-model="gameMode"
          class="mode-radio"
        />
        <label for="fixed-type" class="mode-label">Fixed mode</label>
      </div>
    </div>
    <div class="debug_area-list">
      <div class="debug_area-col">
        <select
          v-for="j in 3"
          :key="j"
          v-model="firstCol[j - 1]"
          class="base_input debug_area-select"
          :disabled="gameMode === 'random'"
          @change="updateFixedResult"
        >
          <option v-for="(option, i) in options" :key="i" :value="option">
            {{ option.name }}
          </option>
        </select>
      </div>
      <div class="debug_area-col">
        <select
          v-for="j in 3"
          :key="j"
          v-model="secondCol[j - 1]"
          class="base_input debug_area-select"
          :disabled="gameMode === 'random'"
          @change="updateFixedResult"
        >
          <option v-for="(option, i) in options" :key="i" :value="option">
            {{ option.name }}
          </option>
        </select>
      </div>
      <div class="debug_area-col">
        <select
          v-for="j in 3"
          :key="j"
          v-model="thirdCol[j - 1]"
          class="base_input debug_area-select"
          :disabled="gameMode === 'random'"
          @change="updateFixedResult"
        >
          <option v-for="(option, i) in options" :key="i" :value="option">
            {{ option.name }}
          </option>
        </select>
      </div>
    </div>
  </fieldset>
</template>

<script>
import REELS from "@/constants/reels.js";

export default {
  name: "DebugArea",
  props: {
    isSpinning: {
      type: Boolean,
      default: () => false,
    },
    isPending: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      gameMode: "random",
      firstCol: REELS.REELS_DEFAULT_DATA.slice(2, 5),
      secondCol: REELS.REELS_DEFAULT_DATA.slice(2, 5),
      thirdCol: REELS.REELS_DEFAULT_DATA.slice(2, 5),
      options: REELS.REELS_DEFAULT_DATA,
    };
  },
  computed: {
    fixedResultArray() {
      return [this.firstCol, this.secondCol, this.thirdCol];
    },
  },
  methods: {
    updateFixedResult() {
      this.$emit("update-fixed-result", this.fixedResultArray);
    },
  },
  watch: {
    gameMode(val) {
      this.$emit("update-game-mode", val);
    },
  },
  mounted() {
    this.updateFixedResult();
  },
};
</script>

<style lang="scss" scoped>
.debug_area {
  margin: 0;
  padding: 0;
  border: none;

  &--disabled {
    pointer-events: none;
  }

  &-list {
    display: grid;
    gap: 0.5em;
    grid-template-columns: 1fr 1fr 1fr;
  }

  &-col {
    display: flex;
    flex-direction: column;
  }

  &-select {
    cursor: pointer;

    & + & {
      margin-top: 0.5em;
    }
  }
}

// Checkbox
.mode {
  display: flex;
  align-items: center;
  margin-bottom: 1em;

  &-field {
    & + & {
      margin-left: 2em;
    }
  }

  &-radio {
    @include hidden;

    &:checked ~ .mode-label::after {
      background-color: $background-secondary;
    }
  }

  &-label {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 1.6rem;
    color: $font-primary;

    &::before,
    &::after {
      content: "";

      border-radius: 50%;
    }

    &::before {
      @include size(2em);

      border: 2px solid $background-secondary;
      transition: border-color $animation-speed;

      margin-right: 0.5em;
    }

    &::after {
      @include size(1.2em);

      position: absolute;
      top: 50%;
      left: 0.4em;
      transform: translateY(-50%);
    }
  }
}
</style>
