# Thriller Mania

Bienvenue sur Thriller Mania, un site web de recherche de films sur le thème du thriller. Vous aurez la capacité à chercher un film, liker, commenter et partager auprès la communauté.

## Badges

![FIGMA](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)
![NODE](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=fff)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff)
![REACT](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-EC5990?logo=reacthookform&logoColor=fff)
![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white)
![DaisyUI](https://img.shields.io/badge/DaisyUI-5A0EF8?logo=daisyui&logoColor=fff)
![GIT](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)

## Palette de couleurs

Voici les couleurs fournies par le client.
| Color | Hex |
| ----------------- | ------------------------------------------------------------------ |
| Principale | ![#373D41](https://via.placeholder.com/10/373D41?text=+) #373D41 |
| Secondaire | ![#BD2F23](https://via.placeholder.com/10/BD2F23?text=+) #BD2F23 |

## Auteurs

- [@Alexandre](https://github.com/alexandreg67)
- [@Ludovic](https://github.com/Ludovicscelles)
- [@Stephanie](https://github.com/brewost)
- [@Jean-Francois HAFID](https://github.com/YOUNS28100)

## Remerciements

- [Julien](https://github.com/jujuck)
- [Nos collègues du Crew](https://github.com/orgs/WildCodeSchool-CDA-FT-2024-09/teams/js-remote-cda-julien)
- [Wild Code School](https://www.wildcodeschool.com/fr-fr/)
  ![<3](http://ForTheBadge.com/images/badges/built-with-love.svg)

## Setup & Use

### Windows users

Be sure to run these commands in a git terminal to avoid [issues with newline formats](https://en.wikipedia.org/wiki/Newline#Issues_with_different_newline_formats):

```
git config --global core.eol lf
git config --global core.autocrlf false
```

### Project Initialization

- In VSCode, install plugins **Prettier - Code formatter** and **ESLint** and configure them
- Clone this repo, enter it
- Run command `npm install`
- Create environment files (`.env`) in both `api` and `client`: you can copy `.env.sample` files as starters (**don't** delete them)

### Available Commands

- `dev` : Starts both servers (frontend + backend) in one terminal
- `dev-front` : Starts the React frontend server
- `dev-back` : Starts the backend server
- `lint` : Runs validation tools (will be executed on every _commit_, and refuse unclean code)

## FAQ

### Tools

- _Concurrently_ : Allows for several commands to run concurrently in the same CLI
- _Husky_ : Allows to execute specific commands that trigger on _git_ events
- _Vite_ : Alternative to _Create-React-App_, packaging less tools for a more fluid experience
- _ESLint_ : "Quality of code" tool, ensures chosen rules will be enforced
- _Prettier_ : "Quality of code" tool as well, focuses on the styleguide
- _ Airbnb Standard_ : One of the most known "standards", even though it's not officially linked to ES/JS

### About the database

Currently under development with sqlite database.
