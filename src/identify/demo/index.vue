<template>
  <div>
    <identify :identify-code="identifyCode" :width="200"/>
    <identify />
    <identify :identify-code="['ab', 'b', 'c']"/>
    <van-field
      v-model="identifyCode"
      label="输入的值"
      clearable
    />
  </div>
</template>
<script>
import { Field } from 'vant';
import Identify from '../index';

/**
 * {@link identify}的使用例子。
 *
 * @author gintangible
 */
export default {
  name: 'identify-demo',
  components: {
    [Field.name]: Field,
    [Identify.name]: Identify,
  },
  data() {
    return {
      identifyCode: 'Gintangible',
    };
  },
};
</script>
