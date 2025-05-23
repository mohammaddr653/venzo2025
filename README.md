# ⚠ Venzo2025 (I am still developing this project...)🛠
This is my first MernStack project .
### What I used in this project :
"MongoDB | Express | React | Nodejs | TypeScript | TailwindCSS | Zustand | SASS"

# Back-end Setup Guide

## Prerequisites
This server works with a MongoDB database, so make sure MongoDB is installed on your system.

## Installation Steps

### Clone the Repository
```sh
git clone <repository-url>
```

### Navigate to the Back-End Folder
Open a terminal and move to the `back-end` directory:
```sh
cd back-end
```

### Install Dependencies
Run the following command to install the necessary dependencies and create the `node_modules` folder:
```sh
npm i
```

### Create a `.env` File
- Create a `.env` file in the root of the `back-end` directory.
- Add the following configurations:
  ```env
  PORT=5000
  DEBUG=app
  JWT_KEY=<random-string-of-numbers-and-letters>
  ```

### Create a Log File
- Create a file named `logfile.log` in the root of the `back-end` directory. This will store application errors.

### Set Up Upload Directories
create the following paths in the root of the `back-end` directory . these paths are for storing uploaded files:
```
public/uploads/images/avatars
public/uploads/images/blogs
public/uploads/images/products
```

## Running the Server
Once everything is set up, start the server using:
```sh
npm start
```

## Additional Notes
- Ensure MongoDB is running before starting the server.
- Review the logs in `logfile.log` for debugging any errors.

## venzo2025 postman workspace :
After setting up the server, you can test all the APIs of this project in Postman using this link :
https://www.postman.com/mohammaddr653/workspace/venzo2025/collection/34024160-41655f65-50fb-4ecd-a119-aff96815e89c?action=share&creator=34024160
