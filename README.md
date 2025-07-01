# Venzo2025 🛠 working 🔨

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

Run the following command to install the nodemon npm package :

```sh
npm i nodemon
```

## 🔧 Environment Variables

1. Copy the `.env.example` file and rename it to `.env`.

2. Fill in the required environment variables as described in the comments.

3. Set a strong `JWT_KEY`:

   - Must be a random string of letters and numbers.
   - Minimum **32 characters**.
   - Example:
     ```
     f9J$kL#2!bVtY*eQ@z1X^aW6%UjN&p3R
     ```

4. Obtain your `SECRET_KEY` from [Google reCAPTCHA](https://developers.google.com/recaptcha).

5. To disable reCAPTCHA (e.g., in local development), set the following in your `.env` file:
   ```env
   RECAPTCHA=false
   ```

## Running the Server

Once everything is set up, start the server using:

```sh
npm start
```

## Additional Notes

- Ensure MongoDB is running before starting the server.
- Review the logs in `logfile.log` for debugging any errors.

## License

This project is licensed under the MIT License © Mohammad Amin Derakhshande 2025.
