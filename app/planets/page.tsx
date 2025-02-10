"use client";
import imagePeople from "@/app/images.json";
import { Planet } from "@/types/planet";
import { useEffect, useState } from "react";

const peoplePage = () => {
    const [people, setPeople] = useState<Planet[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [totalPages, setTotalPages] = useState(0);
    const image = imagePeople.images[0].planets;

    useEffect(() => {
        const fetchPeople = async () => {
            try {
                const res = await fetch(`https://swapi.dev/api/planets/?page=${currentPage}`);
                if (!res.ok) throw new Error("Erreur lors du fetch");
                const data = await res.json();
                setPeople(data.results);
                setTotalPages(Math.ceil(data.count / itemsPerPage));
            } catch (error) {
                console.error("Erreur:", error);
            }
        };

        fetchPeople();
    }, [currentPage]);

    const changePage = (newPage: number) => {
        setCurrentPage(newPage);
        window.scrollTo(0, 0);
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            changePage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            changePage(currentPage - 1);
        }
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentImages = image.slice(startIndex, startIndex + itemsPerPage);

    return (
        <>
            <h1 className="text-gray-200 flex justify-center text-2xl">Star Wars Planets</h1>
            <section>
                <div className="container flex flex-wrap justify-center">
                    {people.map((planet, index) => (
                        <a href={`lukacike/planets/${planet.url.split('/')[5]}`} key={index}>
                            <div className="cardbox bg-slate-200 m-10 w-64 min-h-48 rounded-lg flex flex-col">
                                <img 
                                    src={currentImages[index] || "default_image_url.jpg"} 
                                    alt={planet.name} 
                                />
                                <div className="flex flex-col items-center pt-6 pb-6">
                                    <h1 className="text-gray-200 text-xl mb-4">{planet.name}</h1>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                <div className="flex justify-between m-12">
                    <button 
                        onClick={prevPage} 
                        disabled={currentPage === 1}
                        className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                        Précédent
                    </button>
                    <button 
                        onClick={nextPage} 
                        disabled={currentPage === totalPages}
                        className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                        Suivant
                    </button>
                </div>
            </section>
        </>
    );
};

export default peoplePage;
