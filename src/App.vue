<template>
  <div id="app" class="page">
    <base-header class="page-header" />

    <router-view class="page-content" />

    <base-footer class="page-footer" />
  </div>
</template>

<script>
import Header from "@/components/base/Header.vue";
import Footer from "@/components/base/Footer.vue";

export default {
  components: {
    "base-header": Header,
    "base-footer": Footer,
  },
};
</script>

<style lang="scss">
// Common styling
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-size: $base-html-font-size;
  height: 100%;
}

body {
  font-family: $base-font-family;
  font-size: $base-font-size;
  height: 100%;
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeSpeed;
  background: $background-primary;
}

ul,
ol {
  list-style: none;
  padding: 0;
}

body,
h1,
h2,
h3,
h4,
p,
ul,
ol,
li {
  margin: 0;
}

img {
  display: block;
}

a {
  text-decoration: none;
  display: inline-block;
}

// Base pages layout
.page {
  height: 100%;
  display: grid;
  grid-template-areas:
    "header"
    "content"
    "footer";
  grid-template-rows: auto 1fr auto;

  &-header {
    grid-area: header;
  }

  &-content {
    grid-area: content;
  }

  &-footer {
    grid-area: footer;
  }
}

// Custom animation classes
.blinked {
  border-radius: 0.4em;
  background: rgba($font-active, 0.8);
  animation-name: blink;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

// Inputs
.base_input {
  background: $background-secondary;
  border: 1px solid $font-active;
  border-radius: 0.5em;
  color: $font-primary;
  padding: 0.75em;
  font-weight: 600;

  &--disabled {
    opacity: 0.7;
  }
}
</style>
