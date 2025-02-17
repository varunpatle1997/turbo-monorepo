<script setup lang="ts">
import { useAuthStore } from '@/modules/auth/store';

const authStore = useAuthStore();
</script>

<template>
  <div>
    <h1>Dashboard</h1>
    <p>Welcome, {{ authStore.user?.email || 'Guest' }}</p>
  </div>
</template>
