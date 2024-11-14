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
      <div>
        <ul class="list-group" v-for="polish in polishes" :key="polish.polish_id">
          <DbEntry :itemName="polish.name" :brandName="polish.brand.name"></DbEntry>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import AdminNav from '@/components/AdminNav.vue'
import DbEntry from '@/components/DbEntry.vue'
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
