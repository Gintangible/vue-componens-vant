<template>
  <van-form @submit="onSubmit">
    <datetime-range
      v-model="dataRange"
      start-name="startName"
      end-name="endName"
    />
    <datetime-range
      v-model="dataRange"
      start-name="startName1"
      end-name="endName2"
      start-label="开始时间"
      end-label="结束时间"
      :inline="false"
      separator=""
    />
    <van-cell label="日期区间值">
      {{ dataRange }}
    </van-cell>
    <van-cell label="表单提交获取值">
      {{ formValues }}
    </van-cell>
    <van-button
      type="primary"
      block
      size="small"
      text="提交"
      class="form-button"
    />
  </van-form>
</template>

<script setup>
import { ref } from 'vue';
import {
  Form as VanForm,
  Cell as VanCell,
  Button as VanButton,
} from 'vant';
import SwitchCell from '../../switch-cell/index.vue';
import DatetimeRange from '../index.vue';

const formValues = ref({});
const dataRange = ref([]);
function onSubmit(values) {
  formValues.value = values;
}
</script>

<style lang="less" scoped>
.form-button {
  margin: 0 auto;
  width: 40%;
}
</style>
