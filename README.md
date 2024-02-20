# React-GitHub

GitHub Overview & Repositories tab using React + GitHub's REST API

## Getting Started

In order to run the application run the following commands in a terminal.

- `yarn install`
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

### Constraints

- Goal of having this completed in < 8 hours
- Performance utilized localStorage to make one call every 15 minutes.
- Filter on name only
- Wrote some basic tests but not extensive for time constraints

## Libraries Used

- `react` - my front-end framework of choice for performance and ease of use.
- [`create-react-app`](https://github.com/facebook/create-react-app) - ability to get up and running quickly
- [`react-icons`](https://react-icons.github.io/react-icons/icons?name=go) - pull in GitHub icons
- [`date-fns`](https://date-fns.org/) - date formatting
