<template>
  <div id="app">
    <modelNew />
    <!-- <model /> -->
  </div>
</template>

<script>
import model from "./components/model.vue";
import modelNew from "./components/modelNew.vue";
export default {
  name: "app",
  components: {
    model,
    modelNew
  }
};
</script>

<style>
@import url(./assets/public.css);
</style>
