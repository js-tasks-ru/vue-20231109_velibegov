import { createApp } from './vendor/vue.esm-browser.js';

createApp({
  data() {
    return {
      a: 0,
      b: 0,
      operator: undefined,
    }
  },
  computed: {
    result() {
      switch (this.operator) {
        case 'sum':
          return this.a + this.b;
        case 'subtract':
          return this.a - this.b;
        case 'multiply':
          return this.a * this.b;
        case 'divide':
          return this.a / this.b;
        default:
          return 0;
      }
    }
  },
}).mount('#app');
