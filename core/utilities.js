export function generateDatetime(dateObj) {
    const date = dateObj || new Date();
    return date.toISOString().replace('T', ' ').split('.')[0];
}

export function pickRandomFromArray(arr)
{
    return arr[Math.floor(Math.random() * arr.length)];
}