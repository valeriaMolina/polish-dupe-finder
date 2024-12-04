<template>
    <div class="container-fluid">
        <AdminNav activeLink="submissions"></AdminNav>
        <div class="border rounded px-3 py-3 mx-1 my-3">
            <h4>Brands</h4>
            <p>Here you can review user submissions for brands.</p>
        </div>
        <div v-if="isLoading">
            <div class="d-flex justify-content-center">
                <div class="spinner-border" role="staus">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
        <div v-else class="row px-3 my-3"></div>
    </div>
</template>

<script setup>
import AdminNav from '@/components/admin-components/AdminNav.vue';
import { getBrandSubmissions } from '@/apis/submissionsAPI';
import { ref, onMounted } from 'vue';

const isLoading = ref(true);
const brandSubmissions = ref([]);

onMounted(async () => {
    try {
        const submissions = await getBrandSubmissions();
        brandSubmissions.value = submissions;
        isLoading.value = false;
    } catch (error) {
        console.error(error);
    }
});
</script>
