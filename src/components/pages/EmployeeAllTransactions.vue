<template>
  <div class="container mt-5">
    <h1 class="mt-1">Transactions</h1>

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
          <th>Sender</th>
          <th>Receiver</th>
          <th>Amount</th>
          <th>Timestamp</th>
          <th>Initiator</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="transaction in transactions"
          :key="customer.userId"
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

<script setup></script>

<style scoped>
.all-transactions-container {
  margin-top: 50px;
}

.select-wide {
  min-width: 160px;
}

</style>
