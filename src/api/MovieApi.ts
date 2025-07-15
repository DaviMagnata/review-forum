import { Router, Request, Response } from "express"
import MovieServices from "../services/MovieServices"
import {Movie} from "../models/Movie";

const MovieRouter = Router()


/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Get all movies
 *     responses:
 *       200:
 *         description: List of movies
 */
MovieRouter.get('/', async (request, response) => {
    const results = await MovieServices.getAll()
    response.send(results)
})

/**
 * @swagger
 * /api/movies/trending:
 *   get:
 *     summary: Get the top 10 movies by reviews_today
 *     responses:
 *       200:
 *         description: List of movies
 */
//api/movies/trending/
MovieRouter.get('/trending', async (req: Request,res: Response)=>{
    const movies = await MovieServices.trending();
    res.status(200).json(movies);

})

/**
 * @swagger
 * /api/movies/search-by-tags:
 *   get:
 *     summary: Search movies by exact tag match
 *     description: Returns movies that contain all the specified tags.
 *     parameters:
 *       - in: query
 *         name: tags
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: List of movies matching the given tags
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '##/models/Movie'
 *       400:
 *         description: Missing or invalid tags parameter
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Missing or invalid tags parameter
 */


//api/movies/search-by-tags?tags=
MovieRouter.get('/search-by-tags', async (req: Request, res: Response) => {
    const tagsParam = req.query.tags;
    if (!tagsParam || typeof tagsParam !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid tags parameter' });
    }


    const tags = tagsParam.split(',').map(n=> n.toLowerCase());
    const movies = await MovieServices.searchByTags(tags);
    console.log(tags)
    res.status(200).json(movies);
});



/**
 * @swagger
 * /api/movies/by-rating:
 *   get:
 *     summary: Get movies filtered by rating range
 *     description: Returns all movies with rating between min and max. If no params are provided, returns all movies.
 *     parameters:
 *       - in: query
 *         name: min
 *         schema:
 *           type: number
 *         required: false
 *       - in: query
 *         name: max
 *         schema:
 *           type: number
 *         required: false
 *     responses:
 *       200:
 *         description: List of movies filtered by rating
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '##/models/Movie'
*/
//api/movies/by-rating?min=&max=
MovieRouter.get('/by-rating', async (req: Request, res: Response) => {
    const min = parseFloat(req.query.min as string);
    const max = parseFloat(req.query.max as string);

    if (isNaN(min) && isNaN(max)) {
        const movies = await MovieServices.getAll();
        res.status(200).json(movies);
    }

    if (isNaN(min)) {
        const movies = await MovieServices.getByRating(0, max);
        res.status(200).json(movies);
    }
    if (isNaN(max)){
        const movies = await MovieServices.getByRating(min, 5);
        res.status(200).json(movies);
    }

    // 400:
    //         description: Invalid parameters
    //return res.status(400).json({ error: 'Invalid or missing min/max values' });
    const movies = await MovieServices.getByRating(min, max);
    res.status(200).json(movies);
});











/**
 * @swagger
 * /api/movies/get-by-id/{id}:
 *   get:
 *     summary: Get all movies
*     parameters:
*      - name: id
*        in: path
*        description: Movie ID
*        required: true
 *     responses:
 *       200:
 *         description: Desired movie
 *       404:
 *          description: No movie was founded with that ID
 */
MovieRouter.get('/get-by-id/:id', async (request: Request, response: Response) => {
    const id = request.params['id']
    const result = await MovieServices.getById(Number(id))
    response.send(JSON.stringify(result))
})

/**
 * @swagger
 * /api/movies/search/:
 *   get:
 *     summary: Get all movies
*     parameters:
*      - name: name
*        in: query
*        type: string
*        description: Search movies from their title
*        required: false
 *     responses:
 *       200:
 *         description: List of movies with likely titles
 *       404:
 *          description: No movie was founded with that title
 */
MovieRouter.get('/search', async(request: Request, response: Response) => {
    let name = (request.query.name)
    let result = await MovieServices.searchByName(name)
    response.send(result)
})


/**
 * @swagger
 * /api/movies/:
 *   post:
 *     summary: Create a movie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               rating:
 *                  type: number
 *               reviews_today:
 *                  type: number
 *               tags:
 *                  type: array
 *                  items:
 *                      type: string
 *     responses:
 *       200:
 *         description: Movie created
 */
MovieRouter.post('/', async (request, response) => {
    const movieDTO = request.body
    console.log(movieDTO)
    const persistedMovie = await MovieServices.add(movieDTO)
    response.send(persistedMovie)
})



export default MovieRouter