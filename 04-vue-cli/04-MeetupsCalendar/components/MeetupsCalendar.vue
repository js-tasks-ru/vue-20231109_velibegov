<template>
  <div class="calendar-view">
    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button class="calendar-view__control-left" @click="getPreviousMonth()" type="button"
                aria-label="Previous month"></button>
        <div class="calendar-view__date">{{ currentDate }}</div>
        <button class="calendar-view__control-right" @click="getNextMonth()" type="button"
                aria-label="Next month"></button>
      </div>
    </div>

    <div class="calendar-view__grid">
      <div class="calendar-view__cell" :class="{'calendar-view__cell_inactive': day.inactive}"
           v-for="(day, index) in getMonthData()" :key="index" tabindex="0">
        <div class="calendar-view__cell-day">{{ day.dayNumber }}</div>
        <div class="calendar-view__cell-content" v-for="(title, titleIndex) in day.title" :key="titleIndex">
          <a v-if="title" :href="`/meetups/${titleIndex + 1}`" class="calendar-event">{{ title }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeetupsCalendar',

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      selectedDate: new Date(),
    }
  },

  computed: {
    currentDate() {
      return new Date(this.selectedDate).toLocaleDateString(navigator.language, {
        month: 'long',
        year: 'numeric',
      });
    },
  },

  methods: {
    getPreviousMonth() {
      this.selectedDate = new Date(this.selectedDate.setMonth(this.selectedDate.getMonth() - 1));
    },

    getNextMonth() {
      const date = new Date(this.selectedDate);
      const cachedDate = new Date(this.selectedDate);
      const nextDate = new Date(date.setMonth(date.getMonth() + 1));
      if ([1, -11].includes(nextDate.getMonth() - cachedDate.getMonth())) {
        this.selectedDate = nextDate;
      } else {
        cachedDate.setMonth(cachedDate.getMonth() + 1);
        cachedDate.setDate(0);
        this.selectedDate = new Date(cachedDate);
      }
    },

    getMonthDays() {
      const date = new Date(this.selectedDate);
      const year = date.getFullYear();
      const month = date.getMonth();

      date.setDate(0);

      const firstDayOfWeek = date.getDay();

      const prevMonthLastDate = new Date(year, month, 0).getDate();
      const prevMonthDays = prevMonthLastDate - firstDayOfWeek + 1;

      date.setMonth(month + 1, 0);
      const currentMonthDays = date.getDate();

      const calendar = [];
      let week = [];

      for (let i = 0; i < firstDayOfWeek; i++) {
        week.push({dayNumber: prevMonthDays + i, inactive: true, title: []});
      }

      for (let i = 1; i <= currentMonthDays; i++) {
        week.push({dayNumber: i, inactive: false, title: []});

        if (week.length === 7) {
          calendar.push(week);
          week = [];
        }
      }

      let nextMonthDay = 1;
      if (week.length) {
        while (week.length < 7) {
          week.push({dayNumber: nextMonthDay, inactive: true, title: []});
          nextMonthDay++;
        }
        calendar.push(week);
      }

      return calendar.flat();
    },

    getMonthData() {
      const currentMonthMeetups = this.getCurrentMonthMeetups();
      return this.getMonthDays().map((item) => {
        currentMonthMeetups.forEach((meetup) => {
          const date = new Date(meetup.date).getDate();
          if (item.dayNumber === date) {
            item.title.push(meetup.title);
          }
        });
        return item;
      });
    },

    getCurrentMonthMeetups() {
      return this.meetups.filter(meetup => this.isIdenticalDates(this.selectedDate, new Date(meetup.date)));
    },

    isIdenticalDates(calendarDate, meetupDate) {
      return calendarDate.getMonth() === meetupDate.getMonth()
        && calendarDate.getFullYear() === meetupDate.getFullYear();
    },
  },
};
</script>

<style scoped>
.calendar-view {
}

.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('@/assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}

.calendar-event {
  --max-lines: 2;
  --line-height: 16px;

  display: block;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  line-height: var(--line-height);
  color: var(--white);
  padding: 4px 6px;
  border-radius: 2px;
  background-color: var(--blue);
  margin-top: 4px;
}

@media all and (min-width: 767px) {
  .calendar-event {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: calc(var(--max-lines) * var(--line-height) + 6px);
  }
}
</style>
