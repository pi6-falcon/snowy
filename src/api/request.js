import { instance, Axios } from './config';

import notifications from '../mixins/notifications';
import {mapActions, mapGetters} from "vuex";

const request = {
    computed: {
        ...mapGetters('user', {
            authenticated: 'isAuthenticated',
            token: 'userToken',
            username: 'username'
        })
    },
    methods: {
        ...mapActions('user', [
            'authUser',
            'deleteUser',
        ]),
        async getCreatedURL(URL) {
            const requestTo = URL ? `url/${URL}/metric` : 'url';
            try {
                const response = await instance.get(requestTo, {
                    headers: {
                        'Authorization': 'Bearer ' + this.token
                    }
                });
                return response.data;
            } catch (error) {
                notifications(error.response.data.message, 'error');
                throw new Error(error);
            }
        },
        async createURL(data, custom, message) {
            const headers = this.token ? { Authorization: 'Bearer ' + this.token } : { 'Temporary-User': true }
            const URL = custom ? '/url/custom' : '/url'
            try {
                const response = await instance.post(URL, data, {
                    headers,
                });
                if (!this.token) {
                    const user = {
                        created_at: '',
                        token: response.headers['temporary-user-auth'],
                        authenticated: false,
                    }
                    this.authUser(user)
                    console.log(response.headers['temporary-user-auth'])
                }
                notifications(message, 'success');
                return response.data || [{}];
            } catch (error) {
                notifications(error.response.data.message, 'error');
                throw new Error(error);
            }
        },
        async createUserRequest(user) {
            try {
                const response = await instance.post('/user', user);
                sessionStorage.setItem('token', response.data.username);
                notifications('user created successfully', 'success');
                return response.data;
            } catch (error) {
                notifications(error.response.data.message, 'error');
                throw Error(error);
            }
        },
        async authUserRequest(user) {
            try {
                const response = await instance.post('/auth', user);
                notifications('User authenticated!', 'success');
                return response.data || [{}];
            } catch (error) {
                notifications(error.response.data.message, 'error');
                throw new Error(error);
            }
        },
        async deleteUserRequest() {
            const requestTo = `/user/${this.username}`;
            try {
                await instance.delete(requestTo, {
                    headers: {
                        'Authorization': 'Bearer ' + this.token
                    }
                });
                this.deleteUser()
                notifications('User deleted!', 'success');
            } catch (error) {
                notifications(error.response.data.message, 'error');
                throw new Error(error);
            }
        },
        async deleteURLRequest(url) {
            const requestTo = `/url/${url}`;
            try {
                await instance.delete(requestTo, {
                    headers: {
                        'Authorization': 'Bearer ' + this.token
                    }
                });
                notifications('URL deleted!', 'success');
            } catch (error) {
                notifications(error.response.data.message, 'error');
                throw new Error(error);
            }
        },
        async updatePasswordRequest(body) {
            const requestTo = `/user/${this.username}`;
            try {
                const response = await instance.put(requestTo, body, {
                    headers: {
                        'Authorization': 'Bearer ' + this.token
                    }
                });
                console.log(response)
                notifications('Password Update!', 'success');
                return response.data
            } catch (error) {
                notifications(error.response.data.message, 'error');
                throw new Error(error);
            }
        },
        async getLinkPreviewRequest(url) {
            try {
                const response = await Axios.get(`http://api.linkpreview.net/?key=ac0d62d160025f3926238e251e2528e3&q=${url}`);
                //notifications(message, 'success');
                return response.data;
            } catch (error) {
                //notifications(error.response.data.message, 'error');
                throw new Error(error);
            }
        },
    },
};

export { request };
