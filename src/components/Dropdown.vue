<script setup lang="ts">
import { DropdownValues } from "@/types/dropdownValues";

const emit = defineEmits(["change"]);

const props = defineProps<{
  id: string;
  name: string;
  label: string;
  nullishLabel: string;
  values: DropdownValues[];
}>();

const updateValue = (e: Event) => {
  emit("change", (e.target as HTMLSelectElement).value);
};
</script>

<template>
  <div class="dropdown">
    <label :for="props.id" class="dropdown__label">{{ props.label }}</label>
    <select
      class="dropdown__select"
      :name="props.name"
      :id="props.id"
      @change="updateValue($event)"
    >
      <option value="all" class="dropdown__option">
        {{ props.nullishLabel }}
      </option>
      <option
        class="dropdown__option"
        v-for="option in props.values"
        :value="option.value"
      >
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<style lang="scss">
.dropdown {
  display: flex;
  flex-direction: column;
  gap: 6px;

  &__label {
    display: inline-block;
    font-family: $font-title;
    font-size: 0.875rem;
    padding-left: 16px;
    color: $grey-6;
  }

  &__select {
    appearance: none;
    outline: 0;

    height: 2.5rem;
    width: 18rem;
    padding-left: 16px;
    border: none;
    background-color: $grey-4;
    background-image: url("./src/assets/icons/chevron-bottom.svg");
    background-repeat: no-repeat;
    background-position: 98% center;
    font-family: $font-title;
  }

  &__option {
    font-family: $font-title;
  }
}
</style>
