import {defineComponent} from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from "../../06-MeetupView/components/MeetupView";
import {fetchMeetupById} from '../meetupService.js';

export default defineComponent({
  name: 'PageMeetup',
  props: {
    meetupId: {
      type: Number,
    }
  },
  data() {
    return {
      meetup: null,
      loading: false,
      error: '',
    }
  },

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  watch: {
    meetupId() {
      this.fetchData();
    }
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      this.loading = true;
      this.error = '';

      try {
        this.meetup = null;
        this.meetup = await fetchMeetupById(this.meetupId);
      } catch (error) {
        this.error = error.message;
      }
      this.loading = false;
    }
  },

  template: `
    <div class="page-meetup">
    <MeetupView v-if="meetup" :meetup="meetup"/>
    <UiContainer v-if="loading">
      <UiAlert :text="'Загрузка...'"/>
    </UiContainer>

    <UiContainer v-if="error">
      <UiAlert :text="error"/>
    </UiContainer>
    </div>`,
});
