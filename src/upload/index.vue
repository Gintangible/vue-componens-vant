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

<script>
import { Button, Uploader, Toast } from 'vant';

export default {
  name: 'Upload',

  components: {
    [Uploader.name]: Uploader,
    [Button.name]: Button,
  },

  props: {
    // eslint-disable-next-line vue/require-default-prop
    value: [String, Object, Array],
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
    fileItemShow: Function,
    beforeDelete: Function,
    upload: Function,
  },

  data() {
    return {
      fileList: [],
    };
  },

  computed: {
    isButtonMode() {
      return this.mode === 'button';
    },
    maxSize() {
      return this.fileSize * 1024 * 1024;
    },
  },

  watch: {
    value: {
      deep: true,
      immediate: true,
      handler(val) {
        if (val) {
          const list = Array.isArray(val) ? val : this.value.split(',');
          this.fileList = list.map((item) => {
            if (typeof item === 'string') {
              item = { name: item, url: item };
            }
            item.name = item.fileName;
            item.url = this.fileItemShow ? this.fileItemShow(item) : item.url;
            const fileType = item.file?.name || item[this.contentType] || '';
            if (fileType.indexOf('image') > -1) {
              item.isImage = true;
            }
            return item;
          });
        }
      },
    },
  },

  methods: {
    beforeRead(files) {
      if (!Array.isArray(files)) {
        files = [files];
      }
      if (this.fileType.length) {
        const failedList = [];
        files.forEach((file) => {
          const type = file.type.split('/')[1];
          if (!this.fileType.includes(type)) {
            failedList.push(file.name);
          }
          if (this.maxSize) {
            const isLt = file.size < this.maxSize;
            if (!isLt) {
              failedList.push(file.name);
            }
          }
        });

        if (failedList.length) {
          if (!this.showTip) {
            Toast(`文件${failedList.join('、')}不符合格式要求
                请上传大小不超过${this.fileSize}MB，格式为${this.fileType.join('、')}文件。`);
          }
          this.$emit('load-failed', failedList);
          return false;
        }
      }
      return true;
    },
    afterRead(filelist) {
      if (!Array.isArray(filelist)) {
        filelist = [filelist];
      }
      Toast.loading({
        message: '上传中...',
        forbidClick: true,
        duration: 0,
      });
      if (this.upload) {
        const fileUpload = filelist.map((obj) => this.upload(obj.file));

        Promise.all(fileUpload).then(() => {
          this.onSuccess();
          Toast.clear();
        }).catch(() => {
          Toast.clear();
          this.$emit('on-failed');
        });
      } else {
        this.onSuccess();
      };
    },

    onSuccess() {
      this.$emit('input', this.fileList);
      this.$emit('on-success');
    },
  },
};
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
