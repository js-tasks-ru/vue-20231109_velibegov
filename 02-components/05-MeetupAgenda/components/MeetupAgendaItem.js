import { defineComponent } from '../vendor/vue.esm-browser.js';
import { agendaItemIcons, agendaItemDefaultTitles } from '../meetupService.js';

export default defineComponent({
  name: 'MeetupAgendaItem',

  props: {agendaItem: Object},

  computed: {
    icon() {
      return `/assets/icons/icon-${agendaItemIcons[this.agendaItem['type']]}.svg`;
    },
    title() {
      return this.agendaItem['title'] ?? agendaItemDefaultTitles[this.agendaItem['type']]
    },
    duration() {
      return `${this.agendaItem['startsAt']} - ${this.agendaItem['endsAt']}`;
    },
    isTalkType() {
      return this.agendaItem['type'] === 'talk';
    }
  },

  template: `
    <div class="agenda-item">
      <div class="agenda-item__col">
        <img :src="icon" class="icon" alt="key" />
      </div>
      <div class="agenda-item__col">{{ duration }}</div>
      <div class="agenda-item__col">
        <h3 class="agenda-item__title">{{ title }}</h3>
        <p class="agenda-item__talk" v-if="isTalkType">
          <span>{{ agendaItem['speaker'] }}</span>
          <span class="agenda-item__dot"></span>
          <span class="agenda-item__lang">{{ agendaItem['language'] }}</span>
        </p>
        <p>{{ agendaItem['description'] ?? '' }}</p>
      </div>
    </div>`,
});
