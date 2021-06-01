<template>
  <div class="smiles-container">
    <img :src="smileIcon" alt="smile-1" />
    <img :src="smileIcon" alt="smile-2" width="60" height="60" />
    <img :src="smileIcon" alt="smile-3" width="65" height="65" />
    <img :src="smileIcon" alt="smile-4" width="80" height="80" />
    <img :src="smileIcon" alt="smile-5" width="75" height="75" />
    <img :src="smileIcon" alt="smile-6" width="75" height="75" />
    <img :src="smileIcon" alt="smile-7" width="45" height="45" />
    <img :src="smileIcon" alt="smile-8" width="65" height="65" />
    <img :src="smileIcon" alt="smile-9" width="80" height="80" />
    <img :src="smileIcon" alt="smile-10" width="40" height="40" />
    <img :src="smileIcon" alt="smile-11" width="63" height="63" />
    <img :src="smileIcon" alt="smile-12" width="72" height="72" />
    <img :src="smileIcon" alt="smile-13" width="85" height="85" />
  </div>
</template>

<script>
export default {
  name: "SmilesBackgroung",
  props: {
    status: {
      type: String,
      default: () => "loser",
    },
  },
  computed: {
    smileIcon() {
      if (this.status === "loser") {
        return require("@/assets/sad.png");
      }
      return require("@/assets/money.png");
    },
  },
};
</script>

<style lang="scss" scoped>
.smiles-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  img {
    position: absolute;
    top: -40%;
  }
  :nth-child(1) {
    left: 95%;
    animation: down 4s linear 3;
    animation-delay: 1.5s;
  }
  :nth-child(2) {
    left: 80%;
    animation: down 6.5s linear 3;
    animation-delay: 0.2s;
  }
  :nth-child(3) {
    left: 78%;
    animation: down 4s linear 3;
    animation-delay: 1s;
  }
  :nth-child(4) {
    left: 60%;
    animation: down 2s linear 3;
    animation-delay: 2.3s;
  }
  :nth-child(5) {
    left: 54%;
    animation: down 3s linear 3;
    animation-delay: 1.7s;
  }
  :nth-child(6) {
    left: 49%;
    animation: down 5s linear 3;
    animation-delay: 0.5s;
  }
  :nth-child(7) {
    left: 42%;
    animation: down 2.5s linear 3;
    animation-delay: 1.1s;
  }
  :nth-child(8) {
    left: 33%;
    animation: down 3.7s linear 3;
    animation-delay: 0.7s;
  }
  :nth-child(9) {
    left: 25%;
    animation: down 4.7s linear 3;
    animation-delay: 0.2s;
  }
  :nth-child(10) {
    left: 18%;
    animation: down 2.7s linear 3;
    animation-delay: 1s;
  }
  :nth-child(11) {
    left: 12%;
    animation: down 5.3s linear 3;
    animation-delay: 0.5s;
  }
  :nth-child(12) {
    left: 7%;
    animation: down 2.8s linear 3;
    animation-delay: 0.7s;
  }
  :nth-child(13) {
    left: 3%;
    animation: down 3.2s linear 3;
    animation-delay: 1s;
  }
}
</style>

<style lang="scss">
@keyframes down {
  0% {
    top: -20%;
    transform: translateX(15px) rotate(0deg);
  }
  20% {
    transform: translateX(-15px) rotate(45deg);
  }
  40% {
    transform: translateX(-7px) rotate(90deg);
  }
  60% {
    transform: translateX(0) rotate(125deg);
  }
  80% {
    transform: translateX(5px) rotate(180deg);
  }
  100% {
    top: 110%;
    transform: translateX(15px) rotate(225deg);
  }
}
</style>
