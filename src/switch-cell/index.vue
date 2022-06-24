<template>
  <van-cell
    :title="title"
    :label="label"
    :center="center"
  >
    <template #right-icon>
      <van-switch
        v-model="model"
        size="24"
        :disabled="disabled"
        @change="onChange"
      />
    </template>
  </van-cell>
</template>

<script>
import { Cell, Switch } from 'vant';

export default {
  name: 'SwitchCell',

  components: {
    [Cell.name]: Cell,
    [Switch.name]: Switch,
  },

  props: {
    value: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    center: Boolean,
    disabled: Boolean,
  },
  data() {
    return {
      model: false,
    };
  },
  watch: {
    value(newValue) {
      this.model = newValue;
    },
  },
  mounted() {
    this.model = this.value;
  },
  methods: {
    onChange(newValue) {
      this.$emit('input', newValue);
      this.$emit('change', newValue);
    },
  },
};
</script>
