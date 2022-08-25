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
<script setup>
import { ref } from 'vue';
import FaqList from '../index.vue';
import FAQS from './faqs.js';

const faqs = ref(FAQS);
</script>
