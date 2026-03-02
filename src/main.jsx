// FILE PURPOSE:
// This is the JavaScript entry point. The browser loads this file first (via index.html),
// and this file tells React where to draw the app on the page.

// `import ... from 'react'` loads the React library.
// We import the default export and name it `React`.
// Even when modern JSX may not require direct React usage in every file,
// keeping this import is common in teaching code and does not change behavior.
import React from 'react';

// `import ... from 'react-dom/client'` loads ReactDOM's client renderer.
// `ReactDOM` is the object with methods that connect React components to real browser DOM nodes.
import ReactDOM from 'react-dom/client';

// This import pulls in the root component of our app.
// `./App.jsx` is a relative path (`./` means "same folder").
import App from './App.jsx';

// Importing CSS in Vite makes this stylesheet part of the bundle.
// If this line is removed, the app still runs but appears mostly unstyled.
import './styles.css';

// `document.getElementById('root')` asks the browser for the HTML element
// whose id attribute equals "root" (defined in index.html).
// If that element is missing, React cannot mount the app.
const rootElement = document.getElementById('root');

// `ReactDOM.createRoot(...)` creates a React 18 root controller.
// This enables modern rendering features.
const root = ReactDOM.createRoot(rootElement);

// `.render(...)` tells React what component tree to display inside `rootElement`.
// `<React.StrictMode>` is a development helper wrapper:
// - It helps detect unsafe patterns while coding.
// - It does not change production output.
root.render(
  <React.StrictMode>
    {/* `<App />` is JSX self-closing component syntax.
        React will call App() and render everything it returns. */}
    <App />
  </React.StrictMode>
);
