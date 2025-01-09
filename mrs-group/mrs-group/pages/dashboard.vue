<template>
    <div class="flex flex-row justify-between p-3">
        <div>
        welcome
        {{ user?.name }}
    </div>

    <div>
        <UButton :loading="loading" @click="handleSubmit">Logout</UButton>

    </div>
    </div>
    

</template>

<script lang="ts" setup>
definePageMeta({
    middleware: ['sanctum:auth'],
});

const { logout } =  useSanctumAuth();
const loading = ref(false)

interface MyCustomUser {
    id: number;
    name:string;
    login: string;
    custom_metadata: {
        group: string;
        role: string;
    };
}

const user = useSanctumUser<MyCustomUser>();
console.log(user.value);


const handleSubmit = async () => {

    loading.value=true
  
    try {

        const response = await logout()
        loading.value=false
        console.log(response)
     
    } catch (error:any) {
      // Handle error
      console.error('Logout failed:', error.response?.data || error.message);
      loading.value=false
    }
}
</script>

<style scoped>

</style>