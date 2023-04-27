import { useRef, useState } from 'react';

function useMaxHeight(active: string) {
  const [maxHeight, setMaxHeight] = useState(0);

  const ref = useRef<HTMLDivElement>(null);

  const changeMaxHeight = () => {
    if (ref.current) {
      const sectionTitle = ref.current.previousSibling?.firstChild?.textContent;

      if (active !== sectionTitle && maxHeight) {
        return setMaxHeight(ref.current.scrollHeight);
      } else {
        return active === sectionTitle && maxHeight
          ? setMaxHeight(0)
          : setMaxHeight(ref.current.scrollHeight);
      }
    }

    return;
  };

  return { ref, changeMaxHeight, maxHeight };
}

export default useMaxHeight;
