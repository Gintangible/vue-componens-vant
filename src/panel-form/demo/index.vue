<template>
  <div>
    <panel-form ref="form">
      <van-field v-model.trim="form.name" name="name" label="姓 名" required />
      <van-field v-model.trim="form.mobile" name="mobile" label="手机号码" required />
    </panel-form>
    <div class="form-content">
      {{ formEvents }}
    </div>
    <van-button
      type="info"
      block
      size="small"
      text="提交"
      class="form-button"
      @click="panelForm"
    />

    <panel-form v-for="(item, index) in panels"
      :key="index"
      :index="index + 1"
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

<script>
import { Cell, List, Button, Field } from 'vant';
import PanelForm from '../index';

export default {
  name: 'PanelDemo',
  components: {
    [Cell.name]: Cell,
    [Field.name]: Field,
    [List.name]: List,
    [Button.name]: Button,
    [PanelForm.name]: PanelForm,
  },
  data() {
    return {
      form: {
        name: '',
        mobile: ''
      },
      formEvents: {},
      panels: [{
        title: '第1个表单',
      },
      {
        closeable: true,
      },
      {
        title: '第3个表单',
        closeable: true,
      }],
      count: 0,
      events: [],
    };
  },
  methods: {
    onClose(index) {
      this.events.unshift({
        order: ++this.count,
        name: 'close',
        param: `表单${index}关闭`,
      });
    },

    panelForm(){
      this.$refs.form.validate().then((values) => {
        this.formEvents = {
          event: 'sumit',
          values,
        }
      }).catch((error) => {
        this.formEvents = {
          event: 'failed',
          error,
        }
      })
    },
  },
};
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
