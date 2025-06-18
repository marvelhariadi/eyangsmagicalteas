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
Admin can make a product stock 0. when this happens and the user tries to add a item to their cart, the front end shows a popup that says "item sold out" and won't let the user add it to the cart.

# How to Run the application on Docker
0. Make sure that Marvel has MongoDB with the collection running on their machine on Atlas.
1. Navigate to the project directory: `cd .../eyangsmagicalteas`
2. Build the Docker image: `docker build -t eyangsmagicalteas .`
3. Start the Docker container: `docker run -d -p 3000:3000 -e MONGODB_URI="mongodb+srv://marvelhariadi:gfbPtUhvciqCvsJR@eyangsmagicalteas.awooomk.mongodb.net/?retryWrites=true&w=majority&appName=EyangsMagicalTeas" --name eyangsmagicalteas-app eyangsmagicalteas`
4. wait 30 seconds, then run `docker logs eyangsmagicalteas-app`.
5. You should see _Server is listening on port 3000. MongoDB connected successfully_

* just gonna trust yall cpsc staff to not mess w my data rip.

## Access
Open your web browser and go to: http://localhost:3000

## To stop the service
`docker stop eyangsmagicalteas-app && docker rm eyangsmagicalteas-app`
