<template>
  <div>
    <enum-cascader-field
      v-model="cascader"
      label="证件类型"
      :columns="columns"
      :readonly="readonly"
      :disabled="disabled"
      :required="required"
      @confirm-type="onConfirmType"
      @confirm="onConfirm"
      @change="onChange"
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
    <van-field
      :value="JSON.stringify(cascader)"
      label="选中的值"
      clearable
    />

    <van-divider />
    <van-form @submit="onSubmit">
      <enum-cascader-field
        v-model="cascader"
        type-name="typeName"
        value-name="valueName"
        label="证件类型"
        :columns="columns"
        required
        :rules="rules"
        @blur="onBlur"
      />
      <van-button
        type="info"
        block
        size="small"
        text="提交"
        class="form-button"
      />
    </van-form>
    <van-cell title="事件" />
    <van-list>
      <van-cell
        v-for="(e, i) in events"
        :key="i"
        :title="e.order + ': ' + e.name"
        :value="JSON.stringify(e.param)"
      />
    </van-list>
  </div>
</template>
<script>
import { Field, List, Cell, Divider, Form, Button } from 'vant';
import SwitchCell from '../../switch-cell';
import EnumCascaderField from '../index';

const CREDENTIAL_TYPES = [
  {
    name: '身份证',
    value: 'IDENTITY_CARD',
  },

  {
    name: '护照',
    value: 'PASSPORT',
  },

  {
    name: '中国人民解放军军官证',
    value: 'OFFICER_CARD',
  },

  {
    name: '中国人民武装警察警官证',
    value: 'POLICE_CARD',
  },
];

//  EnumSelect 的使用例子。
export default {
  name: 'enum-cascader-demo',
  components: {
    [Field.name]: Field,
    [List.name]: List,
    [Cell.name]: Cell,
    [SwitchCell.name]: SwitchCell,
    [EnumCascaderField.name]: EnumCascaderField,
    [Divider.name]: Divider,
    [Form.name]: Form,
    [Button.name]: Button,
  },
  data() {
    return {
      columns: CREDENTIAL_TYPES,
      cascader: {
        type: 'IDENTITY_CARD',
        value: '',
      },
      readonly: false,
      disabled: false,
      required: false,
      count: 0,
      events: [],
      rules: [
        {
          required: true,
          message: '必须输入：身份证',
          trigger: 'onChange',
          validator: (val) => val === '身份证',
        },
      ],
    };
  },
  methods: {
    onConfirmType(type) {
      this.events.unshift({
        order: ++this.count,
        name: 'confirm-type',
        param: type,
      });
    },
    onConfirm(item) {
      this.events.unshift({
        order: ++this.count,
        name: 'confirm',
        param: item,
      });
    },
    onBlur(item) {
      this.events.unshift({
        order: ++this.count,
        name: 'blur',
        param: item,
      });
    },
    onChange(item) {
      this.events.unshift({
        order: ++this.count,
        name: 'change',
        param: item,
      });
    },
    onSubmit(values) {
      console.log('gxw get ', values);
    },
  },
};
</script>
<style lang="less" scoped>
.form-button {
  margin: 0 auto;
  width: 40%;
}
</style>
