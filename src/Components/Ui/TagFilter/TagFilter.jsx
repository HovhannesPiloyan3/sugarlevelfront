import React from 'react';

const TagFilter = ({tags, selectedTags, onTagSelect}) => {

    return (
        <div className="tag-filter flex-wrap flex lg:flex-col w-full  flex-row">
            {tags.map((tag, index) => {

                return(
                    <button
                        key={index}
                        className={`tag w-max m-3 lg:m-0 lg:mt-2   lg:w-full  dark:bg-gray-700 dark:text-white capitalize p-2 mt-2 text-xl rounded-xl hover:bg-green-500 bg-gray-300  ${selectedTags.includes(tag) ? 'selected bg-green-500' : ''}`}
                        onClick={() => onTagSelect(tag)}
                    >
                        {tag}
                    </button>
                )

            })}
        </div>
    );
};

export default TagFilter;
