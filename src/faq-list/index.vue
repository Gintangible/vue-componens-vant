<template>
  <div>
    <cell
      :title="title"
      title-class="title-class"
    />
    <collapse
      v-model="activeName"
      accordion
      :border="false"
    >
      <template
        v-for="(item, i) in list.slice(0, showLength)"
        :key="i"
      >
        <collapse-item
          :title="item[qKey]"
          :name="i"
          icon="question-o"
        >
          <div v-if="allowHtml" class="item-content" v-html="item[aKey]" />
          <div v-else class="item-content">{{ item[aKey] }}</div>
        </collapse-item>
      </template>
      <cell
        v-if="defaultShowLength < list.length"
        title=""
        :value="showLength == defaultShowLength ? moreText : '收起'"
        value-class="show-more"
        @click="showMore"
      />
    </collapse>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { Collapse, CollapseItem, Cell } from 'vant';

const props = defineProps({
  title: {
    type: String,
    default: '常见问题',
  },
  // 常见问题及回答对象数组。
  faqs: {
    type: Array,
    required: true,
  },
  filter: String,
  allowHtml: {
    type: Boolean,
    default: true,
  },
  moreText: {
    type: String,
    default: '更多问题',
  },
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
});

const activeName = ref('');
const showLength = ref(props.defaultShowLength);
const list = ref([]);

onMounted(() => {
  if (props.filter) {
    list.value = props.faqs.filter((i) => (!i.filter || i.filter.includes(props.filter)));
  } else {
    list.value = props.faqs;
  }
});

function showMore() {
  if (showLength.value === props.defaultShowLength) {
    showLength.value = list.value.length;
  } else {
    showLength.value = props.defaultShowLength;
  }
}
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
