<template>
  <div id="app">
    <model />
    <router-view />
  </div>
</template>

<script>
import model from "./components/model.vue";
export default {
  name: "app",
  components: {
    model
  }
};
</script>

<style>
@import url(./assets/public.css);
</style>
