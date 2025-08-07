import { listbyTags } from '../../../../services/MovieService.ts';
import MovieCard from '../../../../components/MovieCard.tsx'
import MovieDescription from "../../../../components/MovieDescription.tsx";
import styles from "./FilmesEncontrados.module.css"
export default async function FilmesEncontrados({ params }: { params: { tags: string[] } }) {
    const tagString = params.tags.join(',');
    const filmes = await listbyTags(tagString);
    Array.isArray(filmes) ? filmes : [];

    return (
        <div>
            <header className={styles.quantidade}>Foram encontrados {filmes.length} Resultados para: {tagString}</header>

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