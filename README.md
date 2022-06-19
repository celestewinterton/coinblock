<h1 align="center"><img height="24px" width="24px" src="./react-app/public/favicon.ico" alt=""><img> Coinblock</h1>

Coinblock is a full-stack clone of the popular crypto trading application, <a href="https://www.coinbase.com/">Coinbase</a>. Coinblock allows users to view a portfolio, make transactions, and maintain a watchlist. Transactions on Coinblock are simulated and no actual money will be changing hands.

<h4 align="center"><a href="https://coinblock-trading.herokuapp.com/" target="_blank">Explore the website »</a></h4>

<details open="open">
  <summary id="table-of-contents">Table of Contents</summary>
  <ol>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#database-schema">Database Schema</a></li>
    <li><a href="#future-features">Future Features</a></li>
  </ol>
 </details>

## Technologies Used

![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Python](https://img.shields.io/badge/-Python-F9DC3E.svg?logo=Python&style=for-the-badge)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)

## Getting started

1. Clone this repository (only this branch)

   ```bash
   git clone git@github.com:celestewinterton/coinblock.git
   ```

2. Install dependencies

   ```bash
   pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
   ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

## Features

[Back to top](#table-of-contents)

<a href="https://github.com/celestewinterton/coinblock/wiki">See wiki page for feature list</a>

### Splash Page

Description...TBD

![Splash Page](https://user-images.githubusercontent.com/96894806/174201795-edda0667-c719-433b-8942-1a1ddaf33b4f.png)

### Portfolio Dashboard

Description...TBD

![Portfolio Dashboard](https://user-images.githubusercontent.com/96894806/174503692-0c58f85a-0037-48b7-bb93-a36eae34c867.png)

### Watchlist

Description...TBD

![Watchlist](https://user-images.githubusercontent.com/96894806/174503753-2087ac1c-abb0-4d4b-ab5c-5c80e9dc00fd.png)

### Making a Trade

Description...TBD

![Making a Trade](https://user-images.githubusercontent.com/96894806/174503728-a6609ada-20a2-48e4-87cd-4d7b4334113d.png)

### View Single Asset

Description...TBD

![View Single Asset](https://user-images.githubusercontent.com/96894806/174503763-1002c4e0-8360-4a09-ae62-0eb9acc00b24.png)

## Database Schema

[Back to top](#table-of-contents)

![Database Schema](https://user-images.githubusercontent.com/96894806/174503929-ded69bef-cf60-4e2d-9664-afab5efdfda7.png)

## Future Features

[Back to top](#table-of-contents)
