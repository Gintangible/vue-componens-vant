<template>
  <div>
    <enum-select-checkbox
      v-model="enumStr"
      label="单列数据"
      :columns="['111', '222', '333']"
      :readonly="readonly"
      @confirm="onConfirm"
      @change="onChange"
    />
    <van-cell label="选中的值">
      {{ enumStr }}
    </van-cell>
    <van-divider />
    <enum-select-checkbox
      v-model="type"
      label="证件类型"
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
    <van-cell label="选中的值">
      {{ type }}
    </van-cell>
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
import { Field, List, Cell, Divider } from 'vant';
import SwitchCell from '../../switch-cell';
import EnumSelectCheckbox from '../index';

const CREDENTIAL_TYPES = [
  {
    label: '身份证',
    value: 'IDENTITY_CARD',
  },

  {
    label: '护照',
    value: 'PASSPORT',
  },

  {
    label: '中国人民解放军军官证',
    value: 'OFFICER_CARD',
  },

  {
    label: '中国人民武装警察警官证',
    value: 'POLICE_CARD',
  },
];

//  EnumSelectCheckbox 的使用例子。
export default {
  name: 'EnumSelectCheckboxDemo',
  components: {
    [Field.name]: Field,
    [List.name]: List,
    [Cell.name]: Cell,
    [SwitchCell.name]: SwitchCell,
    [EnumSelectCheckbox.name]: EnumSelectCheckbox,
    [Divider.name]: Divider,
  },
  data() {
    return {
      enumStr: [],
      columns: CREDENTIAL_TYPES,
      type: ['IDENTITY_CARD'],
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
    onConfirm(item) {
      this.events.unshift({
        order: ++this.count,
        name: 'confirm',
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
  },
};
</script>
