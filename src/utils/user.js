const UserKey = 'p_info'

export function getData() {
    const data = localStorage.getItem(UserKey);
    return data?JSON.parse(data):{};
}
export function setData(data) {
    return localStorage.setItem(UserKey, JSON.stringify(data));
}
export function removeData() {
    localStorage.removeItem(UserKey);
}