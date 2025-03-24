<h1 align="center">
  <div>World Wide Web Store</div>
</h1>

<!--
<h2 align="center">
  <div>Welcome To The W3b</div>
</h2>
-->

<br>


## The W3b Management System

<br>

A business management (inventory, sales, expense and servicing) system which is primarily built for `W3bStore`.This project is crafted with Nodejs, Express, Ejs and MongoDB.

## Features Highlight

This application has lots of features including sales, expenses, returns, servicing and many more. There are lots of common features like pagination, searching, api for reading data for auto-completion on the form fields, PDF generations on sales or servicing, along with below features:

- Users: You can create 5 types of users based on the roles and permission - Admin, Sales, Inventory, Expense, and Servicing Manager. Although admin has all abilities to do anything but other users have limited accessibility by intentions.
- Products: You can create as many products as you want. Later on this product information will be used everywhere.
- Inventory: List of Products with Inventory overview - Total, sales and left over.
  - Entry: You can add, edit and delete product to inventory.
- Customer: List of customers with balances. You can add, edit and delete customer information. With any particular sales or returns the customer balance will automatically syncs.
- Sales: You can add sales and delete them. And Balance to the customer account without sales to clear previous due. This will automatically generate PDF invoice, and auto syncs with all the previous sales and dues for customer balance and also syncs with inventory status.
- Return: You add, edit and delete any returns of a product. Syncs with customer balance and with inventory status.
- Servicing: You add, edit and delete any servicing of a product. This, also generates invoice. You can quickly change the status of servicing. This changes also reflects on the PDF invoice.
- Expenses: You add, edit and delete any expenses by the number of categories.
- Dashboard: From dashboard you can see the overview of Sales, Inventory, Expenses or Returns by date, product or customers.

### Application Access


> import db.users.json in your DB to get the following user


- Admin > email: `sysadmin@w3bstore.com` | password: `SuperPassword`

<br>

> -  Or import db.user.json to the DB

<br>


> Add Different users via the app in the users page


- Sales Manager
- Expense Manager
- Inventory Manager
- Servicing Manager

## Installation

> Clone the project 

```
git clone 
```

> cd into the project 

```
cd w3bstore-ms
```


> Install Dependencies 

```
npm i --force
``` 

> Run App

```
npm start
```

This project uses `nodemon` for running the development server. If you have trouble working with nodemon due to permission uses, you can installing `nodemon` globally.

