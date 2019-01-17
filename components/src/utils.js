export const addPx = (val1, val2) => {
    const val2Str = !val2 ? '1px' : `${val2}` ;
    return (parseInt(val1.replace('px','')) + parseInt(val2Str.replace('px','')) + 'px')
}

export const subPx = (val1, val2) => {
    const val2Str = !val2 ? '1px' : `${val2}` ;
    return (parseInt(val1.replace('px','')) - parseInt(val2Str.replace('px','')) + 'px')
}

export const multPx = (val1, val2) => {
    const val2Str = !val2 ? '1px' : `${val2}` ;
    console.log(val1)
    console.log(val2Str)
    return (Math.round(parseFloat(val1.replace('px','')) * parseFloat(val2Str.replace('px',''))) + 'px')
}