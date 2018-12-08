# Review Questions

## What is Node.js?

Node.js is javascript for the backend. Node.js allows developers to write server code in Javascript. 
Node includes everything you need to execute a program that's written in Javascript (we can implement node and see our code running outside of the browser).

## What is Express?

Express is like React for the backend - it's a framework that lives on top of Node.js, it makes it easier to write application and services.
Specifically, build RESTful web services that work with JSON. This means it allows the backend to request and respond in Javascript Object Notation. 

## Mention two parts of Express that you learned about this week.

Routing and Middleware - Routes in Express are connected to the endpoints (GET, POST, DELETE, PUT) that are CRUD actions. 

## What is Middleware?

Middleware is either custom code or from a third party library that allows us to inject code before it reaches the server endpoints;
Middleware is often used for logging and authentication (or even ensuring that what is POST, or PUT is in uppercase)

## What is a Resource?

A resource is a major part of an application (i.e., users, posts); anything the client-side needs to manage as part of the Application. 

## What can the API return to help clients know if a request was successful?

A 201 or 200 response. 


## How can we partition our application into sub-applications?

We can use routes - for example a user_route.js and a post_route.js. We can store these in separate files, then call them into the main index.js file on the server. 

## What is express.json() and why do we need it?

This is used to format your request in javascript object notation - so that all requests can be read in Express/Node. 