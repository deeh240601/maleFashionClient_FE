import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { resetUserState } from '../../store/feature/UserSlice';

export default function Header() {
    // const [position, setPosition] = useState(window.pageYOffset)
    const [visibles, setVisibles] = useState(false);
    const router = useRouter();
    const [url, setUrl] = useState(null);

    const clientUser = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(resetUserState());
    };

    useEffect(() => {
        setUrl(router.pathname);
    }, [router]);

    useEffect(() => {
        const handleScroll = () => {
            let moving = window.pageYOffset;
            setVisibles(moving >= 5);
        };
        window.addEventListener('scroll', handleScroll);
        return (() => {
            window.removeEventListener('scroll', handleScroll);
        });
    }, [visibles]);
    return (
        <header className='header'>
            <div className='header__top'
                 style={visibles ? { height: 0, padding: '0px' } : { height: 'unset', padding: '10px 0' }}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-6 col-md-7'>
                            <div className='header__top__left'>
                                <p>Free shipping, 30-day return or refund guarantee.</p>
                            </div>
                        </div>
                        <div className='col-lg-6 col-md-5'>
                            <div className='header__top__right'>
                                <div className='header__top__links' style={{ marginRight: '4px' }}>
                                    {clientUser.id != '' ? <div className='header__navbar-item header__navbar-user'>
                                        <img src={clientUser.avatar} alt=''
                                             className='header__navbar-user-img'
                                             style={visibles ? { display: 'none' } : {}} />
                                        <span className='header__navbar-user-name'>{clientUser.firstName}</span>
                                        <ul className='header__navbar-user-menu'>
                                            <li className='header__navbar-user-item'>
                                                <a href='/userprofile'>My Account</a>
                                            </li>
                                            <li className='header__navbar-user-item'>
                                                <a href='/history-order'>History Order</a>
                                            </li>
                                            <li className='header__navbar-user-item header__navbar-user-item--separate'>
                                                <a href='' onClick={handleLogout}>Log Out</a>
                                            </li>
                                        </ul>
                                    </div> : <>
                                        <a href='/sign-in'>Sign in</a>
                                        <a href='/sign-up'>Sign up</a>
                                    </>}

                                </div>
                                {/* <div className='header__top__hover'>
                                    <span>Usd <i className='arrow_carrot-down' /></span>
                                    <ul>
                                        <li><a href="#">VND</a></li>
                                        <li><a href="#">USD</a></li>
                                    </ul>
                                </div> */}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-4 col-md-3'>
                        <div className='header__logo'>
                            <a href='/'><img src='img/logo.png' alt='' /></a>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-6'>
                        <nav className='header__menu mobile-menu'>
                            <ul>
                                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                                <li className={url === '/' ? 'active' : ''}><a href='/'>Home</a></li>
                                <li className={url === '/shop' ? 'active' : ''}><a href='/shop'>Shop</a></li>
                                <li className={url === '/about' ? 'active' : '' || url === '/contact' ? 'active' : ''}>
                                    <a href='/about'>US</a>
                                    <ul className='dropdown'>
                                        <li className='active'><a href='/about'>About Us</a></li>
                                        <li><a href='/contact'>Contact</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className='col-lg-4 col-md-3'>
                        <div className='header__nav__option'>
                            <label htmlFor='search-input' href='#' className='search-switch'><img
                                src='img/icon/search.png'
                                alt='' /></label>
                            <input type='checkbox' hidden name='' className='search__input' id='search-input' />
                            <label htmlFor='search-input' className='side__overlay'>

                            </label>
                            <nav className='sidebar-option'>
                                <form>
                                    <div className='input__group'>
                                        <input type='text' className='form__input' />
                                        <div><i className='fa fa-search' aria-hidden='true' /></div>
                                    </div>
                                </form>
                            </nav>

                            <a href='/wishlist'><img src='img/icon/heart.png' alt='' /></a>
                            <a href='/cart'><img src='img/icon/cart.png' alt='' />
                                <span>{clientUser.numberOfCart}</span></a>
                            <div className='price'>${clientUser.totalPriceOfCart}</div>
                        </div>
                    </div>
                </div>
                <div className='canvas__open'><i className='fa fa-bars' /></div>
            </div>
        </header>
    );
}
