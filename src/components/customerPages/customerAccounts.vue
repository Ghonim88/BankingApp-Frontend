<template>
this is bank accounts pages
</template>

<script setup>
import { useAccountStore } from '@/stores/accounts';
import { userAuthStore } from '@/stores/user-auth';
import { computed, ref, onMounted } from "vue";

const userStore = userAuthStore();
// const accountStore = 
const user = computed(() => userStore.user);
const userId = computed(() => user.value?.userId || '');

console.log(userId);

</script>