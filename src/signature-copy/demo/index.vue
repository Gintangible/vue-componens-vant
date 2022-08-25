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
import {
  Form, Field, List, Cell,
} from 'vant';
import SwitchCell from '../../switch-cell';
import Signature from '../index';

// signature组件示例。
export default {
  name: 'signature-demo',
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [List.name]: List,
    [Cell.name]: Cell,
    [SwitchCell.name]: SwitchCell,
    [Signature.name]: Signature,
  },
  data() {
    return {
      name: '',
      readonly: false,
      count: 0,
      events: [],
    };
  },
  methods: {
    signConfirm(base64) {
      this.events.unshift({
        order: ++this.count,
        name: 'confirm',
        param: base64.split(';')[0]
      });
    },
    signClear() {
      this.events.unshift({
        order: ++this.count,
        name: 'clear'
      });
    },
  },
};
</script>
