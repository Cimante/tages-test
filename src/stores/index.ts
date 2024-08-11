import { defineStore } from "pinia";
import { Item } from "@/types/item";
import { Material } from "@/types/material";
import { PriceSort } from "@/types/priceSort";
import { MaterialFilter } from "@/types/materialFilter";
import { api } from "@/functions/api";

type dropdownValues = {
  name: string;
  value: string;
};

export const useStore = defineStore("store", {
  state: () => ({
    items: [] as Item[],
    materials: [] as Material[],
    breadcrumbs: ["Главная", "Системы хранения", "Комплекты стеллажных систем"],
    priceSort: "all" as PriceSort,
    materialFilter: "all" as MaterialFilter,
    priceSortValues: [
      {
        name: "По возрастанию",
        value: "asc",
      },
      {
        name: "По убыванию",
        value: "desc",
      },
    ] as dropdownValues[],

    materialFilterValues: [] as dropdownValues[],
  }),
  actions: {
    async loadData() {
      this.items = await api<Item[]>("/items.json");
      this.materials = await api<Material[]>("/materials.json");

      this.materials.forEach((material) => {
        this.materialFilterValues.push({
          name: material.name,
          value: material.id,
        });
      });
    },
  },
  getters: {
    getItems: (state) => {
      let filteredItems = [...state.items] as Item[];

      if (state.materialFilter !== "all") {
        filteredItems = state.items.filter(
          (item) => item.material === +state.materialFilter
        );
      }

      if (state.priceSort !== "all") {
        if (state.priceSort === "asc") {
          filteredItems = filteredItems.sort(
            (a, b) => a.price.current_price - b.price.current_price
          );
        } else if (state.priceSort === "desc") {
          filteredItems = filteredItems.sort(
            (a, b) => b.price.current_price - a.price.current_price
          );
        }
      }

      return filteredItems;
    },
  },
});
