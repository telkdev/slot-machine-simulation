<template>
  <section class="balance">
    <label class="balance-label" for="balanceInput">Your balance:</label>
    <input
      id="balanceInput"
      class="base_input"
      :class="{ 'base_input--disabled': isSpinning || isPending }"
      :disabled="isSpinning || isPending"
      type="number"
      :value="currentBalance"
      @change="setBalance"
      :min="minBalance"
      :max="maxBalance"
    />
  </section>
</template>

<script>
import BALANCE from "@/constants/balance.js";

export default {
  name: "BalanceArea",
  props: {
    currentBalance: {
      type: Number,
      required: true,
    },
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
      minBalance: BALANCE.MIN,
      maxBalance: BALANCE.MAX,
    };
  },
  methods: {
    setBalance(event) {
      this.$emit("set-balance", parseInt(event.target.value));
    },
  },
  watch: {
    currentBalance: function (newVal) {
      if (newVal > this.maxBalance) {
        this.$emit("set-balance", this.maxBalance);
      }

      if (newVal < this.minBalance) {
        this.$emit("set-balance", this.minBalance);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.balance {
  display: flex;
  flex-direction: column;

  &-label {
    margin-bottom: 0.5em;
    text-align: center;
    text-transform: uppercase;
    color: $font-primary;
    font-weight: 600;
  }
}
</style>
