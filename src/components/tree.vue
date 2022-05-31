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
          {{ items.value }} | {{ items.amount ? items.amount : null }}
          ({{ items.children.length }})
        </span>
        <i
          class="uil-search-alt search"
          @click.stop="searchHistory(items.id)"
        ></i>
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
      return this.items.children.length
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
    searchHistory(id) {
      console.log(id)
      const params = {
        uid: id,
        cid: this.$route.params.id,
      }
      this.$parse.getTokenTxHistory(params).then((res) => {
        this.$router.push({
          name: 'history',
          params: { tabIndex: 1, data: res.results, meta: res.meta },
        })
      })
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
  cursor: pointer;
}

.search:hover {
  cursor: pointer;
}
</style>
