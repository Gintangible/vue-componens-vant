<template>
  <div class="identify-code-wrap">
    <canvas
      id="identify-code-canvas"
      ref="ctx"
      :width="width"
      :height="height"
    ></canvas>
  </div>
</template>

<script>

export default {
  name: 'identify-code',
  props: {
    identifyCode: {
      type: [String, Array],
      default: 'ABCD'
    },
    fontSizeMin: {
      type: Number,
      default: 28
    },
    fontSizeMax: {
      type: Number,
      default: 40
    },
    backgroundColorMin: {
      type: Number,
      default: 180
    },
    backgroundColorMax: {
      type: Number,
      default: 240
    },
    colorMin: {
      type: Number,
      default: 50
    },
    colorMax: {
      type: Number,
      default: 160
    },
    lineColorMin: {
      type: Number,
      default: 40
    },
    lineColorMax: {
      type: Number,
      default: 180
    },
    dotColorMin: {
      type: Number,
      default: 0
    },
    dotColorMax: {
      type: Number,
      default: 255
    },
    width: {
      type: Number,
      default: 112
    },
    height: {
      type: Number,
      default: 40
    }
  },
  data() {
    return {
      ctx: '',
    };
  },
  watch: {
    identifyCode() {
      this.drawPic();
    }
  },
  mounted() {
    this.ctx = this.$refs.ctx.getContext('2d');
    this.drawPic();
  },
  methods: {
    // 生成一个随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    // 生成一个随机的颜色
    randomColor(min, max) {
      const r = this.randomNum(min, max);
      const g = this.randomNum(min, max);
      const b = this.randomNum(min, max);
      return `rgb(${r},${g},${b})`;
    },
    // 渲染验证码图
    drawPic() {
      if (!this.ctx) {
        return;
      }
      this.ctx.textBaseline = 'bottom';
      // 绘制背景
      this.drawBg();
      // 绘制文字
      this.drawText();
      this.drawLine();
      this.drawDot();
    },
    drawBg() {
      this.ctx.fillStyle = this.randomColor(this.backgroundColorMin, this.backgroundColorMax);
      this.ctx.fillRect(0, 0, this.width, this.height);
    },
    drawText() {
      const len = this.identifyCode.length;
      for (let i = 0; i < len; i++) {
        const txt = this.identifyCode[i];
        this.ctx.fillStyle = this.randomColor(this.colorMin, this.colorMax);
        this.ctx.font = `${this.randomNum(this.fontSizeMin, this.fontSizeMax)}px SimHei`;
        const x = (i + 1) * (this.width / (len + 1));
        const y = this.randomNum(this.fontSizeMax, this.height - 5);
        const deg = this.randomNum(-60, 60);
        // 修改坐标原点和旋转角度
        this.ctx.translate(x, y);
        this.ctx.rotate((deg * Math.PI) / 270);
        this.ctx.fillText(txt, 0, 0);
        // 恢复坐标原点和旋转角度
        this.ctx.rotate((-deg * Math.PI) / 270);
        this.ctx.translate(-x, -y);
      }
    },
    drawLine() {
      // 绘制干扰线
      for (let i = 0; i < 2; i++) {
        this.ctx.strokeStyle = this.randomColor(this.lineColorMin, this.lineColorMax);
        this.ctx.beginPath();
        this.ctx.moveTo(this.randomNum(0, this.width), this.randomNum(0, this.height));
        this.ctx.lineTo(this.randomNum(0, this.width), this.randomNum(0, this.height));
        this.ctx.stroke();
      }
    },
    drawDot() {
      // 绘制干扰点
      for (let i = 0; i < 40; i++) {
        this.ctx.fillStyle = this.randomColor(0, 255);
        this.ctx.beginPath();
        this.ctx.arc(
          this.randomNum(0, this.width),
          this.randomNum(0, this.height),
          1,
          0,
          2 * Math.PI
        );
        this.ctx.fill();
      }
    }
  }
};
</script>
