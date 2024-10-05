import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from "react-icons/fa";
import { ScrollArea, ScrollBar } from './ui/scroll-area';

function Search({ onTagSelect, onTagsFetch }) {
    const [tags, setTags] = useState([]);
    const [value, setValue] = useState('');
    const [selectedValue, setSelectedValue] = useState('search');

    useEffect(() => {
        const getTags = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/tags');
                const data = response.data.data;
                setTags(data);
                onTagsFetch(data);
            } catch (err) {
                console.error('Error fetching tags:', err);
            }
        };
        getTags();
    }, []);

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleTagClick = (tag) => {
        setSelectedValue(tag);
        setValue('');
        onTagSelect(tag);
    };

    const filteredTags = tags.filter(tag =>
        tag.toLowerCase().includes(value.toLowerCase())
    );

    return (
        <div className='relative m-5 w-full'>
            <div className='flex relative items-center w-full rounded-full'>
                <FaSearch className='absolute left-4 text-xl' />
                <input
                    type='text'
                    value={value}
                    onChange={handleChange}
                    placeholder={selectedValue}
                    className='w-full h-full px-12 py-2 rounded-full'
                />
            </div>
            {value && (
                <div className='absolute bg-white w-full left-0 mt-2 rounded shadow-lg z-10'>
                    <ScrollArea className='h-48'>
                        <ul className='w-full p-2'>
                            {filteredTags.map((tag, index) => (
                                <li
                                    onClick={() => handleTagClick(tag)}
                                    key={index}
                                    className='p-2 hover:bg-blue-300 cursor-pointer'
                                >
                                    {tag}
                                </li>
                            ))}
                        </ul>
                        <ScrollBar />
                    </ScrollArea>
                </div>
            )}
        </div>
    );
}

export default Search;
