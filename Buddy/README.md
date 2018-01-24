# Buddy - React Native App

This project is built using React Native along with AWS Mobile Hub services and a NodeJS + Express + MongoDB backend to store user data.


### Quicklinks
 - [Getting started](#getstarted)
 - [AWS Setup](#AWS)
 - [Application Walkthrough](#walkthrough)

## Prerequisites
- AWS Account
- [Xcode](https://developer.apple.com/xcode/) / [Android Studio](https://developer.android.com/studio/index.html)
- [Node.js](https://nodejs.org/) with NPM
  - `npm install -g react-native-cli`
  - `npm install -g create-react-native-app`
- (_Optional_) [Watchman](https://facebook.github.io/watchman/)
  - On macOS, it is recommended to install it using [Homebrew](https://brew.sh/)
    - `brew install watchman`
- (_Optional_) [AWS CLI](https://aws.amazon.com/cli/)  

## Getting Started <a name="getstarted"></a>

First clone this repo: `git clone https://github.com/averikitsch/buddy-capstone`
```
cd ../Buddy
npm install
npm run ios
```

## AWS Setup <a name="AWS"></a>
1. Set up your AWS resources using [AWS Mobile Hub](https://console.aws.amazon.com/mobilehub/)
2. Create a new project - select React Native - click through remaining steps
3. In the Mobile Hub Console - select User Sign-in - select enable username and password
4. In the Mobile Hub Console - select Hosting and Streaming. At the bottom of the page, download the aws-exports.js file into the `./Buddy/src` folder of the cloned repo.

## Application Walkthrough <a name="walkthrough"></a>
After the application is running, you can see the SIGN IN screen. If this is your first time running the application, choose the SIGN UP tab in the lower right and complete the process with a username, password and email address.

You will receive a confirmation code for signing up through email; enter the code to confirm user.
