<template>
  <div class="picker-checkbox_field">
    <van-field
      v-model="text"
      :label="label"
      type="textarea"
      autosize
      :disabled="disabled"
      readonly
      :placeholder="fieldPlaceholder"
      :is-link="isLink"
      :rules="fieldRules"
      @click="onClick"
    />
    <van-popup
      v-model="showPopup"
      position="bottom"
    >
      <div class="van-picker__toolbar">
        <button
          type="button"
          class="van-picker__cancel"
          @click="cancel"
        >
          取消
        </button>
        <div class="van-ellipsis van-picker__title">
          {{ label }}
        </div>
        <button
          type="button"
          class="van-picker__confirm"
          @click="onConfirm"
        >
          确认
        </button>
      </div>
      <div class="checkbox-content">
        <van-cell
          v-if="selectAllShow"
          title="全选"
        >
          <template #right-icon>
            <van-checkbox
              v-model="checkedAll"
              name="all"
              :shape="checkboxShape"
              @click="toggleAll"
            />
          </template>
        </van-cell>
        <van-checkbox-group
          ref="checkboxGroup"
          v-model="checkboxValue"
          @change="change"
        >
          <van-cell-group>
            <van-cell
              v-for="(item, index) in enumColumns"
              :key="item[checkValue]"
              clickable
              :title="item[checkLabel]"
              @click="toggle(index)"
            >
              <template #right-icon>
                <van-checkbox
                  ref="checkboxes"
                  :shape="checkboxShape"
                  :disabled="item.disabled"
                  :name="item[checkValue]"
                />
              </template>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash';
import {
  Cell,
  CellGroup,
  Popup,
  Checkbox,
  CheckboxGroup,
  Field,
  Toast,
} from 'vant';

export default {
  name: 'EnumSelectCheckbox',

  components: {
    [Field.name]: Field,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Popup.name]: Popup,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Toast.name]: Toast,
  },

  props: {
    name: String,
    value: {
      type: Array,
      default() {
        return [];
      },
    },
    columns: {
      type: Array,
      default: () => ([]),
    },
    label: {
      type: String,
      default: '下拉多选'
    },
    // 是否显示全选按钮
    selectAllShow: {
      type: Boolean,
      default: true,
    },
    placeholder: String,
    // 下拉前函数
    beforeSelect: Function,
    isLink: Boolean,
    disabled: Boolean,
    // checkbox 的形状
    checkboxShape: {
      type: String,
      default: 'square',
    },
    checkLabel: {
      type: String,
      default: 'label',
    },
    checkValue: {
      type: String,
      default: 'value',
    },
    // 显示内容分割符号
    textSeparator: {
      type: String,
      default: ' / ',
    },
    formatter: Function,
  },

  data() {
    return {
      text: '',
      showPopup: false,
      checkboxValue: [],
      checkedAll: false,
    };
  },

  computed: {
    fieldPlaceholder() {
      return this.placeholder || `请输入${this.label}`;
    },
    fieldRules() {
      let rules = [];
      if (this.required) {
        rules = [{
          required: true,
          message: this.fieldPlaceholder,
        }];
      }
      return rules.concat(this.rules || []);
    },
    enumColumns() {
      if (typeof this.columns[0] === 'string') {
        const columns = this.columns.map((item, index) => {
          return {
            [this.checkLabel]: item,
            [this.checkValue]: index,
          }
        })
        return columns;
      }
      return this.columns;
    },
  },

  watch: {
    value: {
      immediate: true,
      handler() {
        this.checkboxValue = cloneDeep(this.value);
        this.getTextShow();
      },
    },
    columns: {
      immediate: true,
      handler() {
        this.getTextShow();
      },
    },
    checkboxValue: {
      immediate: true,
      handler(val) {
        if (val.length && val.length === this.columns.length) {
          this.checkedAll = true;
        } else {
          this.checkedAll = false;
        }
      },
    },
  },

  methods: {
    onClick() {
      if (this.disabled) {
        Toast(`${this.label}不可更改`);
        return;
      }
      if (this.beforeSelect) {
        this.beforeSelect().then(() => {
          this.showPopup = true;
        });
        return;
      }
      this.showPopup = true;
    },

    getData() {
      const selected = this.columns.filter((item) => this.checkboxValue.includes(item[this.checkValue]));
      return cloneDeep(selected);
    },

    getTextShow() {
      const checked = this.getData();
      if (this.formatter) {
        this.text = this.formatter(checked);
        return;
      }
      const textArray = [];
      checked.forEach((item) => {
        textArray.push(item[this.checkLabel]);
      });
      this.text = textArray.join(this.textSeparator);
    },

    onConfirm() {
      this.showPopup = false;
      this.getTextShow();
      this.$emit('input', this.checkboxValue);
      this.$emit('confirm', cloneDeep(this.checkboxValue), this.getData());
    },

    change(val) {
      this.$emit('change', val, this.getData());
    },

    cancel() {
      this.showPopup = false;
      this.$emit('cancel');
    },

    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },

    toggleAll() {
      this.$refs.checkboxGroup.toggleAll(this.checkedAll);
    },
  },
};
</script>

<style lang="less" scoped>
.checkbox-content {
  max-height:264px;
  overflow-y:auto
}
</style>
