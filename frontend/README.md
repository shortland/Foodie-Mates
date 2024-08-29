# Welcome to your nasty Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start -c
   ```

In the output, you'll find options to open the app. Scan the QR code to open the phone in the `Expo Go` app.
When developing, hit `R` on the keyboard to hot reload the app and see your changes.

You can start developing by editing the files inside the **app** directory. 
This project uses [file-based routing](https://docs.expo.dev/router/introduction).
This is pretty ugly but is the easiest way to set up the app. The (auth) & (tabs) directory sets up the routing which is configured in _layout.jsx files within in. 
The other files in the directory are the pages that is rendered in the layout. Each file points to the actual component which is within the src directory.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.