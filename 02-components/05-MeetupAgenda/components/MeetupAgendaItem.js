import { defineComponent } from '../vendor/vue.esm-browser.js';
import { agendaItemIcons, agendaItemDefaultTitles } from '../meetupService.js';

export default defineComponent({
  name: 'MeetupAgendaItem',
  props: {agendaItem: Object},
  methods: {
    getIcon() {
      return `/assets/icons/icon-${agendaItemIcons[this.agendaItem['type']]}.svg`;
    },
    getTitle() {
      return this.agendaItem['title'] ?? agendaItemDefaultTitles[this.agendaItem['type']]
    },
    getDuration() {
      return `${this.agendaItem['startsAt']} - ${this.agendaItem['endsAt']}`;
    },
    isTalkType() {
      return this.agendaItem['type'] === 'talk';
    }
  },
  template: `
    <div class="agenda-item">
      <div class="agenda-item__col">
        <img :src="getIcon()" class="icon" alt="key" />
      </div>
      <div class="agenda-item__col">{{ getDuration() }}</div>
      <div class="agenda-item__col">
        <h3 class="agenda-item__title">{{ getTitle() }}</h3>
        <p class="agenda-item__talk" v-show="isTalkType()">
          <span>{{ agendaItem['speaker'] }}</span>
          <span class="agenda-item__dot"></span>
          <span class="agenda-item__lang">{{ agendaItem['language'] }}</span>
        </p>
        <p>{{ agendaItem['description'] ?? '' }}</p>
      </div>
    </div>`,
});
