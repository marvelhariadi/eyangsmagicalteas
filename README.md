# Identity Information
Marvel Hariadi (SN28537025)

# Assignment 3: Eyang's Magic Teas

## About
I just finished reading a book, "a Magic Steeped in Poison" where tea is used as a form of enacting magic. I was inspired by that book to create a e-commerce website selling magic teas that have spiritual properties to help you manifest your goals. I decided to call it "Eyang's Magic Teas," as "Eyang" means grandmother in my language.

## What I created
- Used Postman and MongoDB to host the data. I created data tables for Orders, Products, ShoppingCarts, and Usera and conneced them all where necessary.
- checkout page and bestseller category pages
- Also fixed some UI issues related to incrementing orders. 

## Extra Feature(s)
- Admin can make a product stock 0. when this happens and the user tries to add a item to their cart, the front end shows a popup that says "item sold out" and won't let the user add it to the cart.

# How to Run the application on Docker
## Navigate to the project directory
cd .../eyangsmagicalteas

## Build the Docker images
docker compose build --no-cache

## Start all services
docker compose up -d

## Access
You can access the application through the browser preview at http://localhost:80

## To stop the service
docker compose down