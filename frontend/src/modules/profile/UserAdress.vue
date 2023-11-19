<script setup>
import { useProfileStore } from "@/stores";
import { computed, ref } from "vue";

const userStore = useProfileStore();

const addresses = computed(() => {
  return userStore.getAddresses;
});

const editingAddress = ref(null);

const editAddress = (address) => {
  editingAddress.value = address;
};

const saveAddress = () => {
  if (editingAddress.value) {
    userStore.updateAddress(editingAddress.value);
    editingAddress.value = null;
  }
};

const deleteAddress = (addressId) => {
  userStore.deleteAddress(addressId);
};
</script>

<template>
  <div v-if="addresses.length > 0" class="layout__address">
    <div
      v-for="address in addresses"
      :key="address.id"
      class="sheet address-form"
    >
      <div class="address-form__header">
        <b>Адрес №{{ address.id }}. {{ address.name }}</b>
        <div class="address-form__edit">
          <button type="button" class="icon" @click="editAddress(address)">
            <span class="visually-hidden">Изменить адрес</span>
          </button>
        </div>
      </div>
      <template v-if="editingAddress === address">
        <!-- Форма для редактирования адреса -->
        <form
          class="address-form address-form--opened sheet"
          @submit="saveAddress"
        >
          <div class="address-form__header">
            <b>Новый адрес</b>
          </div>

          <div class="address-form__wrapper">
            <div class="address-form__input">
              <label class="input">
                <span>Название адреса*</span>
                <input
                  v-model="address.name"
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
                  v-model="address.street"
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
                  v-model="address.building"
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
                  v-model="address.flat"
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
                  v-model="address.comment"
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
              @click="deleteAddress(address.id)"
            >
              Удалить
            </button>
            <button type="submit" class="button" @click="saveAddress">
              Сохранить
            </button>
          </div>
        </form>
      </template>
      <template v-else>
        <!-- Отображение адреса -->
        <p>
          {{ address.street }}, д. {{ address.building }}, кв.
          {{ address.flat }}
        </p>
        <small>{{ address.comment }}</small>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
