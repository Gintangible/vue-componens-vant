<template>
  <div class="vant-table">
    <table
      ref="table"
      cellspacing="0"
      class="vant-table-content"
    >
      <colgroup>
        <col
          v-for="(item, index) in columns"
          :key="index"
          :width="item.width || colWidth"
        >
      </colgroup>
      <thead class="vant-table-header">
        <tr>
          <th
            v-for="(item, index) in columns"
            :key="index"
          >
            {{ item.label }}
          </th>
        </tr>
      </thead>
      <tbody class="vant-table-body">
        <tr
          v-for="(item, index) in data"
          :key="index"
        >
          <td
            v-for="(column, i) in columns"
            :key="i"
          >
            <slot
              v-if="column.type"
              :name="column.type"
              :row="item"
            />
            <div v-else>
              {{ item[column.prop] }}
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
    columns: {
      type: Array,
      required: true,
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
      this.columns.forEach((item) => {
        fixWidth += +item.width;
      });
      this.colWidth = `${Math.round((offsetWidth - fixWidth) / this.columns.length)}px`;
    }
  },
};
</script>

<style lang="less" scoped>
.vant-table-content {
  width: 100%;
}

.vant-table-header {
  th {
    padding: 6px 0;
    border-bottom: 1px dashed #b5b5b5;
  }
}

.vant-table-body {
  text-align: center;
  td {
    padding: 6px 0;
  }
}

.vant-table__empty-block {
  padding: 30px 0;
  text-align: center;
  font-size: 14px;
  color: #999;
}
</style>
