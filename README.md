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
* [View Server Side Code](https://github.com/hewayman/redbadge-ecommerce-server/ "View Server Side Code")

## Details
#### Admin Account Creation:
This app was designed to have one super admin account who can grant admin privileges to additional user accounts via the admin portal. As long as a super admin account does not already exist, a super admin account is automatically created when any user hits the '/create/admin' endpoint. The login information for the super admin acccount is protected in the .env file.

#### Protected Routes:
React-router-guards are used to keep the admin portal, customer list, and store item creation components protected against unauthorized access.

#### 404 Page:
A 404 page alerts users that the URL does not exist and provides a link back to the home page.
![404 Page](https://i.ibb.co/cLggkvM/404.jpg/100x100 "404 Page")

## Admin Portal
The admin portal allows admins to post, edit, and delete store item listings, customer information, and customer reviews. The admins can also grant and remove admin privileges to any of the user accounts.

## Customer View
The customer view gives customers access to post, edit and delete reviews. 

## Shopping Cart
Customers can add items to the shopping cart either from the home page or by clicking directly on the item to see the details page. The shopping cart calculates the subtotal, sales tax (currently set to 7%), and the total.

## Future Developments
In the future, customers will be able to pay via the app. Additionally, there will be a page that customers can access through the shopping cart to update their home addresses and phone numbers.
