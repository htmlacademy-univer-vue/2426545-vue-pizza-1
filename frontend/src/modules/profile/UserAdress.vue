<script setup>
import { useProfileStore } from "@/stores";
import { computed, ref } from "vue";

const userStore = useProfileStore();

const addresses = computed(() => {
  return userStore.getAddresses;
});

const editingAddress = ref(null);

const editAddress = (address) => {
  editingAddress.value = { ...address };
};

const saveAddress = () => {
  if (editingAddress.value) {
    userStore.updateAddress(editingAddress.value);
    editingAddress.value = null;
  }
};

// const deleteAddress = (addressId) => {
//   userStore.deleteAddress(addressId);
// };
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
        <input v-model="address.name" />
        <!-- Остальные поля для редактирования -->
        <button type="button" @click="saveAddress">Сохранить</button>
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
