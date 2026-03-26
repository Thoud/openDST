# Digital Stress Test

The Digital Stress Test is a fork from [mbp-lab/openDST](https://github.com/mbp-lab/openDST) and was originally developed in conjunction with [this paper](https://dx.doi.org/10.2196/32280).

This fork updates the codebase to adapt the functionality for an upcoming study at the University of Hohenheim. The main goal is to remove any dependency on any study management software or any data retention mechanisms since this fork is intended to be build to a static page that can be used and hosted on any standard web server or run locally. The core functionality, namely the stress test itself, remains mostly unchanged.

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode on port [3000](http://localhost:3000) and includes hot module reloading.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
