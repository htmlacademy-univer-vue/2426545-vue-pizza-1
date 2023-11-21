<template>
  <div class="layout__address">
    <form
      action="#"
      class="address-form address-form--opened sheet"
      @submit="handleSubmit"
    >
      <div class="address-form__header">
        <b>Новый адрес</b>
      </div>

      <div class="address-form__wrapper">
        <div class="address-form__input">
          <label class="input">
            <span>Название адреса*</span>
            <input
              v-model="form.name"
              type="text"
              name="addr-name"
              placeholder="Введите название адреса"
              required
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--normal">
          <label class="input">
            <span>Улица*</span>
            <input
              v-model="form.street"
              type="text"
              name="addr-street"
              placeholder="Введите название улицы"
              required
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Дом*</span>
            <input
              v-model="form.building"
              type="text"
              name="addr-house"
              placeholder="Введите номер дома"
              required
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Квартира</span>
            <input
              v-model="form.flat"
              type="text"
              name="addr-apartment"
              placeholder="Введите № квартиры"
            />
          </label>
        </div>
        <div class="address-form__input">
          <label class="input">
            <span>Комментарий</span>
            <input
              v-model="form.comment"
              type="text"
              name="addr-comment"
              placeholder="Введите комментарий"
            />
          </label>
        </div>
      </div>

      <div class="address-form__buttons">
        <button
          type="button"
          class="button button--transparent"
          @click="clearForm"
        >
          Удалить
        </button>
        <button type="submit" class="button">Сохранить</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useProfileStore } from "@/stores";
import { reactive } from "vue";

const userStore = useProfileStore();

const emits = defineEmits(["delete"]);

function clearForm() {
  form.name = "";
  form.street = "";
  form.building = "";
  form.flat = "";
  form.comment = "";

  emits("delete");
}

const form = reactive({
  name: "",
  street: "",
  building: "",
  flat: "",
  comment: "",
});

function addAddress(address) {
  userStore.addAddress(address);
}

function handleSubmit(event) {
  event.preventDefault();
  addAddress(form);
  // Сбросить форму после добавления адреса
  Object.keys(form).forEach((key) => {
    form[key] = "";
  });
}
</script>

<style scoped lang="scss"></style>
