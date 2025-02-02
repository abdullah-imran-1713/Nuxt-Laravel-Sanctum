<template>
    <div class="min-h-screen flex items-center justify-center bg-primary-50">
      <div class="bg-primary-50 p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 class="text-2xl font-semibold text-center mb-6 text-gray-800">Login Page</h1>
  
        <form @submit.prevent="handleSubmit">
          <!-- Email Field -->
          <div class="mb-4">
            <Label for="email" class="block text-sm font-medium text-gray-700">Email</Label>
            <UInput
              id="email"
              type="email"
              v-model="email"
              placeholder="Enter your email"
              color="gray"
              icon="i-heroicons-envelope"
              variant="outline"
              required
            />
          </div>
  
          <!-- Password Field -->
          <div class="mb-6">
            <Label for="password" class="block text-sm font-medium text-gray-700">Password</Label>
            <UInput
              id="password"
              type="password"
              v-model="password"
              icon="i-material-symbols-lock-open-rounded"
              placeholder="Enter your password"
              color="gray"
              variant="outline"
              required
            />
          </div>
  
          <!-- Remember Me Checkbox -->
          <div class="mb-4 flex items-center">
            <UCheckbox
              v-model="rememberMe"
              name="remember_me"
              label="Remember me"
            />
          </div>
  
          <!-- Submit Button -->
          <div class="w-full">
            <UButton type="submit" :loading="loading" :disabled="loading" class="w-full bg-gray-400 text-gray-800 px-2 py-2">
              Login
            </UButton>
            <p class="text-black mt-2">Don't have a account? <NuxtLink to="/auth/register" class="text-blue-500 hover:underline">Register</NuxtLink></p>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';

  definePageMeta({
    middleware: ['sanctum:guest'],
});
  
  // Define reactive variables for form fields
  const email = ref('');
  const password = ref('');
  const rememberMe = ref(false);
  const { login } =  useSanctumAuth();
  const loading =ref(false);

  // Handle form submission and send login request
  const handleSubmit = async () => {
    loading.value=true;
    const loginData = {
      email: email.value,
      password: password.value,
      // remember: rememberMe.value, // Adjusted key for compatibility with Laravel's Sanctum
    };
  
    try {

        const response = await login(loginData)
        loading.value=false
        console.log(response)
     
    } catch (error) {
      // Handle error
      console.error('Login failed:', error.response?.data || error.message);
      loading.value=false
    }
  };
  </script>
  