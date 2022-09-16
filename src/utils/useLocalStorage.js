import { useLocalStorage } from "@vueuse/core";

export function localStorage () {
  const storage = useLocalStorage(
    'my-storage',
    { name: 'Apple', color: 'red' }
  )
  return { storage }
}
