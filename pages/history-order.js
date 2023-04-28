import Layout from '../components/layout';
import { useEffect, useState } from 'react';
import SaleOrderService from '../services/saleOrder.service';

export default function HistoryOrder() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        getSaleOrders();
    }, []);

    const getSaleOrders = async () => {
        const data = await SaleOrderService.getAll();
        setItems(data.result);
    };

    return (
        <Layout>
            <section className='breadcrumb-option'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <div className='breadcrumb__text'>
                                <h4>Order history</h4>
                                <div className='breadcrumb__links'>
                                    {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                                    <a href='/'>Home</a>
                                    <span>Order history</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='shop spad'>
                <div className='container'>
                    <table id='history_table' className='table hover'>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th>Payment Method</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.map((item) => {
                            return (
                                <tr key={item._id}>
                                    <td>{item.code}</td>
                                    <td>{item.createdAt}</td>
                                    <td>{item.status}</td>
                                    <td>{item.paymentMethod}</td>
                                    <td><a href={`/history-order-detail?id=${item._id}`}>Detail</a></td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
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
