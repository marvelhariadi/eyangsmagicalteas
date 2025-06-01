# Identity Information
Marvel Hariadi (SN28537025)

# Assignment 2: Eyang's Magic Teas

## About
I just finished reading a book, "a Magic Steeped in Poison" where tea is used as a form of enacting magic. I was inspired by that book to create a e-commerce website selling magic teas that have spiritual properties to help you manifest your goals. I decided to call it "Eyang's Magic Teas," as "Eyang" means grandmother in my language.

## Tech Stack
Beyond React and Redux, I also used Vite for the development environment, as it is more modern and much more stable than using React and Redux by itself.

## Extra Feature(s)
- If the cart is empty, a screen that says "your cart is empty" will appear. If it is full, then it will be populated by items. So there are esentially two divs that the cart page switches between depending on if their are items to populate the cart or not.
- Price varies depending on the size of the product quantity. So user can choose what size of the product they want. Size information and variable price amount is persisted as part of the cart's global state.  
- I made a cart pop-up! It's information is consistent with the home page. Both use the global state offered by redux.
- We can remove items last minute from the cart home page.