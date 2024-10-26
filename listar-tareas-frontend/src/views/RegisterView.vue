<template>
  <v-container fluid fill-height>
    <v-row justify="center" align="center" style="height: 100vh;">
      <v-col cols="12" sm="6">
        <div class="modal-text">
          <h1 class="title">Register</h1>
          <v-form v-model="valid" @submit.prevent="createUser">
            <v-text-field v-model="name" label="User name" placeholder="Enter user name" requied outlined :rules="[v => !!v || 'Name is required']">
            </v-text-field>
            <v-text-field v-model="email" label="Email address" placeholder="Enter email"  required outlined :rules="[v => !!v || 'Email is required']">
            </v-text-field>
            <v-text-field v-model="password" label="Password" placeholder="Password" required outlined :rules="[v => !!v || 'Password is required']" type="password">
            </v-text-field>
            <v-btn type="submit">Submit</v-btn>
            <p class="message-error">{{ feedback }}</p>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import useAuth from '@/store/auth'
import router from '@/router'
import Swal from 'sweetalert2'

const store = useAuth();
const name = ref('');
const email = ref('');
const password = ref('');
const feedback = ref('');
const valid = ref(false);

const createUser = async () => {
  feedback.value = ''

  if(!valid.value) {
        return
    }
  try {
    feedback.value = 'Sending...'
  const response = await store.register(name.value, email.value, password.value)

  if (response == false) {
    feedback.value = 'Error'
  } else {
    Swal.fire({
        position: "center",
        icon: "success",
        title: "successful register",
        showConfirmButton: false,
        timer: 1500
      });
    const userId = await store.getUserId();
    router.push({ name: 'tasks', params: { id: userId } })
  }
  } catch (err) {
    console.error(err);
    feedback.value = 'Ingrese todos los datos requeridos de forma correcta' || 'Registration failed';
  }
}
</script>

<style scoped lang="scss">
.modal-text {
  border: 1.5px solid $borderImage;
  border-radius: 5px;
  padding: 3rem;
  position: relative;
  background: $backGroundModal;
  text-align: center;
  max-width: 500px;
  margin: auto;
  min-width: 300px;
  cursor: default;
  filter:drop-shadow(2px 2px 20px rgb(61, 60, 60));
}

.title {
  padding: 20px;
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

.link {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  background-color: transparent;
  text-decoration: none;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

.link:hover {
  text-decoration: underline;
}

.message-error {
  padding-top: 10px;
}
</style>