<template>
  <div>
    <h1>User Form</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Name:</label>
        <input id="name" v-model="user.name" type="text" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input id="email" v-model="user.email" type="email" required />
      </div>
      <button type="submit">Submit</button>
    </form>
    <p v-if="message">
      {{ message }}
    </p>
    <p v-if="error" style="color: red">
      {{ error }}
    </p>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import axios from "axios";
import { userSchema } from "@repo/zod-schemas";
import { z } from "zod";

export default {
  setup() {
    const user = ref({ name: "", email: "" });
    const message = ref("");
    const error = ref("");
    const apiBaseUrl = VITE_API_BASE_URL;

    const submitForm = async () => {
      try {
        userSchema.parse(user.value);

        const response = await axios.post(`${apiBaseUrl}/submit`, user.value);

        message.value = response.data.message;
        error.value = "";
      } catch (err: unknown) {
        if (err instanceof z.ZodError) {
          error.value = err.errors[0]?.message ?? "Invalid input";
        } else if ((err as any).response?.data?.error) {
          error.value = (err as any).response.data.error[0]?.message;
        } else {
          error.value = "An unexpected error occurred.";
        }

        message.value = "";
      }
    };

    return { user, message, error, submitForm };
  },
};
</script>
