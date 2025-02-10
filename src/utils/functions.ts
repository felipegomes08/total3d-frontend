// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setLocalStorage(nameStorage: string, data: any) {
  localStorage.setItem(`t3d-${nameStorage}`, JSON.stringify(data))
}

export function deleteItem(item: string) {
  localStorage.removeItem(`t3d-${item}`)
}

export function getLocalStorage(nameStorage: string) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const storage: any = localStorage.getItem(`t3d-${nameStorage}`)

    const storageParsed = JSON.parse(storage)
    return storageParsed
  } catch {
    return ''
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setSessionStorage(nameStorage: string, data: any) {
  sessionStorage.setItem(`t3d-${nameStorage}`, JSON.stringify(data))
}

export function getSessionStorage(nameStorage: string) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const storage: any = sessionStorage.getItem(`t3d-${nameStorage}`)

    const storageParsed = JSON.parse(storage)

    return storageParsed
  } catch {
    return ''
  }
}

export function signOut() {
  deleteItem('user')
}
