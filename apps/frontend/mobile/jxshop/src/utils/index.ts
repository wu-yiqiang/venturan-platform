export const formattedAmountCNY = (amount: number) => {
    if (!amount) return '0.00'
    return new Intl.NumberFormat('zh-CN', {
        currency: 'CNY',
        useGrouping: false,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount / 100)
}

export const formattedAmountCent = (yuanAmount: number): number => {
    let amountStr = String(yuanAmount)?.trim();
    const [integer, decimal = ''] = amountStr?.split('.');
    const decimalPadded = decimal.padEnd(2, '0');
    const totalCents = integer + decimalPadded;
    const cents = parseInt(totalCents, 10);
    if (isNaN(cents)) {
        throw new Error('无效金额');
    }
    return cents;
}