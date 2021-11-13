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
  It is a **GET** route. This route accepts two query parameters - page & limit. Here, **page is the page number**, and **limit is the number of responses per page**. 

  Example - 
  ```
  http://localhost:8080/getvideos?page=1&limit=5
  ```
  A GET request to the above route will result show you 5 responses on the first page i.e. the first 5 responses. A sample response is shown below - 

  <p><img src="https://github.com/ishubham21/youtube-api/blob/master/readme-assets/getvideos.png"></p>
  
  **Note -** If you don't pass any query parameters then the page = 1 & limit = 50 is set by default.  

- ```
  /search
  ```
  It is a **POST** route. This route accepts two parameters with the request body - **title of the video** and **description of the video.** Request body should be in the JSON format, see reference - 
  ```
  {
      "title": "Miami vs Florida State LIVE | NCAAF 2021 | College Football Week 11",
      "description": "Miami vs Florida State LIVE | NCAAF 2021 | College Football Week 11."
  }
  ```  
  **Note-** While a request on this router, make sure the 'Content-Type' header is set to 'application/json'. 
  You will not a get an error if description is missing, however, **title of the video should necessarily be present in the request body.** Here is a sample response -
  <p><img src="https://github.com/ishubham21/youtube-api/blob/master/readme-assets/search.png"></p>

## Database Schema

  Following is a sample data stored in the database - 
  ```
  {
    "_id": "61901d103db892a913db0a28",
    "title": "Auburn vs Mississippi State LIVE | College Football Nov 13,2021",
    "videoId": "5fcNtlbnb1Q",
    "description": "Auburn vs Mississippi State LIVE | College Football Nov 13,2021.",
    "publishedOn": "2021-11-13T19:50:34.000Z",
    "thumbnails": {
        "default": {
            "url": "https://i.ytimg.com/vi/5fcNtlbnb1Q/default.jpg",
            "width": 120,
            "height": 90
        },
        "medium": {
            "url": "https://i.ytimg.com/vi/5fcNtlbnb1Q/mqdefault.jpg",
            "width": 320,
            "height": 180
        },
        "high": {
            "url": "https://i.ytimg.com/vi/5fcNtlbnb1Q/hqdefault.jpg",
            "width": 480,
            "height": 360
        }
    },
    "__v": 0
  }
  ```

## Some notes related to task - 

- In mongoDB, the indexes are already present. MongoDB makes use of _id field to perform indexing in the database. However, I have also indexed the database using videoId identifier in the ascending order. 
- This application fetches the data from the YouTube API every 10 second. With each request that is made to the YouTube API, only 5 videos are recieved. This number can be changed as per the requirements. 
- The video is added to the database only if it is a unique video - this prevents duplicate entries from creeping in the database. 
- I have tried to handle the errors in the best way possible so that it prevents the application from breaking at any given point of time.  
- Youtube API may stop working and give 403 forbidden error if the number of requests exceed the free tier request limit.  
- I know that I should have added .env file in my .gitignore file but I have explicitly decided to commit this file along with all the other files. This is to make testing easier whithout getting into the specifics of generating Youtube API keys or mongoDB keys.  
