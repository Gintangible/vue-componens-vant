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
      <div
        v-if="signSrc || readonly"
        class="signature-blank"
      >
        <van-image
          v-if="signSrc"
          :src="signSrc"
          fit="contain"
        />
      </div>
    </div>
    <div
      v-if="!readonly"
      class="signature-btn-group"
      >
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
import { Button, Image as VanImage } from 'vant';
// https://www.npmjs.com/package/signature_pad
import SignaturePad from 'signature_pad';
import alert from '../utils/alert';

export default {
  name: 'signature',
  components: {
    [Button.name]: Button,
    [VanImage.name]: VanImage,
  },
  props: {
    // 签名的title
    title: {
      type: String,
      default: '签名区域',
    },
    // 已有签名
    signUrl: {
      type: String,
      default: '',
    },
    readonly: {
      type: Boolean,
    },
    // 签名板背景色
    background: {
      type: String,
      default: '#fff',
    },
    // 清屏的文字内容
    clearText: {
      type: String,
      default: '重签',
    },
    // 确定的文字内容
    confirmText: {
      type: String,
      default: '确定'
    },
  },
  data() {
    return {
      signaturePad: null,
      signSrc: '',            // 已有签名地址
    };
  },
  computed: {
    canvasStyle() {
      return `width: ${this.width}; height: ${this.height}px; background: ${this.background};`;
    },
  },
  mounted() {
    const { canvas } = this.$refs;
    this.resizeCanvas();
    this.signaturePad = new SignaturePad(canvas);
    this.signSrc = this.signUrl;
  },
  methods: {
    // 清空签名
    clear() {
      this.signSrc = '';
      this.signaturePad.clear();
      this.$emit('clear');
    },

    // 完成签名
    confirm() {
      if (this.signSrc) {
        alert.show('提示', '请删除之前的签名');
        return;
      }
      if (this.signaturePad.isEmpty()) {
        alert.show('提示', '请先完成签名');
        return;
      }
      const IMAGE_URL = this.signaturePad.toDataURL();
      this.$emit('confirm', IMAGE_URL);
    },

    // 画布区域自适应
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
  padding: 12px;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  background-color: #fff;
}

.signature-title {
  font-size: 16px;
  line-height: 30px;
}

.signature-content {
  position: relative;
  border: 1px solid #f4f4f4;
  border-radius: 4px;
  height: 160px;
  overflow: hidden;
  .signature-canvas {
    width: 100%;
    height: 100%;
  }
  .signature-blank {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}

.signature-btn-group {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  .van-button {
    padding: 0 30px;
  }
  .van-button + .van-button {
    margin-left: 40px;
  }
}
</style>
