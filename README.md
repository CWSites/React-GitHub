# React-GitHub

GitHub Overview & Repositories tab using React + GitHub's REST API

## Getting Started

In order to run the application run the following commands in a terminal.

- `yarn start`
- The app will be available on http://localhost:3000/

## Acceptance Criteria

- [x] Code the UI mockups below using the frontend technologies of your choice
- [x] Use Github open API to display the data
  - https://api.github.com/users/octocat
  - https://api.github.com/users/octocat/repos
- [x] Overview view > Display most popular repository cards ordered by most starred.
- [x] Repositories view > display all repositories ordered by the latest update.
- [x] Repositories view > Enable user to filter/search in the repository list

### Bonus Points

- [x] Lazy load repositories view
- [x] Unit tests

### Constraints

- Goal of having this completed in < 8 hours
- Lazy loading of 8 repositories doesn't make sense. Instead utilized localStorage to make one call every hour.
- Filter on name only
- Chose not to spend too much time cleaning up filter menus due to time constraints
- Spent 30 min troubleshooting `watchman` issue with hanging tests.
- Wrote some basic tests but not extensive for time constraints

## Libraries Used

- `react` - my front-end framework of choice for performance and ease of use.
- [`create-react-app`](https://github.com/facebook/create-react-app) - ability to get up and running quickly
- [`react-icons`](https://react-icons.github.io/react-icons/icons?name=go) - pull in GitHub icons
- [`date-fns`](https://date-fns.org/) - date formatting

# Create React App

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
