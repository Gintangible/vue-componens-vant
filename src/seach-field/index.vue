<template>
  <div class="search-field">
    <van-field
      :value="text"
      :label="label"
      :placeholder="placeholder || `请选择${label}`"
      readonly
      :disabled="disabled"
      :is-link="isLink"
      :required="required"
      :rules="searchRules"
      @click="onClick"
    />
    <van-popup
      v-model="showPicker"
      position="bottom"
      style="height: 100%"
    >
      <search-list
        :list="list"
        :index-bar="indexBar"
        :list-label="listLabel"
        :list-value="listValue"
        :search-sticky="searchSticky"
        :list-async="listAsync"
        :index-bar-key="indexBarKey"
        @confirm="onConfrim"
        @cancel="showPicker = false"
        @search="searchData"
      />
    </van-popup>
  </div>
</template>

<script>
import { Field, Toast, Popup } from 'vant';
import SearchList from '../search-list';

export default {
  name: 'SearchField',

  components: {
    [Field.name]: Field,
    [Popup.name]: Popup,
    SearchList,
  },

  props: {
    /* eslint-disable */
    value: [String, Number],
    label: String,
    placeholder: String,
    isLink: Boolean,
    readonly: Boolean,
    disabled: Boolean,
    indexBarKey: [String, Function],
    /* eslint-enable */
    required: Boolean,
    rules: {
      type: Array,
      default: () => ([]),
    },
    list: {
      type: Array,
      default: () => ([]),
    },
    listLabel: {
      type: String,
      default: 'label',
    },
    listValue: {
      type: String,
      default: 'value',
    },
    indexBar: Boolean,
    searchSticky: Boolean,
    listAsync: Boolean,
  },

  data() {
    return {
      showPicker: false,
      text: '',
    };
  },

  computed: {
    searchRules() {
      let rules = [];
      if (this.required) {
        rules = [{
          required: true,
          message: this.placeholder || `请选择${this.label}`,
        }];
      }
      return rules.concat(this.rules || []);
    },
  },

  watch: {
    value() {
      this.getText();
    },
    list: {
      immediate: true,
      handler() {
        this.getText();
      },
    },
  },

  methods: {
    onClick() {
      if (!this.readonly) {
        this.showPicker = true;
      } else {
        Toast(`${this.label}不可更改`);
      }
    },
    onConfrim(item) {
      this.$emit('input', item[this.listValue]);
      this.showPicker = false;
    },

    getText() {
      if (!this.value) {
        return;
      }
      const item = this.list.find((i) => i[this.listValue] === this.value);
      if (item) {
        this.text = item[this.listLabel];
      }
    },

    searchData(text) {
      this.$emit('search', text);
    },
  },
};
</script>

<style lang="less" scoped>

</style>
