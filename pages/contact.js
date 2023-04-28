import Layout from '../components/layout';
import { Constant } from '../core/constant';

export default function Contact() {
    return (
        <Layout>
            <div className='map'>
                <iframe
                    width='600'
                    height='450'
                    style={{ border: 0 }}
                    loading='lazy'
                    allowFullScreen
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyB12a91SpS1s699OhnsEyMKk58pYdfv_Ec&q=${Constant.ADDRESS}`}>
                </iframe>
            </div>
            <section className='contact spad'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-6 col-md-6'>
                            <div className='contact__text'>
                                <div className='section-title'>
                                    <span>Information</span>
                                    <h2>Contact Us</h2>
                                    <p>As you might expect of a company that began as a high-end interiors contractor,
                                        we pay
                                        strict attention.</p>
                                </div>
                                <ul>
                                    <li>
                                        <h4>America</h4>
                                        <p>195 E Parker Square Dr, Parker, CO 801 <br />+43 982-314-0958</p>
                                    </li>
                                    <li>
                                        <h4>France</h4>
                                        <p>109 Avenue Léon, 63 Clermont-Ferrand <br />+12 345-423-9893</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='col-lg-6 col-md-6'>
                            <div className='contact__form'>
                                <form action='#'>
                                    <div className='row'>
                                        <div className='col-lg-6'>
                                            <input type='text' placeholder='Name' />
                                        </div>
                                        <div className='col-lg-6'>
                                            <input type='text' placeholder='Email' />
                                        </div>
                                        <div className='col-lg-12'>
                                            <textarea placeholder='Message' />
                                            <button type='submit' className='site-btn'>Send Message</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
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
