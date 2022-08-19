<template>
  <cell
    :title="title"
    :label="label"
    :center="center"
  >
    <template #right-icon>
      <van-switch
        v-model="visible"
        size="24"
        :disabled="disabled"
        @change="onChange"
      />
    </template>
  </cell>
</template>

<script setup>
import { ref, toRefs, watch } from 'vue';
import { Cell, Switch as VanSwitch } from 'vant';

const emit = defineEmits(['update:modelValue', 'change']);

const props = defineProps({
  value: Boolean,
  title: String,
  label: String,
  center: Boolean,
  disabled: Boolean,
});
const visible = ref(false);
const checked = toRefs(props).value;

watch(checked, (val) => {
  visible.value = val;
})

function onChange(val) {
  emit('update:modelValue', val);
  emit('change', val);
}
</script>