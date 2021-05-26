<template>
  <div class="signature-container">
    <div class="signature-title">
      {{ title }}
    </div>
    <div
      class="signature-content"
      :style="canvasStyle"
    >
      <canvas
        ref="canvas"
        class="signature-canvas"
      />
    </div>
    <div class="signature-btn-group">
      <van-button
        :text="clearText"
        size="small"
        round
        plain
        color="#007bf6"
        @click="clear"
      />
      <van-button
        :text="confirmText"
        round
        size="small"
        color="#007bf6"
        @click="confirm"
      />
    </div>
  </div>
</template>

<script>
import { Button } from 'vant';
import SignaturePad from 'signature_pad';
import alert from '../utils/alert';

export default {
  name: 'Signature',
  components: {
    [Button.name]: Button,
  },
  props: {
    // 签名的title
    title: {
      type: String,
      default: '签名区域',
    },
    // 签名板背景色
    background: {
      type: String,
      default: '#dedede',
    },
    // 清屏的文字内容
    clearText: {
      type: String,
      default: '清屏',
    },
    // 确定的文字内容
    confirmText: {
      type: String,
      default: '完成'
    },
  },
  data() {
    return {
      signaturePad: null,
    };
  },
  computed: {
    canvasStyle() {
      return `width: ${this.width}; height: ${this.height}px; background: ${this.background};`;
    }
  },
  mounted() {
    const { canvas } = this.$refs;
    this.resizeCanvas();
    this.signaturePad = new SignaturePad(canvas);
  },
  methods: {
    // 清空签名
    clear() {
      this.signaturePad.clear();
      this.$emit('clear');
    },
    // 完成签名
    confirm() {
      if (this.signaturePad.isEmpty()) {
        alert.show('提示', '请先输入签名');
        return;
      }
      const IMAGE_URL = this.signaturePad.toDataURL();
      alert.show('提示', IMAGE_URL);
      this.$emit('confirm', IMAGE_URL);
    },

    resizeCanvas() {
      const ratio = Math.max(window.devicePixelRatio || 1, 1); // 清除画布
      const { canvas } = this.$refs;
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext('2d').scale(ratio, ratio);
    }
  },
};
</script>

<style lang="less" scoped>
.signature-container {
  padding: 16px;
  display: flex;
  flex-direction: column;
  border: 1px solid #e8e8e8;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgb(0 0 0 / 27%), 0 0 40px rgb(0 0 0 / 8%) inset;
}

.signature-title {
  font-size: 16px;
  line-height: 30px;
}

.signature-content {
  position: relative;
  flex: 1;
  border: 1px solid #f4f4f4;
}

.signature-canvas {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  box-shadow: 0 0 5px rgb(0 0 0 / 2%) inset;
}

.signature-btn-group {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  .van-button {
    padding: 0 20px;
  }
  .van-button + .van-button {
    margin-left: 40px;
  }
}
</style>
