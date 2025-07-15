import { AppDataSource } from "../infra/setup_db";
import { Movie } from "../models/Movie";
import { Between } from 'typeorm';
const movieRepository = AppDataSource.getRepository(Movie)


export default class MovieRepository {
    static  async trending():Promise<Movie[]>{
    return  AppDataSource
        .getRepository(Movie)
        .createQueryBuilder("movie")
        .orderBy("movie.reviews_today", "DESC")
        .limit(10)         // top 5 movies by rating
        .getMany()
    };


    static async searchByTags(tags: string[]): Promise<Movie[]> {
        return AppDataSource
            .getRepository(Movie)
            .createQueryBuilder('movie')
            .where('movie.tags @> :tags', { tags })
            .getMany();
    }

    static getAll() : Promise<Movie[]> {
        return movieRepository.find()
    }
    static getByRating(min: Number,max: Number) : Promise<Movie[]> {
        return movieRepository.find({
            where: {
                rating: Between(min,max)
            }
        })
    }

   // static searchByTags()

    static getById(id: Number) : Promise<Movie | null> {
        return movieRepository.findOne({
            where: {
                id: id
            }
        })
    }

    static searchByName(name: string) : Promise<Movie[]> {
        name = name.toLowerCase()
        return movieRepository.createQueryBuilder("movie").where(`movie.name LIKE '${name}%'`).getMany()
    }

    static saveMovie(movie) : Promise<any> {
        return movieRepository.save(movie)
    }
}