<script>
export default {
  name: 'ImageComponent',
  data() {
    return {}
  },
  props: {
    imgSrc: String,
  },
}
</script>
<template>
  <div class="d-inline-block product-image text-center">
    <img :src="imgSrc" alt="product-image" width="256" height="auto" />
  </div>
</template>

<style scoped>
.product-image {
  margin-right: 1rem;
  margin-bottom: 1rem;
}
</style>
