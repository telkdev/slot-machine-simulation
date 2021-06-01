<template>
  <section class="paytable">
    <h2 class="paytable-main_title">Pay Table</h2>
    <ul class="paytable-list">
      <li v-for="(row, i) in payTable" :key="i" class="paytable-item">
        <h3 class="paytable-title">
          {{ row.title }}
        </h3>
        <ul class="paytable-combinations">
          <li
            class="paytable-combinations-item"
            :class="{ blinked: isWinningRow(row.id, 0) }"
          >
            Top: {{ row[0] }}
          </li>
          <li
            class="paytable-combinations-item"
            :class="{ blinked: isWinningRow(row.id, 1) }"
          >
            Center: {{ row[1] }}
          </li>
          <li
            class="paytable-combinations-item"
            :class="{ blinked: isWinningRow(row.id, 2) }"
          >
            Bottom: {{ row[2] }}
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>

<script>
import PAY_TABLE from "@/constants/payTable.js";

export default {
  name: "PayTable",
  props: {
    result: {
      type: Array,
      required: false,
    },
    winData: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      payTable: PAY_TABLE,
    };
  },
  methods: {
    isWinningRow(combinationId, row) {
      if (
        this.winData[combinationId] &&
        this.winData[combinationId].indexOf(row) !== -1
      ) {
        return true;
      }
      return false;
    },
    setWinResult(row, index, rowName) {
      this.$emit("update-win-data", {
        row: index,
        combinationId: this.payTable[rowName].id,
      });
      this.$emit("update-balance", this.payTable[rowName][index]);
    },
    checkRow(row, index) {
      const isAllSlotsEqual = row.every((slot, i, cell) => {
        return slot.name === cell[0].name;
      });

      if (isAllSlotsEqual) {
        this.setWinResult(row, index, row[0].name);
        return;
      }

      const isSevenCherry = row.every((cell) => {
        return cell.type !== "bar";
      });

      if (isSevenCherry) {
        this.setWinResult(row, index, "7CHERRY");
        return;
      }

      const isAnyBar = row.every((cell) => {
        return cell.type === "bar";
      });

      if (isAnyBar) {
        this.setWinResult(row, index, "ANY_BAR");
        return;
      }
    },
    checkResult() {
      for (let i = 0; i < 3; i++) {
        this.checkRow(this.result[i], i);
      }
    },
  },
  // TODO: change to emit
  watch: {
    result: function () {
      this.checkResult();
    },
  },
};
</script>

<style lang="scss" scoped>
.paytable {
  margin-top: 2em;
  background-color: $background-secondary;
  padding: 1em;
  border-radius: 0.3em;

  &-main_title {
    color: $font-primary;
    font-size: 1.6rem;
    text-transform: uppercase;
    margin-bottom: 0.5em;
  }

  &-list {
    display: flex;
  }

  &-item {
    max-width: 13em;

    & + & {
      padding-left: 1em;
      border-left: 1px solid $font-active;
      margin-left: 1em;
    }
  }

  &-title {
    color: $font-primary;
    font-size: 1.4rem;
    line-height: 1.6rem;
    text-transform: uppercase;
    margin-bottom: 0.5em;
  }

  &-combinations {
    &-item {
      flex-shrink: 0;
      color: $font-primary;
      font-size: 1.4rem;
      padding: 0.3em;

      & + & {
        margin-top: 0.1em;
      }
    }
  }
}
</style>
