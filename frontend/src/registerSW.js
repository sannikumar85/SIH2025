import { Workbox } from 'workbox-window'

if ('serviceWorker' in navigator) {
  const wb = new Workbox('/sw.js')

  wb.addEventListener('controlling', () => {
    window.location.reload()
  })

  wb.addEventListener('waiting', () => {
    if (confirm('New version available! Click OK to refresh.')) {
      wb.messageSkipWaiting()
    }
  })

  wb.register()
}