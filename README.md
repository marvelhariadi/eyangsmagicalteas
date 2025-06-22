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
A product stock can be 0. When this happens and the user tries to add a item to their cart, the front end shows a popup that says "item sold out" and won't let the user add it to the cart. When orders are taken, it also decrements the product stock in the database. 

# How to Run the application on Docker
0. Make sure that Marvel has MongoDB with the collection running on their machine on Atlas.
1. Navigate to the project directory: `cd .../eyangsmagicalteas`
2. Build the Docker image: ` docker-compose up -d --build.`

Note that I am using Node.js Version 24. So you may need to install run `conda install -n cpsc455 nodejs=24 -y` or the npm equivalent in order to bring Node.js to the version 24. 

## Access
Open your web browser and go to: http://localhost:3000

## To stop the service
`docker-compose down`
