import axios from 'axios';
import { defineStore } from 'pinia';
import type { User } from '~/types/dto';

export const useSessionStore = defineStore('session', () => {
    const baseUrl = ref('http://localhost:8000');

    const user = ref<User | undefined>(undefined);

    const isLoggedIn = computed(() => {
        return !!user.value;
    });

    async function refresh() {
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            const url = `${baseUrl.value}/auth/refresh`;
            const response = await axios.post(url, {
                refresh: refreshToken,
            });

            if (response.status === 200) {
                user.value = response.data as User;
                axios.defaults.headers.common['Authorization'] = `Bearer ${user.value.access}`;
                return true;
            }
        } catch (error) {
            return false;
        }
        return false;
    }

    async function register(email: string, password: string): Promise<void> {
        try {
            const params = {
                email: email,
                password: password,
            };
            const response = await axios.post(`${baseUrl.value}/auth/register`, params);
            user.value = response.data as User;
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.value.access}`;
            localStorage.setItem('refresh_token', response.data.refresh);
        } catch (error) {
            console.error('Registration failed:', error);
        }
    }

    async function login(email: string, password: string): Promise<void> {
        try {
            const params = {
                email: email,
                password: password,
            };
            const response = await axios.post(`${baseUrl.value}/auth/login`, params);
            user.value = response.data as User;
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.value.access}`;
            localStorage.setItem('refresh_token', response.data.refresh);
        } catch (error) {
            console.error('Login failed:', error);
        }
    }

    async function logout() {
        try {
            const params = {
                refresh: user.value?.refresh,
            };
            const response = await axios.post(`${baseUrl.value}/auth/logout`, params);
            user.value = undefined;
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }
    return {
        baseUrl,
        isLoggedIn,
        refresh,
        register,
        login,
        logout,
    };
});
