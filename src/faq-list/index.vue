<template>
  <div>
    <van-cell
      title="常见问题"
      title-class="title-class"
    />
    <van-collapse
      v-model="activeName"
      accordion
      :border="false"
    >
      <template v-for="(item, i) in list.slice(0, showLength)">
        <van-collapse-item
          :key="i"
          :title="item.problem"
          :name="i"
          icon="question-o"
        >
          <div v-html="item.answer"></div>
        </van-collapse-item>
      </template>
      <van-cell
        v-if="defaultShowLength < list.length"
        title=""
        :value="showLength == defaultShowLength ? '更多问题' : '收起'"
        value-class="show-more"
        @click="showMore"
      />
    </van-collapse>
  </div>
</template>

<script>
import { Collapse, CollapseItem, Cell } from 'vant';

/**
 * 常见问题及回答控件。
 *
 * @property {Array} faqs
 *     常见问题及回答对象数组。
 * @property {String} filter
 *     用于指定FAQ数组内哪些需要显示。
 * @property {Number} defaultShowLength
 *     默认显示的问题数目
 */
export default {
  name: 'faq-list',
  components: {
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Cell.name]: Cell,
  },
  props: {
    faqs: {                           // 常见问题及回答对象数组。
      type: Array,
      required: true,
    },
    filter: {                         // 过滤条件，没有的时候 list = faqs
      type: String,
      default: '',
    },
    defaultShowLength: {              // 默认显示的问题数目。
      type: Number,
      default: 6,
    },
  },
  data() {
    return {
      activeName: '',
      showLength: this.defaultShowLength,
      list: [],
    };
  },
  mounted() {
    if (this.filter) {
      this.list = this.faqs.filter((i) => (!i.filter || i.filter.includes(this.filter)));
    } else {
      this.list = this.faqs;
    }
  },
  methods: {
    // 显示更多
    showMore() {
      if (this.showLength === this.defaultShowLength) {
        this.showLength = this.list.length;
      } else {
        this.showLength = this.defaultShowLength;
      }
    },
  },
};
</script>

<style scoped lang="less">
.title-class {
  color: #363636;
  font-weight: bold;
  font-size: 15px;
}
.show-more {
  color: #3d72e2;
  font-size: 12px;
  cursor: pointer;
}
</style>
