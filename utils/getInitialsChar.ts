export function getInitialsChar(input: string): string {
    if (!input || typeof input !== 'string') {
        throw new Error('Input must be a non-empty string.');
    }

    const words = input.trim().split(' ');

    const firstInitial = words[0]?.charAt(0);

    const lastInitial = words.length > 1 ? words[words.length - 1].charAt(0) : '';

    return `${firstInitial}${lastInitial}`.toUpperCase();
}
