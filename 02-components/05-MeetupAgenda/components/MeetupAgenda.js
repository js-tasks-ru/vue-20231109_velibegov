import { defineComponent } from '../vendor/vue.esm-browser.js';
import MeetupAgendaItem from './MeetupAgendaItem.js';

export default defineComponent({
  name: 'MeetupAgenda',
  props: {agenda: Array},
  components: {
    MeetupAgendaItem
  },

  template: `
    <ul class="agenda">
      <li class="agenda__item" v-for="item in agenda" :key="agenda['id']">
        <MeetupAgendaItem :agenda-item="item"/>
      </li>
    </ul>`,
});
