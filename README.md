# Personal Notes APP using Expo + Next.js + Tamagui + Solito app

## Brief

Use the provided starter-repo to create a simple cross-platform "Personal Notes App" where
users can add and view their notes.

The app should work seamlessly on both web and mobile platforms, showcasing your ability to
create responsive and functional interfaces using Tamagui and Solito.

## CORE Features

1. Note Creation: Allow users to create a new note with a title and text content.
2. Note Listing: Display a list of created notes on the main screen.
3. Responsive Design: Ensure the app is responsive and provides a good user experience on both mobile and web platforms.
4. Navigation: Implement basic navigation between the note creation screen and the note listing screen.
5. Styling: Use Tamagui for styling the components, demonstrating an understanding of its theming and styling capabilities.

## Advanced Features

1. Note Deletion: Allow users to delete notes.
2. Local Storage: Save notes locally so they persist when the app is closed and reopened.
3. Search Functionality: Implement a search bar to filter notes by title.
4. Note Editing: Added editing functionality to Notes, I did this because I thought that it would be a nice feature to have.
6. Note creation date and time. I added this as well because I thought it would be nice to have.

## 📦 Included packages

- [Tamagui](https://tamagui.dev) 🪄
- [solito](https://solito.dev) for cross-platform navigation
- Expo SDK
- Next.js
- Expo Router

## 🗂 Folder layout

The main apps are:

- `expo` (native)
- `next` (web)

## Start the app

- Install dependencies in root directory: `yarn`

- Next.js local dev: `yarn web`

To run with optimizer on in dev mode (just for testing, it's faster to leave it off): `yarn web:extract`. To build for production `yarn web:prod`.

To see debug output to verify the compiler, add `// debug` as a comment to the top of any file.

- Expo local dev: `yarn native`

## UI Kit

Note we're following the [design systems guide](https://tamagui.dev/docs/guides/design-systems) and creating our own package for components.

See `packages/ui` named `@my/ui` for how this works.

## 🆕 Add new dependencies

### Pure JS dependencies

If you're installing a JavaScript-only dependency that will be used across platforms, install it in `packages/app`:

```sh
cd packages/app
yarn add date-fns
cd ../..
yarn
```

### Native dependencies

If you're installing a library with any native code, you must install it in `expo`:

```sh
cd apps/expo
yarn add react-native-reanimated
cd ..
yarn
```
