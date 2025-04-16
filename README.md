# Venzo2025

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
https://www.postman.com/kharidino/workspace/venzo2025/request/34024160-810056b1-a6cd-45fc-befb-630c967b945d?action=share&creator=34024160&ctx=documentation


