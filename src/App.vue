<script setup lang="ts">
import { onBeforeMount } from "vue";
import { PriceSort } from "./types/priceSort";
import { MaterialFilter } from "./types/materialFilter";
import { useStore } from "./stores/index";
import Item from "./components/Item.vue";
import Dropdown from "./components/Dropdown.vue";

const store = useStore();

onBeforeMount(() => {
  store.loadData();
  store.cartLoad();
  store.favouritesLoad();
});

const updatePriceSort = (value: PriceSort) => {
  store.priceSort = value;
};

const updateMaterialFilter = (value: MaterialFilter) => {
  store.materialFilter = value;
};
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
      <section class="dropdowns">
        <Dropdown
          name="sort-by-price"
          label="Сортировать по:"
          id="sort"
          nullishLabel="По умолчанию"
          :values="store.priceSortValues"
          @change="updatePriceSort($event)"
        />
        <Dropdown
          name="filter-by-material"
          label="Материал"
          id="filter"
          nullishLabel="Все"
          :values="store.materialFilterValues"
          @change="updateMaterialFilter($event)"
        />
      </section>
    </header>
    <section class="items-grid">
      <Item
        v-for="(item, idx) in store.getItems"
        :key="`item-${idx}`"
        :item="item"
        :isInCart="store.cart.includes(item.id)"
        :isInFav="store.favourites.includes(item.id)"
        @cartUpdate="store.cartUpdate($event)"
        @favouritesUpdate="store.favouritesUpdate($event)"
      />
    </section>
  </section>
</template>

<style lang="scss">
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

.dropdowns {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, 20rem);
  gap: 2.25rem 3rem;
}
</style>
