<template>
  <van-form>
    <signature
      title="签名title"
      :readonly="readonly"
      @confirm="signConfirm"
      @clear="signClear"
    />

    <signature
      title="已有签名"
      :readonly="readonly"
      sign-url="https://img01.yzcdn.cn/vant/cat.jpeg"
      @confirm="signConfirm"
      @clear="signClear"
    />

    <switch-cell
      v-model="readonly"
      title="是否只读"
    />
    <cell title="事件" />
    <list>
      <cell
        v-for="(e, i) in events"
        :key="i"
        :title="e.order + ': ' + e.name"
        :value="e.param"
      />
    </list>
  </van-form>
</template>

<script setup>
import { ref, reactive } from 'vue';
import {
  Form as VanForm, List, Cell,
} from 'vant';
import SwitchCell from '../../switch-cell/index.vue';
import Signature from '../index.vue';

const readonly = ref(false);
const count = ref(0);
const events = ref([]);

function signConfirm(base64) {
  events.value.unshift({
    order: ++count.value,
    name: 'confirm',
    param: base64.split(';')[0]
  });
}
function signClear() {
  console.log('gxw get2et2')
  events.value.unshift({
    order: ++count.value,
    name: 'clear',
  });
};

</script>
