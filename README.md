# React-GitHub

GitHub Overview & Repositories tab using React + GitHub's REST API

## Directions

- Download zip file and upload to Google Drive, email link back to the recruiter.

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
- [ ] Unit tests

### Details

- Only 8 repositories returned, lazy loading didn't seem necessary, instead utilized localStorage to make one call and gather all necessary data.
- Used GitHub icons to match design
- Used scss of language colors to match language to color rather than hard-code.
- Filter on name only, chose not to further refine due to time constraints

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
