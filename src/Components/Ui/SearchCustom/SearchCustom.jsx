import React, { useState } from 'react';

const SearchCustom = ({ products, onSearch }) => {
    const [searchValue, setSearchValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        if (value.length > 0) {
            const filteredSuggestions = products.filter(product =>
                product.name.toLowerCase().includes(value.toLowerCase()) ||
                product.tags.some(tag => tag.toLowerCase().includes(value.toLowerCase()))
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
        onSearch(value);
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchValue(suggestion.name);
        setSuggestions([]);
        onSearch(suggestion.name);
    };

    return (
        <div className="w-full relative">
            <input
                className="w-full rounded-xl"
                placeholder="Введите название продукта или тег"
                value={searchValue}
                onChange={handleChange}
                autoComplete="off"
                type="text"
            />
            {suggestions.length > 0 && (
                <ul className="absolute dark:bg-gray-800 z-10 bg-white border border-gray-300 w-full max-h-48 overflow-y-auto rounded-xl">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className="p-2 cursor-pointer dark:text-white hover:bg-gray-500"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchCustom;
