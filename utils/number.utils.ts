export const NumberUtils = {
    parse: (text?: string, allowDecimal= true): number => {
        if(!text) return 0;
        const regex = allowDecimal ? /[^\d.]/g: /[^\d]/g;
        const cleaned = text.replace(regex, '');
        return cleaned ? Number(cleaned): 0;
    },

    sum: (values: number[]) =>
        values.reduce((a,b) => a+b, 0),
}
