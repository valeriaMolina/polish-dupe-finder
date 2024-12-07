<template>
    <div class="mx-2 my-2">
        <AdminNav activeLink="roles"></AdminNav>
        <div class="border rounded px-3 py-3 mx-1 my-3">
            <h4>Role Assignments</h4>
        </div>
        <div>
            <button class="btn btn-primary">Assign Role</button>
        </div>
        <div class="my-3">
            <div class="container-fluid">
                <h5>Administrators</h5>
                <hr />
            </div>
            <div class="container-fluid">
                <h5>Moderators</h5>
                <hr />
            </div>
            <div class="container-fluid">
                <h5>Users</h5>
                <hr />
            </div>
        </div>
    </div>
</template>

<script setup>
import AdminNav from '@/components/admin-components/AdminNav.vue';
</script>
