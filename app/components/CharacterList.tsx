"use client";
import imageItem from "@/app/images.json";
import { useRef } from "react";

type ItemType = 'films' | 'people' | 'planets' | 'species' | 'starships' | 'vehicles';

interface Item {
  name: string;
  url: string;
  type: string;
}

const CharacterList = ({ title, items }: { title: string; items: Item[] }) => {
  const sliderRef = useRef<HTMLUListElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="character-list mb-11">
      <h3 className="flex justify-center text-yellow-400 text-lg mt-4">{title}</h3>
      <div className="relative">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-300 rounded-full shadow-md"
        >
          &lt;--
        </button>
        
        <ul ref={sliderRef} className="list-disc pl-6 flex flex-row overflow-x-auto space-x-4 scroll-snap-x justify-center">
          {items.map((item, index) => {
            const itemType = item.url.split('/')[4] as ItemType; // Type sécurisé
            const itemId = item.url.split('/')[5];
            const itemLink = `/${itemType}/${itemId}`;
            const imageSrc = imageItem.imagesList[0][itemType]?.[parseInt(itemId) - 1];

            return (
              <a href={itemLink} key={index} className="character-link">
                <li className="character-name w-48 flex-shrink-0 scroll-snap-align-center p-2 rounded-lg text-center">
                  <img src={imageSrc} alt={`${item.name} poster`} className="w-full h-32 object-contain rounded-md mb-2" />
                  {item.name}
                </li>
              </a>
            );
          })}
        </ul>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-300 rounded-full shadow-md"
        >
          --&gt;
        </button>
      </div>
    </div>
  );
};

export default CharacterList;
