import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDebounce } from "use-debounce";
import { saveQuery } from "./searchHistory";

/**
 * A custom hook that manages search input state, debouncing, and navigation.
 *
 * @param refine - A callback function that processes the debounced input value.
 * @param defaultValue - The initial value for the search input.
 * @returns An object containing:
 * - `inputValue`: The current value of the search input.
 * - `handleChange`: A function to update the search input value.
 * - `handleSearch`: A function to navigate to the search results page with the current input value.
 *
 * @example
 * ```tsx
 * const { inputValue, handleChange, handleSearch } = useSearch(refineFunction, "default");
 *
 * <input
 *   value={inputValue}
 *   onChange={(e) => handleChange(e.target.value)}
 * />
 * <button onClick={() => handleSearch(inputValue)}>Search</button>
 * ```
 */
export const useSearch = (refine, defaultValue) => {
  const [inputValue, setInputValue] = useState(defaultValue);
  const [debouncedInputValue] = useDebounce(inputValue, 500);
  const navigate = useNavigate();

  useEffect(() => {
    refine(debouncedInputValue);
  }, [debouncedInputValue, refine]);

  const handleSearch = (value) => {
    saveQuery(value);
    navigate(`/search?query=${encodeURIComponent(value)}`);
  };

  const handleChange = (value) => {
    setInputValue(value);
  };

  return {
    inputValue,
    handleChange,
    handleSearch
  };
};