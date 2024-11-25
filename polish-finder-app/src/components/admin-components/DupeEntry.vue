<template>
  <tr>
    <th scope="row">
      {{ submissionId }}
    </th>
    <td>{{ polish }}</td>
    <td>{{ dupe }}</td>
    <td>{{ user }}</td>
    <td>{{ status }}</td>
    <td>{{ createdAt }}</td>
  </tr>
</template>

<script setup>
const props = defineProps({
  submissionId: {
    type: Number,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  polish: {
    type: String,
    required: true
  },
  dupe: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  }
})
</script>
