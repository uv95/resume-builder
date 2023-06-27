import  { Html, Head, Main, NextScript } from 'next/document';
import i18nextConfig from '../../next-i18next.config';

const MyDocument = (props:any)=> {
    const currentLocale =
    props.__NEXT_DATA__.locale ??
    i18nextConfig.i18n.defaultLocale

    return (
        <Html lang={currentLocale}>
            <Head />
            <body>
                <Main />
                <div id="modal"></div>
                <NextScript />
            </body>
        </Html>
    );
}

export default MyDocument