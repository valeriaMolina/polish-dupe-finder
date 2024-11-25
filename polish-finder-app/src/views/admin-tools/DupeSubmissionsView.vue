<template>
  <div class="container-fluid">
    <AdminNav activeLink="submissions"></AdminNav>
    <div class="border rounded px-3 py-3 mx-1 my-3">
      <h4>Dupes</h4>
      <p>Here you can manage dupe submissions.</p>
    </div>
    <div class="row px-3 my-3">
      <SubmissionsListDupe :submissions="dupeSubmissions"></SubmissionsListDupe>
    </div>
  </div>
</template>

<script setup>
import AdminNav from '@/components/admin-components/AdminNav.vue'
import SubmissionsListDupe from '@/components/admin-components/SubmissionsListDupe.vue'
import { ref, onMounted } from 'vue'
import { getDupeSubmissions } from '@/apis/submissionsAPI'

const dupeSubmissions = ref([])

onMounted(async () => {
  const submissions = await getDupeSubmissions()
  dupeSubmissions.value = submissions
})
</script>
