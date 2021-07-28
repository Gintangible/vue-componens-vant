<template>
  <van-form>
    <name-field
      v-model="name"
      :readonly="readonly"
      :required="required"
      :rules="rules"
      @blur="onBlur"
      @clear-error="onClearError"
      @error="onError"
    />
    <switch-cell
      v-model="readonly"
      title="是否只读"
    />
    <switch-cell
      v-model="required"
      title="是否必填"
    />
    <switch-cell
      v-model="outRules"
      title="是否rules覆盖"
    />
    <van-field
      v-model="name"
      label="输入的值"
      clearable
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
  </van-form>
</template>
<script>
import { Form, Field, List, Cell } from 'vant';
import SwitchCell from '../../switch-cell';
import NameField from '../index';

/**
 * {@link NameField}的使用例子。
 *
 * @author gintangible
 */
export default {
  name: 'name-field-demo',
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [List.name]: List,
    [Cell.name]: Cell,
    [SwitchCell.name]: SwitchCell,
    [NameField.name]: NameField,
  },
  data() {
    return {
      name: '',
      readonly: false,
      required: false,
      count: 0,
      events: [],
      outRules: false,
    };
  },
  computed: {
    rules() {
      if (!this.outRules) {
        return [];
      }
      return [
        {
          required: true,
          message: '测试传入rules，值为test',
          trigger: 'onBlur',
          validator: (value) => {
            return value === 'test';
          },
        },
      ];
    },
  },
  methods: {
    onBlur(value) {
      this.events.unshift({ order: ++this.count, name: 'blur', param: value });
    },
    onClearError() {
      this.events.unshift({
        order: ++this.count,
        name: 'clear-error',
        param: '',
      });
    },
    onError(value) {
      this.events.unshift({
        order: ++this.count,
        name: 'error',
        param: value,
      });
    },
  },
};
</script>
