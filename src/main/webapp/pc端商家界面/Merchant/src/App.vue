<template>
  <div id="app">
    <modelHeader />
    <router-view />
  </div>
</template>

<script>
import modelHeader from "./components/modelHeader.vue";
export default {
  name: "app",
  components: { modelHeader }
};
</script>

<style>
</style>
