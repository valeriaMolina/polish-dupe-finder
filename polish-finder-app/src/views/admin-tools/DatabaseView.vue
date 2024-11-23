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
      <div class="row px-3 my-3">
        <DbSearch></DbSearch>
      </div>
      <div>
        <DbList :polishes="polishes"></DbList>
      </div>
      <!-- <div class="collapse" id="collapsedSearch"><DbSearch></DbSearch></div> -->
    </div>
  </div>
</template>

<script setup>
import AdminNav from '@/components/AdminNav.vue'
import DbSearch from '@/components/DbSearch.vue'
import DbList from '@/components/DbList.vue'
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { fetchPolish } from '@/apis/polishAPI'

let page = 1
let timeout = 1000
const polishes = ref([])
const isLoading = ref(false)

onMounted(async () => {
  const allPolish = await fetchPolish(page, 100)
  polishes.value = allPolish.polishes
})

// get all db entries
</script>

<style scoped></style>
