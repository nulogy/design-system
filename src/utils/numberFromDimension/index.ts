/**
 * Returns the number from a [CSS dimension]{@link https://developer.mozilla.org/en-US/docs/Web/CSS/dimension}.
 * @param {string} dimension - A css dimension
 */
export default function(dimension: string | number): number { return parseInt(String(dimension), 10) }