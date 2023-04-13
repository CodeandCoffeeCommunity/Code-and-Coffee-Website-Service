![alt text](./readme/code-and-coffee-logo.png)

# Code and Coffee Service

A service layer to add additional functionality to the Code and Coffee website.

The Code and Coffee website (https://codeandcoffee.org/) is built using squarespace. This service allows us to construct custom web components that can be used to add more complicated elements to the website than what would otherwise be possible using Squarespace.  
  
The project is built following best practices and is a good reference for anyone trying to build professional-adjacent quality projects.  
  
Any questions about this project can be directed to [Brian Towne](https://www.linkedin.com/in/bjtowne/).
## Getting Started

You need NodeJS installed locally to run this project. You can download it from https://nodejs.org/en/download/.

When installed, run the following script to install.

`npm install`

To run the project locally, run the following script.

`npm run serve`

## Technologies

**_[NodeJS](https://nodejs.org/en)_** - Used to run javascript in the backend to retreive data for the website.  
**_[Typescript](https://www.typescriptlang.org/)_** - Adds typing to the code to make it easier to read and maintain.  
**_[Vite](https://vitejs.dev/)_** - Used to bundle the web component code to make it efficient to consume.  
**_[Rollup](https://rollupjs.org)_** - Used to by Vite to bundle the web component code and used to bundle the lambda code to make it easier to send to AWS.  
**_[prettier](https://prettier.io/)_** - Used to organize the code to make it easier to read and maintain.  
**_[ESLint](https://eslint.org/)_** - Used to enforce code standards to make it easier to read and maintain.  
**_[Jest](https://jestjs.io/)_** - Used to run unit tests to make sure the code is working as expected (on the odd occasion we write tests).  
**_[React](https://reactjs.org/)_** - Used to build the web components. Makes it easier to build interactive and reactive components.  
**_[Amazon Web Services (AWS)](https://aws.amazon.com/)_** - Used to host the project.  
**_[Serverless Framework](https://www.serverless.com/)_** - Used to simplify the deployment of the service to AWS and to enable simulating the service locally for development and testing.  
**_[Nodemon](https://nodemon.io/)_** - Used to automatically restart the service when changes are made to the code.  
**_[Mockoon](https://mockoon.com/)_** - Used to simulate APIs for testing locally.  
**_[GitHub Actions](https://github.com/features/actions)_** - Used to automate the deployment of the project to AWS.  
**_[GitHub](https://github.com)_** - Used to store the code and manage the project.  

## Directories

### [API Source](./src/api)

**./src/api**

This is the source code for the API layer. The API layer allows us to fetch data from services to allow the web components to be timely. Keep in mind that there is a cache that is used to store the results of the API calls. This cache is used to reduce the cost of the calls to the API. This means that it takes about 5 minutes (or so) before data is updated on calls to the API.

### [UI Source](./src/ui)

**./src/ui**

This is the source code for the web components. The web components are build using react and are embedded on to the main website.

### [Public Resources](./public)

**./public**

This is where the public resources are stored. All files are served as is.

### [Deployment Workflows](./.github/workflows)

**./.github**

Where all the automated deployment workflows and general github configurations are stored.

### [Development Resources](./dev)

**./dev**

Local development only resources are stored here.

### [Readme Resources](./dev)

**./readme**

Where all the resources used in the readme are stored.
