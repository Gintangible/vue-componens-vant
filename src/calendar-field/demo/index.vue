<template>
  <van-form @submit="onSubmit">
    <calendar-field
      v-model="dataRange"
      name="dateRange"
      :readonly="readonly"
      :disabled="disabled"
      :required="required"
    />
    <switch-cell
      v-model="readonly"
      title="是否只读"
    />
    <switch-cell
      v-model="disabled"
      title="是否禁用"
    />
    <switch-cell
      v-model="required"
      title="是否必填"
    />
    <van-cell label="日期区间值">
      {{ dataRange }}
    </van-cell>
    <van-cell label="表单提交获取值">
      {{ formValues }}
    </van-cell>
    <van-button
      type="info"
      block
      size="small"
      text="提交"
      class="form-button"
    />
  </van-form>
</template>
<script>
import { Form, Button, Cell } from 'vant';
import dayjs from 'dayjs';
import SwitchCell from '../../switch-cell';
import CalendarField from '../index';

export default {
  name: 'DatetimeRangeDemo',
  components: {
    [Form.name]: Form,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [SwitchCell.name]: SwitchCell,
    [CalendarField.name]: CalendarField,
  },
  data() {
    return {
      formValues: {},
      dataRange: [],
      readonly: false,
      disabled: false,
      required: false,
      rules: [{
        required: true,
        message: '简单验证日期',
        // trigger: 'onChange',
        validator: (val) => val === dayjs().format('YYYY-MM-DDTHH:mmZ'),
      }],
    };
  },
  methods: {
    onSubmit(values) {
      this.formValues = values;
    },
  },
};
</script>

<style lang="less" scoped>
.form-button {
  margin: 0 auto;
  width: 40%;
}
</style>
