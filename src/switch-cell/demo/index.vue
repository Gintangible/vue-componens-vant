<template>
  <div>
    <switch-cell
      v-model="value"
      :title="title"
      :label="label"
      :readonly="readonly"
      @change="onChange"
    />
    <van-field
      v-model="title"
      label="标题"
      clearable
    />
    <van-field
      v-model="label"
      label="描述"
      clearable
    />
    <van-field
      v-model="valueText"
      label="开关的值"
      clearable
      @blur="onChangeValueText"
    />
    <switch-cell
      v-model="readonly"
      title="是否只读"
    />
    <van-cell title="事件" />
    <van-list>
      <van-cell
        v-for="e in events"
        :key="e.name"
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

/**
 * {@link SwitchCell}的使用例子。
 *
 * @author gintangible
 */
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
      title: '测试开关',
      label: '测试描述',
      value: false,
      valueText: 'false',
      readonly: false,
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
    onChangeValueText() {
      this.value = (this.valueText.toLowerCase() === 'true');
    },
  },
};
</script>
