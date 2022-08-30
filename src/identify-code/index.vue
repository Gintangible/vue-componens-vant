<template>
  <div class="identify-code-wrap">
    <canvas
      id="identify-code-canvas"
      ref="canvas"
      :width="width"
      :height="height"
    ></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
const props = defineProps({
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
  },
});

const canvas = ref(null);
const ctx = ref(null);

watch(() => props.identifyCode, () => {
  drawPic();
});

onMounted(() => {
  ctx.value = canvas.value.getContext('2d');
  drawPic();
});

// 生成一个随机数
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
// 生成一个随机的颜色
function randomColor(min, max) {
  const r = randomNum(min, max);
  const g = randomNum(min, max);
  const b = randomNum(min, max);
  return `rgb(${r},${g},${b})`;
}
// 渲染验证码图
function drawPic() {
  if (!ctx.value) {
    return;
  }
  ctx.value.textBaseline = 'bottom';
  // 绘制背景
  drawBg();
  // 绘制文字
  drawText();
  drawLine();
  drawDot();
}

function drawBg() {
  ctx.value.fillStyle = randomColor(props.backgroundColorMin, props.backgroundColorMax);
  ctx.value.fillRect(0, 0, props.width, props.height);
}

function drawText() {
  const len = props.identifyCode.length;
  for (let i = 0; i < len; i++) {
    const txt = props.identifyCode[i];
    ctx.value.fillStyle = randomColor(props.colorMin, props.colorMax);
    ctx.value.font = `${randomNum(props.fontSizeMin, props.fontSizeMax)}px SimHei`;
    const x = (i + 1) * (props.width / (len + 1));
    const y = randomNum(props.fontSizeMax, props.height - 5);
    const deg = randomNum(-60, 60);
    // 修改坐标原点和旋转角度
    ctx.value.translate(x, y);
    ctx.value.rotate((deg * Math.PI) / 270);
    ctx.value.fillText(txt, 0, 0);
    // 恢复坐标原点和旋转角度
    ctx.value.rotate((-deg * Math.PI) / 270);
    ctx.value.translate(-x, -y);
  }
}
function drawLine() {
  // 绘制干扰线
  for (let i = 0; i < 2; i++) {
    ctx.value.strokeStyle = randomColor(props.lineColorMin, props.lineColorMax);
    ctx.value.beginPath();
    ctx.value.moveTo(randomNum(0, props.width), randomNum(0, props.height));
    ctx.value.lineTo(randomNum(0, props.width), randomNum(0, props.height));
    ctx.value.stroke();
  }
}
function drawDot() {
  // 绘制干扰点
  for (let i = 0; i < 40; i++) {
    ctx.value.fillStyle = randomColor(0, 255);
    ctx.value.beginPath();
    ctx.value.arc(
      randomNum(0, props.width),
      randomNum(0, props.height),
      1,
      0,
      2 * Math.PI
    );
    ctx.value.fill();
  }
}
</script>
