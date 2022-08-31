<template>
  <van-uploader
    v-model="fileList"
    :upload-icon="uploadIcon"
    :upload-text="uploadText"
    :multiple="multiple"
    :preview-size="previewSize"
    :max-size="maxSize"
    :max-count="maxCount"
    :accept="accept"
    :before-read="beforeRead"
    :after-read="afterRead"
    :before-delete="beforeDelete"
    :class="isButtonMode ? 'uploader-button' : ''"
  >
    <template v-if="isButtonMode">
      <van-button
        type="info"
        size="small"
        :text="buttonText"
      />
      <slot name="tip">
        <div
          v-if="showTip && (fileSize || fileType.length)"
          class="uploader-tip"
        >
          请上传
          <template v-if="fileSize">
            大小不超过 <span>{{ fileSize }}MB</span>
          </template>
          <template v-if="fileType.length">
            格式为 <span>{{ fileType.join("/") }}</span>
          </template>
          的文件
        </div>
      </slot>
    </template>
  </van-uploader>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import {
  Button as VanButton,
  Uploader as VanUploader,
  Toast as VanToast,
} from 'vant';

const emit = defineEmits([
  'load-failed',
  'on-failed',
  'on-success',
  'update:modelValue',
]);

const props = defineProps({
  // eslint-disable-next-line vue/require-default-prop
  modelValue: [String, Object, Array],
  contentType: {
    type: String,
    default: '',
  },
  showTip: {
    type: Boolean,
    default: true,
  },
  fileType: {
    type: Array,
    default: () => ([]),
  },
  mode: {
    type: String,
    default: 'button',
  },
  buttonText: {
    type: String,
    default: '上传文件',
  },
  previewSize: [String, Number],
  uploadText: String,
  uploadIcon: String,
  accept: String,
  multiple: {
    type: Boolean,
    default: true,
  },
  disabled: Boolean,
  readonly: Boolean,
  deletable: {
    type: Boolean,
    default: true,
  },
  capture: String,
  fileSize: {
    type: [Number, String],
    default: 10,
  },
  maxCount: {
    type: [Number, String],
    default: 30,
  },
  fileUrlFormat: Function,
  beforeDelete: Function,
  upload: Function,
});

const fileList = ref([]);

const isButtonMode = computed(() => {
  return props.mode === 'button';
});
const maxSize = computed(() => {
  return props.fileSize * 1024 * 1024;
});

watch(() => props.modelValue, (val) => {
  if (val) {
    const list = Array.isArray(val) ? val : val.split(',');
    fileList.value = list.map((item) => {
      if (typeof item === 'string') {
        item = { name: item, url: item };
      }
      item.name = item.fileName;
      if (props.fileUrlFormat) {
        item.url = props.fileUrlFormat(item);
      }
      const fileType = item.file?.name || item[props.contentType] || '';
      if (fileType.indexOf('image') > -1) {
        item.isImage = true;
      }
      return item;
    });
  }
}, { immediate: true,deep: true, });

function beforeRead(files) {
  if (!Array.isArray(files)) {
    files = [files];
  }
  if (props.fileType.length) {
    const failedList = [];
    files.forEach((file) => {
      const type = file.type.split('/')[1];
      if (!props.fileType.includes(type)) {
        failedList.push(file.name);
      }
      if (maxSize.value) {
        const isLt = file.size < maxSize.value;
        if (!isLt) {
          failedList.push(file.name);
        }
      }
    });

    if (failedList.length) {
      if (!props.showTip) {
        Toast(`文件${failedList.join('、')}不符合格式要求
            请上传大小不超过${props.fileSize}MB，格式为${props.fileType.join('、')}文件。`);
      }
      emit('load-failed', failedList);
      return false;
    }
  }
  return true;
}

function afterRead(filelist) {
  if (!Array.isArray(filelist)) {
    filelist = [filelist];
  }
  Toast.loading({
    message: '上传中...',
    forbidClick: true,
    duration: 0,
  });
  if (props.upload) {
    const fileUpload = filelist.map((obj) => props.upload(obj.file));

    Promise.all(fileUpload).then(() => {
      onSuccess();
      Toast.clear();
    }).catch(() => {
      Toast.clear();
      emit('on-failed');
    });
  } else {
    onSuccess();
  };
}

function onSuccess() {
  emit('update:modelValue', fileList.value);
  emit('on-success');
}
</script>

<style lang="less" scoped>
.uploader-button {
  .van-uploader__input-wrapper {
    width: 100%;
  }
  .uploader-tip {
    font-size: 12px;
    line-height: 1.5;
    span {
      color: #f56c6c
    }
  }
}
</style>
