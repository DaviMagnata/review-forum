import { AppDataSource } from "../infra/setup_db";
import { Movie } from "../models/Movie";
import { Between } from 'typeorm';
import {MovieReviewStats} from "../models/MovieReviewStats";


const movieRepository = AppDataSource.getRepository(Movie)


export default class MovieRepository {



    static getByRating(min: number, max: number): Promise<Movie[]> {
        return AppDataSource
            .getRepository(Movie)
            .createQueryBuilder("movie")
            .innerJoin(
                MovieReviewStats,
                "stats",
                "stats.id = movie.id"
            )
            .where("stats.average_rating BETWEEN :min AND :max", { min, max })
            .getMany();
    }




    static  async trending():Promise<Movie[]>{
        return AppDataSource
            .getRepository(Movie)
            .createQueryBuilder("movie")
            .innerJoin(
                MovieReviewStats,
                "stats",
                "stats.id = movie.id"
            )
            .orderBy("stats.reviews_today", "DESC")
            .limit(10)
            .getMany();
    }
    static async searchByTags(tags: string[]): Promise<Movie[]> {
        return AppDataSource
            .getRepository(Movie)
            .createQueryBuilder('movie')
            .where('movie.tags @> :tags', { tags })
            .getMany();
    };

    static getAll() : Promise<Movie[]> {
        return movieRepository.find()
    }

    static getById(id: number) : Promise<Movie | null> {
        return movieRepository.findOne({
            where: {
                id: id
            }
        })
    }

    // Novo método para buscar um filme junto com suas reviews
    static findByIdWithReviews(id: number): Promise<Movie | null> {
        return movieRepository.findOne({
            where: { id: id },
            relations: {
                reviews: true, // Isso instrui o TypeORM a carregar as reviews relacionadas.
            },
        });
    }

    static searchByName(name: string) : Promise<Movie[]> {
        return movieRepository.createQueryBuilder("movie").where(`movie.name LIKE '${name}%'`).getMany()
    }

    static saveMovie(movie: Movie) : Promise<any> {
        return movieRepository.save(movie)
    }
}