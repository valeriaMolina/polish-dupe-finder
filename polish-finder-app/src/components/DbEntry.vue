<template>
  <li class="mx-1 list-group-item row">
    <span class="col">{{ itemName }} - {{ brandName }}</span>
    <i class="col-md-auto bi bi-pencil-square"></i>
  </li>
</template>

<script setup>
const props = defineProps({
  itemName: {
    type: String,
    required: true
  },
  brandName: {
    type: String,
    required: true
  }
})
</script>
