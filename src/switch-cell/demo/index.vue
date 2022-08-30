<template>
  <switch-cell
    v-model="checked"
    :title="valueText"
    :label="label"
    :disabled="disabled"
    @change="onDemoChange"
  />
  <field
    v-model="valueText"
    label="标题"
    clearable
  />
  <field
    v-model="label"
    label="描述"
    clearable
  />
  <switch-cell
    v-model="disabled"
    title="是否禁用"
  />
  <cell title="事件" />
  <list>
    <cell
      v-for="(e, i) in events"
      :key="i"
      :title="e.order + ': ' + e.name"
      :value="e.param"
    />
  </list>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { Cell, Field, List } from 'vant';
import SwitchCell from '../index.vue';

const valueText = ref('测试描述');
const label = ref('SwitchCellLable');
const checked = ref(true);
const disabled = ref(false);
const count = ref(0);
const events = reactive([]);

function onDemoChange(value) {
  events.unshift({
    order: ++count.value,
    name: 'change',
    param: String(value),
  });
}
</script>