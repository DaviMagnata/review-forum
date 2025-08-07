import { listbyTags } from './../../../services/MovieService.ts';
import MovieDescription from './../../../components/MovieDescription.tsx';
import styles from './FilmesEncontrados.module.css';

export default async function FilmesPorTag({ params }: { params: { tags: string[] } }) {
    // Use the first tag if only one is expected
    const tagString = params.tags[0]

    const filmes = await listbyTags(tagString);
    const movies = Array.isArray(filmes) ? filmes : [];

    return (
        <div>
            <header className={styles.quantidade}>
                Foram encontrados {movies.length} resultados para: {tagString}
            </header>

            <hr />

            <ul>
                {movies.map((filme: any, index: number) => (
                    <li key={index}>
                        <MovieDescription movie={filme} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
