<template>
  <div id="app">
    <model />
    <router-view />
  </div>
</template>
<script>
import model from "./components/model.vue";
export default {
  components: {
    model
  }
};
</script>
<style>
h1 {
  font-size: 20px;
  height: 30px;
  color: #8fd68b;
  line-height: 30px;
  overflow: hidden;
  text-align: center;
}
</style>
