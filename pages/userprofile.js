import Layout from '../components/layout';

import { Formik } from 'formik';
import * as Yup from 'yup';
import UserService from '../services/user.service';
import { useEffect, useState } from 'react';
import { convertBase64 } from '../core/utils/base64';
import AuthService from '../services/auth.service';
import { useDispatch } from 'react-redux';
import { setUserLogin, setUserUpdate } from '../store/feature/UserSlice';
import { notifyErrorMessage } from '../core/utils/notify-action';


export default function Home() {
    const [user, setUser] = useState(null);
    const [image, setImage] = useState('ss');
    const dispatch = useDispatch();
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        const data = await UserService.getCurrentUser();
        if (data.result){
            setImage(data.result.avatar);
            setUser(data.result);
        }
    };
    const updateHandler = async (values) => {
        const data = await AuthService.updateUser({ ...user, ...values, avatar: image });
        if (data.result){
            dispatch(setUserUpdate(data.result))
        }else{
            notifyErrorMessage('Lỗi cập nhật thông tin')
        }

    };
    const handleChangeMainImage = async (event) => {
        const base64 = await convertBase64(event.target.files[0]);
        setImage(base64);
    };
    return (
        <Layout>
            {user ? <>
                <section className='breadcrumb-option'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-12'>
                                <div className='breadcrumb__text'>
                                    <h4>User Profile </h4>
                                    <div className='breadcrumb__links'>
                                        <a href='./index.html'>Home</a>
                                        <a href='./shop.html'>Shop</a>
                                        <span>User Profile</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='userprofile spad'>
                    <Formik
                        initialValues={{
                            email: user.email,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            address: user.address,
                            phone: user.phone,
                            image: user.image,
                            birthday: user.birthday ? user.birthday.split('T')[0] : '',
                        }}
                        validationSchema={Yup.object().shape({
                            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                            firstName: Yup.string().max(255).required('First Name is required'),
                            lastName: Yup.string().max(255).required('Last Name is required'),
                            address: Yup.string().max(255).required('Address is required'),
                            phone: Yup.number().required('Phone is required'),
                        })}
                        onSubmit={updateHandler}
                    >
                        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                            <form noValidate onSubmit={handleSubmit}>

                            <div className='container'>
                                <div className='row justify-content-center'>
                                    <div className='col-lg-8 '>
                                        <div className='userprofile__info'>
                                                <div className='userprofile__info-item'>
                                                    <div className='userprofile-info-item__detail'>
                                                        <div className='userprofile-detail__label'>
                                                            First name
                                                        </div>
                                                        <div className='userprofile-detail__input'>
                                                            <input type='text' name='firstName' value={values.firstName} onChange={handleChange}/>
                                                        </div>

                                                    </div>
                                                    {errors.firstName && touched.firstName && (
                                                        <p style={{ marginLeft:'25%', color: 'red' }}>{errors.firstName}</p>
                                                    )}
                                                </div>
                                                <div className='userprofile__info-item'>
                                                    <div className='userprofile-info-item__detail'>
                                                        <div className='userprofile-detail__label'>
                                                            Last name
                                                        </div>
                                                        <div className='userprofile-detail__input'>
                                                            <input type='text'onChange={handleChange} value={values.lastName} name={'lastName'} />
                                                        </div>
                                                    </div>
                                                        {errors.lastName && touched.lastName && (
                                                            <p style={{ marginLeft:'25%', color: 'red' }}>{errors.lastName}</p>
                                                        )}
                                                </div>
                                                <div className='userprofile__info-item'>
                                                    <div className='userprofile-info-item__detail'>
                                                        <div className='userprofile-detail__label'>
                                                            Email
                                                        </div>
                                                        <div className='userprofile-detail__input'>
                                                            <input type='text'onChange={handleChange} value={values.email} name={'email'} />
                                                        </div>

                                                    </div>
                                                    {errors.email && touched.email && (
                                                        <p style={{ marginLeft:'25%', color: 'red' }}>{errors.email}</p>
                                                    )}

                                                </div>
                                                <div className='userprofile__info-item'>
                                                    <div className='userprofile-info-item__detail'>
                                                        <div className='userprofile-detail__label'>
                                                            Số điện thoại
                                                        </div>
                                                        <div className='userprofile-detail__input'>
                                                            <input type='text' onChange={handleChange} value={values.phone} name={'phone'} />
                                                        </div>
                                                    </div>
                                                    {errors.phone && touched.phone && (
                                                        <p style={{ marginLeft:'25%', color: 'red' }}>{errors.phone}</p>
                                                    )}
                                                </div>


                                                {/*<div className='userprofile__info-item'>*/}
                                                {/*    <div className='userprofile-info-item__detail'>*/}
                                                {/*        <div className='userprofile-detail__label'>*/}
                                                {/*            Giới tính*/}
                                                {/*        </div>*/}
                                                {/*        <div className='userprofile-detail__radio'>*/}
                                                {/*            <div className='userprofile-radio__group'>*/}
                                                {/*                <div className='userprofile-radio__item' role='radio'>*/}
                                                {/*                    <label>*/}
                                                {/*                        <input type='radio' name='radio'/>*/}
                                                {/*                        <span className='checkmark'/>*/}
                                                {/*                    </label>*/}
                                                {/*                    <div className='userprofile-radio__item-content'>*/}
                                                {/*                        Nam*/}
                                                {/*                    </div>*/}
                                                {/*                </div>*/}
                                                {/*                <div className='userprofile-radio__item' role='radio'>*/}
                                                {/*                    <label>*/}
                                                {/*                        <input type='radio' name='radio'/>*/}
                                                {/*                        <span className='checkmark'/>*/}
                                                {/*                    </label>*/}
                                                {/*                    <div className='userprofile-radio__item-content'>*/}
                                                {/*                        Nữ*/}
                                                {/*                    </div>*/}
                                                {/*                </div>*/}
                                                {/*                <div className='userprofile-radio__item' role='radio'>*/}
                                                {/*                    <label>*/}
                                                {/*                        <input type='radio' name='radio'/>*/}
                                                {/*                        <span className='checkmark'/>*/}
                                                {/*                    </label>*/}
                                                {/*                    <div className='userprofile-radio__item-content'>*/}
                                                {/*                        Khác*/}
                                                {/*                    </div>*/}
                                                {/*                </div>*/}
                                                {/*            </div>*/}
                                                {/*        </div>*/}
                                                {/*    </div>*/}
                                                {/*</div>*/}
                                                <div className='userprofile__info-item'>
                                                    <div className='userprofile-info-item__detail'>
                                                        <div className='userprofile-detail__label'>
                                                            Ngày sinh
                                                        </div>
                                                        <div className='userprofile-detail__input'>
                                                            <input type='date' onChange={handleChange} value={values.birthday} name={'birthday'} />
                                                        </div>
                                                        {/*<div className='userprofile-detail__wrapper'>*/}
                                                        {/*    <select className='form-control w-25'>*/}
                                                        {/*        <option value='' selected disabled>1</option>*/}
                                                        {/*        <option value='2'>2</option>*/}
                                                        {/*        <option value='3'>3</option>*/}
                                                        {/*        <option value='4'>4</option>*/}
                                                        {/*        <option value='5'>5</option>*/}
                                                        {/*        <option value='6'>6</option>*/}
                                                        {/*        <option value='7'>7</option>*/}
                                                        {/*        <option value='8'>8</option>*/}
                                                        {/*        <option value='9'>9</option>*/}
                                                        {/*        <option value='10'>10</option>*/}
                                                        {/*        <option value='11'>11</option>*/}
                                                        {/*        <option value='12'>12</option>*/}
                                                        {/*        <option value='13'>13</option>*/}
                                                        {/*        <option value='14'>14</option>*/}
                                                        {/*        <option value='15'>15</option>*/}
                                                        {/*        <option value='16'>16</option>*/}
                                                        {/*        <option value='17'>17</option>*/}
                                                        {/*        <option value='18'>18</option>*/}
                                                        {/*        <option value='19'>19</option>*/}
                                                        {/*        <option value='20'>20</option>*/}
                                                        {/*        <option value='21'>21</option>*/}
                                                        {/*        <option value='22'>22</option>*/}
                                                        {/*        <option value='23'>23</option>*/}
                                                        {/*        <option value='24'>24</option>*/}
                                                        {/*        <option value='25'>25</option>*/}
                                                        {/*        <option value='26'>26</option>*/}
                                                        {/*        <option value='27'>27</option>*/}
                                                        {/*        <option value='28'>28</option>*/}
                                                        {/*        <option value='29'>29</option>*/}
                                                        {/*        <option value='30'>30</option>*/}
                                                        {/*        <option value='31'>31</option>*/}
                                                        {/*    </select>*/}
                                                        {/*    <select className='form-control w-25'>*/}
                                                        {/*        <option value='1' selected disabled>Tháng 1</option>*/}
                                                        {/*        <option value='2'>Tháng 2</option>*/}
                                                        {/*        <option value='3'>Tháng 3</option>*/}
                                                        {/*        <option value='4'>Tháng 4</option>*/}
                                                        {/*        <option value='5'>Tháng 5</option>*/}
                                                        {/*        <option value='6'>Tháng 6</option>*/}
                                                        {/*        <option value='7'>Tháng 7</option>*/}
                                                        {/*        <option value='8'>Tháng 8</option>*/}
                                                        {/*        <option value='9'>Tháng 9</option>*/}
                                                        {/*        <option value='10'>Tháng 10</option>*/}
                                                        {/*        <option value='11'>Tháng 11</option>*/}
                                                        {/*        <option value='12'>Tháng 12</option>*/}
                                                        {/*    </select>*/}
                                                        {/*    <select className='form-control w-25'>*/}
                                                        {/*        <option value='' selected disabled>1990</option>*/}
                                                        {/*        <option value='2'>2022</option>*/}
                                                        {/*        <option value='3'>2021</option>*/}
                                                        {/*        <option value='4'>2020</option>*/}
                                                        {/*        <option value='5'>2019</option>*/}
                                                        {/*        <option value='6'>2018</option>*/}
                                                        {/*        <option value='7'>2017</option>*/}
                                                        {/*        <option value='8'>2016</option>*/}
                                                        {/*        <option value='9'>2015</option>*/}
                                                        {/*        <option value='10'>2014</option>*/}
                                                        {/*        <option value='11'>2013</option>*/}
                                                        {/*        <option value='12'>2012</option>*/}
                                                        {/*        <option value='13'>2011</option>*/}
                                                        {/*        <option value='14'>2010</option>*/}
                                                        {/*        <option value='15'>2009</option>*/}
                                                        {/*        <option value='16'>2008</option>*/}
                                                        {/*        <option value='17'>2007</option>*/}
                                                        {/*        <option value='18'>2006</option>*/}
                                                        {/*        <option value='19'>2005</option>*/}
                                                        {/*        <option value='20'>2004</option>*/}
                                                        {/*        <option value='21'>2003</option>*/}
                                                        {/*        <option value='22'>2002</option>*/}
                                                        {/*        <option value='23'>2001</option>*/}
                                                        {/*        <option value='24'>2000</option>*/}
                                                        {/*        <option value='25'>1999</option>*/}
                                                        {/*        <option value='26'>1998</option>*/}
                                                        {/*        <option value='27'>1997</option>*/}
                                                        {/*        <option value='28'>1996</option>*/}
                                                        {/*        <option value='29'>1995</option>*/}
                                                        {/*        <option value='30'>1994</option>*/}
                                                        {/*        <option value='31'>1993</option>*/}
                                                        {/*    </select>*/}
                                                        {/*</div>*/}
                                                    </div>
                                                </div>

                                        </div>
                                    </div>
                                    <div className='col-lg-4 '>
                                        <div className='userprofile__image'>
                                            <div className='profile-images'>
                                                <img src={image} id='upload-img' alt='' />
                                            </div>
                                            <div className='custom-file'>
                                                <label htmlFor='fileupload'>Chọn ảnh</label>
                                                <input type='file' accept='image/*' id='fileupload' onChange={handleChangeMainImage} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-12 col-sm-12'>
                                            <button className={'primary-btn'} type='submit'>Lưu</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </form>

                            )}
                    </Formik>
                </section>
            </> : ''}
        </Layout>
    );
}

export async function getServerSideProps() {

    return {
        props: {},
    };
}

