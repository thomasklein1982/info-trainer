<script setup>
import { computed, ref } from 'vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'

// check for updates every hour
const period = 60 * 60 * 1000

const swActivated = ref(false)

/**
 * This function will register a periodic sync check every hour, you can modify the interval as needed.
 * @param {string} swUrl
 * @param {ServiceWorkerRegistration} r
 */
function registerPeriodicSync(swUrl, r) {
  if (period <= 0) return

  setInterval(async () => {
    if ('onLine' in navigator && !navigator.onLine)
      return

    const resp = await fetch(swUrl, {
      cache: 'no-store',
      headers: {
        'cache': 'no-store',
        'cache-control': 'no-cache',
      },
    })

    if (resp?.status === 200)
      await r.update()
  }, period)
}


const { needRefresh, updateServiceWorker } = useRegisterSW({
  immediate: true,
  onRegisteredSW(swUrl, r) {
    if (period <= 0) return
    if (r?.active?.state === 'activated') {
      swActivated.value = true
      registerPeriodicSync(period, swUrl, r)
    }
    else if (r?.installing) {
      r.installing.addEventListener('statechange', (e) => {
        /** @type {ServiceWorker} */
        const sw = e.target
        swActivated.value = sw.state === 'activated'
        if (swActivated.value)
          registerPeriodicSync(period, swUrl, r)
      })
    }
  },
})

window.updateServiceWorker=updateServiceWorker;

const title = computed(() => {
  
    
  if (needRefresh.value)
    return 'Es gab ein Update! Klicke auf "Neu laden", um den neuen Content anzuzeigen.'
  return ''
})

function close() {
  
  needRefresh.value = false
}
</script>

<template>
  <div
    v-if="needRefresh"
    class="pwa-complete"
    aria-labelledby="toast-message"
    role="alert"
  >
    <div class="pwa-backdrop"></div>
    <div class="pwa-toast">
      <div class="message">
        <span id="toast-message">
          {{ title }}
        </span>
      </div>
      <div class="buttons">
        <button  type="button" class="reload" @click="updateServiceWorker()">
          Neu laden
        </button>
        <button type="button" @click="close">
          Schließen
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pwa-complete{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  place-content: center;
  display: grid;
}
.pwa-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  background-color: gray;
  opacity: 0.5;
}
.pwa-toast {
  border: 1px solid #8885;
  padding: 0.5rem;
  border-radius: 4px;
  z-index: 1;
  text-align: left;
  box-shadow: 3px 4px 5px 0 #8885;
  display: grid;
  background-color: #121212;
}
.pwa-toast .message {
  margin-bottom: 8px;
}
.pwa-toast .buttons {
  display: flex;
}
.pwa-toast button {
  border: 1px solid #8885;
  outline: none;
  margin-right: 5px;
  margin-left: 5px;
  border-radius: 2px;
  padding: 3px 10px;
  min-height: 0.8cm;
}
.pwa-toast button.reload {
  display: block;
}
</style>
