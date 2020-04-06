# Airport Fuel Management

## Tech Stack

1.  React
2.  Redux
3.  Material-UI

## Getting Started

Before starting the UI ensure to run the backend first.
Follow the below git repository to start the server:

```
https://github.com/abinashmallik/airport-fuel-management-server
```

Clone the repository

```
git clone https://github.com/abinashmallik/airport-fuel-management-ui.git
```

switch to root directory

```
cd airport-fuel-management
```

Install the dependencies

```
npm install
```

Start the server

```
npm start
```

> Note: It automatically opens default browser at URL http://localhost:3000. To change the default port configure the webpack

## Run the Test

```
npm run test
```

> Note: Launches the test runner in the interactive watch mode.

## Run the Build

```
npm run build
```

> Note: Builds the app for production to the build folder. It correctly

bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes.

## Eject the application

```
npm run eject
```

> Note: this is a one-way operation. Once you eject, you can’t go back! If you aren’t satisfied with the build tool and
> configuration choices, you can eject at any time. This command will remove the single build dependency from your project.

## Features

- Pre-configured ENV variables
- Industry level CSS framework
- Run Unit test with Jasmine
- Login component sample
- Responsiveness
- Debug mode disabled in production
- Proper Folder structure
- React Routing Enabled
- Theming

## Folder Structure

```
|   node_modules
+   public
|   -index.html (main html file responsible for rendering)
+   src
|   + assests
|   + images (static image folder)
|   + components (container for all re-usable components)
|   - AppBar.js (appbar)
|   - Drawer.js (navigation)
|   - Dialog.js (modal)
|   - EnhancedHead.js (table header)
|   - ExpansionPanel.js (expansion panel component)
|   - SnackBar.js (informative bars)
|   - Table.js (table)
|   + pages (container for each page)
|   + aircraft
|   - index.js
|   + redux
|   + airport
|   - index.js
|   + redux
|   + fuel_consumption_report
|   - index.js
|   + redux
|   + transaction
|   - index.js
|   + redux
|   + transaction-listing
|   - index.js
|   + redux
|   + services
|   - aircraftService.js
|   - airportService.js
|   - apiBaseUrl.js
|   - loginService.js
|   - transactionService.js
|   + routes (container for all routes)
|   - AppRoutes.js (contains all the routes)
|   - App.css (css file for App component)
|   - App.test.js (unit test file for App component)
|   - index.css (css file for index.js)
|   - serviceWorker.js (service worker file used for offline support)
|   - index.js (main wrapper file for App component)

```

## Roadmap

- Story Book
- GraphQL
- Jenkins
- Docker
