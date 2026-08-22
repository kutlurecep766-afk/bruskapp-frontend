const DEVICE_KEY = 'brusk_device_id'

function fingerprint(): string {
  try {
    const parts = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height + 'x' + screen.colorDepth,
      new Date().getTimezoneOffset(),
      navigator.hardwareConcurrency || '',
      navigator.platform || '',
    ]
    let h = 5381
    for (const s of parts) {
      const str = String(s)
      for (let i = 0; i < str.length; i++) {
        h = ((h << 5) + h + str.charCodeAt(i)) | 0
      }
    }
    return 'fp_' + Math.abs(h).toString(36)
  } catch {
    return 'fp_unknown'
  }
}

export function getDeviceId(): string {
  try {
    let id = localStorage.getItem(DEVICE_KEY)
    if (!id) {
      id = fingerprint() + '_' + Math.random().toString(36).slice(2, 10)
      localStorage.setItem(DEVICE_KEY, id)
    }
    return id
  } catch {
    return fingerprint()
  }
}