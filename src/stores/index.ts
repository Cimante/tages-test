import { defineStore } from "pinia";
import { Item } from "@/types/item";
import { Material } from "@/types/material";
import { PriceSort } from "@/types/priceSort";
import { MaterialFilter } from "@/types/materialFilter";
import { DropdownValues } from "@/types/dropdownValues";
import { CartItem } from "@/types/cartItem";
import { api } from "@/functions/api";
import { storageSet, storageGet } from "@/functions/storage";

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
    ] as DropdownValues[],

    materialFilterValues: [] as DropdownValues[],
    cart: [] as CartItem[],
    favourites: [] as CartItem[],
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
    cartUpdate(id: CartItem) {
      if (this.cart.includes(id)) {
        this.cart = this.cart.filter((item) => item !== id);
      } else {
        this.cart.push(id);
      }
      storageSet(this.cart, "cart");
    },
    cartLoad() {
      this.cart = storageGet<CartItem[]>("cart");
    },
    favouritesUpdate(id: CartItem) {
      if (this.favourites.includes(id)) {
        this.favourites = this.favourites.filter((item) => item !== id);
      } else {
        this.favourites.push(id);
      }
      storageSet(this.favourites, "favourites");
    },
    favouritesLoad() {
      this.favourites = storageGet<CartItem[]>("favourites");
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
