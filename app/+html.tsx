/**
 * This component is used to configure the root HTML for every web page during static rendering. It sets the character encoding, viewport, and background color for the page, and disables body scrolling to match the behavior of ScrollView components on native platforms.
 *
 * The contents of this function only run in Node.js environments and do not have access to the DOM or browser APIs.
 *
 * @param {PropsWithChildren} props - The props for the component, including the children to be rendered.
 * @returns {JSX.Element} The configured HTML structure for the web page.
 */
import { ScrollViewStyleReset } from 'expo-router/html';
import { type PropsWithChildren } from 'react';

/**
 * This file is web-only and used to configure the root HTML for every web page during static rendering.
 * The contents of this function only run in Node.js environments and do not have access to the DOM or browser APIs.
 */
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>

        {/* Set character encoding for the document */}
        <meta charSet="utf-8" />

        {/* Ensure compatibility with older versions of Internet Explorer */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {/* Configure the viewport for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        {/*
          Disable body scrolling on web. This makes ScrollView components work closer to how they do on native.
        */}
        <ScrollViewStyleReset />

        {/* Using raw CSS styles as an escape-hatch to ensure the background color never flickers in dark-mode. */}
        
        <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} />
        {/* Add any additional <head> elements that you want globally available on web... */}
      </head>

      {/* Render the main content of the page */}
      <body>{children}</body>
    </html>
  );
}

// Define responsive background styles
const responsiveBackground = `
body {
  background-color: #fff; /* Set light mode background color */
}
@media (prefers-color-scheme: dark) {
  body {
    background-color: #000; /* Set dark mode background color */
  }
}`;
