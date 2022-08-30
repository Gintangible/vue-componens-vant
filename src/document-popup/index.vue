<template>
  <van-popup
    v-model:show="visiable"
    position="bottom"
    safe-area-inset-bottom
    class="document-popup"
    @click-overlay="onCancel"
  >
    <div :class="['popup-content', contentClass]">
      <slot />
    </div>
    <div :class="['button-group', buttonClass, buttonFixed ? 'fixed-button': '']">
      <van-button
        v-if="showCancelButton"
        type="default"
        :size="buttonSize"
        :color="cancelColor"
        :text="cancelText"
        @click="onCancel"
      />
      <van-button
        v-if="showConfirmButton"
        type="primary"
        :size="buttonSize"
        :color="confirmColor"
        :text="confirmText"
        @click="onConfirm"
      />
    </div>
  </van-popup>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { Popup as VanPopup, Button as VanButton } from 'vant';

const emit = defineEmits([
  'update:modelValue',
  'cancel',
  'confirm',
]);

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  showCancelButton: {
    type: Boolean,
    default: true,
  },
  cancelText: {
    type: String,
    default: '返回',
  },
  cancelColor: String,
  showConfirmButton: {
    type: Boolean,
    default: true,
  },
  confirmText: {
    type: String,
    default: '确定',
  },
  confirmColor: String,
  buttonSize: {
    type: String,
    default: 'small',
    validator: function (val) {
      return ['large', 'normal', 'small'].includes(val);
    }
  },
  buttonFixed: {
    type: Boolean,
    default: true,
  },
  buttonClass: String,
});

const visiable = ref(props.modelValue);

const contentClass = computed(() => {
  if (!props.showCancelButton && !props.showConfirmButton) {
    return '';
  }
  if (props.buttonFixed) {
    return `popup-content_${props.buttonSize}`;
  }
});

watch(() => props.modelValue, (newValue) => {
  visiable.value = newValue;
})

function hide() {
  emit('update:modelValue', false);
}

function onConfirm() {
  if (!props.beforeConfirm) {
    emit('confirm');
    hide();
    return;
  }
  const beforeConfirm = props.beforeConfirm();
  if (beforeConfirm && beforeConfirm.then) {
    beforeConfirm.then(() => {
      emit('confirm');
      hide();
    })
  } else if (beforeConfirm) {
    emit('confirm');
    hide();
  }
}
function onCancel() {
  hide();
  emit('cancel');
}
</script>

<style lang="less">
.document-popup {
  height: 100vh;
  .popup-content {
    &_large {
      margin-bottom: 60px;
    }
    &_normal {
      margin-bottom: 50px;
    }
    &_small {
      margin-bottom: 40px;
    }
  }
  .button-group {
    display: flex;
    width: 100%;
    box-sizing: border-box;
    &.fixed-button {
      position: fixed;
      bottom: 0;
    }
    .van-button {
      flex: 1;
    }
  }
}
</style>
