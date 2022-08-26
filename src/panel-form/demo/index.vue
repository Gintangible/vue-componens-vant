<template>
  <div>
    <panel-form ref="panelForm">
      <van-field v-model.trim="data.name" name="name" label="姓 名" required />
      <van-field v-model.trim="data.mobile" name="mobile" label="手机号码" required />
    </panel-form>
    <div class="form-content">
      {{ formEvents }}
    </div>

    <van-button
      type="primary"
      block
      size="small"
      text="提交"
      class="form-button"
      @click="panelFormValidate"
    />

    <panel-form v-for="(item, index) in panels"
      :key="index"
      :index="index"
      :title="item.title"
      :closeable="item.closeable"
      class="panel-form"
      @close="onClose"
    >
      <van-cell
        title="测试"
        value="测试内容"
      />
      <van-cell
        title="测试"
        value="测试内容"
      />
    </panel-form>
    <van-cell title="事件" />
    <van-list>
      <van-cell
        v-for="(e, i) in events"
        :key="i"
        :title="e.order + ': ' + e.name"
        :value="e.param"
      />
    </van-list>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {
  Cell as VanCell,
  List as VanList,
  Button as VanButton,
  Field as VanField,
} from 'vant';
import PanelForm from '../index.vue';

const data = ref({
  name: '',
  mobile: '',
});

const formEvents = ref({});
const panels = ref([{
  title: '第1个表单',
},
{
  closeable: true,
},
{
  title: '第3个表单',
  closeable: true,
}]);

const count = ref(0);
const events = ref([]);
const panelForm = ref(null);

function onClose(index) {
  events.value.unshift({
    order: ++count.value,
    name: 'close',
    param: `表单${index}关闭`,
  });
  panels.value.splice(index, 1);
}

function panelFormValidate(){
  panelForm.value.validate().then((values) => {
    formEvents.value = {
      event: 'submit',
      values,
    }
  }).catch((error) => {
    formEvents.value = {
      event: 'failed',
      error,
    }
  })
}
</script>

<style lang="less" scoped>
.panel-form {
  margin: 5px 10px;
}
.form-content {
  margin: 5px 10px;
  border-radius: 5px;
  box-shadow: 1px 1px 8px 0 #e2e2e2;
  background: #fff;
}
.form-button {
  margin: 0 auto;
  width: 40%;
}
</style>
