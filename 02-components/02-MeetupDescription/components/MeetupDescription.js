import { defineComponent } from '../vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupDescription',
  props: {
    description: String,
    default: undefined,
  },

  template: `<p class="meetup-description">{{ this.description }}</p>`,
});
