import { useEffect, useState } from "react";

/**
 * Custom hook to calculate the width of child elements based on the parent element's width.
 * Used for responsive layouts.
 *
 * @param {React.RefObject} fatherRef - The ref of the parent element.
 * @param {number} marginX - The horizontal margin between child elements.
 * @param {number} cols - The number of columns per row.
 * @param {function} callback - Optional callback to return the calculated width.
 * @returns {number} The calculated width of the child elements.
 */
const useCalculativeWidth = (fatherRef, marginX, cols, callback) => {
  const [itemWidth, setItemWidth] = useState(200); // Initial width of the child items

  useEffect(() => {
    /**
     * Calculate the width of the child elements based on the parent width.
     */
    const countWidth = () => {
      const width = fatherRef.current?.offsetWidth;
      if (width) {
        const calculatedWidth = (width - marginX * (cols + 1)) / cols;
        setItemWidth(calculatedWidth);
        if (callback) callback(calculatedWidth);
      }
    };

    countWidth(); // Call once on mount to set the initial width
    window.addEventListener("resize", countWidth); // Recalculate on window resize

    return () => {
      window.removeEventListener("resize", countWidth); // Clean up event listener
    };
  }, [fatherRef, marginX, cols, callback]); // Re-run effect if any of the dependencies change

  return itemWidth;
};

export default useCalculativeWidth;
