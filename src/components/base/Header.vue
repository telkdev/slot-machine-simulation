<template>
  <header class="header page-header">
    <div class="header-inner">
      <base-logo />

      <base-nav />
    </div>
  </header>
</template>

<script>
import Logo from "@/components/base/Logo.vue";
import Navigation from "@/components/base/Navigation.vue";

export default {
  name: "Header",
  components: {
    "base-logo": Logo,
    "base-nav": Navigation,
  },
};
</script>

<style lang="scss" scoped>
.header {
  background-color: $background-secondary;
  box-shadow: 0 2px 4px -1px rgb(0, 0, 0 / 20%), 0 4px 5px 0 rgb(0, 0, 0 / 14%),
    0 1px 10px 0 rgb(0, 0, 0 / 12%);

  &-inner {
    @include site-width;

    padding: 0.5em 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
