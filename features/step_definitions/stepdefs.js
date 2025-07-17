const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000';

Given('the Film {string} exists with tags {string}', async function (name, tags) {
    const tagsArray = tags.split(',');
    const response = await axios.post(`${API_BASE_URL}/api/movies`, {
        name: name,
        description: `Um filme sobre ${name}`,
        year: 2025,
        director: "Diretor Teste",
        tags: tagsArray,
    });
    this.movieId = response.data.movie.id;
    assert.strictEqual(response.status, 201);
});

When('i search by tags {string}', async function (tags) {
    const tagParam = encodeURIComponent(tags);
    this.searchResponse = await axios.get(`${API_BASE_URL}/api/movies/search-by-tags?tags=${tagParam}`);
    console.log(this.searchResponse);
});

Then('i can see {int} movies', function (count) {
    assert.strictEqual(this.searchResponse.data.length, count);
});

Then('the movie list should include {string}', function (name) {
    const movieNames = this.searchResponse.data.map(movie => movie.name);
    assert.ok(movieNames.includes(name), `Expected movie list to include "${name}", but got: ${movieNames.join(', ')}`);
});

Given('the Film {string} exists', async function (name) {
    const response = await axios.post(`${API_BASE_URL}/api/movies`, {
        name: name,
        description: `Um filme sobre ${name}`,
        year: 2025,
        director: "Diretor Teste",
        tags: ['string'],
    });
    this.movieId = response.data.movie.id;
    assert.strictEqual(response.status, 201);
});

When('i search the name {string}', async function (name) {
    const encodedName = encodeURIComponent(name);
    this.searchResponse = await axios.get(`${API_BASE_URL}/api/movies/search?name=${encodedName}`);
});

Given('the Film {string} exists with average rating {int}', async function (name, rating) {

    const response = await axios.post(`${API_BASE_URL}/api/movies`, {
        name: name,
        description: `Um filme sobre ${name}`,
        year: 2025,
        director: "Diretor Teste",
        tags: ['string'],
    });
    this.movieId = response.data.movie.id;
    await axios.post(`${API_BASE_URL}/api/reviews`, { text: "Review", rating: rating, movieId: this.movieId });
    await axios.post(`${API_BASE_URL}/api/reviews`, { text: "Review", rating: rating, movieId: this.movieId });
    assert.strictEqual(response.status, 201);
});

When('i search by min rating {int} and max rating {int}', async function (min, max) {
    this.searchResponse = await axios.get(`${API_BASE_URL}/api/movies/by-rating?min=${min}&max=${max}`);
});

//Trending
Given('the Film {string} exists with reviews_today {int}',async function (name, review_count) {
    const response = await axios.post(`${API_BASE_URL}/api/movies`, {
        name: name,
        description: `Um filme sobre ${name}`,
        year: 2025,
        director: "Diretor Teste",
        tags: ['string'],
    });
    this.movieId = response.data.movie.id;
    for (let i = 1; i <= review_count; i++) {
        await axios.post(`${API_BASE_URL}/api/reviews`, { text: "Review", rating: 1, movieId: this.movieId });
    }

    assert.strictEqual(response.status, 201);

});

When('i visit the trending tab', async function () {
    this.searchResponse = await axios.get(`${API_BASE_URL}/api/movies/trending`);
});
