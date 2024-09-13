import React from 'react'

function useMoreMenuSize({
  maxMoreMenuSize,
  distance,
  growThreshold,
  shrinkThreshold,
}: {
  maxMoreMenuSize: number
  distance: number
  growThreshold: number
  shrinkThreshold: number
}) {
  const [moreMenuSize, setMoreMenuSize] = React.useState<number>(0)

  React.useLayoutEffect(() => {
    if (distance === undefined) return
    if (distance > growThreshold) {
      showLeftMenuElem()
    } else if (distance < shrinkThreshold) {
      hideLeftMenuElem()
    }

    function hideLeftMenuElem() {
      setMoreMenuSize((prev) => (prev < maxMoreMenuSize ? prev + 1 : prev))
    }
    function showLeftMenuElem() {
      setMoreMenuSize((prev) => (prev > 0 ? prev - 1 : prev))
    }
  }, [distance, growThreshold, maxMoreMenuSize, shrinkThreshold])

  return moreMenuSize
}

export default useMoreMenuSize
