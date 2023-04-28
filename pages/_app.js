import '../styles/globals.css';
import '../styles/lib/bootstrap.min.css';
import '../styles/lib/font-awesome.min.css';
import '../styles/lib/elegant-icons.css';
import '../styles/lib/magnific-popup.css';
import '../styles/lib/nice-select.css';
import '../styles/lib/owl.carousel.min.css';
import '../styles/productdetail.css';
import '../styles/lib/slicknav.min.css';
import '../styles/wishlish.css';
import '../styles/header.css';
import '../styles/userprofile.css';
import '../styles/login.css';
import '../styles/lib/dataTables.min.css';
import '../styles/history-order.css';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { persistor, store } from '../store';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }) {
    // return <Component {...pageProps} />
    const [showChild, setShowChild] = useState(false);
    useEffect(() => {
        setShowChild(true);
    }, []);

    if (!showChild) {
        return null;
    }

    if (typeof window === 'undefined') {
        return <></>;
    } else {
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor} loading={null}>
                    <Component {...pageProps} />
                    <ToastContainer />
                </PersistGate>
            </Provider>
        );
    }
}

export default MyApp;
