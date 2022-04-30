<template>
  <div>
    <ul>
      <li v-for="i of items" :key="i.name">
        <p @click="toggle">
          <span v-if="!isOpen" class="mdi mdi-chevron-down"></span>
          <span v-else class="mdi mdi-chevron-up"></span>
          <span style="margin-left: 3px">{{ i.name }} </span>
          <span v-if="i.numberOfChildren > 0">({{ i.numberOfChildren }})</span>
          <span v-else>(No children)</span>
        </p>

        <tree :items="i.children" v-if="i.children && isOpen" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Tree',
  props: {
    items: Array,
  },
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {},
  methods: {
    toggle: function () {
      this.isOpen = !this.isOpen
    },
    makeFolder: function () {
      this.$emit('make-folder', this.item)
      this.isOpen = true
    },
  },
}
</script>

<style scoped>
ul {
  list-style-type: none;
}
</style>