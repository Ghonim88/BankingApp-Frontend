<template>
  <div class="container mt-5">
    <h1 class="mt-1">All customers</h1>

    <div class="container text-left p-0">
      <div class="row gx-3 gy-2">
        <div class="col-auto">
          <div class="py-3">Search by:</div>
        </div>
        <div class="col-auto">
          <input
            type="text"
            class="form-control p-3 select-wide"
            placeholder="Customer name"
            v-model="searchQuery"
          />
        </div>
        <div class="col-auto">
          <select class="form-select p-3 select-wide" v-model="selectedStatus">
            <option value="">All</option>
            <option value="Verified">Verified</option>
            <option value="Pending">Pending</option>
            <option value="Closed">Closed</option>
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
          v-for="customer in filteredCustomers"
          :key="customer.userId"
          @click="goToCustomer(customer.userId)"
          style="cursor: pointer"
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
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useCustomerStore } from "@/stores/customers";
import { storeToRefs } from "pinia";

const store = useCustomerStore();
const { all: customers } = storeToRefs(store);
const router = useRouter();

const selectedStatus = ref("");
const searchQuery = ref('');

onMounted(() => {
  store.fetchAllCustomers();
});


const filteredCustomers = computed(() => {
  const query = searchQuery.value.toLowerCase();
  const statusFilter = selectedStatus.value;

  return customers.value.filter((customer) => {
    const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();

    const matchesQuery =
      fullName.includes(query) || status.includes(query);

    const matchesStatus = !statusFilter || customer.accountStatus === statusFilter;

    return matchesQuery && matchesStatus;
  });
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
