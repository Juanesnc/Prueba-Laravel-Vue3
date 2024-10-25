<template>
    <div class="modal-overlay" @click.self="close">
        <div class="modal-text">
            <h1 class="modal-title">Create</h1>
            <form class="form">
                <div class="form-group">
                    <label for="exampleInputName">Task Name</label>
                    <input type="text" class="form-control" aria-describedby="nameHelp"
                        placeholder="Enter name" v-model="title">
                </div>
                <div class="form-group">
                    <label for="exampleInputName">Task Name</label>
                    <input type="text" class="form-control" aria-describedby="nameHelp"
                        placeholder="Enter name" v-model="description">
                </div>
                <div class="form-group">
                    <label for="exampleInputName">Task Name</label>
                    <input type="date" class="form-control" aria-describedby="nameHelp"
                        placeholder="Enter name" v-model="due_date">
                </div>
                <div class="form-group">
                    <label for="exampleInputResponsible">responsible</label>
                    <select v-model="selectedCompany" class="form-control">
                        <option v-for="company in companies" :key="company.id" :value="company.name">{{ company.name }}</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary" @click.prevent="createTask">Submit</button>
                <p class="feedback">{{ feedback }}</p>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits, onMounted } from 'vue';
import useAuth from '@/store/auth';

const store = useAuth();
const title = ref('');
const description = ref(''); 
const due_date = ref('');
const selectedCompany = ref('');
const feedback = ref('');
const companies = ref([]);

const emits = defineEmits(['close', 'update'])

const close = () => {
    emits('update')
    emits('close')
}

const createTask = async () => {
    const idCompany = await store.getCompanyId(selectedCompany.value)
    const response = await store.createTask(title.value, description.value, due_date.value, idCompany.id) 
      if(response == false){
        feedback.value = 'Create error'
      } else {
        close();
      }
}

onMounted(async () => {
    companies.value = await store.fetchCompanies()
});

</script>

<style scoped lang="scss">
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 3px solid #ddd;
    border-radius: 5px;
    padding: 20px;
    max-width: 50%;
    max-height: 80%;
    background: white;
    text-align: center;
    cursor: default;
}

.modal-title {
    font-size: 2rem;
    margin-bottom: 20px;
}

.form {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
}

.form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    width: 100%;
}

.form-control {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.btn {
    padding: 10px 20px;
    margin-top: 10px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn:hover {
    background-color: #0056b3;
}

.feedback {
    margin-top: 10px;
    color: red;
}
</style>