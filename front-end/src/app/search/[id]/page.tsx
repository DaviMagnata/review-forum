import { listbyName } from '../../../services/MovieService.ts';
import MovieCard from '../../../components/MovieCard.tsx'
import MovieDescription from "../../../components/MovieDescription.tsx";
import styles from "./FilmesEncontrados.module.css"
export default async function FilmesEncontrados({ params }: { params: { id: string } }) {
    const filmes = await listbyName(params.id); // Use 'id' instead of 'name'

    return (
        <div>
            <header className={styles.quantidade}>Foram encontrados {filmes.length} Resultados para: {params.id}</header>

            <hr/>

            <ul>
                {filmes.map((filme: any) => (
                    <div>
                        <MovieDescription movie={filme}></MovieDescription>
                    </div>
                ))}
            </ul>
        </div>
    );
}