export default function SubHeader() {
    return (
        <>
            <div className='offcanvas-menu-overlay' />
            <div className='offcanvas-menu-wrapper'>
                <div className='offcanvas__option'>
                    <div className='offcanvas__top__hover'>
                        <span>Usd <i className='arrow_carrot-down' /></span>
                        <ul>
                            <li>Đăng nhập</li>
                            <li>Đăng ký</li>
                        </ul>
                    </div>
                </div>
                <div className='offcanvas__nav__option'>
                    <a href='#' className='search-switch'><img src='img/icon/search.png' alt='' /></a>
                    <a href='#'><img src='img/icon/heart.png' alt='' /></a>
                    <a href='#'><img src='img/icon/cart.png' alt='' /> <span>0</span></a>
                    <div className='price'>$0.00</div>
                </div>
                <div id='mobile-menu-wrap' />
                <div className='offcanvas__text'>
                    <p>Free shipping, 30-day return or refund guarantee.</p>
                </div>
            </div>
        </>
    );
}
