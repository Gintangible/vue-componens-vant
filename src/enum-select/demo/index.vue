<template>
  <div>
    <enum-select
      v-model="enumStr"
      label="单列数据"
      :columns="['111', '222', '333']"
      :disabled="disabled"
      @confirm="onConfirm"
      @change="onChange"
    />
    <van-field
      v-model="enumStr"
      label="选中的值"
      clearable
    />
    <van-divider />
    <enum-select
      v-model="type"
      label="证件类型"
      :columns="columns"
      :disabled="disabled"
      :rules="rules"
      @confirm="onConfirm"
      @change="onChange"
    />
    <switch-cell
      v-model="disabled"
      title="是否只读"
    />
    <van-field
      v-model="type"
      label="选中的值"
      clearable
    />
    <van-divider />
      <enum-select
        v-model="cityValue"
        label="次联选择"
        :columns="cityColumns"
        :disabled="disabled"
        @confirm="onConfirm"
        @change="onChange"
      />
    <van-divider />
    <van-divider />
      <enum-select
        v-model="multiValue"
        label="多列选择"
        :columns="multiColumns"
        :disabled="disabled"
        @confirm="onConfirm"
        @change="onChange"
      />
    <van-divider />
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
<script setup>
import { ref } from 'vue';
import {
  Field as VanField,
  List as VanList,
  Cell as VanCell,
  Divider as VanDivider,
} from 'vant';
import SwitchCell from '../../switch-cell/index.vue';
import EnumSelect from '../index.vue';

const enumStr = ref('');
const CREDENTIAL_TYPES = [
  {
    text: '身份证',
    value: 'IDENTITY_CARD',
  },

  {
    text: '护照',
    value: 'PASSPORT',
  },

  {
    text: '中国人民解放军军官证',
    value: 'OFFICER_CARD',
  },

  {
    text: '中国人民武装警察警官证',
    value: 'POLICE_CARD',
  },
];
const columns = ref(CREDENTIAL_TYPES);
const type = ref('IDENTITY_CARD');

const citys = [
  {
    text: '浙江',
    value: '浙江',
    children: [
      {
        text: '杭州',
        value: '杭州',
      },
      {
        text: '温州',
        value: '温州',
      },
    ],
  },
  {
    text: '福建',
    value: '福建',
    children: [
      {
        text: '福州',
        value: '福州',
      },
      {
        text: '厦门',
        value: '厦门',
      },
    ],
  },
];
const cityValue = ref(['福建', '厦门']);
const cityColumns = ref(citys);

const multiColumns = [
  // 第一列
  {
    values: ['周一', '周二', '周三', '周四', '周五'],
    defaultIndex: 2,
  },
  // 第二列
  {
    values: ['上午', '下午', '晚上'],
    defaultIndex: 1,
  },
];

const multiValue = ref([]);

const disabled = ref(false);
const count = ref(0);
const events = ref([]);
const rules = ref([
  {
    required: true,
    message: '选择身份证外提示错误',
    trigger: 'onChange',
    validator: (val) => val === '身份证',
  },
]);

function onConfirm(item) {
  events.value.unshift({
    order: ++count.value,
    name: 'confirm',
    param: item,
  });
}
function onChange(item) {
  events.value.unshift({
    order: ++count.value,
    name: 'change',
    param: item,
  });
}
</script>
