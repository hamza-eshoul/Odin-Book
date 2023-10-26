## Odin Book Project

[![fr](https://img.shields.io/badge/lang-fr-blue)](README.fr.md)

This is the parent repository for the Full Stack Odin Book Final Project built for the [Odin Project Curriculum](https://www.theodinproject.com/lessons/nodejs-odin-book).

The goal of the project was to build a clone of the social media platform Facebook implementing the core features of the platform, namely users, profiles, posts, "liking", "friending" and the news feed.

A restful API was built using ExpressJS and serves as the project's backend.

An intuitive User Interface was built using ReactJS and serves as the project's frontend.

- Project's Live Preview url - https://odin-book-project.onrender.com/
- Project's Frontend Repository - https://github.com/skynter/Odin-Book-frontend
- Project's Backend Repository - https://github.com/skynter/Odin-Book-backend

## Homepage

![Homepage Screenshot](/screenshots/Homepage-screenshot.png)

## Friends Page

![Friends page Screenshot](/screenshots/Friends-screenshot.png)

## Profile Page

![Profile's page Screenshot](/screenshots/Profile-screenshot.png)

## Mobile Version

![Mobile Version Screenshot](/screenshots/Mobile-version-screenshot.png)

## Technologies Used

- NodeJS
- ExpressJS
- MongoDB
- ReactJS
- Tailwind CSS
- Cloudinary NodeJS

## Key features

- Integration with a RESTful backend API
- Persistent Authentication using JWTs
- Customizing users profiles
- Friends CRUD operations (Adding Friends / Deleting Friends / Accepting Friend Requests / Rejecting Friend Requests)
- Posts CRUD operations (Adding Posts / Deleting Posts)
- Posts Comments CRUD operations (Adding Comments / Updating Comments / Deleting Comments)
- Intuitive User Interface
- Fully Responsive User Interface

## Installation

To run the project locally :

- Access the project's frontend folder and run the following command to install the project's dependencies

```
npm install
```

- Run the following command to spin up a local development server

```
npm start
```

- Open http://localhost:3000 with your browser to access a local version of the project's client

- The API endpoints listed in the backend folder can be accessed through the hosted API on https://odin-book-api-g5zs.onrender.com

- The two main API endpoints are the POST https://odin-book-api-g5zs.onrender.com/posts endpoint and the POST https://odin-book-api-g5zs.onrender.com/users/:user_id/send_friend_request
