Feature: Trending

Scenario: Aba trending
Given the Film "Matrix" exists with reviews_today "1"
Given the Film "Matrix 2" exists with reviews_today "2"
Given the Film "Matrix 3" exists with reviews_today "3"
Given the Film "Matrix 4" exists with reviews_today "4"
Given the Film "Matrix 5" exists with reviews_today "5"
Given the Film "Matrix 6" exists with reviews_today "6"
Given the Film "Matrix 7" exists with reviews_today "7"
Given the Film "Matrix 8" exists with reviews_today "8"
Given the Film "Matrix 9 " exists with reviews_today "9"
Given the Film "Matrix 10" exists with reviews_today "10"
Given the Film "Matrix 11" exists with reviews_today "11"
Given the Film "Matrix 12" exists with reviews_today "12"
When i visit the trending tab
Then i can see 10 movies
And the movie list should include "Matrix 12"
And the movie list should include "Matrix 11"
And the movie list should include "Matrix 10"
And the movie list should include "Matrix 9"
And the movie list should include "Matrix 8"
And the movie list should include "Matrix 7"
And the movie list should include "Matrix 6"
And the movie list should include "Matrix 5"
And the movie list should include "Matrix 4"
And the movie list should include "Matrix 3"

