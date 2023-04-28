import { useCallback, useEffect, useState } from 'react';
import Layout from '../components/layout';
import Product from '../components/shared/product';
import CategoryService from '../services/category.service';
import SizeService from '../services/size.service';
import SupplierService from '../services/supplier.service';
import ProductService from '../services/product.service';
import { debounce } from 'lodash'

export default function Shop() {
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [productsPagination, setProductsPagination] = useState([]);
    const [filterTextTmp, setFilterTextTmp] = useState('');
    const [filterText, setFilterText] = useState('');
    const [filterCate, setFilterCate] = useState('');
    const [filterSupplier, setFilterSupplier] = useState('');
    const [filterSize, setFilterSize] = useState('');
    const [filterPriceTmp, setFilterPriceTmp] = useState(0);
    const [filterPrice, setFilterPrice] = useState(0);
    const [curPage, setCurPage] = useState(1);
    const [maxPage, setMaxPage] = useState(0);
    const [totalItem, setTotalItem] = useState(0);

    const debounceSearch = useCallback(debounce((nextValue) => setFilterText(nextValue), 500), [])
    const debouncePrice = useCallback(debounce((nextValue) => setFilterPrice(nextValue), 500), [])


    useEffect(() => {
        getCategories();
        getBrands();
        getProductByFilter();

    }, []);

    useEffect(() => {
        getProductByFilter();
    }, [filterText, filterCate, filterSupplier, filterPrice, filterSize, curPage]);

    const getCategories = async () => {
        const data = await CategoryService.getAll();
        setCategories(data.result);
    };
    const getBrands = async () => {
        const data = await SupplierService.getAll();
        setSuppliers(data.result);
    };
    const getProductByFilter = async () => {
        const filter = {
            searchText: filterText,
            cate: filterCate,
            supplier: filterSupplier,
            priceTo: filterPrice,
            size: filterSize,
            page: curPage,
        }
        console.log(filter);
        const data = await ProductService.getProductByFilter(filter);
        setProductsPagination(data.result.products);
        if ((data.result.totalItem % data.result.limit) == 0) {

            setMaxPage(data.result.totalItem / data.result.limit);
        } else {
            setMaxPage(Math.floor((data.result.totalItem / data.result.limit)) + 1);
        }
        setTotalItem(data.result.totalItem)
    };

    const handleSetFilterText = (evt) => {
        setFilterTextTmp(evt.target.value);
        debounceSearch(evt.target.value);
    };
    const handleSetCateFilter = (id) => {
        if (id === filterCate) {
            setFilterCate('');
        } else {
            setFilterCate(id);
        }
    };

    const handleSetPriceFilter = (value) => {
        setFilterPriceTmp(value);
        debouncePrice(value);
    };

    const handleSetSupplierFilter = (id) => {
        if (id === filterSupplier) {
            setFilterSupplier('');
        } else {
            setFilterSupplier(id);
        }
    };
    const startItem = (curPage * 9) - 9 + 1;

    return (
        <>
            <Layout>
                <section className='breadcrumb-option'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-12'>
                                <div className='breadcrumb__text'>
                                    <h4>Shop</h4>
                                    <div className='breadcrumb__links'>
                                        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                                        <a href='/'>Home</a>
                                        <span>Shop</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='shop spad'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-3'>
                                <div className='shop__sidebar'>
                                    <div className='shop__sidebar__search'>
                                        <form action='#'>
                                            <input type='text' style={{color: 'black'}} placeholder='Search...'  value={filterTextTmp} onChange={handleSetFilterText}/>
                                            <button type='submit'><span className='icon_search' /></button>
                                        </form>
                                    </div>
                                    <div className='shop__sidebar__accordion'>
                                        <div className='accordion' id='accordionExample'>
                                            <div className='card'>
                                                <div className='card-heading'>
                                                    <a data-toggle='collapse' data-target='#collapseThree'>Filter
                                                        Price</a>
                                                </div>
                                                <div id='collapseThree' className='collapse show'
                                                     data-parent='#accordionExample'>
                                                    <div className='card-body'>
                                                        <div className='container mt-4'>
                                                            <div className='row'>
                                                                <div className='col-sm-12'>
                                                                    <input style={{ width: '100%' }} type='range'
                                                                           min='0' max='2000' className='form-range'
                                                                           value={filterPriceTmp} id='customRange1'
                                                                           onChange={(e) => handleSetPriceFilter(e.target.value)} />
                                                                   <div className={'d-flex justify-content-between align-items-center'}>
                                                                       <h6>$0</h6>
                                                                       <h6>${filterPriceTmp}</h6>
                                                                   </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='card'>
                                                <div className='card-heading'>
                                                    <a data-toggle='collapse' data-target='#collapseOne'>Categories</a>
                                                </div>
                                                <div id='collapseOne' className='collapse show'
                                                     data-parent='#accordionExample'>
                                                    <div className='card-body'>
                                                        <div className='shop__sidebar__categories'>
                                                            <ul className='nice-scroll'>

                                                                {categories.map((item, index) => {

                                                                    return (<li key={index}
                                                                                className={filterCate == item._id ? 'active-filter' : ''}
                                                                                onClick={() => handleSetCateFilter(item._id)}>
                                                                        <a href='javascript:;'>{item.name}</a>
                                                                    </li>);
                                                                })}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='card'>
                                                <div className='card-heading'>
                                                    <a data-toggle='collapse' data-target='#collapseTwo'>Branding</a>
                                                </div>
                                                <div id='collapseTwo' className='collapse show'
                                                     data-parent='#accordionExample'>
                                                    <div className='card-body'>
                                                        <div className='shop__sidebar__brand'>
                                                            <ul>
                                                                {suppliers.map((item, index) => {
                                                                    return <li key={index}
                                                                               className={filterSupplier == item._id ? 'active-filter' : ''}
                                                                               onClick={() => handleSetSupplierFilter(item._id)}>
                                                                        <a
                                                                            href='javascript:;'>{item.sortName}</a>
                                                                    </li>;
                                                                })}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-9'>
                                <div className='shop__product__option'>
                                    <div className='row'>
                                        <div className='col-lg-6 col-md-6 col-sm-6'>
                                            <div className='shop__product__option__left'>
                                                <p>Showing {startItem}–{startItem + productsPagination.length - 1} of {totalItem} results</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className='shop__product__option'>
                                    <div className='row'>

                                        {productsPagination.map(item => {
                                            return <Product product={item} key={item._id} />;
                                        })}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-lg-12 flex-center'>
                                        {/* <div className='product__pagination'>

                                            <a className='active' href='#'>1</a>
                                            <a href='#'>2</a>
                                            <a href='#'>3</a>
                                        </div> */}
                                        <nav aria-label='Page navigation example'>
                                            <ul className='pagination'>
                                                <li className={`page-item ${curPage == 1 ? 'disabled' : ''}`}
                                                    onClick={() => setCurPage(curPage - 1)}>
                                                    <a className='page-link' href='javascript:;' aria-label='Previous'>
                                                        <span aria-hidden='true'>&laquo;</span>
                                                        <span className='sr-only'>Previous</span>
                                                    </a>
                                                </li>
                                                {curPage == 1 ? '' : <li className='page-item'><a className='page-link'
                                                                                                  href='javascript:;'
                                                                                                  onClick={() => setCurPage(curPage - 1)}>{curPage - 1}</a>
                                                </li>}
                                                <li className='page-item active'><a className='page-link'
                                                                                    href='javascript:;'>{curPage}</a>
                                                </li>
                                                {curPage < maxPage ? <li className='page-item'><a className='page-link'
                                                                                                  href='javascript:;'
                                                                                                  onClick={() => setCurPage(curPage + 1)}>{curPage + 1}</a>
                                                </li> : ''}
                                                <li className={`page-item ${curPage == maxPage ? 'disabled' : ''}`}
                                                    onClick={() => setCurPage(curPage + 1)}>
                                                    <a className='page-link' href='javascript:;' aria-label='Next'>
                                                        <span aria-hidden='true'>&raquo;</span>
                                                        <span className='sr-only'>Next</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
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
