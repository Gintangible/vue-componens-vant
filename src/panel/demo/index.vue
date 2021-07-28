<template>
  <div>
    <panel v-for="(item, index) in panels"
      :key="index"
      :index="index + 1"
      :title="item.title"
      :closeable="item.closeable"
      @close="onClose"
    >
      <van-cell
        title="测试"
        value="测试内容"
      />
      <van-cell
        title="测试"
        value="测试内容"
      />
    </panel>
    <van-cell title="事件" />
    <van-list>
      <van-cell
        v-for="(e, i) in events"
        :key="i"
        :title="e.order + ': ' + e.name"
        :value="e.param"
      />
    </van-list>
  </div>
</template>

<script>
import { Cell, List } from 'vant';
import Panel from '../index';

export default {
  name: 'PanelDemo',
  components: {
    [Cell.name]: Cell,
    [List.name]: List,
    [Panel.name]: Panel,
  },
  data() {
    return {
      panels: [{
        title: '第1个表单',
      },
      {
        closeable: true,
      },
      {
        title: '第3个表单',
        closeable: true,
      }],
      count: 0,
      events: [],
    };
  },
  methods: {
    onClose(index) {
      this.events.unshift({
        order: ++this.count,
        name: 'close',
        param: `表单${index}关闭`,
      });
    },
  },
};
</script>
