<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import AuthGuard from '@/components/guards/AuthGuard.vue'

defineOptions({
    meta: {
        requiresAuth: true
    }
})

const { user } = useAuth()
</script>

<template>
    <div>
        <h1>Settings</h1>

        <div class="settings-section">
            <h2>User Settings</h2>
            <!-- All authenticated users can see this -->
            <p>Change your personal settings here</p>
            <div class="setting-item">
                <h3>Notification Preferences</h3>
                <label>
                    <input type="checkbox"> Email notifications
                </label>
            </div>
        </div>

        <AuthGuard :roles="['manager', 'admin']">
            <div class="settings-section">
                <h2>Team Settings</h2>
                <p>Manage your team settings here</p>
                <div class="setting-item">
                    <h3>Team Notifications</h3>
                    <label>
                        <input type="checkbox"> Team announcements
                    </label>
                </div>
            </div>
        </AuthGuard>

        <AuthGuard :roles="['admin']">
            <div class="settings-section">
                <h2>System Settings</h2>
                <p>Configure system-wide settings</p>
                <div class="setting-item">
                    <h3>Security Settings</h3>
                    <button>Configure Security Policies</button>
                </div>
            </div>

            <template #unauthorized>
                <div class="settings-section locked">
                    <h2>System Settings (Admin Only)</h2>
                    <p>You need admin privileges to access these settings.</p>
                </div>
            </template>
        </AuthGuard>
    </div>
</template>
