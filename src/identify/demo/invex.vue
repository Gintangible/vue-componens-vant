<template>
  <van-form>
    <identify :identifyCode="identifyCode" />
    <van-field
      v-model="identifyCode"
      label="输入的值"
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
  Field, List, Cell,
} from 'vant';
import Identify from '../index';

/**
 * {@link identify}的使用例子。
 *
 * @author gintangible
 */
export default {
  name: 'identify-demo',
  components: {
    [Field.name]: Field,
    [List.name]: List,
    [Cell.name]: Cell,
    [Identify.name]: Identify,
  },
  data() {
    return {
      mobile: '',
      readonly: false,
      count: 0,
      events: [],
    };
  },
  methods: {
    onChange(value) {
      this.events.unshift({ order: ++this.count, name: 'change', param: value });
    },
    onClearError() {
      this.events.unshift({ order: ++this.count, name: 'clear-error', param: '' });
    },
    onError(value) {
      this.events.unshift({ order: ++this.count, name: 'error', param: value });
    },
  },
};
</script>
