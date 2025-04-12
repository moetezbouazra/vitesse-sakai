## File-based Routing

Routes will be auto-generated for Vue files in this dir with the same file structure.
Check out [`unplugin-vue-router`](https://github.com/posva/unplugin-vue-router) for more details.

### Path Aliasing

`@/` is aliased to `./src/` folder.

For example, instead of having

```ts
import { isDark } from '../../../../composables'
```

now, you can use

```ts
import { isDark } from '@/composables'
```

### Role Based Rendering
Authguard component is the recommended option here.

```vue
<script setup lang="ts">
const auth = useAuth()
</script>

<template>
  <div>
    <header>
      <nav>
          <template v-if="auth.hasRole('admin')">
            <router-link to="/admin">Admin</router-link>
          </template>
          <button @click="auth.logout">Logout</button>
        <template v-else>
          <router-link to="/login">Login</router-link>
        </template>
      </nav>
    </header>
    
    <main>
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
      <router-view />
    </main>
  </div>
</template>

<route lang="yaml">
  meta:
    layout: private
    requiresAuth: false
    requiredRoles: ['admin', 'editor']
</route>
```