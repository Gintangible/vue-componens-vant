<template>
  <van-form>
    <common-field
      v-model="text"
      :readonly="readonly"
      :required="required"
      :disabled="disabled"
      :rules="rules"
      :formatter="outFormatter && formatter || null"
      @blur="onBlur"
    />
    <switch-cell
      v-model="readonly"
      title="是否只读"
    />
    <switch-cell
      v-model="disabled"
      title="是否禁用"
    />
    <switch-cell
      v-model="required"
      title="是否必填"
    />
    <switch-cell
      v-model="outRules"
      title="是否rules覆盖"
    />
    <switch-cell
      v-model="outFormatter"
      title="是否 formatter 覆盖"
    />
    <van-field
      v-model="text"
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
import CommonField from '../index';

// CommonField 的使用例子。
export default {
  name: 'CommonFieldDemo',
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [List.name]: List,
    [Cell.name]: Cell,
    [SwitchCell.name]: SwitchCell,
    [CommonField.name]: CommonField,
  },
  data() {
    return {
      text: '',
      readonly: false,
      disabled: false,
      required: false,
      count: 0,
      events: [],
      outRules: false,
      outFormatter: false,
    };
  },
  computed: {
    rules() {
      if (!this.outRules) {
        return null;
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
    formatter() {
      return 'outFormat';
    },
    onBlur(value) {
      this.events.unshift({
        order: ++this.count,
        name: 'blur',
        param: value,
      });
    },
  },
};
</script>
