export const decrementPx = (value, delta) => {
    if (!delta) {delta = 1}
    return (value.replace('px','') - delta + 'px')
}