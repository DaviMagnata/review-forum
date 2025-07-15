import { Given, When, Then } from '@cucumber/cucumber';
import * as request from 'supertest';
import { AppDataSource } from '../../src/infra/setup_db';
import { Movie } from '../../src/models/Movie';
import { app } from '../../src/index.ts';
import assert from 'assert';


let response: request.Response;

Given('the Film {string} exists with tags {string}', async (name: string, tagsStr: string) => {
    const tags = tagsStr.split(',').map(n => n.toLowerCase());
    const repo = AppDataSource.getRepository(Movie);

    const movie = repo.create({
        name,
        description: `${name} description`,
        tags,
    });

    await repo.save(movie);
});

When('I search by tags {string}', async (tags: string) => {
    response = await request(app)
        .get(`/api/movies/search-by-tags?tags=${tags}`)
        .expect(200);
});

Then('I can see {int} movies', (count: number) => {
    assert.strictEqual(response.body.length, count);
});

Then('the movie list should include {string}', (movieName: string) => {
    const movieNames = response.body.map((movie: any) => movie.name);
    assert.ok(
        movieNames.includes(movieName),
        `Expected movie "${movieName}" to be in the list`
    );
});