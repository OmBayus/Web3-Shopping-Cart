import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="Abstract" content="Web3 Shopping Cart" />
          <meta name="Author" content="OmBayus,ombayus.com" />
          <meta
            name="Copyright"
            content="OmBayus © 2022 | This website was designed by OmBayus."
          />
          <meta
            name="description"
            content="Simple e-commerce cart application built with Solidity and Nextjs."
          />
          <meta
            name="keywords"
            content="react,ecommerce,shopping-cart,reactjs,nextjs,web3,ethersjs,ecommerce-cart-application,react-shopping-cart,web3-shopping-cart,web3-commerce"
          />
          <meta httpEquiv="content-language" content="en" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json"></link>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;700&display=swap"
            rel="stylesheet"
          />
          <title>Web3 Shopping Cart</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
