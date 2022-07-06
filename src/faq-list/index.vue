<template>
  <div>
    <van-cell
      :title="title"
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
          :title="item[qKey]"
          :name="i"
          icon="question-o"
        >
          <div v-if="allowHtml" class="item-content" v-html="item[aKey]" />
          <div v-else class="item-content">{{ item[aKey] }}</div>
        </van-collapse-item>
      </template>
      <van-cell
        v-if="defaultShowLength < list.length"
        title=""
        :value="showLength == defaultShowLength ? moreText : '收起'"
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
  name: 'FaqList',
  components: {
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Cell.name]: Cell,
  },
  props: {
    title: {
      type: String,
      default: '常见问题',
    },
    faqs: {                           // 常见问题及回答对象数组。
      type: Array,
      required: true,
    },
    // 过滤条件，faqs 过滤出含 filter 的数据，无 filter 会包含在内
    filter: String,
    // 是否允许 message 内容中渲染 HTML
    allowHtml: {
      type: Boolean,
      default: true,
    },
    moreText: {
      type: String,
      default: '更多问题',
    },
    // 默认显示的问题数目
    defaultShowLength: {
      type: Number,
      default: 6,
    },
    // faq 的 q 对应的 key
    qKey: {
      type: String,
      default: 'question',
    },
    // faq 的 a 对应的 key
    aKey: {
      type: String,
      default: 'answer',
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
.item-content {
  white-space: pre-line;
}
.show-more {
  color: #3d72e2;
  font-size: 12px;
  cursor: pointer;
}
</style>
