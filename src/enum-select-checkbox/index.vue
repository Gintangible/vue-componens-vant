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
      v-model:show="showPopup"
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
              v-for="(item) in enumColumns"
              :key="item[checkValue]"
              clickable
              :title="item[checkLabel]"
            >
              <template #right-icon>
                <van-checkbox
                  ref="checkbox"
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

<script setup>
import { ref, computed, watch } from 'vue';
import { cloneDeep } from 'lodash';
import {
  Cell as VanCell,
  CellGroup as VanCellGroup,
  Popup as VanPopup,
  Checkbox as VanCheckbox,
  CheckboxGroup as VanCheckboxGroup,
  Field as VanField,
  Toast,
} from 'vant';

const emit = defineEmits([
  'update:modelValue',
  'cancel',
  'confirm',
  'change',
]);

const props = defineProps({
  name: String,
  modelValue: {
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
});

const text = ref('');
const showPopup = ref(false);
const checkboxValue = ref([]);
const checkedAll = ref(false);
const checkboxGroup = ref(null);
const checkbox = ref(null);

const fieldPlaceholder = computed(() => {
  return props.placeholder || `请输入${props.label}`;
});
const fieldRules = computed(() => {
  let rules = [];
  if (props.required) {
    rules = [{
      required: true,
      message: fieldPlaceholder.value,
    }];
  }
  return rules.concat(props.rules || []);
});
const enumColumns = computed(() => {
  if (typeof props.columns[0] === 'string') {
    const columns = props.columns.map((item, index) => {
      return {
        [props.checkLabel]: item,
        [props.checkValue]: index,
      }
    })
    return columns;
  }
  return props.columns;
});

watch(() => props.modelValue, (newValue) => {
  checkboxValue.value = cloneDeep(newValue);
  setText();
}, { immediate: true });
watch(() => props.columns, (newValue) => {
  setText();
}, { deep: true });
watch(checkboxValue, (val) => {
  if (val.length && val.length === props.columns.length) {
    checkedAll.value = true;
  } else {
    checkedAll.value = false;
  }
}, { deimmediateep: true });

function onClick() {
  if (props.disabled) {
    Toast(`${props.label}不可更改`);
    return;
  }
  if (props.beforeSelect) {
    props.beforeSelect().then(() => {
      showPopup.value = true;
    });
    return;
  }
  showPopup.value = true;
}

function getData() {
  const selected = enumColumns.value.filter((item) => {
    return checkboxValue.value.includes(item[props.checkValue])
  });
  return cloneDeep(selected);
}

function setText() {
  const checked = getData();
  if (props.formatter) {
    text.value = props.formatter(checked);
    return;
  }
  const textArray = [];
  checked.forEach((item) => {
    textArray.push(item[props.checkLabel]);
  });
  text.value = textArray.join(props.textSeparator);
}

function onConfirm() {
  showPopup.value = false;
  setText();
  const checkboxList = cloneDeep(checkboxValue.value);
  emit('update:modelValue', checkboxList);
  emit('confirm', checkboxList, getData());
}

function change(val) {
  emit('change', val, getData());
}

function cancel() {
  showPopup.value = false;
  emit('cancel');
}

function toggleAll() {
  checkboxGroup?.value.toggleAll(checkedAll.value);
}
</script>

<style lang="less" scoped>
.checkbox-content {
  max-height:264px;
  overflow-y:auto
}
</style>
