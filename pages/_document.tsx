import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head title="MonirStore" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content="Developed by Nitish Biswas." />
            <meta name="keywords" content="MonirStore, many dial" />
            <meta property="og:title" content="MonirStore" />
            <meta property="og:description" content="Developed by Nitish Biswas." />
            <meta property="og:image" content="/full-logo.svg" />
            <meta property="og:site_name" content="MonirStore" />
            <meta property="og:type" content="website" />
            <body>
                <div id="modalBody"></div>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
