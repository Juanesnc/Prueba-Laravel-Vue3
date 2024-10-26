import { defineStore } from "pinia";

const useAuth = defineStore('auth', {
    state: () => {
        return {
            token: localStorage.getItem('token') || null,
            user: localStorage.getItem('user') || null,
            baseURL: 'http://127.0.0.1:8000/api/auth'
        }
    },
    actions: {
        async getUserId() {
            return this.user
        },
        async register(name, email, password) {
            try {
                const uri = `${this.baseURL}/register`
                const rawResponse = await fetch(uri, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'Application/json',
                        'Accept': 'Application/json'
                    },
                    body: JSON.stringify({
                        'name': name,
                        'email': email,
                        'password': password
                    })
                })

                const response = await rawResponse.json()
                this.user = response.user.id

                if (response.status == false) {
                    return false;
                } else {
                    this.token = response.token
                    localStorage.setItem('token', response.token)
                    return true;
                }
            } catch (error) {
                console.error('Register error: ', error.message);
                throw error;
            }
        },
        async login(email, password) {
            try {
                const uri = `${this.baseURL}/login`
                const rawResponse = await fetch(uri, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'Application/json',
                        'Accept': 'Application/json'
                    },
                    body: JSON.stringify({
                        'email': email,
                        'password': password
                    })
                })

                const response = await rawResponse.json()
                this.user = await response.id

                if (response.status == false) {
                    this.token = null
                    return false;
                } else {
                    this.token = response.token
                    localStorage.setItem('user', this.user)
                    localStorage.setItem('token', response.token)
                    return true;
                }
            } catch (error) {
                console.error('Login error: ', error.message);
                throw error;
            }
        },
        async getTasks(id, name, status, due_date) {
            const queryParams = new URLSearchParams({
                name: name,
                status: status,
                due_date: due_date
            })
            const uri = `${this.baseURL}/tasks/${id}?${queryParams}`
            const rawResponse = await fetch(uri, {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json',
                    'Accept': 'Application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            })
            const response = await rawResponse.json()
            return response
        },
        async fetchCompanies() {
            const uri = `${this.baseURL}/companies`
            const rawResponse = await fetch(uri, {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json',
                    'Accept': 'Application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            });
            const response = await rawResponse.json()
            return response
        },
        async getCompanyId(name) {
            const uri = `${this.baseURL}/company/${name}`
            const rawResponse = await fetch(uri, {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json',
                    'Accept': 'Application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            });
            const response = await rawResponse.json()
            return response
        },
        async createTask(title, description, due_date, company_id) {
            const uri = `${this.baseURL}/task`
            const rawResponse = await fetch(uri, {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json',
                    'Accept': 'Application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify({
                    'title': title,
                    'description': description,
                    'due_date': due_date,
                    'company_id': company_id
                })
            })
            const response = await rawResponse.json()
            if (response.status == false) {
                return false
            } else {
                return true
            }
        },
        async updateTask(TaskId, title, description, due_date, company_id, status) {
            const uri = `${this.baseURL}/task/${TaskId}`
            const rawResponse = await fetch(uri, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'Application/json',
                    'Accept': 'Application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify({
                    "id": TaskId,
                    'user_id': this.user,
                    'title': title,
                    'description': description,
                    'due_date': due_date,
                    'company_id': company_id,
                    'status': status
                })
            })
            const response = await rawResponse.json()
            if (response.status == false) {
                return false
            } else {
                return true
            }
        },
        async deleteTask(TaskId) {
            const uri = `${this.baseURL}/task/${TaskId}`
            const rawResponse = await fetch(uri, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'Application/json',
                    'Accept': 'Application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            })
            const response = await rawResponse.json()
            if (response.status == false) {
                return false
            } else {
                return true
            }
        },
        logout() {
            this.token = null
            localStorage.removeItem('token')
        }
    }
})

export default useAuth