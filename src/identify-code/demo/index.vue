<template>
  <div>
    <identify-code :identify-code="identifyCode" :width="200"/>
    <identify-code />
    <identify-code :identify-code="['ab', 'b', 'c']"/>
    <van-field
      v-model="identifyCode"
      label="输入的值"
      clearable
    />
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { Field as VanField } from 'vant';
import IdentifyCode from '../index.vue';

const identifyCode = ref('Gintangible');
</script>
