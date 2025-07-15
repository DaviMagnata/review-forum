Feature: Busca

Scenario: Busca por tags
Given the Film "Matrix" exists with tags "sci-fi,action,cyberpunk"
And the Film "Matrix 2" exists with tags "sci-fi,action,cyberpunk,sequel"
And the Film "Interstellar exists with tags "sci-fi,drama"
When i search by tags "sci-fi,action"
Then i can see 2 movies
And the movie list should include "Matrix"
And the movie list should include "Matrix 2"

Scenario: Busca incompleta
Given the Film "Matrix" exists
And the Film "Matrix 2" exists
And the Film "Matilda" exists
And the Film "The mummy" exists
When i search the name "ma"
Then i can see 3 movies
And the movie list should include "Matrix"
And the movie list should include "Matrix 2"
And the movie list should include "Matilda"

Scenario: Busca por nome 
Given the Film "Matrix" exists
And the Film "Matrix 2" exists
And the Film "Matrix 3" exists
When i search the name "Matrix 3"
Then i can see 1 movie
And the movie list should include "Matrix 3"

Scenario: Busca falha
Given the Film "Matrix" exists
And the Film "Matrix 2" exists
When i search the name "s"
Then i can see 0 movies

Scenario: Busca por rating 
Given the Film "Matrix" exists with rating 1
And the Film "Matrix 2" exists with rating 2
And the Film "Matrix 3" exists with rating 3
And the Film "Matrix 4" exists with rating 4
When i search by min rating "3" and max rating "4"
Then i can see 2 movies
And the movie list should include "Matrix 3"
And the movie list should include "Matrix 4"
