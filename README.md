# social-network-api
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Table of Contents

[Description](#description)

[Installation](#installation)

[Usage](#usage)

[Images](#images)

[URLs](#urls)

## Description

This is a simple social networking api, akin to what might be seen on blogging websites. There are routes and controllers present which allow for user and thought (blog) creation, update, and deletion and routes to view the users and the thoughts. Additionally there are routes and controllers which allow users to add each other to their friends lists and react to any thought on the website.

## Installation

1. Clone the GitHub repository.

2. Run "npm install" in the terminal.

3. Run "node server.js" in the terminal.

## Usage

This api does not have a GUI or any way for the user to interact visually. Insomnia or other software that can communicate with a server and display JSON responses needs to be used to send and receive the server requests.

Additionally, this api uses a MongoDB database, so the user would need to have the database program installed on their computer to be able to successfully run the api.

To use the api, the user only needs to select a route which is defined in the code, then send the appropriate JSON object as a request to the server. The server request must have the correct route and parameters (if applicable) in the address bar, have the correct request type selected, and the minimum required information present in the request body.

It sounds like a lot, but it will be clearer to see when watching the walkthrough video.

## Images

Here is a walkthrough video of the different available routes in this api:

![Walkthrough video](https://drive.google.com/file/d/15qQ5GbioCJAQr7oEQFsajHRhYkhWECGt/view)

This is an image of a successful GET request for all users:

![GetAllUsers](./public/assets/images/Successful%20Get%20All%20Thoughts.PNG)

This is an image of a successful POST request for creating a new user:

![CreateUser](./public/assets/images/Successful%20Create%20User.PNG)

This is an image of a successful PUT request for updating a thought:

![UpdateThought](./public/assets/images/Successful%20Update%20Thought.PNG)

This is an image of a successful DELETE request for removing a friend from a user's friends list:

![DeleteFriend](./public/assets/images/Successful%20Delete%20Friend.PNG)


## URLs

GitHub Repo: https://github.com/Shippo704/social-network-api

Walkthrough Video: https://drive.google.com/file/d/15qQ5GbioCJAQr7oEQFsajHRhYkhWECGt/view