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

<script>
import {
  Form, Field, List, Cell,
} from 'vant';
import DocumentPopup from '..';
import SwitchCell from '../../switch-cell';

export default {
  name: 'DocumentPopupDemo',
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [List.name]: List,
    [Cell.name]: Cell,
    [SwitchCell.name]: SwitchCell,
    [DocumentPopup.name]: DocumentPopup,
  },
  data() {
    return {
      showDocument: false,
      buttonFixed: false,
      cancelText: '不确定, 返回确认',
      showCancelButton: false,
      cancelColor: '#ccc',
      confirmText: '已阅读并确认',
      confirmColor: '#f00',
      showConfirmButton: false,
      count: 0,
      events: [],
    };
  },
  methods: {
    onConfirm() {
      this.events.unshift({
        order: ++this.count,
        name: 'confirm',
      });
    },
    onCancel() {
      this.events.unshift({
        order: ++this.count,
        name: 'cancel',
      });
    },
  },
};
</script>

<style scoped>
:deep(.button-class) {
  padding: 20px;
}
</style>
