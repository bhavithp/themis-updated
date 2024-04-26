[![CircleCI](https://circleci.com/gh/benchmarkeducation/themis.svg?style=svg&circle-token=9c812292f5c318566bd90859ebd6918ce1bfcfff)](https://circleci.com/gh/benchmarkeducation/themis)

# themis
BEC Forms and Workflow

**Themis** is an ancient Greek Titaness and the personification of divine order, fairness, law, natural law, and custom ([more](https://en.wikipedia.org/wiki/Themis)). This application supports enforcing order in the processes of BEC.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Steps for local development
1. The current CI/CD runs with Node version 16.x.x (.github/workflows/cofig.yml->jobs->build_deploy->steps->Setup Node->actions/setup-node@v3).
2. Modify your etc/hosts file by adding the following:
(In windows system hosts file path may be C:\Windows\System32\drivers\etc\hosts)
	- 127.0.0.1 themis-development.benchmarkconnect.com
3. After running npm start, you should be able to access the application using themis-development.benchmarkconnect.com
4. You should ensure that you are connected to the Benchmark Education VPN, otherwise when Themis tries to connect to MIA, it will fail.
5.  First run `npm ci` in project directory.
6.  Only for Linux and MAC update package.json-> scripts->"start": "sudo react-scripts start",


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
`npm start` command uses .env.development file by Default. So the PORT mentioned there should be used in the URL. <br />
Open https://localhost:443 or https://themis-development.benchmarkconnect.com/  to view it in the browser.<br />
For login use BENCHMARK Domain Credentials. <br />

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
