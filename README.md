# Backend Development Task

## How to run the application

- Make sure that you have node and npm installed. In your terminal, run - 
  
  ```
  node --version
  ```
  
  To install node, head over to [this website](https://nodejs.org/en/download/) and download the stable release. 

- Fork and clone this repository by runinng the following command in your terminal - 
  
  ```
  git clone https://github.com/<your_github_username>/youtube-api
  ```

- cd into the cloned repository using the following command - 
  
  ```
  cd youtube-api
  ```

- Install all the dependencies using the command -
  
  ```
  npm install
  ```

- Run the server using the command - 
  ```
  npm run start
  ```

- The server is now running on the port 8080

## Routes and Parameters

- ```
  /getvideos
  ```
  It is a **GET** route.
  This route accepts two query parameters - page & limit. Here, **page is the page number**, and **limit is the number of responses per page**. 

  Example - 
  ```
  http://localhost:8080/getvideos?page=1&limit=5
  ```
  A GET request to the above route will result show you 5 responses on the first page i.e. the first 5 responses. 
  
    
