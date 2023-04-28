import Head from 'next/head';
import SubHeader from './SubHeader';
import Header from './Header';
import Footer from './Footer';
import Script from 'next/script';
import { useSelector } from 'react-redux';


export default function Layout({ children }) {
    const appUi = useSelector(state => state.appUI);
    return (
        <div>
            <Head>
                <meta charSet='UTF-8' />
                <meta name='description' content='Male_Fashion Template' />
                <meta name='keywords' content='Male_Fashion, unica, creative, html' />
                <meta name='viewport' content='width=device-width, initial-scale=1.0' />
                <meta httpEquiv='X-UA-Compatible' content='ie=edge' />
                <link href='/img/logo1.png' rel='icon' />
                <title>{appUi.title}</title>

                <link
                    href='https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700;800;900&display=swap'
                    rel='stylesheet' />

                {/* eslint-disable-next-line @next/next/no-sync-scripts */}
                <script src='js/jquery-3.3.1.min.js' />
            </Head>
            <SubHeader />
            <Header />
            <main>{children}
                <Script src='js/bootstrap.min.js' strategy='lazyOnload' />
                <Script src='js/jquery.nicescroll.min.js' strategy='lazyOnload' />
                <Script src='js/jquery.magnific-popup.min.js' strategy='lazyOnload' />
                <Script src='js/jquery.countdown.min.js' strategy='lazyOnload' />
                <Script src='js/jquery.slicknav.js' strategy='lazyOnload' />
                <Script src='js/main.js' strategy='lazyOnload' />
                <Script src='js/price-filter.js' strategy='lazyOnload' />
                <Script src='js/dataTables.min.js' strategy='lazyOnload' />
                <Script src='/js/history-order.js' strategy='lazyOnload' />
            </main>
            <Footer />


        </div>
    );
}
