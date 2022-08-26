<template>
  <van-form ref="form" class="panel-form">
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

<script setup>
import { ref } from 'vue';
import {
  Form as VanForm,
  Cell as VanCell,
  Icon as VanIcon,
} from 'vant';

const emit = defineEmits([
  'close',
]);

defineExpose({
  validate,
});

const props = defineProps({
  index: {
    type: Number,
    default: 0,
  },
  // 表单标题
  title: String,
  // 表单是否可关闭
  closeable: Boolean,
});

const form = ref(null);

function onClose() {
  emit('close', props.index);
}

function validate() {
  return form.value.validate().then(() => {
    const values = form.value.getValues();
    return Promise.resolve(values);
  }).catch((res) => {
    return Promise.reject(res);
  })
}
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
