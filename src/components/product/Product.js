import React, { useEffect } from 'react';
import useFetchCollection from '../../customHooks/useFetchCollection';
import { GET_PRICE_RANGE, selectProducts, STORE_PRODUCTS } from '../../redux/slice/productSlice';
import styles from './Product.module.scss';
import ProductFilter from './productFilter/ProductFilter';
import ProductList from './productList/ProductList';
import {useSelector, useDispatch} from 'react-redux';
import spinnerImg from '../../assests/spinner.jpg';
import { selectMinPrice, selectMaxPrice } from '../../redux/slice/productSlice';

const Product = () => {
    const { data, isLoading } = useFetchCollection('products');
    const products = useSelector(selectProducts);
    
    const dispatch = useDispatch();
  
    useEffect (()=> {
      dispatch(
        STORE_PRODUCTS({
          products: data,
        })
      );

      dispatch(GET_PRICE_RANGE)({
        products: data
      })
    }, [dispatch, data])

  return (
    <section>
        <div className={`container ${styles.product}`}>
            <aside className={styles.filter}>
                {isLoading ? null : <ProductFilter />}
            </aside>
            <div className={styles.content}>
              {isLoading ? 
              (
                <img src = {spinnerImg}
                className = "--center-all"
                style = {{ width: "50px" }}
                alt="Loading..." />
              ) :
              (
                <ProductList products={products}/>
              )
              }
            </div>
        </div>
    </section>
  )
}

export default Product