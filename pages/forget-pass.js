export default function Forget() {
    return (

        <>
            <div className='body-login'>

                <div className='limiter'>
                    <div className='container-login100'>
                        <div className='wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54'>
                            <form className='login100-form validate-form'>
                                <div className='header__logo flex-center mb-4'>
                                    <a href='/'><img src='img/logo.png' alt='' /></a>
                                </div>
                                <h4 className='title-auth'>Forget Password</h4>

                                <div className='wrap-input100 validate-input m-b-23' data-validate='Email is required'>
                                    <span className='label-input100'>Email</span>
                                    <input className='input100' type='text' name='email' placeholder='Type your email'/>
                                    <span className='focus-input100'/>
                                </div>

                                <div className='container-login100-form-btn'>
                                    <a href='#' className='primary-btn w-100 text-center'>Send reset password
                                        request</a>
                                </div>
                                <div className='flex-col-c p-t-65'>
                                    <a href='sign-in' className='txt2 a-login'>
                                        Back to sign in
                                    </a>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export async function getStaticProps() {
    return {
        props: {},
    };
}
