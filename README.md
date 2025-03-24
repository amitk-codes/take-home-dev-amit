<h1 align="center">
  <div>World Wide Web Store</div>
</h1>

<!--
<h2 align="center">
  <div>Welcome To The W3b</div>
</h2>
-->


<h2 align="center">
<div>The W3b Management System</div>
</h2>

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


## Preview


<table>

  <tr >
    <td colspan="2"><img src="screenshots/screenshot-00.png" title="Login Page"/></td>
  </tr>
  <tr>
    <td><img src="screenshots/screenshot-01.png" title="Dashboard"/></td>
    <td><img src="screenshots/screenshot-02.png" title="Entries"/></td>
  </tr>
  <tr>
    <td><img src="screenshots/screenshot-03.png" title="Inventory"/></td>
    <td><img src="screenshots/screenshot-04.png" title="Sales"/></td>
  </tr>
  <tr>
    <td><img src="screenshots/screenshot-05.png" title="Return"/></td>
    <td><img src="screenshots/screenshot-06.png" title="Customer"/></td>
  </tr>
  <tr>
    <td><img src="screenshots/screenshot-07.png" title="Expenses"/></td>
    <td><img src="screenshots/screenshot-08.png" title="Servicing"/></td>
  </tr>
  <tr>
    <td><img src="screenshots/screenshot-09.png" title="Product"/></td>
    <td><img src="screenshots/screenshot-10.png" title="Users"/></td>
  </tr>

</table>

### Application Access


> import db.users.json in your DB to get the following user


- Admin > email: `sysadmin@w3bstore.com` | password: `SuperPassword`

> Or import db.user.json to the DB



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

