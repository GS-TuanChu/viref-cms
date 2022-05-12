<template>
  <div>
    <li>
      <div
        class="item"
        :class="{ bold: isFolder }"
        @click="toggle"
        @dblclick="makeFolder"
      >
        <span
          v-if="isFolder"
          class="mdi"
          :class="{ 'mdi-chevron-up': isOpen, 'mdi-chevron-down': !isOpen }"
        ></span>
        <span>
          {{ items.value || 'Unknown' }}
          ({{ items.children.length }})
        </span>
      </div>
      <ul v-show="isOpen" v-if="isFolder">
        <tree
          class="item"
          v-for="(child, index) in items.children"
          :key="index"
          :items="child"
          @make-folder="$emit('make-folder', $event)"
        ></tree>
      </ul>
    </li>
  </div>
</template>

<script>
export default {
  name: 'Tree',
  props: {
    items: Object,
  },
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    isFolder: function() {
      return this.items.children && this.items.children.length
    },
  },
  methods: {
    toggle: function() {
      if (this.isFolder) {
        this.isOpen = !this.isOpen
      }
    },
    makeFolder: function() {
      if (!this.isFolder) {
        this.$emit('make-folder', this.item)
        this.isOpen = true
      }
    },
  },
}
</script>

<style scoped>
ul,
li {
  list-style-type: none;
}
.bold {
  font-weight: bold;
}

.item {
  margin-bottom: 10px;
}
</style>
