<template>
  <main class="game">
    <div class="game-inner">
      <div class="game-reel">
        <balance-area
          :is-spinning="isSpinning"
          :is-pending="isPending"
          :current-balance="currentBalance"
          @set-balance="setBalance"
          class="game-balance"
        />

        <reel-wrapper
          :is-spinning="isSpinning"
          :is-pending="isPending"
          :is-game-started="isGameStarted"
          :fixed-result="fixedResult"
          :win-data="winData"
          :game-mode="gameMode"
          @update-spinning-status="updateSpinningStatus"
          @update-pending-status="updatePendingStatus"
          @update-game-status="updateGameStartedStatus"
          @update-balance="updateBalance"
          @pass-result="passResult"
          @update-win-data="updateWinData"
        />
      </div>

      <debug-area
        :is-spinning="isSpinning"
        :is-pending="isPending"
        @update-game-mode="updateGameMode"
        @update-fixed-result="updateFixedResult"
        class="game-debug"
      />

      <pay-table
        :result="result"
        :win-data="winData"
        @update-win-data="updateWinData"
        @update-balance="updateBalance"
        class="game-pay_table"
      />
    </div>
  </main>
</template>

<script>
import PayTable from "@/components/payTable/PayTable.vue";
import Reel from "@/components/reel/Reel.vue";
import Balance from "@/components/balance/BalanceArea.vue";
import DebugArea from "@/components/debugger/DebugArea.vue";
import BALANCE from "@/constants/balance.js";

export default {
  name: "Game",
  components: {
    "pay-table": PayTable,
    "reel-wrapper": Reel,
    "balance-area": Balance,
    "debug-area": DebugArea,
  },
  data() {
    return {
      currentBalance: BALANCE.DEFAULT,
      gameMode: "random",
      fixedResult: [],
      result: [],
      winData: {
        winRows: [],
      },
      isSpinning: false,
      isPending: false,
      isGameStarted: false,
    };
  },
  methods: {
    updateBalance(updatedData) {
      this.currentBalance += updatedData;
    },
    setBalance(newBalance) {
      this.currentBalance = newBalance;
    },
    passResult(passedResult) {
      this.result = passedResult;
    },
    updateWinData(passedData) {
      // Clean win data
      if (!passedData) {
        this.winData = {
          winRows: [],
        };
      } else {
        // Fill win rows
        this.winData.winRows.push(passedData.row);
        // Fill win combinations
        if (!this.winData[passedData.combinationId]) {
          this.$set(this.winData, [passedData.combinationId], [passedData.row]);
        } else {
          let winLinesArray = this.winData[passedData.combinationId].slice();
          winLinesArray.push(passedData.row);

          this.$set(this.winData, [passedData.combinationId], winLinesArray);
        }
      }
    },
    updateGameMode(passedMode) {
      this.gameMode = passedMode;
    },
    updateFixedResult(passedResult) {
      // allow to copy by link
      this.fixedResult = passedResult;
    },
    updateSpinningStatus(passedStatus) {
      this.isSpinning = passedStatus;
    },
    updatePendingStatus(passedStatus) {
      this.isPending = passedStatus;
    },
    updateGameStartedStatus(passedStatus) {
      this.isGameStarted = passedStatus;
    },
  },
};
</script>

<style lang="scss" scoped>
.game {
  &-inner {
    @include site-width;

    padding: 1.5em 1em;
    display: grid;
    grid-template-areas:
      "reel debug"
      "pay_table pay_table";
    grid-template-columns: auto 1fr;
    gap: 2em;
  }

  &-balance {
    margin-bottom: 1em;
  }

  &-reel {
    grid-area: reel;
  }

  &-debug {
    grid-area: debug;
  }

  &-pay_table {
    grid-area: pay_table;
  }
}
</style>
