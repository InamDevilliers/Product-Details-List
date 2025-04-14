# Product-Details

# Overview
This project allows users to view, search, select, and delete products. It consists of a Node.js backend to fetch product data from an external API and a React frontend that displays this data with features like search (with custom debouncing), pagination, row selection, and deletion (in memory).

# System Requirements
Ensure the following tools are installed on your machine:
1. 	Node.js (version 14 or higher)
 	  Download Node.js
2. 	npm (comes bundled with Node.js)

# Project Setup<br>
<b>1. Clone the Repository<br></b>
First, clone the project repository (or download the files):<br>
  git clone https://github.com/InamDevilliers/Product-Details-List<br>
Alternatively, you can download the project ZIP file and extract it.

<b>2. Navigate into the Project Directory<br></b>
Use the terminal or command prompt to navigate into the project directory:<br>
  <b>cd product-details</b>

# Backend (Node.js) Setup
<b>1. Install Dependencies for the Backend: <br></b>
The backend is located in the root of the product-details directory. You need to install all necessary dependencies:<br>
 <b>npm install<br></b>
This will install the following packages:<br>
* express: Web framework for building the API server.
* axios: Used to fetch data from the external API.
* cors: Middleware to enable cross-origin resource sharing between frontend and backend.

<b>2. Running the Node.js Backend:<br></b>
   To start the Node.js backend server, navigate to Backend folder and use the following command:<br>
      <b>node server.js<br></b>
   The backend will now be running on http://localhost:3001 and will serve product data when the <b>/products</b> endpoint is accessed (http://localhost:3001/products).

# Frontend (React) Setup
<b>1. Navigate to the Frontend Directory<br></b>
Change into the React frontend folder:<br>
<b>cd Frontend\product-details-list<br></b>

<b>2. Install Dependencies for the Frontend<br></b>
Install the necessary packages for the React app by running:<br>
  <b>npm install<br></b>
This will install:<br>
  axios: For making HTTP requests to the Node.js server to fetch product data.

<b>3. Running the React Frontend<br></b>
Start the frontend development server with:<br>
  <b>npm run dev<br></b>
The React app will now run on http://localhost:5173. You can access the app through your browser.<br>

# Running the Full Application
Once both the backend and frontend servers are running:<br>
* Backend will be running at http://localhost:3001/products (Node.js).
* Frontend will be accessible via http://localhost:5173 (React).
 
# Key Features
1. <b>Search with Debouncing:</b> Users can search products, and the filtering only happens when they stop typing for 300ms to optimize performance.
2. <b>Pagination:</b> The app displays 10 products per page. Navigation buttons are available to switch between pages.
3. <b>Row Selection:</b> Users can select individual rows or use a "Select All" option for the visible rows.
4. <b>In-Memory Deletion:</b> Users can delete rows, and the data is only removed locally without affecting the backend.
