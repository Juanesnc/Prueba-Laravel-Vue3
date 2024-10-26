<template>
  <v-app class="custom-background">
      <TabsLayout v-if="isAuthRoute" style="min-height: 100vh;" />
      <router-view v-else />
  </v-app>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import TabsLayout from '@/layouts/TabsLayout.vue';

const router = useRouter();

const isAuthRoute = computed(() => {
  return router.currentRoute.value.name === 'login' || router.currentRoute.value.name === 'register';
})
</script>

<style lang="scss">
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  font-family: Avenir, Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $textColor;
}

html,
body {
  overflow: hidden;
  transition: background 2s ease;
}

.custom-background {
  background: $backgroundGlobal !important; 
}

.v-application--wrap {
  min-height: 100vh;
}
</style>