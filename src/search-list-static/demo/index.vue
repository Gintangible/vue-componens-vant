<template>
  <div>
    <van-cell title="确定结果">
      {{ result }}
    </van-cell>
    <search-list-static
      :list="list"
      list-label="areaName"
      list-value="areaCode"
      :index-key="getIndexKey"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { Cell, List, Button, Field } from 'vant';
import SearchListStatic from '../index';
import LIST from './list';

export default {
  name: 'SearchListDemo',
  components: {
    [Cell.name]: Cell,
    [Field.name]: Field,
    [List.name]: List,
    [Button.name]: Button,
    SearchListStatic,
  },
  data() {
    return {
      list: LIST,
      result: '',
    };
  },
  methods: {
    onConfirm(item) {
      this.result = item;
    },
    getIndexKey(item, vm) {
      return item[vm.listLabel].split('_')[0];
    },
  },
};
</script>

<style lang="less" scoped>
</style>
