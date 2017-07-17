import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet, injectGlobal } from "styled-components";

export default class MyDocument extends Document {
  render() {
    const sheet = new ServerStyleSheet();
    const main = sheet.collectStyles(<Main />);
    const styleTags = sheet.getStyleElement();
    return (
      <html>
        <Head>
          <title>My page</title>
          {styleTags}
        </Head>
        <body>
          <div className="root">
            {main}
          </div>
          <NextScript />
        </body>
      </html>
    );
  }
}

injectGlobal`
  body {
    margin: 0 auto;
    font-family: helvetica;
  }
`;
