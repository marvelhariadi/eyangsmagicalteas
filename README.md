
# Eyang's Magical Teas
For my grandmother, Pertamaningsih, the most magical woman around. 

This was an exercise in web development and design. As a UX-er, this was really fun (and also very painful)! I  liked seeing the design come together slowly and trying to make everything responsive. Connecting the backend API endpoints was very painful, but valuable to learn as a designer. 

# Build Tour
[Web tour youtube video link](https://youtu.be/hvuWiTS8ehs)

<img width="1350" alt="oogabogoa" src="https://github.com/user-attachments/assets/620b5dcb-2d28-4cb0-b5fa-f36d66cd0d69" />

## About
I just finished reading a book, ["A Magic Steeped in Poison" by Judy I. Lin ](https://www.goodreads.com/book/show/56978089-a-magic-steeped-in-poison) where tea is used as a form of enacting magic. I was inspired by that book to create a e-commerce website selling magic teas that have spiritual properties to help you manifest your goals. I decided to call it "Eyang's Magic Teas," as "Eyang" means grandparent in Javanese–my grandmother's native language. 

## Tech Stack
A classic MERN stack e-commerce wbesite. Beyond React and Redux, I also used Vite for the development environment, as it is more modern and much more stable than using React and Redux by itself in the front-end. The products are hosted on MongoDB in the backend and facilitated by ExpressJS & NodeJS. 

## Fun Feature(s)
- If the cart is empty, a screen that says "your cart is empty" will appear. If it is full, then it will be populated by items. So there are esentially two divs that the cart page switches between depending on if their are items to populate the cart or not.
- Price varies depending on the size of the product quantity. So user can choose what size of the product they want. Size information and variable price amount is persisted as part of the cart's global state.  
- I made a cart pop-up! It's information is consistent with the home page. Both use the global state offered by redux.
- We can remove items last minute from the cart home page. 
- Checkout page is fully functional. Orders are saved in the database.
- "Admin" page can track live number of active carts present on the site at any given time. Also shows orders archive. 

## Credit
All images not my own! I'll be slowly updating this Readme to include credits to all the photographers from Unsplash and Google that I took these imags from. 


