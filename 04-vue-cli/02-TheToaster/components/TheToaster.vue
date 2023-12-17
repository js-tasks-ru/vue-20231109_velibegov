<template>
  <div>
    <ToastList>
      <template v-for="(toast, index) in toasts" :key="index">
        <UiToast :toast="toast" @hide-toast="hideToast(toast)"/>
      </template>
    </ToastList>
  </div>
</template>

<script>
import ToastList from "./ToastList.vue";
import UiToast from "./UiToast.vue";

export default {
  name: 'TheToaster',

  data() {
    return {
      basicOptions: {
        showToast: true,
        disableTime: 5000,
      },
      toasts: [],
    }
  },

  components: {ToastList, UiToast},

  methods: {
    success(message) {
      const options = {
        toastClass: 'toast_success',
        toastIconSrc: 'check-circle',
        toastMessage: message,
      };
      this.addToast({...options, ...this.basicOptions});
    },

    error(message) {
      const options = {
        toastClass: 'toast_error',
        toastIconSrc: 'alert-circle',
        toastMessage: message,
      };
      this.addToast({...options, ...this.basicOptions});
    },

    addToast(toastOptions) {
      this.toasts.push(toastOptions);
    },

    hideToast(toast) {
      toast.showToast = false;
    },
  },
};
</script>
