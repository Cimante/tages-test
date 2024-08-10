import { defineStore } from "pinia";
import { Item } from "@/types/item";
import { Material } from "@/types/material";
import { api } from "@/functions/api";

export const useStore = defineStore("store", {
  state: () => ({
    items: [] as Item[],
    materials: [] as Material[],
    breadcrumbs: ["Главная", "Системы хранения", "Комплекты стеллажных систем"],
  }),
  actions: {
    async loadData() {
      this.items = await api<Item[]>("/items.json");
      this.materials = await api<Material[]>("/materials.json");
    },
  },
});
