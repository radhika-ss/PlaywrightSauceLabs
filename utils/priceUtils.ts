import { NumberUtils } from "./number.utils";

export const PriceUtils = {
    /**
     * 
     *  text The below is a explit return, where the arrow function is enclosed by {}. in such case, explict return is required.
     * else get error: A function whose declared type is neither 'undefined', 'void', nor 'any' must return a value
     *  “Expression expected” error usually happens when TypeScript sees a dangling comma or invalid syntax. -> 
     * parse: (text?: string): number => {
    return NumberUtils.parse(text, true), --> , was the issue.
    },
     * 
     */
parse: (text?: string): number => {
    return NumberUtils.parse(text, true)
},

sum: (prices: number[]): number => NumberUtils.sum(prices),
}

