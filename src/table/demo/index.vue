<template>
  <div class="demo">
    <van-table
      :table-header="tableHeader"
      :data="data"
      stripe
      border
    >
      <template #test="{ row, $index}">
        {{ $index }} - {{ row.i }}
      </template>
    </van-table>
    <van-divider />
    <van-table
      :table-header="tableHeader"
      :data="[]"
    />
  </div>
</template>

<script>
import { Divider } from 'vant';
import VanTable from '../index';

export default {
  name: 'TableDemo',

  components: {
    [Divider.name]: Divider,
    VanTable,
  },

  data() {
    return {
      tableHeader: [{
        label: '标题1',
        prop: 'item',
      },{
        label: '标题2',
        prop: 'content',
      }, {
        label: '标题slot',
        slot: 'test',
      }],
      data: [{
        i: 1,
        item: 11111,
        content: '的说法斯蒂芬库里撒大家拉伸的法师打发斯蒂芬阿斯蒂芬'
      }, {
        i: 2,
        item: 22222,
        content: '123123123123123123123123123123123123123123123',
      }, {
        i: 3,
        item: 33333,
        content: '的说法斯蒂芬库里撒大家拉伸的法师打发斯蒂芬阿斯蒂芬',
      }],
    };
  },
}
</script>

<style lang="less" scoped>
.demo {
  padding: 10px;
}
</style>
