<template>
  <div class="panel-form" v-if="visible">
    <van-cell
      v-if="title || closeable"
      :title="title"
      class="title-cell"
    >
      <van-icon
        v-if="closeable"
        name="clear"
        size="17"
        style="cursor: pointer"
        @click="onClose"
      />
    </van-cell>
    <slot />
  </div>
</template>

<script>
import { Cell, Icon } from 'vant';

// 面板。

export default {
  name: 'Panel',
  components: {
    [Cell.name]: Cell,
    [Icon.name]: Icon,
  },
  props: {
    index: {                      // 此表单的编号索引
      type: Number,
      default: 0,
    },
    title: {                      // 表单标题
      type: String,
      default: '',
    },
    closeable: {                  // 表单是否可关闭
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      visible: true,
    }
  },
  methods: {
    onClose() {
      this.$emit('close', this.index);
      this.visible = false;
    },
  },
};
</script>
<style lang="less">
.panel-form {
  margin: 5px 10px;
  overflow: hidden;
  background: #fff;
  border-radius: 5px;
  box-shadow: 1px 1px 8px 0 #e2e2e2;
  .title-cell {
    .van-cell__title {
      min-width: 90%;
      max-width: 100%;
      font-weight: bold;
      font-size: 15px;
    }
    .van-cell__value {
      .van-icon {
        top: 5px;
      }
    }
  }
}
</style>
