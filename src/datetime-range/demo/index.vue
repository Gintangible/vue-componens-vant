<template>
  <div>
    <van-form>
      <switch-cell
        v-model="readonly"
        title="是否只读"
      />
    </van-form>
    <van-form>
      <datetime-range
        v-model="datetimeRange"
        label="日期时间rule"
        placeholder="请选择日期时间"
        :readonly="readonly"
      />
      <van-field
        v-model="datetimeRange[0]"
        label="开始时间"
        style="margin-top: 20px;"
        clearable
      />
      <van-field
        v-model="datetimeRange[1]"
        label="结束时间"
        clearable
      />
    </van-form>
  </div>
</template>
<script>
import { Form, Field, Cell } from 'vant';
import SwitchCell from '../../switch-cell';
import DatetimeRange from '../index';

// DateSelect 组件示例
export default {
  name: 'date-select-demo',
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Cell.name]: Cell,
    [SwitchCell.name]: SwitchCell,
    [DatetimeRange.name]: DatetimeRange,
  },
  data() {
    return {
      datetimeRange: [],
      readonly: false,
    };
  },
};
</script>
