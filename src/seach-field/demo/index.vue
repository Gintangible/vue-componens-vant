<template>
  <div>
    <search-field
      v-model="value"
      label="搜索控件"
      :list="list"
      :readonly="readonly"
      list-label="areaName"
      list-value="areaCode"
      :index-bar-key="getIndexKey"
    />
    <search-field
      v-model="value"
      label="搜索控件"
      :list="list"
      :readonly="readonly"
      list-label="areaName"
      list-value="areaCode"
      :index-bar-key="getIndexKey"
    />
    <switch-cell
      v-model="readonly"
      title="是否只读"
    />
  </div>
</template>

<script>
import { Cell, List, Button, Field } from 'vant';
import SwitchCell from '../../switch-cell';
import SearchList from '../index';
import LIST from '../../search-list/demo/list';

export default {
  name: 'SearchFieldDemo',
  components: {
    [Cell.name]: Cell,
    [Field.name]: Field,
    [List.name]: List,
    [Button.name]: Button,
    [SwitchCell.name]: SwitchCell,
    SearchList,
  },
  data() {
    return {
      list: LIST,
      value: '',
      readonly: false,
    };
  },
  methods: {
    getIndexKey(item, vm) {
      return item[vm.listLabel].split('_')[0];
    },
  },
};
</script>

<style lang="less" scoped>
</style>
