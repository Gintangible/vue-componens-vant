<template>
  <div>
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
        v-for="(e, i) in events"
        :key="i"
        :title="e.order + ': ' + e.name"
        :value="e.param"
      />
    </van-list>
  </div>
</template>
<script>
import { Field, List, Cell } from 'vant';
import SwitchCell from '../../switch-cell';
import EnumSelect from '../index';

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
  name: 'enum-select-demo',
  components: {
    [Field.name]: Field,
    [List.name]: List,
    [Cell.name]: Cell,
    [SwitchCell.name]: SwitchCell,
    [EnumSelect.name]: EnumSelect,
  },
  data() {
    return {
      columns: CREDENTIAL_TYPES,
      type: 'IDENTITY_CARD',
      readonly: false,
      count: 0,
      events: [],
      rules: [
        {
          required: true,
          message: '选择身份证外提示错误',
          trigger: 'onChange',
          validator: (val) => val === '身份证',
        },
      ],
    };
  },
  methods: {
    onConfirm(value) {
      this.events.unshift({
        order: ++this.count,
        name: 'confirm',
        param: value,
      });
    },
    onChange(value) {
      this.events.unshift({
        order: ++this.count,
        name: 'change',
        param: value,
      });
    },
  },
};
</script>
