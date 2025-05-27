<template>
  <div class="container mt-5">
    <h1 class="mt-1">All customers</h1>

    <div class="container text-left p-0">
      <div class="row gx-3 gy-2">
        <div class="col-auto">
          <div class="py-3">Search by:</div>
        </div>
        <div class="col-auto">
          <select class="form-select p-3 select-wide" aria-label="Default select example">
            <option selected>Account status</option>
            <option value="1">Verified</option>
            <option value="2">Pending</option>
            <option value="3">Closed</option>
          </select>
        </div>
        <div class="col-auto">
          <select class="form-select p-3 select-wide" aria-label="Default select example">
            <option selected>Account status</option>
            <option value="1">Verified</option>
            <option value="2">Pending</option>
            <option value="3">Closed</option>
          </select>
        </div>
      </div>
    </div>

    <table class="table table-hover table-striped mt-5">
      <thead>
        <tr>
          <th>ID</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>BSN</th>
          <th>Phone number</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="customer in customers"
          :key="customer.userId"
          @click="goToCustomer(customer.userId)"
          style="cursor: pointer;"
        >
          <td>{{ customer.userId }}</td>
          <td>{{ customer.firstName }} {{ customer.lastName }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.bsn }}</td>
          <td>{{ customer.phoneNumber }}</td>
          <td>{{ customer.accountStatus }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCustomerStore } from '@/stores/customers';
import { storeToRefs } from 'pinia';

const store = useCustomerStore();
const { all: customers } = storeToRefs(store);
const router = useRouter();

onMounted(() => {
  store.fetchAllCustomers();
});

const goToCustomer = (id) => {
  router.push(`/customers/${id}`);
};
</script>

<style scoped>
.all-transactions-container {
  margin-top: 50px;
}
.select-wide {
  min-width: 160px;
}
</style>
