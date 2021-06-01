<template>
  <nav class="nav">
    <ul class="nav-list">
      <li class="nav-item" v-for="(nav, i) in navigation" :key="i">
        <router-link class="nav-link" :to="nav.url">
          {{ nav.name }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      navigation: [
        {
          url: "/",
          name: "Game!",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.nav {
  &-list {
    display: flex;
  }

  &-item {
    & + & {
      margin-left: 1em;
    }
  }

  &-link {
    color: $font-primary;
    font-weight: $bold;
    font-size: 1.6rem;
    text-transform: uppercase;
    transition: color $animation-speed;

    &:hover,
    &.router-link-exact-active {
      color: $font-active;
    }
  }
}
</style>
