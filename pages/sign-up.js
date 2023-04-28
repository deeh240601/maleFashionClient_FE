import AuthService from '../services/auth.service';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { Formik } from 'formik';
import * as Yup from 'yup';

export default function Signup() {
    const dispatch = useDispatch();
    const router = useRouter();
    const registerHandler = async (values) => {
        console.log(values);
        const userResponse = await AuthService.register(values);

        router.push('/sign-in');
    };

    return (

        <>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    passwordConfirmation: '',
                    firstName: '',
                    lastName: '',
                    address: '',
                    phone: '',
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().required('Password is required'),
                    passwordConfirmation: Yup.string()
                        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
                    firstName: Yup.string().max(255).required('First Name is required'),
                    lastName: Yup.string().max(255).required('Last Name is required'),
                    address: Yup.string().max(255).required('Address is required'),
                    phone: Yup.string().max(255).required('Phone is required'),
                })}
                onSubmit={registerHandler}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <div className='body-login'>

                        <div className='limiter'>
                            <div className='container-login100'>
                                <div className='wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54'>
                                    <form className='login100-form validate-form' noValidate onSubmit={handleSubmit}>
                                        <div className='header__logo flex-center mb-4'>
                                            <a href='/'><img src='img/logo.png' alt='' /></a>
                                        </div>
                                        <h4 className='title-auth'>Sign up</h4>

                                        <div className='wrap-input100 validate-input m-b-23'
                                             data-validate='FirstName is required'>
                                            <span className='label-input100'>Frist Name</span>
                                            <input className='input100' type='text' name='firstName'
                                                   placeholder='Type your frist name' value={values.firstName}
                                                   onBlur={handleBlur}
                                                   onChange={handleChange} />
                                            {errors.firstName && touched.firstName && (
                                                <p style={{ color: 'red' }}>{errors.firstName}</p>
                                            )}
                                            <span className='focus-input100'></span>
                                        </div>

                                        <div className='wrap-input100 validate-input m-b-23'
                                             data-validate='lastName is required'>
                                            <span className='label-input100'>Last Name</span>
                                            <input className='input100' type='text' name='lastName'
                                                   placeholder='Type your last name' value={values.lastName}
                                                   onBlur={handleBlur}
                                                   onChange={handleChange} />
                                            {errors.lastName && touched.lastName && (
                                                <p style={{ color: 'red' }}>{errors.lastName}</p>
                                            )}
                                            <span className='focus-input100'></span>
                                        </div>

                                        <div className='wrap-input100 validate-input m-b-23'
                                             data-validate='Email is required'>
                                            <span className='label-input100'>Email</span>
                                            <input className='input100' type='text' name='email'
                                                   placeholder='Type your email' value={values.email}
                                                   onBlur={handleBlur}
                                                   onChange={handleChange} />
                                            {errors.email && touched.email && (
                                                <p style={{ color: 'red' }}>{errors.email}</p>
                                            )}
                                            <span className='focus-input100'></span>
                                        </div>

                                        <div className='wrap-input100 validate-input m-b-23'
                                             data-validate='Adress is required'>
                                            <span className='label-input100'>Adress</span>
                                            <input className='input100' type='text' name='address'
                                                   placeholder='Type your address' value={values.address}
                                                   onBlur={handleBlur}
                                                   onChange={handleChange} />
                                            {errors.address && touched.address && (
                                                <p style={{ color: 'red' }}>{errors.address}</p>
                                            )}
                                            <span className='focus-input100'></span>
                                        </div>

                                        <div className='wrap-input100 validate-input m-b-23'
                                             data-validate='Phone number is required'>
                                            <span className='label-input100'>Phone</span>
                                            <input className='input100' type='text' name='phone'
                                                   placeholder='Type your phone number' value={values.phone}
                                                   onBlur={handleBlur}
                                                   onChange={handleChange} />
                                            {errors.phone && touched.phone && (
                                                <p style={{ color: 'red' }}>{errors.phone}</p>
                                            )}
                                            <span className='focus-input100'></span>
                                        </div>

                                        <div className='wrap-input100 validate-input m-b-23'
                                             data-validate='Password is required'>
                                            <span className='label-input100'>Password</span>
                                            <input className='input100' type='password' name='password'
                                                   placeholder='Type your password' value={values.password}
                                                   onBlur={handleBlur}
                                                   onChange={handleChange} />
                                            {errors.password && touched.password && (
                                                <p style={{ color: 'red' }}>{errors.password}</p>
                                            )}
                                            <span className='focus-input100'></span>
                                        </div>

                                        <div className='wrap-input100 validate-input m-b-23'
                                             data-validate='Password is required'>
                                            <span className='label-input100'>Confirm password</span>
                                            <input className='input100' type='password' name='passwordConfirmation'
                                                   placeholder='Confirm your password'
                                                   value={values.passwordConfirmation} onBlur={handleBlur}
                                                   onChange={handleChange} />
                                            {errors.passwordConfirmation && touched.passwordConfirmation && (
                                                <p style={{ color: 'red' }}>{errors.passwordConfirmation}</p>
                                            )}
                                            <span className='focus-input100'></span>
                                        </div>
                                        <div className='container-login100-form-btn'>
                                            <button className='primary-btn w-100 text-center'>Sign up</button>
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
                )}
            </Formik>
        </>

    );
}

export async function getStaticProps() {
    // Call an external API endpoint to get posts


    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {},
    };
}
