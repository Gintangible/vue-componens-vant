<template>
  <van-form>
    <enum-select
      v-model="type"
      label="证件类型"
      placeholder="请选择证件类型"
      :columns="columns"
      :readonly="readonly"
      :rules="rules"
      @confirm="onConfirm"
      @change="onChange"
    />
    <switch-cell
      v-model="readonly"
      title="是否只读"
    />
    <van-field
      v-model="type"
      label="选中的值"
      clearable
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
  </van-form>
</template>
<script>
import {
  Form, Field, List, Cell,
} from 'vant';
import SwitchCell from '../../switch-cell';
import EnumSelect from '../index';

// EnumSelect 的使用例子。

export default {
  name: 'EnumSelectDemo',
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [List.name]: List,
    [Cell.name]: Cell,
    [SwitchCell.name]: SwitchCell,
    [EnumSelect.name]: EnumSelect,
  },
  data() {
    return {
      columns: CREDENTIAL_TYPES,
      type: CredentialType.IDENTITY_CARD.value,
      readonly: false,
      count: 0,
      events: [],
      rules: [{
        required: true,
        message: '选择身份证外提示错误',
        trigger: 'onChange',
        validator: (val) => val === '身份证',
      }],
    };
  },
  methods: {
    onConfirm(value) {
      this.events.unshift({ order: ++this.count, name: 'confirm', param: value });
    },
    onChange(value) {
      this.events.unshift({ order: ++this.count, name: 'change', param: value });
    },
  },
};
</script>
