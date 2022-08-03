<template>
  <div :class="['index-container',
    filter ? 'index-filter' : ''
  ]">
    <div v-if="filter" class="filter-wrap">
      <van-search
        v-model.trim="text"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
      >
        <template #action>
          <div @click="onSearch">
            搜索
          </div>
        </template>
      </van-search>
    </div>
    <van-index-bar
      :index-list="indexList"
      class="search-content"
    >
      <div
        v-for="k in indexList"
        :key="k"
        class="bar-item"
      >
        <van-index-anchor :index="k" />
        <van-cell
          v-for="(item, i) in contentMap[k]"
          :key="i"
          :title="item[listLabel]"
          clickable
          @click="confirm(item)"
        />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import {
  Search, IndexBar, IndexAnchor, Cell, CellGroup
} from 'vant';

/**
 * 数据过多时，搜索组件，当前数据固定
 */
export default {
  name: 'SearchList',

  components: {
    [Search.name]: Search,
    [IndexBar.name]: IndexBar,
    [IndexAnchor.name]: IndexAnchor,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
  },

  props: {
    filter: {
      type: Boolean,
      default: true,
    },
    list: {
      type: Array,
      default: () => ([]),
    },
    listLabel: {
      type: String,
      default: 'label',
    },
    listValue: {
      type: String,
      default: 'value',
    },
    indexKey: {
      type: [String, Function],
      default: 'key',
    },
  },

  data() {
    return {
      text: '',
      contentMap: {},
      indexList: [],
    };
  },

  watch: {
    list: {
      deep: true,
      immediate: true,
      handler() {
        this.listDeconstruct();
      },
    },
  },

  methods: {
    listDeconstruct(text) {
      const list = text ? this.list.filter((item) => item[this.listLabel].indexOf(text) > -1) : this.list;
      const result = {};
      list.forEach((item) => {
        let key;
        if (typeof this.indexKey === 'string') {
          key = item[this.indexKey];
        } else {
          key = this.indexKey(item, this);
        }
        (result[key] || (result[key] = [])).push(item);
      });

      this.indexList = Object.keys(result);
      this.contentMap = result;
    },

    onSearch() {
      this.listDeconstruct(this.text);
    },
    confirm(item) {
      this.$emit('confirm', item);
    },
  },
};
</script>

<style lang="less" scoped>
.index-filter {
  padding-top: 54px;
}
.filter-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 9;
}
</style>
