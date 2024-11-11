<template>
  <div id="bg-color" class="container border shadow rounded g-2 py-3 mt-3">
    <div class="px-3">
      <h1>Dupes</h1>
      <hr />
      <div>
        <p>Do you know a dupe? Add it here!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  duplicates: {
    type: Array,
    required: true
  }
})
</script>

<style>
#bg-color {
  background-color: #f8f9fa;
}
</style>
