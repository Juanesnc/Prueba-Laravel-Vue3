<template>
  <v-container fluid fill-height>
    <v-row justify="center" align="center" style="height: 100vh;">
      <v-col cols="12" sm="6">
        <div class="modal-text">
          <h1 class="title">Login</h1>
          <v-form v-model="valid" @submit.prevent="loginUser">
            <v-text-field v-model="email" label="Email address" placeholder="Enter email" outlined
              :rules="[v => !!v || 'Email is required']"></v-text-field>
            <v-text-field v-model="password" label="Password" placeholder="Enter password" outlined
              :rules="[v => !!v || 'Password is required']" type="password"></v-text-field>
            <v-btn type="submit">Submit</v-btn>
            <p class="message-error">{{ feedback }}</p>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import useAuth from '@/store/auth';
import router from '@/router';
import Swal from 'sweetalert2';

const store = useAuth();
const email = ref('');
const password = ref('');
const userId = ref('');
const feedback = ref('');
const valid = ref(false);

const loginUser = async () => {
  feedback.value = ''

  try {
    if (!valid.value) {
      return
    }
    const response = await store.login(email.value, password.value)
    if (response == false) {
      feedback.value = 'Login error'
    } else {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "successful login",
        showConfirmButton: false,
        timer: 1500
      });
      userId.value = await store.getUserId();
      router.push({ name: 'tasks', params: { id: userId.value } })
    }
  } catch (err) {
    feedback.value = 'Ingrese todos los datos requeridos' || 'Login failed';
  }
}
</script>

<style scoped lang="scss">
.modal-text {
  border: 1.5px solid $borderImage;
  border-radius: 5px;
  position: relative;
  padding: 3rem;
  background: $backGroundModal;
  text-align: center;
  max-width: 500px;
  margin: auto;
  min-width: 300px;
  cursor: default;
  filter: drop-shadow(2px 2px 20px rgb(61, 60, 60));
}

.register-section {
  padding: 16px;
  border-radius: 4px;
  margin-bottom: 16px;
  text-align: center;
  cursor: pointer;
}

.title {
  padding: 20px;
}

.form-style {
  flex-direction: column;
  padding: 10px;
}

.input-box {
  background-color: $colorBox;
  border-radius: 8px;
  border: 2px solid $borderImage;
}

.button-form {
  margin-top: 20px;
  width: 50%;
  justify-content: center;
  text-align: center;
  align-items: center;
  background: $colorButton;
  color: $textColor;
  border-radius: 8px;
  border: 2px solid $borderImage;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.message-error {
  padding-top: 10px;
}
</style>