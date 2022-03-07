<template>
  <div class="vant-table">
    <table
      ref="table"
      cellspacing="0"
      :class="['vant-table-content', border ? 'table-border' : '']"
    >
      <colgroup>
        <col v-if="showIndex">
        <col
          v-for="(item, index) in tableHeader"
          :key="index"
          :width="item.width || colWidth"
        >
      </colgroup>
      <thead
        :class="['vant-table-header',
                 stripe ? 'table-cell__row--striped' : '',
                 border ? 'table-cell__border': ''
        ]"
      >
        <tr>
          <th
            v-if="showIndex"
            class="table-cell"
          >
            序号
          </th>
          <th
            v-for="(item, index) in tableHeader"
            :key="index"
            class="table-cell"
          >
            {{ item.label }}
          </th>
        </tr>
      </thead>
      <tbody class="vant-table-body">
        <tr
          v-for="(row, $index) in data"
          :key="$index"
          :class="['table-row',
                   (stripe && $index % 2 !== 0) ? 'table-cell__row--striped' : '',
                   border ? 'table-cell__border': ''
          ]"
        >
          <td
            v-if="showIndex"
            class="table-cell"
          >
            {{ $index + 1 }}
          </td>
          <td
            v-for="(column, i) in tableHeader"
            :key="i"
            class="table-cell"
          >
            <slot
              v-if="column.slot"
              :name="column.slot"
              :row="row"
              :$index="$index"
            />
            <div v-else>
              {{ row[column.prop] }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      v-if="!data || data.length === 0"
      ref="emptyBlock"
      class="vant-table__empty-block"
    >
      <span class="el-table__empty-text">
        <slot name="empty">{{ emptyText }}</slot>
      </span>
    </div>
  </div>
</template>
<script>
export default {
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

    // 显示序号
    showIndex: {
      type: Boolean,
    },

    // 纵向边框
    border: {
      type: Boolean,
    },

    // 斑马条纹
    stripe: {
      type: Boolean,
    },

    // 没有数据时
    emptyText: {
      type: String,
      default: '暂无数据',
    }
  },
  data() {
    return {
      colWidth: '60px',
    };
  },
  mounted() {
    this.setColWidth();
  },
  methods: {
    setColWidth() {
      const { offsetWidth } = this.$refs.table;
      let fixWidth = 0;
      this.data.forEach((item) => {
        fixWidth += +item.width;
      });
      this.colWidth = `${Math.round((offsetWidth - fixWidth) / this.data.length)}px`;
    }
  },
};
</script>

<style lang="less" scoped>
.vant-table-content {
  width: 100%;
  th {
    padding: 6px 0;
    font-size: 14px;
    border-bottom: 1px dashed #b5b5b5;
  }
  .vant-table-body {
    text-align: center;
  }
  .table-cell {
    padding: 10px 0;
    font-size: 14px;
    border-bottom: 1px solid #ebeef5;
  }
  .table-cell__row--striped {
    .table-cell {
      background: #fafafa;
    }
  }
  &.table-border {
    border: 1px solid #ebeef5;
    border-right: 0;
    border-bottom: 0;
    .table-cell {
      border-right: 1px solid #ebeef5;
    }
  }
}

.vant-table__empty-block {
  padding: 12px 0;
  text-align: center;
  font-size: 14px;
  color: #999;
}
</style>
