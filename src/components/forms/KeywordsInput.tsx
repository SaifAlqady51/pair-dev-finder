import React, { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

export interface KeywordsInputProps {
  placeholder?: string;
  maxKeywords?: number;
  suggestions?: string[];
  field: any;
}

export const KeywordsInput: React.FC<KeywordsInputProps> = ({
  placeholder = "Add a keyword",
  maxKeywords = 5,
  suggestions = [],
  field,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const suggestionsRef = useRef<HTMLUListElement>(null);

  const addKeyword = (keyword: string) => {
    if (field.value.length < maxKeywords && !field.value.includes(keyword)) {
      field.onChange([...field.value, keyword]);
      setInputValue("");
      setShowSuggestions(false);
      setHighlightedIndex(-1);
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    field.onChange(
      field.value.filter((keyword: string) => keyword !== keywordToRemove),
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowSuggestions(e.target.value.trim().length > 0);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const filtered = getFilteredSuggestions();

    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      // If a suggestion is highlighted, add that instead of the input value
      if (highlightedIndex >= 0 && filtered[highlightedIndex]) {
        addKeyword(filtered[highlightedIndex]);
      } else {
        addKeyword(inputValue.trim());
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (highlightedIndex + 1) % filtered.length;
      setHighlightedIndex(nextIndex);
      scrollIntoView(nextIndex);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const nextIndex =
        (highlightedIndex - 1 + filtered.length) % filtered.length;
      setHighlightedIndex(nextIndex);
      scrollIntoView(nextIndex);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setHighlightedIndex(-1);
    }
  };

  const getFilteredSuggestions = () => {
    return suggestions
      .filter((s) => s.toLowerCase().includes(inputValue.toLowerCase()))
      .filter((s) => !field.value.includes(s));
  };

  const scrollIntoView = (index: number) => {
    if (suggestionsRef.current && suggestionsRef.current.children[index]) {
      suggestionsRef.current.children[index].scrollIntoView({
        block: "nearest",
      });
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredSuggestions = getFilteredSuggestions();

  return (
    <div
      className="relative space-y-2 cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div className=" border border-red dark:border-slate-400  rounded-lg flex items-center flex-wrap gap-2 h-10 ">
        {field.value.map((keyword: string) => (
          <Badge
            key={keyword}
            variant="outline"
            className="flex items-center h-8 "
          >
            {keyword}
            <button
              type="button"
              onClick={() => removeKeyword(keyword)}
              className="ml-2 text-gray-500 hover:text-red-500"
            >
              <X className="h-4 w-4" />
            </button>
          </Badge>
        ))}
        {/* Hide input field if max keywords reached */}
        {field.value.length < maxKeywords && (
          <Input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="border-none focus:ring-0 outline-none w-auto h-8"
            placeholder={placeholder}
            onFocus={() => setShowSuggestions(true)}
          />
        )}
      </div>

      {/* Dropdown Suggestions */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul
          ref={suggestionsRef}
          className="absolute z-10 w-full bg-white border border-gray-300 dark:border-gray-700 rounded shadow-md mt-1 max-h-60 overflow-auto"
        >
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={suggestion}
              onClick={() => addKeyword(suggestion)}
              className={`px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${highlightedIndex === index ? "bg-gray-100 dark:bg-gray-800" : ""
                }`}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}

      <p className="text-xs text-gray-500">Maximum {maxKeywords} keywords.</p>
    </div>
  );
};
