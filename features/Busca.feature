Given que eu consigo observar a barra de busca.
When eu digito um título de filme não cadastrado.
Then eu não deveria ver nenhuma recomendação.
When eu confirmo a busca.
Then eu posso ver uma Página com uma mensagem sinalizando que não foram encontrados resultados.

Cenário de falha1

Cenário de falha2


Given que eu consigo ver a barra de busca.
When eu digito um título de filme cadastrado.
Then eu posso ver os títulos similares alfabeticamente.
When eu escolho um desses títulos
Then eu devo acessar a página de detalhes do título.

Given que eu consigo ver a barra de busca.
When eu digito um título de filme cadastrado.
Then eu posso ver os títulos similares alfabeticamente.
When eu confirmo a busca.
Then eu devo ver a página de resultados.
And o número de resultados encontrados na busca.
And os filmes encontrados na busca.
When eu escolho um desses filmes
Then eu devo acessar a página de detalhes do título.

