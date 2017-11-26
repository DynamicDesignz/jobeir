<a href="https://jobeir.com"><img src="https://raw.githubusercontent.com/brotzky/jobeir/master/design/images/jobeir-logo.png" width="160px" alt="Jobeir logo" align="center" /></a>

<br/>

<img src="https://raw.githubusercontent.com/brotzky/jobeir/master/design/images/colored-spheres.png" width="350px" alt="Jobeir Color Spheres" />
 

# Jobeir
Find the best jobs at the best tech companies. At Jobeir we want you to grow your career with the leading employers in the tech industry. Search through and find the best jobs in the tech industry today.

<br/>
<a href="https://jobeir.com">https://jobeir.com</a>

<br/>
<br/>

[![Join the Jobeir community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/jobeir)

[![Build Status](https://travis-ci.org/brotzky/jobeir.svg?branch=master)](https://travis-ci.org/brotzky/jobeir)

## Getting Started
This is the web app for <a href="https://jobeir.com">https://jobeir.com</a>. It is a isomorphic React application.

```
https://github.com/brotzky/jobeir.git
cd jobeir
yarn
yarn start
```

### Missing Configuration

There is a missing piece when cloning this repository -- `/server/config/config.js` is missing.
You'll want to create your own private config file.
```
const config = {
  mongoURL: {url},
  port: {port},
  jwt: {key}',
  handleNoToken: {func},
};

export default config;

and a `.env` file in the root of the project.
```

### Running Tests and Prettier

There is a pre-commit hook that will run all tests before each commit. This is to ensure
basic code quality. There is also a lint-staged feature to run prettier on all staged
files. It is recommended you install Prettier on your favourite editor to run on save.

The Prettier config for this repository includes trailing slashes and single quotes.
```
 --single-quote --trailing-comma all --write
```
<br/>
<br/>
<img src="https://raw.githubusercontent.com/brotzky/jobeir/master/design/images/colored-spheres.png" width="350px" alt="Jobeir Color Spheres" />
