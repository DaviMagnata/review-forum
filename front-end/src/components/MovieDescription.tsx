"use client";
import type { Movie } from '@/types/movie';
import styles from './MovieDescription.module.css';
import Link from 'next/link'; 


interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const poster = movie.bannerURL || `https://placehold.co/400x600/1f2937/99AABB?text=${movie.name.replace(/\s/g, '+')}`;

  return (
      <>
      <Link href={`/movie/${movie.id}`} className={styles.card}>
      <div className={styles.posterContainer}>
        <img
          src={poster}
          alt={`Poster de ${movie.name}`}
          className={styles.poster}
          referrerPolicy="no-referrer"
          onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x600/1f2937/ffffff?text=Error'; }}
        />
      </div>
       <div>
           <p className={styles.title}>{movie.name}</p>
           <p>Descrição:</p>
           <p className={styles.description}>{movie.description}</p>
       </div>
    </Link>
    </>
);
};

export default MovieCard;