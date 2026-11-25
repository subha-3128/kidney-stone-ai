const STORAGE_KEY = 'kidneyai_history'

export function loadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveHistory(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    return true
  } catch {
    return false
  }
}

export function appendHistoryEntry(entry, maxEntries = 50) {
  const current = loadHistory()
  let next = [entry, ...current].slice(0, maxEntries)

  // Trim older entries if browser localStorage quota (~5MB) is tight
  while (next.length > 0) {
    if (saveHistory(next)) return true
    next = next.slice(0, Math.max(0, next.length - 1))
  }
  return false
}

export function createThumbnailDataUrl(dataUrl, maxDim = 320) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const scale = Math.min(1, maxDim / Math.max(img.width, img.height))
      const width = Math.max(1, Math.round(img.width * scale))
      const height = Math.max(1, Math.round(img.height * scale))
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        resolve(dataUrl)
        return
      }
      ctx.drawImage(img, 0, 0, width, height)
      resolve(canvas.toDataURL('image/jpeg', 0.72))
    }
    img.onerror = () => resolve(dataUrl)
    img.src = dataUrl
  })
}
