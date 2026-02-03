import { NumberUtils } from "./number.utils";

export const QtyUtils = {
    parse: (text?: string): number =>
        NumberUtils.parse(text, true),

    
    sum: (quantities: number[]) => 
        NumberUtils.sum(quantities),
}