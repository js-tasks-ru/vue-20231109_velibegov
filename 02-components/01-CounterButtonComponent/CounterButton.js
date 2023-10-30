import {defineComponent} from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',
  emits: ['update:count'],
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  methods: {
    incrementCounter() {
      this.$emit('update:count', this.count + 1);
    }
  },
  template: `<button type="button" @click="this.incrementCounter">{{ this.count }}</button>`,
});
