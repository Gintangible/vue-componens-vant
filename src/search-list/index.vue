<template>
  <div
    :class="['search-list',
             searchSticky ? 'search-list_sticky' : ''
    ]"
  >
    <div :class="searchSticky ? 'search-sticky' : ''">
      <van-search
        v-model.trim="text"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
      >
        <template #action>
          <slot name="action" @click="onCancel">
            取消
          </slot>
        </template>
      </van-search>
    </div>
    <van-cell-group v-if="!indexBar">
      <van-cell
        v-for="(item, i) in indexList"
        :key="i"
        :title="item[listLabel]"
        clickable
        @click="confirm(item)"
      />
    </van-cell-group>
    <van-index-bar
      v-else
      :index-list="indexList"
      :sticky-offset-top="searchSticky ? 54 : 0"
      class="search-content"
    >
      <div
        v-for="k in indexList"
        :key="k"
        class="bar-item"
      >
        <van-index-anchor :index="k" />
        <van-cell-group>
          <van-cell
            v-for="(item, i) in contentMap[k]"
            :key="i"
            :title="item[listLabel]"
            clickable
            @click="confirm(item)"
          />
        </van-cell-group>
      </div>
    </van-index-bar>

    <van-empty
      v-if="!indexList.length"
      :description="emptyText"
    />
  </div>
</template>

<script>
import {
  Search, IndexBar, IndexAnchor, Cell, CellGroup, Empty,
} from 'vant';

export default {
  name: 'SearchListStatic',

  components: {
    [Search.name]: Search,
    [IndexBar.name]: IndexBar,
    [IndexAnchor.name]: IndexAnchor,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Empty.name]: Empty,
  },

  props: {
    indexBar: {
      type: Boolean,
      default: true,
    },
    searchSticky: Boolean,
    listAsync: Boolean,
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
    indexBarKey: {
      type: [String, Function],
      default: 'key',
    },
    emptyText: {
      type: String,
      default: '暂无数据',
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
      if (this.indexBar) {
        list.forEach((item) => {
          let key;
          if (typeof this.indexBarKey === 'string') {
            key = item[this.indexBarKey];
          } else {
            key = this.indexBarKey(item, this);
          }
          (result[key] || (result[key] = [])).push(item);
        });

        this.indexList = Object.keys(result);
        this.contentMap = result;
      } else {
        this.indexList = list;
      }
    },
    onSearch() {
      if (this.listAsync) {
        this.$emit('search', this.text);
        return;
      }
      this.listDeconstruct(this.text);
    },
    onCancel() {
      this.$emit('cancel');
    },
    confirm(item) {
      this.$emit('confirm', item);
    },
  },
};
</script>

<style lang="less" scoped>
.search-list {
  padding: 0 8px;
  background: #fafafa;
  &_sticky {
    padding-top: 54px;
  }
  :deep(.van-empty) {
    background: #fff;
  }
}
.search-sticky {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 2;
}
</style>
