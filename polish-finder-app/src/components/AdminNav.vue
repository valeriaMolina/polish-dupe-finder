<template>
  <div>
    <h1 class="text-center">Admin Tools</h1>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <router-link id="admin" class="nav-link" to="/admin"
          ><i class="bi bi-house-heart"></i
        ></router-link>
      </li>
      <li class="nav-item">
        <router-link id="database" class="nav-link" to="/admin/db">Database</router-link>
      </li>
      <li class="nav-item">
        <router-link id="roles" class="nav-link" to="/admin/roles">Role Assignments</router-link>
      </li>
      <li class="nav-item">
        <router-link id="subs" class="nav-link" to="/admin/submissions">Submissions</router-link>
      </li>
      <li class="nav-items">
        <router-link id="feedback" class="nav-link" to="/admin/feedback">User feedback</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

onMounted(() => {
  // based on the props, set the active link
  document.getElementById(props.activeLink).classList.add('active')
})

const props = defineProps({
  activeLink: {
    type: String,
    required: true
  }
})
</script>
