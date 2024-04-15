import React, { useState } from "react";

interface AutocompleteProps {
  suggestions: string[];
  value: string;
  onChange: (value: string) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  suggestions,
  value,
  onChange,
}) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    onChange(inputValue);

    const filtered = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredSuggestions(filtered);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    onChange(suggestion);
    setFilteredSuggestions([]);
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search city..."
      />
      {filteredSuggestions.length > 0 && (
        <ul>
          {filteredSuggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSelectSuggestion(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
