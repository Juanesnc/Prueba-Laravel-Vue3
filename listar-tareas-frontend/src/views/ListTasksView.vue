<template>
  <div>
    <v-container class="container" fluid>
      <v-row class="align-center justify-space-between my-3">
        <v-col cols="12" md="10" class="title-text titleClass">
          <h1>TaskList</h1>
        </v-col>
        <v-col cols="12" md="2" class="btnlogout">
          <v-btn @click.prevent="logout" text color="red" class="logout-button">Logout</v-btn>
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <v-row class="align-center justify-center mb-4">
        <v-col cols="12" md="2">
          <v-btn @click="openModalCreate" color="blue" style="width: 100%;">Create</v-btn>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field v-model="filter.title" label="Search By Title..." outlined dense></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-select v-model="filter.status" :items="statusOptions" label="All states" outlined dense></v-select>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field v-model="filter.due_date" label="Due date" placeholder="Enter due date"
            type="date"></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-btn @click="filterTasks()" color="secondary" style="width: 100%;">Filtrar</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <div>
    <v-container class="containerList" v-show="showMessage">
      <v-row v-if="tasks.length > 0">
        <v-col>
          <v-table class="database-table">
            <thead>
              <tr>
                <th scope="col" class="text-center">Titulo</th>
                <th scope="col" class="text-center">Descripcion</th>
                <th scope="col" class="text-center">Estado</th>
                <th scope="col" class="text-center">Fecha de Asignacion</th>
                <th scope="col" class="text-center">Compañia Encargada</th>
                <th scope="col" class="text-center" colspan="2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="task in tasks" :key="task.id">
                <td>{{ task.title }}</td>
                <td class="description-cell">{{ task.description }}</td>
                <td>{{ task.status }}</td>
                <td>{{ task.due_date }}</td>
                <td>{{ task.company.name }}</td>
                <td><v-btn @click="openModalUpdate(task)" color="warning" text>Update</v-btn></td>
                <td><v-btn @click="showDeleteAlert(task.id)" color="danger" text>Delete</v-btn></td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
      <v-row else>
        <v-col v-if="showMessage && tasks.length == 0">
          <p>No data yet.</p>
        </v-col>
      </v-row>


    </v-container>
  </div>
  <CreateTaskComponent v-if="showModalC" @close="closeModalCreate" @update="filterTasks()" />
  <UpdateTaskComponent v-if="showModalU" :task="selectedTask" :taskId="taskId" @close="closeModalUpdate()"
    @update="filterTasks()" />
</template>

<script setup>
import useAuth from '@/store/auth';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';
import Swal from 'sweetalert2'
import CreateTaskComponent from '@/components/CreateTaskComponent.vue';
import UpdateTaskComponent from '@/components/UpdateTaskComponent.vue';

const route = useRoute();
const store = useAuth();
const tasks = ref([]);
const selectedTask = ref([]);
const filter = ref({
  title: '',
  status: '',
  due_date: '',
})
const statusOptions = ['pending', 'in_progress', 'finalized'];
const id = route.params.id;
const taskId = ref('')

const showModalC = ref(false);
const showModalU = ref(false);
const showMessage = ref(false);

onMounted(async () => {
  tasks.value = await store.getTasks(id, filter.value.title, filter.value.status, filter.value.due_date);
  setTimeout(() => {
    showMessage.value = true;
  }, 500);
})

const openModalCreate = () => {
  showModalC.value = true;
}

const openModalUpdate = (task) => {
  selectedTask.value = task;
  taskId.value = task.id;
  showModalU.value = true;
}

const closeModalCreate = () => {
  showModalC.value = false
}

const closeModalUpdate = () => {
  showModalU.value = false
}

const showDeleteAlert = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#88C273",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
      deleteTask(id);
    }
  });
}

const deleteTask = async (idD) => {
  store.deleteTask(idD);
  filterTasks()
}

const filterTasks = async () => {
  tasks.value = await store.getTasks(id, filter.value.title, filter.value.status, filter.value.due_date);
  filter.value.title = '';
  filter.value.status = '';
  filter.value.due_date = '';
}


const logout = () => {

  Swal.fire({
    title: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#88C273",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, logout!"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "logout!",
        text: "Have a nice day!.",
        icon: "success"
      });
      store.logout()
      router.push({ name: 'login' })
    }
  });
}
</script>

<style scoped lang="scss">
.container {
  max-width: 90%;
  max-height: 800px;
  margin: auto;
  margin-top: 2rem;
  margin-bottom: 2rem;
  background-color: white !important;
  border: 1.5px solid $borderImage;
  border-radius: 5px;
  padding: 3rem;
  filter: drop-shadow(2px 2px 20px rgb(61, 60, 60));

  @media only screen and (max-width: 750px) {
    max-width: 500px;
  }

  @media only screen and (max-width: 560px) {
    max-width: 450px;
  }

  @media only screen and (max-width: 480px) {
    max-width: 330px;
  }
}

.containerList {
  max-width: 90%;
  max-height: 800px;
  margin: auto;
  margin-bottom: 2rem;
  background-color: #f5f5f5 !important;
  border: 1.5px solid $borderImage;
  border-radius: 5px;
  filter: drop-shadow(2px 2px 20px rgb(61, 60, 60));

  @media only screen and (max-width: 750px) {
    max-width: 500px;
  }

  @media only screen and (max-width: 560px) {
    max-width: 450px;
  }

  @media only screen and (max-width: 480px) {
    max-width: 330px;
  }
}

.v-row>.v-col {
  margin: 0 10px;
  justify-content: center;
}

.description-cell {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.title {
  font-size: 2rem;
  font-weight: bold;
}

.logout-button {
  background-color: #f44336;
  color: white;
  width: 100%;
}

.logout-button:hover {
  opacity: 0.9;
}

.v-btn {
  margin: auto;
  margin-top: -10px;
}

.v-divider {
  margin: 20px 0;
}

.div {
  width: 100%;
}

.filters .v-col {
  margin-bottom: 10px;
}

.database-table {
  border-collapse: collapse;
  width: 100%;
}

.database-table th,
.database-table td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
}

.database-table th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.database-table tr:hover {
  background-color: #f1f1f1;
}

.text-center {
  text-align: center;
}

.btnlogout {
  text-align: right;

  @media only screen and (max-width: 960px) {
    text-align: center;
  }
}

.titleClass {
  text-align: justify;

  @media only screen and (max-width: 960px) {
    text-align: center;
  }
}
</style>