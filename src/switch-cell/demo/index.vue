<template>
  <div>
    <switch-cell
      v-model="value"
      :title="valueText"
      :label="label"
      :disabled="disabled"
      @change="onChange"
    />
    <van-field
      v-model="valueText"
      label="标题"
      clearable
    />
    <van-field
      v-model="label"
      label="描述"
      clearable
    />
    <!-- <van-field
      v-model="value"
      label="开关的值"
      clearable
    /> -->
    <switch-cell
      v-model="disabled"
      title="是否禁用"
    />
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
import {
  Form, Field, List, Cell,
} from 'vant';
import SwitchCell from '../index';

// SwitchCell 组件示例。
export default {
  name: 'switch-cell-demo',
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [List.name]: List,
    [Cell.name]: Cell,
    [SwitchCell.name]: SwitchCell,
  },
  data() {
    return {
      valueText: '测试描述',
      label: 'SwitchCellLable',
      value: false,
      disabled: false,
      count: 0,
      events: [],
    };
  },
  watch: {
    value(newValue) {
      this.valueText = String(newValue);
    },
  },
  mounted() {
    this.valueText = String(this.value);
  },
  methods: {
    onChange(value) {
      this.events.unshift({
        order: ++this.count,
        name: 'change',
        param: String(value),
      });
    },
  },
};
</script>
