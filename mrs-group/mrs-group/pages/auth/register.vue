<template>
  <div class="min-h-screen flex items-center justify-center bg-primary-50">
    <div class="bg-primary-50 p-8 rounded-lg shadow-md w-full max-w-sm">
      <h1 class="text-2xl font-semibold text-center mb-6 text-gray-800">Register</h1>

      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <Label for="name" class="block text-sm font-medium text-gray-700">Name</Label>
          <UInput
            id="name"
            type="text"
            v-model="name"
            placeholder="Enter your name"
            color="gray"
            icon="i-heroicons-user"
            variant="outline"
            required
          />
        </div>

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

        <div class="mb-6">
          <Label for="password_confirmation" class="block text-sm font-medium text-gray-700">Confirm Password</Label>
          <UInput
            id="password_confirmation"
            type="password"
            v-model="password_confirmation"
            icon="i-material-symbols-lock-open-rounded"
            placeholder="Confirm your password"
            color="gray"
            variant="outline"
            required
          />
        </div>

        <div class="w-full">
          <UButton type="submit" :loading="loading" :disabled="loading" class="w-full bg-gray-400 text-gray-800 px-2 py-2">
            Register
          </UButton>
          <p class="text-black mt-2">Already have an account? <NuxtLink to="/auth/login" class="text-blue-500 hover:underline">Login</NuxtLink></p>
        </div>
      </form>
      <div v-if="error" class="text-red-500 mt-2">{{ error }}</div>
    </div>
  </div>
</template>

<script setup>
import { useNuxtApp } from '#app';
import { useRouter } from 'nuxt/app';
import { ref } from 'vue';

const { $axios } = useNuxtApp(); // Access $axios correctly
const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');
const password_confirmation = ref('');
const loading = ref(false);
const error = ref(null);

const handleSubmit = async () => {
  loading.value = true;
  error.value = null;

  if (password.value !== password_confirmation.value) {
    error.value = "Passwords do not match.";
    loading.value = false;
    return;
  }

  const xsrfToken = 'eyJpdiI6IlJGbkxYcGpjVHUvWCtabnFkaHN1ZGc9PSIsInZhbHVlIjoidnQvVmROZEF3MzRaZWc4UmlWZWZ0TkUzS0dkYjhYYmhkMUlheUQwR1p6WjcyUHplTnUwT1oxUlNoSEV6YW5UN3BxcHpqWmp5WmhsZkVXeFNrOEpJWE9wYWFEWnR2KzhqcTBLKzBVTEpxTk9TSGltZW80VTNxMjBrYitoRjJtQk0iLCJtYWMiOiJjYjc4ZTRhMGNiMWI2YmI5MWIyMDhjZjE2NWZhMzRkZWJlNDBmZDg2ZjJiYzMyN2QxMGVjOTNiN2Y4YmU2YmE4IiwidGFnIjoiIn0='; // Replace with your actual XSRF token

fetch('http://localhost:8000/register', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json', // Important: Specify content type
    'X-XSRF-TOKEN': xsrfToken,
  },
  body: JSON.stringify({ // Use JSON.stringify to format the request body
    name: name.value,
    email: email.value,
    password: password.value,
    password_confirmation: password_confirmation.value
  }),
  // credentials: 'include' // Crucial for sending cookies with the request
})
.then(response => {
  if (!response.ok) {
    return response.json().then(err => {throw new Error(err.message || response.statusText)}); // Handle errors
  }
  return response.json();
})
.then(data => {
  // ... handle the successful response (e.g., redirect, update UI) ...
  console.log('Success:', data);
})
.catch(error => {
  // ... handle errors (e.g., display error message) ...
  console.error('Error:', error);
});
};
</script>