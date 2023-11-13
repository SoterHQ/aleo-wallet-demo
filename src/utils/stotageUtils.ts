export function setLocalStorage(name: string, value: string) {
    localStorage.setItem(name, value);
}

export function getLocalStorage(name: string, defaultValue?: string) {
    let value = localStorage.getItem(name)
    if (value) {
        return value
    }
    return defaultValue ? defaultValue : ""
}
export function clearStorage(name: string) {
    localStorage.removeItem(name)
}