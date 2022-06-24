<template>
  <div>
    <faq-list
      :faqs="faqs"
      q-key="problem"
    />
    <faq-list
      :faqs="faqs"
      filter="f1"
      q-key="problem"
      :default-show-length="3"
    />
    <faq-list
      :faqs="faqs"
      filter="f2"
      q-key="problem"
      :default-show-length="10"
    />
  </div>
</template>
<script>
import FaqList from '../index';
import FAQS from './faqs';

// FaqList 的使用例子。

export default {
  name: 'faq-list-demo',
  components: {
    [FaqList.name]: FaqList,
  },
  data() {
    return {
      faqs: FAQS,
    };
  },
};
</script>
