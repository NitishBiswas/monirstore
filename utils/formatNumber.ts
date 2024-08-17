export function formatNumber(num: number): string {
    if (num === 0) {
        return '0';
    }
    const absNum = Math.abs(num);
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    const suffixIndex = Math.floor(Math.log10(absNum) / 3);
    const scaledNum = absNum / Math.pow(10, suffixIndex * 3);
    const formattedNum = scaledNum % 1 === 0 ? scaledNum.toFixed(0) : scaledNum.toFixed(1);

    return `${num >= 0 ? '' : '-'}${formattedNum}${suffixes[suffixIndex]}`;
}
