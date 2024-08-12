<script setup lang="ts">
import { Item } from "@/types/item";
import { CartItem } from "@/types/cartItem";

const props = defineProps<{
  item: Item;
  isInCart: boolean;
}>();

const emits = defineEmits<{
  cartUpdate: [id: CartItem];
}>();
</script>

<template>
  <section class="item">
    <img
      class="item__image"
      :src="props.item.image.url"
      alt="item image"
      loading="lazy"
    />
    <span class="item__sale-label" v-if="props.item.price.old_price">
      Скидка
    </span>
    <div class="item__info-wrapper">
      <div class="item__info">
        <span class="item__label">{{ props.item.code }}</span>
        <span class="item__name">{{ props.item.name }}</span>
        <div class="item__price">
          <span v-if="props.item.price.old_price" class="item__old-price">
            {{ props.item.price.old_price }}₽
          </span>
          <span> {{ props.item.price.current_price }}₽ </span>
        </div>
      </div>
      <div class="item__controls">
        <div class="item__cart-btn" @click="$emit('cartUpdate', props.item.id)">
          <img v-if="!props.isInCart" src="@/assets/icons/cart.svg" alt="" />
          <img v-else src="@/assets/icons/circle-checked.svg" alt="" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
@import "@/assets/styles/variables.scss";

.item {
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid $grey-5;
  padding: 9px 12px 10px;
  width: clamp(18rem, 50vw, 21rem);
  box-sizing: border-box;
}

.item__image {
  width: clamp(12rem, 100%, 14.875rem);
  margin: 0 auto;
  object-fit: contain;
  object-position: center center;
}

.item__sale-label {
  position: absolute;
  top: 8px;
  left: 0;
  background-color: $attention;
  color: $white;
  font-size: 0.875rem;
  padding: 3px 16px 4px;
}

.item__info {
  display: flex;
  flex-direction: column;
  gap: 6px;

  &-wrapper {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
}

.item__label {
  display: inline-block;
  min-height: 17px;
  font-size: 0.625rem;
  line-height: 1.4;
  letter-spacing: 0.02em;
  color: $grey-3;
}

.item__name {
  font-weight: 500;
}

.item__price {
  display: flex;
  align-items: center;
  gap: 9px;
}

.item__old-price {
  text-decoration: line-through;
  color: $grey-3;
}

.item__cart-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  position: relative;
  cursor: pointer;
}
</style>
