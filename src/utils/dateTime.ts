export function toDayAndDate(dateString: string): { day: string, shortDate: string, time: string } {
    const date = new Date(dateString);

    const day = date.toLocaleDateString('en-US', { weekday: 'long' })
    const shortDate = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
    })
    const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).replace(/\s+/g, '')

    return { day, shortDate, time: time }
}

export function formatFullDate(isoString: string): string {
    const date = new Date(isoString);

    const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
    const year = date.getFullYear();
    const day = date.getDate();

    const getOrdinalSuffix = (n: number) => {
        if (n > 3 && n < 21) return 'th';
        switch (n % 10) {
            case 1:  return 'st';
            case 2:  return 'nd';
            case 3:  return 'rd';
            default: return 'th';
        }
    };

    const dayWithSuffix = `${day}${getOrdinalSuffix(day)}`;

    return `${weekday}, ${month} ${dayWithSuffix} ${year}`;
}

export function getTime(isoString: string): string {
    const date = new Date(isoString)
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).replace(/\s+/g, '')
}