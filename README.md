# Getting Started with the Official Starter Template

This is a boilerplate starter template for all React frontend projects that one intends to start working with.

## !! IMPORTANT !!

- Ensure you are using `berry` (or version 3) of `yarn`. Follow the steps mentioned in this <a href="https://yarnpkg.com/getting-started/install" target="_blank">link</a> to upgrade from `classic` to `berry`.
- React 18 introduced a breaking change: while `StrictMode` is active in development environment, all components mount and unmount before being remounted again. Hence, a `useEffect()` with empty dependency array will execute twice. Please check your code's idempotency if you have a piece of code in:
```tsx
   useEffect(() => { 
      /* Some code here ... */ 
   }, [])
```

## Setup

### Base

```bash
# This step not required if Github's 'Use this template' feature is used
$ git clone --depth 1 <SSH_REPO_LINK|HTTPS_REPO_LINK> <project_name>

# Setup credentials
$ git config --add user.name "YOUR NAME"
$ git config --add user.email "YOUR OFFICIAL DEFAULT's EMAIL ID"

# Info: Ensure '.env.*' file(s) is/are setup properly

# Download all dependencies and fire up the app
$ yarn # installs dependencies
$ yarn start
```

**Note 1:** `yarn` is the preferred package manager. Do NOT use any other package managers<br/>
**Note 2:** All dependencies must be installed by passing in the `--exact` or `-E` flag, i.e. `yarn add [-D] -E <dependency>`<br/>
**Note 3:** All configuration files (except `vite.config.js`) are to be placed under `configs/` directory and referenced accordingly<br />

### Git Hooks

Once everything is installed, add a `pre-push` hook:

```bash
$ echo '#!/bin/sh' > .git/hooks/pre-push # Do NOT add this line if development environment is Windows®
$ echo 'yarn format && yarn test' >> .git/hooks/pre-push
```

## Opt-In Libraries

These libraries are not included in the starter template. References are instead provided here to get their respective latest version at the time of actual development.

### State Management

Libraries are ordered in decreasing order of preference to make the most use of performance and leverage modern browser functionalities.

1. [Jotai](https://jotai.org/): `yarn add -E jotai`
2. [React Tracked](https://react-tracked.js.org/): `yarn add -E react-tracked`
3. [Redux Toolkit](https://redux-toolkit.js.org/): `yarn add -E @reduxjs/toolkit`

### Design System

Depends mostly on the project at hand. Libraries are ordered in decreasing order of preference to make the most use of performance and leverage modern browser functionalities.

1. [React Bootstrap](https://react-bootstrap.github.io/getting-started/introduction/): `yarn add -E react-bootstrap bootstrap`
2. [Evergreen](https://evergreen.segment.com/introduction/getting-started): `yarn add -E evergreen-ui`
3. [Material UI](https://mui.com/material-ui/getting-started/overview/): `yarn add -E @mui/material @emotion/react @emotion/styled`

### Iconography

Libraries are ordered in increasing order of library size and decreasing order of preference.

1. [React Feather](https://www.npmjs.com/package/react-feather): `yarn add -E react-feather`
2. [Material Icons](https://mui.com/material-ui/icons/): `yarn add -E @mui/icons-material` (Use this if using Material Design System)

### Social Logins

Libraries are ordered in decreasing order of functionalities

1. [reactjs-social-login](https://www.npmjs.com/package/react-social-login): `yarn add -E reactjs-social-login`
2. [react-social-login-buttons](https://www.npmjs.com/package/react-social-login-buttons): `yarn add -E react-social-login-buttons` (Use this if you want to provide custom functionalities)

### Miscellaneous

1. [otp-input-react](https://www.npmjs.com/package/otp-input-react): `yarn add -E otp-input-react`
2. [react-apexcharts](https://apexcharts.com/react-chart-demos/): `yard add -E react-apexcharts apexcharts`


## Code of Conduct

- **Do not add dependencies** just for the sake of it
- Don't **bloat** package.json file: if dependencies are not required, remove it
- All routes should be lazy-loaded
- All components must be of type `FunctionComponent` and not `JSX.Element`
- Code organisation is feature based and should stay that way
- Commits must either be passive (ineffective) or functional (incorporating some new functionality) but not introduce errors
- Readability of code reigns supreme over hacky/crafty/performant code unless otherwise
- Comments **should only be introduced** if the code in scope is performing some other actions as well or if there is no other way to write it
