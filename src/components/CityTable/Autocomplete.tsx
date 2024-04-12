// Autocomplete.tsx

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

  // Function to handle input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    onChange(inputValue);

    // Filter suggestions based on input value
    const filtered = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredSuggestions(filtered);
  };

  // Function to handle suggestion selection
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
