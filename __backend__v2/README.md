## Backend v2:

## Adições:

- Relacionamento Muitos para Muitos com Filmes e Atores;
- Relacionamento Um para um com Filmes e Files (Imagens.)
- Separação de Entidades;
- File Upload;

## Docker

>Para a criação do container, instale o **docker**
Após instalação rode o comando: 
```docker run --name dbsqlnode -e POSTGRES_PASSWORD=docker -p 5432:5432 postgres:11```

- O atributo **name** especifica o nome do container a ser gerado (*dbsqlnode*);
- No atributo **POSTGRES_PASSWORD** foi indicada a senha do administrador 
(para o usuário default postgres). Caso queira definir um usuário para o Postgre,
ao invés do default utilize: ``` ... -e POSTGRES_USER=username ```. Em que **username** é o nome a ser definido;
- O atributo **-p** indica a porta (*5432*) em que se dará a comunicação com o PostgreSQL, a qual será mapeada para a porta default (*5432*) deste SGBD dentro do container;
> Pode-se criar um volume utilizando o atributo **-v**:
```/path/to/store/yourDatas:/var/lib/postgresql/data ```

## Sequelize
> Para setup inicial do banco de dados: 
``` yarn db:migrate ```

## Tecnologias
- express; 
- pg;
- sequelize;
- multer;
- morgan;

## Startup
> ``` yarn dev ```

## Rotas

| URL                |  Método             | Operação                            |
| ------------------ | ------------------- | ----------------------------------- |
|  /movies           |  GET                | Lista todos os filmes com seus respectivos  atores e arquivo de imagem.                                                      |
|  /movies           |  POST               | Cria um novo filme, com opcional de adicioar atores e arquivo de imagem iniciais.                                             |
|  /movies/1         |  PUT                | Edita um filme, com adição de atores e arquivo de imagem                                                                           |
|  /actors           |  GET                | Lista todos os atores e seus respectivos filmes                                                                           |
|  /actors           |  POST               | Cria um ator, com opcional de adicionar seus respectivos filmes                                                               |
|  /actors/1         |  PUT                | Edita um ator, com adição de filmes |

- Não Aplicado soft-delete. ( To do )

## Arquivo .env

Sugerido:

 - APP_URL=http://localhost:3333  
 - NODE_ENV=development

Auth

 - APP_SECRET=81fbfdb8cb6f9f52ddd41f014f9dab00

Database rodando em Docker

 - DB_HOST=localhost
 - DB_USER=postgres
 - DB_PASS=docker
 - DB_NAME=testedev2

