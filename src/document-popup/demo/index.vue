<template>
  <div>
    <van-form>
      <switch-cell v-model="showDocument" title="显示弹窗内容" />
      <switch-cell v-model="buttonFixed" title="按钮固定在底部" />
      <switch-cell v-model="showCancelButton" title="取消按钮显示" />
      <switch-cell v-model="showConfirmButton" title="确定按钮显示" />

      <van-field v-model="cancelText" label="取消文本" clearable />
      <van-field v-model="cancelColor" label="取消文本颜色" clearable />
      <van-field v-model="confirmText" label="确定文本" clearable />
      <van-field v-model="confirmColor" label="确定文本颜色" clearable />
    </van-form>

    <van-cell title="事件" />

    <van-list>
      <van-cell
        v-for="e in events"
        :key="e.order"
        :title="e.order + ': ' + e.name"
      />
    </van-list>
    <document-popup
      v-model="showDocument"
      style="height: 40%;"
      :button-fixed="buttonFixed"
      :show-cancel-button="showCancelButton"
      :cancel-text="cancelText"
      :cancel-color="cancelColor"
      :show-confirm-button="showConfirmButton"
      :confirm-text="confirmText"
      :confirm-color="confirmColor"
      button-class="button-class"
      @confirm="onConfirm"
      @cancel="onCancel"
    >
      弹窗内容
    </document-popup>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {
  Form as VanForm,
  Field as VanField,
  List as VanList,
  Cell as VanCell,
} from 'vant';
import DocumentPopup from '../index.vue';
import SwitchCell from '../../switch-cell/index.vue';
const showDocument = ref(false);
const buttonFixed = ref(true);
const cancelText = ref('不确定, 返回确认');
const showCancelButton = ref(true);
const cancelColor = ref('#ccc');
const confirmText = ref('已阅读并确认');
const confirmColor = ref('#f00');
const showConfirmButton = ref(true);
const count = ref(0);
const events = ref([]);

function onConfirm() {
  events.value.unshift({
    order: ++count.value,
    name: 'confirm',
  });
}
function onCancel() {
  events.value.unshift({
    order: ++count.value,
    name: 'cancel',
  });
}
</script>

<style scoped>
:deep(.button-class) {
  padding: 20px;
}
</style>
