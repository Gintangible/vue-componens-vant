<template>
  <div>
    <enum-select-checkbox
      v-model="enumStr"
      label="简单数据"
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
      :disabled="readonly"
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

<script setup>
import { ref } from 'vue';
import {
  Field as VanField,
  List as VanList,
  Cell as VanCell,
  Divider as VanDivider,
} from 'vant';
import SwitchCell from '../../switch-cell/index.vue';
import EnumSelectCheckbox from '../index.vue';

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

const enumStr = ref([]);
const columns = ref(CREDENTIAL_TYPES);
const type = ref(['IDENTITY_CARD']);
const readonly = ref(false);
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
