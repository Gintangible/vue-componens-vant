<template>
  <van-form v-if="visible" ref="form" class="panel-form">
    <van-cell
      v-if="title || closeable"
      :title="title || ' '"
      center
      class="title-cell"
    >
      <van-icon
        slot="right-icon"
        v-if="closeable"
        name="clear"
        size="17"
        style="cursor: pointer"
        @click="onClose"
      />
    </van-cell>
    <slot />
  </van-form>
</template>

<script>
import { Form, Cell, Icon } from 'vant';

// 面板。
export default {
  name: 'PanelForm',

  components: {
    [Form.name]: Form,
    [Cell.name]: Cell,
    [Icon.name]: Icon,
  },

  props: {
    // 表单的编号索引
    index: {
      type: Number,
      default: 0,
    },
    // 表单标题
    title: String,
    // 表单是否可关闭
    closeable: Boolean,
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

    validate() {
      return this.$refs.form.validate().then(() => {
        const values = this.$refs.form.getValues();
        return Promise.resolve(values);
      }).catch((res) => {
        return Promise.reject(res);
      })
    },
  },
};
</script>

<style lang="less">
.panel-form {
  background: #fff;
  border-radius: 5px;
  box-shadow: 1px 1px 8px 0 #e2e2e2;
  overflow: hidden;
  .title-cell {
    padding: 10px 16px;
    .van-cell__title {
      font-weight: bold;
      font-size: 15px;
    }
  }
}
</style>
