<template>
  <footer class="footer">
    <div class="footer-inner">
      <p class="footer-copyright">© {{ currentYear }}</p>

      <base-nav />
    </div>
  </footer>
</template>

<script>
import Navigation from "@/components/base/Navigation.vue";

export default {
  name: "Footer",
  components: {
    "base-nav": Navigation,
  },
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style lang="scss" scoped>
.footer {
  background-color: $background-secondary;
  box-shadow: 0 2px 4px -1px black, 0 -4px 15px 0 black, 0 1px 10px 0 black;

  &-inner {
    @include site-width();

    padding: 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &-copyright {
    color: $font-primary;
  }
}
</style>
