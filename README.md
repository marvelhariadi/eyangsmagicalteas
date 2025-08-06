
# Eyang's Magical Teas
For my grandmother, Pertamaningsih, the most magical woman around. 

This was an exercise in web development and design. As a UX-er, this was really fun (and also very painful)! I  liked seeing the design come together slowly and trying to make everything responsive. Connecting the backend API endpoints was very painful, but valuable to learn as a designer. 

## About
I just finished reading a book, ["A Magic Steeped in Poison" by Judy I. Lin](https://www.goodreads.com/book/show/56978089-a-magic-steeped-in-poison), where tea is used as a form of enacting magic. I was inspired by that book to create a e-commerce website selling magic teas that have spiritual properties to help you manifest your goals. I decided to call it "Eyang's Magic Teas," as "Eyang" means grandparent in Javanese.

# Build Tour
[Web tour youtube video link](https://youtu.be/hvuWiTS8ehs)

## Extra Feature(s)
A product stock can be 0. When this happens and the user tries to add a item to their cart, the front end shows a popup that says "item sold out" and won't let the user add it to the cart. When orders are taken, it also decrements the product stock in the database. 

# How to Run the application on Docker
0. Make sure that Marvel has MongoDB with the collection running on their machine on Atlas.
1. Navigate to the project directory: `cd .../eyangsmagicalteas`
2. Build the Docker image: ` docker-compose up -d --build`

Note that I am using Node.js Version 24. So you may need to install run `conda install -n cpsc455 nodejs=24 -y` or the npm equivalent in order to bring Node.js to the version 24. Additionally, you will not be able to access the database without the .env file. Please contact Marvel if you would like the .env file. 

## Access
Open your web browser and go to: http://localhost:3000

## To stop the service
`docker-compose down`
