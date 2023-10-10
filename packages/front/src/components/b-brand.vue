<template>
  <a
    href="/"
    class="b-brand__container"
  >
    <div class="b-brand__logo-one">
      <img
        class="b-brand__image"
        src="../assets/brand-icon-circle.png"
        alt="brand-logo-circle"
      >
    </div>
    <div class="b-brand__logo-two">
      <img
        class="b-brand__image"
        src="../assets/brand-icon-rectangle.png"
        alt="brand-logo-rectangle"
      >
    </div>
  </a>
</template>

<script lang="ts">
export default {
  name: 'BBrand',
};
</script>

<style scoped lang="scss">
.b-brand__container {
  display: grid;
  row-gap: var(--unit-0300);
  justify-items: center;
}

.b-brand__logo-one {
  height: 57px;
  width: 57px;
}

.b-brand__logo-two {
  height: 57px;
  width: 172px;
}

.brand__image {
  height: 100%;
  width: 100%;
}
</style>
