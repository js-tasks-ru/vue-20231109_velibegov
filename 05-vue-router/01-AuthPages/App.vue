<template>
  <div class="wrapper">
    <MeetupsHeader/>
    <main class="main">
      <component :is="currentPage" />
    </main>
    <MeetupsFooter/>
  </div>
</template>

<script>
import MeetupsHeader from './components/MeetupsHeader.vue';
import MeetupsFooter from './components/MeetupsFooter.vue';
import PageIndex from "./views/PageIndex.vue";
import PageLogin from "./views/PageLogin.vue";
import PageRegister from "./views/PageRegister.vue";

export default {
  name: 'App',

  components: {
    MeetupsFooter,
    MeetupsHeader,
    PageIndex,
    PageLogin,
    PageRegister,
  },

  computed: {
    currentPage() {
      return this.$route.path === '/' ? PageIndex : this.$route.path === '/login' ? PageLogin : PageRegister;
    },
  }
};

</script>

<style>
@import '@/assets/styles/_fonts.css';
@import '@/assets/styles/_variables.css';
@import '@/assets/styles/_common.css';

.wrapper {
  background-color: var(--grey-light);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1 0 auto;
}
</style>
