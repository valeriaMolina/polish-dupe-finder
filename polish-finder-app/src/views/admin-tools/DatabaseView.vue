<template>
  <div>
    <AdminNav activeLink="database"></AdminNav>
    <div class="container-fluid">
      <div class="container"></div>
      <div class="border rounded px-3 py-3 mx-1 my-3">
        <h4>Database</h4>
        <p>
          Here you can view and manage the database entries. You can add, edit, and delete entries.
        </p>
      </div>
      <div class="row">
        <button
          class="btn btn-primary rounded-pill col-md-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsedSearch"
          aria-expanded="false"
          aria-controls="collapsedSearch"
        >
          Search
        </button>
        <button class="btn btn-secondary rounded-pill col-md-auto">
          Sort <i class="bi bi-caret-down-fill"></i>
        </button>
        <button class="btn btn-success rounded-pill col-md-auto">
          New <i class="bi bi-caret-down-fill"></i>
        </button>
      </div>
      <div class="collapse" id="collapsedSearch"><DbSearch></DbSearch></div>
      <div class="my-2">
        <table class="table">
          <thead id="tabletop">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Brand</th>
              <th scope="col">Primary Color</th>
              <th scope="col">Type</th>
            </tr>
          </thead>
          <tbody v-for="polish in polishes" :key="polish.polish_id">
            <DbEntry
              :itemName="polish.name"
              :brandName="polish.brand.name"
              :polishId="polish.polish_id"
              :primaryColor="polish.color.name"
              :type="polish.type.name"
            ></DbEntry>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import AdminNav from '@/components/AdminNav.vue'
import DbEntry from '@/components/DbEntry.vue'
import DbSearch from '@/components/DbSearch.vue'
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { fetchPolish } from '@/apis/polishAPI'

let page = 1
let timeout = 1000
const polishes = ref([])
const isLoading = ref(false)

onMounted(async () => {
  const allPolish = await fetchPolish(1, 100)
  polishes.value = allPolish.polishes
})

// get all db entries
</script>

<style scoped></style>
