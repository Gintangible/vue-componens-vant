<template>
  <van-popup
    v-model="visiable"
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
        type="info"
        :size="buttonSize"
        :color="confirmColor"
        :text="confirmText"
        @click="onConfirm"
      />
    </div>
  </van-popup>
</template>

<script>
import { Popup, Button } from 'vant';

export default {
  name: 'DocumentPopup',

  components: {
    [Button.name]: Button,
    [Popup.name]: Popup,
  },

  props: {
    value: {
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
      default: 'normal',
      validator: function (val) {
        return ['large', 'normal', 'small'].includes(val);
      }
    },
    buttonFixed: {
      type: Boolean,
      default: true,
    },
    buttonClass: String,
  },
  data() {
    return {
      visiable: this.value,
    };
  },
  computed: {
    contentClass() {
      if (!this.showCancelButton && !this.showConfirmButton) {
        return '';
      }
      if (this.buttonFixed) {
        return `popup-content_${this.buttonSize}`;
      }
    },
  },
  watch: {
    value(newValue) {
      this.visiable = newValue;
    },
  },
  methods: {
    hide() {
      this.visiable = false;
      this.$emit('input', false);
    },
    onConfirm() {
      if (!this.beforeConfirm) {
        this.$emit('confirm');
        this.hide();
        return;
      }
      const beforeConfirm = this.beforeConfirm();
      if (beforeConfirm && beforeConfirm.then) {
        beforeConfirm.then(() => {
          this.$emit('confirm');
          this.hide();
        })
      } else if (beforeConfirm) {
        this.$emit('confirm');
        this.hide();
      }
    },
    onCancel() {
      this.hide();
      this.$emit('cancel');
    },
  },
};
</script>

<style lang="less" scoped>
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
