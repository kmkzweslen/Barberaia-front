<template>
  <div>
    <Header />
    <NavBar />
    <router-view />
  </div>
</template>
<script>
import Header from './components/Header.vue';
import NavBar from './components/NavBar.vue';

export default {
  components: { Header, NavBar }
}
</script>
