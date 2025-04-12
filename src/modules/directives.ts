import { UserModule } from '@/types'

export const install: UserModule = ({ app }) => {
  app.directive('role', {
    mounted(el, binding) {
      const auth = useAuth()
      const roles = Array.isArray(binding.value) ? binding.value : [binding.value]
      
      if (!auth.hasAnyRole(roles)) {
        if (binding.modifiers.hide) {
          el.style.display = 'none'
        } else {
          el.parentNode?.removeChild(el)
        }
      }
    },
    updated(el, binding) {
      const auth = useAuth()
      const roles = Array.isArray(binding.value) ? binding.value : [binding.value]
      
      if (!auth.hasAnyRole(roles)) {
        if (binding.modifiers.hide) {
          el.style.display = 'none'
        } else {
          el.parentNode?.removeChild(el)
        }
      } else if (binding.modifiers.hide) {
        el.style.display = ''
      }
    }
  })
}
