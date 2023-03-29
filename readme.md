![alt text](./readme/code-and-coffee-logo.png)

# Code and Coffee Service

A service layer to add additional functionality to the Code and Coffee website.

The Code and Coffee website (https://codeandcoffee.org/) is built using squarespace. This service allows us to construct custom web components that can be used to add more complicated elements to the website than what would otherwise be possible using Squarespace.

## Getting Started

You need NodeJS installed locally to run this project. You can download it from https://nodejs.org/en/download/.

When installed, run the following script to install.

`npm install`

To run the project, run the following script.

`npm run serve`

## Directory Structure

### [Lambda Source](./src/lambda)

**./src/lambda**

This is where the source code for the lambda functions is stored. Lambda functions are used for all the backend logic. Keep in mind that there is a cache that is used to store the results of the lambda functions. This cache is used to reduce the number of calls to the lambda functions.

### [Web Source](./src/web)

**./src/web**

This is where the source code for the web components is stored.

### [Public Resources](./public)

**./public**

This is where the public resources are stored. All files aren served as is.

## Technologies

**_[NodeJS](https://nodejs.org/en)_** - Used to run javascript in the backend to retreive data for the website.  
**_[Typescript](https://www.typescriptlang.org/)_** - Adds typing to the code to make it easier to read and maintain.  
**_[Vite](https://vitejs.dev/)_** - Used to bundle the web component code to make it efficient to consume.  
**_[Rollup](https://rollupjs.org)_** - Used to by Vite to bundle the web component code and used to bundle the lambda code to make it easier to consume.  
**_[prettier](https://prettier.io/)_** - Used to organize the code to make it easier to read and maintain.  
**_[ESLint](https://eslint.org/)_** - Used to enforce code standards to make it easier to read and maintain.  
**_[Jest](https://jestjs.io/)_** - Used to run unit tests to make sure the code is working as expected (on the odd occasion we write tests).  
**_[React](https://reactjs.org/)_** - Used to build the web components. Makes it easier to build interactive and reactive components.  
**_[Amazon Web Services (AWS)](https://aws.amazon.com/)_** - Used to host the service.
