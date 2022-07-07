<template>
  <div :class="[
    'table',
    border ? 'table-border': '',
    ]">
    <van-row
      type="flex"
      :class="border ? 'table-row_border': ''"
    >
      <van-col
        v-for="(col, index) in tableHeader"
        :key="index"
        :span="col.span || colSpan"
        :class="['tabel-header table-cell',
          align ? `is-${headerAlign}` : `is-${align}`,
          headerCellClass,
        ]"
      >
        <div class="cell">
          {{ col.label }}
        </div>
      </van-col>
    </van-row>
    <van-row
      v-for="(item, i) in data"
      type="flex"
      :key="i"
      :class="[
        (stripe && i % 2 !== 0) ? 'table-row__striped' : '',
        border ? 'table-row_border': '',
      ]"
    >
      <van-col
        v-for="(col, j) in tableHeader"
        :key="j"
        :span="col.span || colSpan"
        :class="['table-cell',
          align ? `is-${align}` : '',
          cellClass
        ]"
      >
        <slot
          v-if="col.slot"
          :name="col.slot"
          :$index="i"
          :row="cloneRow(item)"
        />
        <div class="cell">
          {{ item[col.prop] }}
        </div>
      </van-col>
    </van-row>
    <div
      v-if="!data || data.length === 0"
      ref="emptyBlock"
      class="table__empty-block"
    >
      <span class="el-table__empty-text">
        <slot name="empty">{{ emptyText }}</slot>
      </span>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash';
import { Row, Col } from 'vant';

export default {
  name: 'VanTable',

  components: {
    [Row.name]: Row,
    [Col.name]: Col,
  },

  props: {
    // 数组内容
    data: {
      type: Array,
      required: true,
    },
    // 列表内容
    tableHeader: {
      type: Array,
      required: true,
    },
    showIndex: Boolean,
    border: Boolean,
    stripe: Boolean,
    headerAlign: String,
    headerCellClass: String,
    cellClass: String,
    align: {
      type: String,
      default: 'left',
    },
    // 没有数据时
    emptyText: {
      type: String,
      default: '暂无数据',
    }
  },

  computed: {
    colSpan() {
      let remainNum = 0;
      let spans = 0
      this.tableHeader.forEach(i => {
        if (i.span) {
          spans += +i.span;
        } else {
          remainNum++;
        }
      });
      return remainNum ? Math.floor((24 - spans) / remainNum) : 1;
    },
  },

  methods: {
    cloneRow(row) {
      return cloneDeep(row);
    },
  },
};
</script>

<style lang="less" scoped>
.table {
  background: #fff;
  &.table-border {
    border: 1px solid #dfe6ec;
    border-right: 0;
    border-bottom: 0;
  }
  .tabel-header {
    height: 32px;
    background-color: #f8f8f9;
  }
  .table-row__striped {
    .table-cell {
      background: #fafafa;
    }
  }
  .table-cell {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6px 0;
    border-bottom: 1px solid #dfe6ec;
    &.is-center {
      text-align: center;
    }
    &.is-right {
      text-align: right;
    }
    &.is-left {
      text-align: left;
    }
    .cell {
      padding: 0 4px;
    }
  }
  .table-row_border {
    .table-cell {
      border-right: 1px solid #ebeef5;
    }
  }
}

.table-cell {
  word-break: break-all;
}

.table__empty-block {
  padding: 10px 0;
  text-align: center;
  font-size: 14px;
  color: #999;
}
</style>
