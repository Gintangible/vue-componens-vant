<!------------------------------------------------------------------------------
-
-    Copyright (c) 2017 - 2020
-    Nanjing Smart Medical Investment Operation Service Co. Ltd.
-    All rights reserved.
-
------------------------------------------------------------------------------->
<template>
  <van-form>
    <mobile-field
      v-model="mobile"
      :readonly="readonly"
      @change="onChange"
      @clear-error="onClearError"
      @error="onError"
    />
    <switch-cell
      v-model="readonly"
      title="是否只读"
    />
    <van-field
      v-model="mobile"
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
  Form, Field, List, Cell,
} from 'vant';
import SwitchCell from '../../switch-cell';
import MobileField from '../index';

/**
 * {@link MobileField}的使用例子。
 *
 * @author gintangible
 */
export default {
  name: 'MobileFieldDemo',
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [List.name]: List,
    [Cell.name]: Cell,
    [SwitchCell.name]: SwitchCell,
    [MobileField.name]: MobileField,
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
