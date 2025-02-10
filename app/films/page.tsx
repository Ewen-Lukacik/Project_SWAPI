"use client"; //definir la page comme coté client --> sinon ça marche pas car par défaut corté serveur
import imageMovies from "@/app/images.json";
import { Film } from "@/types/films";
import { Suspense, useEffect, useState } from "react";

const filmPage = () => {
    //definir film comme un tableau + on précise que c'est un type Film comme défini dans l'autre fichier
    const [film, setfilm] = useState<Film[]>([])
    const image = imageMovies.imagesList[0].films;
    useEffect(() => {
        // Récupérer les données de l'API film
        const fetchfilm = async () => {
            try {
                const res = await fetch("https://swapi.dev/api/films/"); //recup les données de l'api
                if (!res.ok) throw new Error("Erreur lors du fetch");
                const data = await res.json(); //extraire les données json
                setfilm(data.results); //passer les données reucp a la var film
            } catch (error) {
                console.error("Erreur:", error);
            }
        };

        fetchfilm();
    }, []);

    // Affichage du rendu
    return (
        <>
          <h1 className="text-gray-200 flex justify-center text-2xl">Star Wars Movies</h1>
          <section>
            {/* fallback pour attendre la fin du chargement */}
            <Suspense> 
            <div className="container flex flex-wrap justify-center">
              {film.map((film, index) => ( 
                <a href={`/films/${film.url.split('/')[5]}`}>
                  <div key={index} className="cardbox bg-slate-200 m-10 w-64 min-h-48 rounded-lg flex flex-col ">
                    <img src={image[index]} alt="" />
                    <div className="flex flex-col items-center pt-4 pb-4">
                      <h1 className="text-gray-200 text-xl mb-4 ">{film.title}</h1>                   
                    </div>
                  </div>
                </a>
              ))}
            </div>
            </Suspense>
          </section>
        </>
      );
};

export default filmPage;
