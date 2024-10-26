<template>
  <v-container fluid class="no-padding">
    <v-tabs v-model="tab" background-color="primary" dark grow show-arrows>
        <v-tab @click="changeTab('login')">Login</v-tab>
        <v-tab @click="changeTab('register')">register</v-tab>
    </v-tabs>

    <router-view />
  </v-container>
</template>

<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';

const router = useRouter();
const tab = ref('login');

const changeTab = (tabName) => {
    tab.value = tabName;
    if(tabName === 'login'){
        router.push({name: 'login'})
    } else {
        router.push({name: 'register'})
    }
}
</script>

<style scoped>
.no-padding {
  padding: 0;
}

.v-tabs {
  background-color: white !important;
  width: 100%;
  max-width: 100%;
}

.v-tab {
  font-weight: bold;
}
</style>