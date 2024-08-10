<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useStore } from "./stores/index";

const store = useStore();

onBeforeMount(() => {
  store.loadData();
});
</script>

<template></template>

<style></style>
