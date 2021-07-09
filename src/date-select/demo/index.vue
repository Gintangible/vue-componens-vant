<template>
  <div>
    <van-form>
      <switch-cell
        v-model="readonly"
        title="是否只读"
      />
    </van-form>
    <van-form>
      <datetime-select
        v-model="datetime"
        label="日期时间rule"
        placeholder="请选择日期时间"
        :readonly="readonly"
        :rules="rules"
      />
      <van-field
        v-model="datetime"
        label="选中的值"
        clearable
      />
      <van-cell />
    </van-form>
    <van-form>
      <datetime-select
        v-model="date"
        type="date"
        value-format="YYYY-MM-DD"
        display-format="YYYY年M月D日"
        label="日期"
        placeholder="请选择日期"
        :readonly="readonly"
      />
      <van-field
        v-model="date"
        label="选中的值"
        clearable
      />
      <van-cell />
    </van-form>
    <van-form>
      <datetime-select
        v-model="time"
        type="time"
        value-format="HH:mm"
        display-format="H时m分"
        label="时间"
        placeholder="请选择时间"
        :readonly="readonly"
      />
      <van-field
        v-model="time"
        label="选中的值"
        clearable
      />
      <van-cell />
    </van-form>
    <van-form>
      <datetime-select
        v-model="yearmonth"
        type="year-month"
        value-format="YYYY-MM"
        display-format="YYYY年MM月"
        label="年月"
        placeholder="请选择年月"
        :readonly="readonly"
      />
      <van-field
        v-model="yearmonth"
        label="选中的值"
        clearable
      />
      <van-cell />
    </van-form>
    <van-form>
      <datetime-select
        v-model="monthday"
        type="month-day"
        value-format="MM-DD"
        display-format="MM月DD日"
        label="月日"
        placeholder="请选择月日"
        :readonly="readonly"
      />
      <van-field
        v-model="monthday"
        label="选中的值"
        clearable
      />
      <van-cell />
    </van-form>
    <van-form>
      <datetime-select
        v-model="datehour"
        type="datehour"
        value-format="YYYY-MM-DDTHH:00Z"
        display-format="YYYY年M月D日HH时"
        label="年月日小时"
        placeholder="请选择年月日小时"
        :readonly="readonly"
      />
      <van-field
        v-model="datehour"
        label="选中的值"
        clearable
      />
      <van-cell />
    </van-form>
  </div>
</template>
<script>
import { Form, Field, Cell } from 'vant';
import dayjs from 'dayjs';
import SwitchCell from '../../switch-cell';
import DatetimeSelect from '../index';

/**
 * {@link DatetimeSelect}的使用例子。
 *
 * @author gintangible
 */
export default {
  name: 'datetime-select-demo',
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Cell.name]: Cell,
    [SwitchCell.name]: SwitchCell,
    [DatetimeSelect.name]: DatetimeSelect,
  },
  data() {
    return {
      datetime: dayjs().format('YYYY-MM-DDTHH:mmZ'),
      date: dayjs().format('YYYY-MM-DD'),
      time: dayjs().format('HH:mm'),
      yearmonth: dayjs().format('YYYY-MM'),
      monthday: dayjs().format('MM-DD'),
      datehour: dayjs().format('YYYY-MM-DDTHH:00Z'),
      readonly: false,
      rules: [{
        required: true,
        message: '简单验证日期',
        // trigger: 'onChange',
        validator: (val) => val === dayjs().format('YYYY-MM-DDTHH:mmZ'),
      }],
    };
  },
};
</script>
