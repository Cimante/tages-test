<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useStore } from "./stores/index";

const store = useStore();

onBeforeMount(() => {
  store.loadData();
});
</script>

<template>
  <section class="container">
    <header>
      <nav class="breadcrumbs">
        <ul class="breadcrumbs__list">
          <li
            class="breadcrumbs__item"
            v-for="item in store.breadcrumbs"
            :key="item"
          >
            <span>{{ item }}</span>
          </li>
        </ul>
      </nav>
      <h1 class="title">{{ store.breadcrumbs.at(-1) }}</h1>
    </header>
  </section>
</template>

<style lang="scss">
@import "@/styles/variables.scss";

.container {
  margin: 0 11.25vw;
}

.breadcrumbs__list {
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
}

.breadcrumbs__item {
  display: inline;
  color: $grey-2;
  font-size: 1rem;
  transition: color 0.3s ease;

  &:last-child,
  &:hover {
    cursor: default;
    color: $black;
  }

  &:not(:last-child) {
    cursor: pointer;
  }

  & + &::before {
    content: "/\00a0";
    padding: 16px;
    color: $grey-2;
  }
}

.title {
  font-size: 3rem;
}
</style>
