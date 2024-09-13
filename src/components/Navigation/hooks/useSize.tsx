import React from 'react';
import useResizeObserver from '@react-hook/resize-observer';

const useSize = (target: React.MutableRefObject<HTMLElement | null>): DOMRect | undefined => {
  const [size, setSize] = React.useState<DOMRect>();

  React.useLayoutEffect(() => {
    setSize(target.current?.getBoundingClientRect());
  }, [target]);

  // Where the magic happens
  useResizeObserver(target, (entry) => setSize(entry.contentRect));

  return size;
};

export default useSize;
