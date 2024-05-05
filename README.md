# Application overview
Current working app deploy should be visible here:
https://sensor-app-tqk4.vercel.app/

# Minimal setup
To run the app:

prerequisites:
- make sure you have node installed
- make sure you have git installed
- in case you have problems contact the author directly

1. git clone / unzip downloaded project file
2. go into app's main directory
3. run npm install / npm i
4. npm run dev 

You can modify number of sensors / recievers.
This isn't 100% bulletproof. 
Please copy/paste object matching existing pattern ex. incrementing IDs, watching correct types.

Other than that you should be able to have it working.

Currently you can switch status of reciever from UI. It isn't persisted in file.

As for how I would develop it further:
- fix build errors
- add environment file to manage build versions
- I would add error and edge cases handling 
- more testing
- dockerize the application to make it available in different server environment
- husky with running prerequisites for:
  - npm run test
  - npm run lint 
  - might also involve build check with tools like lighthouse or some type of static code check

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
