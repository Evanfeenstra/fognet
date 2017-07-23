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
          <title>Satoshi Pay</title>
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
    font-family: quicksand;
    font-weight: 400;
  }

  @font-face {
    font-family: 'quicksand';
    src: url('/static/fonts/regular.ttf');
    font-weight: 400;
  }
  @font-face {
    font-family: 'quicksand';
    src: url('/static/fonts/light.ttf');
    font-weight: 200;
  }
  @font-face {
    font-family: 'quicksand';
    src: url('/static/fonts/medium.ttf');
    font-weight: 600;
  }

`;
