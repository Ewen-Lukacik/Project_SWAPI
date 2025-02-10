"use client";
import React, { useState } from 'react';

interface SliderProps {
    items: any[];
    itemKey: string;
    imagePath?: string;
}

const Slider: React.FC<SliderProps> = ({ items, itemKey, imagePath}) => {
    const [index, setIndex] = useState(0);
    const itemShown = 3;

    const visibleItems = items.slice(index, index + itemShown);

    //bouton suivnt
    const handleNext = () => {
        setIndex((prevIndex) => (prevIndex + 1) % items.length);
    }

    //bouton precedrnt
    const handlePrevious = () => {
        setIndex((prevIndex) =>
            (prevIndex - 1 + items.length) % items.length
        );
    };



    return (
        <div className='slider text-center'>
            <h3 className="text-2xl font-bold my-4">{itemKey}</h3>

            <div className='slider-container flex justify-center items-center space-x-4'>
                <button onClick={handlePrevious} className='bg-gray-100 text-red-950 px-4 py-2 rounded'>
                    &lt;--Previous
                </button>

                <div className='flex space-x-4'>
                    {visibleItems.map((item, index) => (
                        <div key={index} className='slider-item bg-slate-200 w-32 h48 rounded-lg p-2'>
                            <img 
                            src={imagePath ? item[imagePath] : '/placeholder.jpg'}
                            alt={item[itemKey]}
                            className='w-full h-32 rounded'
                            />
                            <p className='text-center mt-2 bg-slate-500 text-white rounded p-1'>{item[itemKey]}</p>
                        </div>
                    ))}
                </div>
                
                <button onClick={handleNext} className='bg-gray-100 text-red-950 px-4 py-2 rounded'>
                    Next --&gt;
                </button>
            </div>
        </div>
    )
}

export default Slider;