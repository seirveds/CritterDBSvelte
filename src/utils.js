export function currentMonth() {
    const d = new Date();
    return d.getMonth() + 1;
}

export function currentTime() {
    const d = new Date();
    return d.getHours();
}
