# MollieBirch Ecommerce App #

## Introduction

MollieBirch is a full-stack ecommerce app that enables customers to browse store item listings, view/leave reviews, and add items to a shopping cart.

[View MollieBirch](https://hw-ecommerce-store.herokuapp.com/ "View MollieBirch")

### Built With:

* Express
* Node.js
* PostgreSQL
* React
* TypeScript
* Material UI
* [View Server-Side Code](https://github.com/hewayman/redbadge-ecommerce-server/ "View Server-Side Code")

## Details
#### Admin Account Creation:
This app was designed to have one super admin account who can grant admin privileges to additional user accounts via the admin portal. As long as a super admin account does not already exist, a super admin account is automatically created when any user hits the '/create/admin' endpoint. The login information for the super admin account is protected in the .env file.

#### Protected Routes:
React-router-guards are used to keep the admin portal, customer list, and store item creation components protected against unauthorized access.

#### 404 Page:
A 404 page alerts users that the URL does not exist.

<img src="https://i.ibb.co/NnRv2j8/404.jpg" alt="404 page" height="150">

## Admin Portal
The admin portal allows admins to post, edit, and delete store item listings, customer information, and customer reviews. The admins can also grant and remove admin privileges to any of the user accounts.

<img src="https://i.ibb.co/60Bj4HX/item-Creation.jpg" alt="listing" height="300">           <img src="https://i.ibb.co/8rNwF9R/admin-Portal.jpg" alt="admin portal" height="300">     

## Customer View
The customer view gives customers access to post, edit and delete reviews. 

<img src="https://i.ibb.co/sCHvp2f/reviews.jpg" alt="reviews" height="300">

## Shopping Cart
Customers can add items to the shopping cart either from the home page or by clicking directly on the item to see the details page. The shopping cart calculates the subtotal, sales tax (currently set to 7%), and the total.


<img src="https://i.ibb.co/gZQQrMV/shopping-Cart.jpg" alt="shopping cart" height="300">

## Future Developments
In the future, customers will be able to pay via the app. Additionally, there will be a page that customers can access through the shopping cart to update their home addresses and phone numbers.
