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
<script>
import { Field } from 'vant';
import IdentifyCode from '../index';

// identify 的使用例子。
export default {
  name: 'identify-demo',
  components: {
    [Field.name]: Field,
    [IdentifyCode.name]: IdentifyCode,
  },
  data() {
    return {
      identifyCode: 'Gintangible',
    };
  },
};
</script>
