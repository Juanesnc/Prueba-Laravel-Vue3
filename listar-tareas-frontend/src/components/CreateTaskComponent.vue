<template>
    <v-dialog class="container" v-model="isDialogOpen" persistent>
        <v-card>
            <v-card-title>
                <h1 class="modal-title">Create</h1>
            </v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field v-model="title" label="Task Title" placeholder="Enter task name"
                        :rules="[v => !!v || 'Task name is required']"></v-text-field>

                    <v-text-field v-model="description" label="Description" placeholder="Enter description"
                        :rules="[v => !!v || 'Description is required']"></v-text-field>

                    <v-text-field v-model="due_date" label="Due date" placeholder="Enter due date" type="date"
                        :rules="[v => !!v || 'Due date is required']"></v-text-field>

                    <v-select v-model="selectedCompany" :items="cleanCompanies" label="Responsible"
                        placeholder="Select a company" :rules="[v => !!v || 'A company must be selected']"></v-select>
                </v-form>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-btn type="submit" class="primary" @click.prevent="createTask"
                            style="width: 100%;">Submit</v-btn>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-btn text @click="close" style="width: 100%;">Cancel</v-btn>
                    </v-col>
                </v-row>
                <p class="feedback">{{ feedback }}</p>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, computed, defineEmits, onMounted } from 'vue';
import useAuth from '@/store/auth';

const store = useAuth();
const title = ref('');
const description = ref('');
const due_date = ref('');
const selectedCompany = ref('');
const feedback = ref('');
const companies = ref([]);
const valid = ref(false);
const isDialogOpen = ref(true);

const emits = defineEmits(['close', 'update'])

const close = () => {
    isDialogOpen.value = false
    emits('update')
    emits('close')
}

const createTask = async () => {
    feedback.value = ''

    if (!valid.value) {
        feedback.value = 'Please fill all required fields'
        return
    }
    const idCompany = await store.getCompanyId(selectedCompany.value)
    const response = await store.createTask(title.value, description.value, due_date.value, idCompany.id)
    if (response == false) {
        feedback.value = 'Create error'
    } else {
        close();
    }
}

onMounted(async () => {
    const companyData = await store.fetchCompanies()
    companies.value = companyData.map(company => ({
        name: company.name
    }))
});

const cleanCompanies = computed(() => companies.value.map(company => company.name));

</script>

<style scoped lang="scss">
.container {
    width: 500px;

    @media only screen and (max-width: 530px) {
        max-width: 100%;
    }
}

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