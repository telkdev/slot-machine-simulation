<template>
  <div class="notification">
    <smile-background
      v-show="resultStatus === 'loser' || resultStatus === 'winner'"
      :status="resultStatus"
      width="200"
      heigth="200"
    ></smile-background>
    <div v-show="resultStatus === 'loser'" class="notification_message">
      <img
        src="@/assets/robot-loser.svg"
        alt="loser"
        width="125"
        height="161"
        class="notification_message-image"
      />
      <p class="notification_message-text">Sorry, you lost. Try again!</p>
    </div>
    <div v-show="resultStatus === 'winner'" class="notification_message">
      <img
        src="@/assets/robot-strong.svg"
        alt="winner"
        width="125"
        height="141"
        class="notification_message-image"
      />
      <p class="notification_message-text">Congratulations! You WIN!🔥🔥🔥</p>
    </div>
    <div v-show="resultStatus === 'process'" class="notification_message">
      <img
        src="@/assets/robot-waited.svg"
        alt="winner"
        width="125"
        height="146"
        class="notification_message-image"
      />
      <p class="notification_message-text">Will you win? Let's find out!</p>
    </div>
  </div>
</template>

<script>
import SmileBackground from "./SmilesBackground";
export default {
  name: "Notification",
  props: {
    resultStatus: {
      type: String,
      required: true,
    },
  },
  components: {
    SmileBackground,
  },
};
</script>

<style lang="scss" scoped>
.notification {
  display: flex;
  align-items: center;
  position: relative;
  padding: 2em;
  border-radius: 0.5em;
  background-color: $background-secondary;
  overflow: hidden;

  &_message {
    display: flex;
    align-items: center;
    position: relative;
    z-index: 1;

    &-image {
      margin-right: 1em;
    }

    &-text {
      color: $font-primary;
      font-size: 2rem;
      font-weight: $bold;
    }
  }
}
</style>
