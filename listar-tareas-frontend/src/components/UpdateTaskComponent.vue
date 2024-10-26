<template>
    <v-dialog class="container" v-model="isDialogOpen" persistent>
        <v-card>
            <v-card-title>
                <h1 class="modal-title">Update</h1>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="title" label="Task Name"
                                placeholder="Enter task name"></v-text-field>

                            <v-text-field v-model="description" label="Description"
                                placeholder="Enter description"></v-text-field>

                            <v-text-field v-model="due_date" label="Due date" placeholder="Enter due date" type="date"></v-text-field>

                            <!-- <v-menu v-model="menu" close-on-content-click offset-y>
                                <template v-slot:activator="{ props }">
                                    <v-text-field v-bind="props" v-model="due_date"  label="Due date" prepend-icon="date" ></v-text-field>
                                    <v-date-picker v-model="due_date" @change="closeMenu" :min="minDate" locale="es"></v-date-picker>
                                </template>
</v-menu> -->
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-select v-model="selectedCompany" :items="cleanCompanies" label="Responsible"
                                placeholder="Select a company"></v-select>

                            <v-select v-model="status" :items="statusOptions" label="Status"
                                placeholder="Select a status"></v-select>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-btn color="blue darken-1"
                    @click.prevent="updateTask(taskId, task.title, task.description, task.due_date, task.company_id, task.status)">Update</v-btn>
                <v-btn text @click="close">Cancel</v-btn>
            </v-card-actions>
            <p class="feedback">{{ feedback }}</p>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits, onMounted } from 'vue';
import useAuth from '@/store/auth';

const store = useAuth();
const title = ref('');
const description = ref('');
const due_date = ref('');
const selectedCompany = ref('');
const statusOptions = ['pending', 'in_progress', 'finalized'];
const companies = ref([]);
const idCompany = ref('');
const status = ref('');
const feedback = ref('');
const isDialogOpen = ref(true);

// const menu = ref(false)

// const closeMenu = () => {
//     menu.value = false
// }

// const minDate = new Date().toISOString().substring(0, 10)

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    task: {
        type: Object,
        required: true
    },
    taskId: {
        type: String,
        required: true
    }
})

const emits = defineEmits(['close', 'update'])

const close = () => {
    isDialogOpen.value = false
    emits('close')
    emits('update')
}

const updateTask = async (taskId, titleUpdate, descriptionUpdate, due_dateUpdate, companyUpdate, statusUpdate) => {

    if (title.value === '') {
        title.value = titleUpdate
    }
    if (description.value === '') {
        description.value = descriptionUpdate
    }
    if (due_date.value === '') {
        due_date.value = due_dateUpdate
    }
    if (selectedCompany.value !== '') {
        idCompany.value = await store.getCompanyId(selectedCompany.value)
        idCompany.value = idCompany.value.id
    } else {
        idCompany.value = companyUpdate
    }
    if (status.value === '') {
        status.value = statusUpdate
    }

    const response = await store.updateTask(taskId, title.value, description.value, due_date.value, idCompany.value, status.value)

    if (response == false) {
        feedback.value = 'Update error'
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
    max-width: 60%;
}

.modal-title {
    font-size: 24px;
    font-weight: bold;
    color: #1976d2;
    margin-bottom: 20px;
}

.feedback {
    margin-top: 20px;
    color: #f44336;
    font-weight: bold;
}

.v-container {
    padding: 16px;
}

.v-col {
    margin-bottom: 16px
}

.v-btn {
    font-size: 16px;
}

.v-text-field {
    margin-bottom: 16px;
}

.v-select {
    margin-bottom: 16px;
}
</style>