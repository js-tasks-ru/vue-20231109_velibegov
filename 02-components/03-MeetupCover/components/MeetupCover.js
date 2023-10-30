import { defineComponent } from '../vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupCover',
  computed: {
    divStyle() {
      return {
        '--bg-url': this.image !== '' ? `url('${this.image}')` : null
      };
    }
  },
  props: {
    title: String,
    image: {
      type: String,
      default: '',
    }
  },


  template: `
    <div class="meetup-cover" :style=divStyle>
        <h1 class="meetup-cover__title">{{ this.title }}</h1>
    </div>`,
});
