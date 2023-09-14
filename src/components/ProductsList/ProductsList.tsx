import { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { selectAuthLoadingInfo, selectProductlist } from '../../store/catalog/selectors';
import { selectCartLoadingInfo } from '../../store/cart/selectors';
import { useAppDispatch } from '../../store/store';
import { productListThunk } from '../../store/catalog/thunks';
import { getCartThunk } from '../../store/cart/thunks';
import { selectCart } from '../../store/cart/selectors';
import { ProductCard } from './ProductCard';
import { Loader } from '../shared/Loader';
import { ErrorMessage } from '../shared/ErrorMessage';
import { getSearchParams } from '../../utils';

import styles from './productsList.module.scss';

function ProductsList(): ReactElement {
  const [searchParams] = useSearchParams();

  const productList = useSelector(selectProductlist);
  const { status, error } = useSelector(selectAuthLoadingInfo);

  const cart = useSelector(selectCart);

  const [isCartError, setIsCartError] = useState(false);
  const { error: cartError } = useSelector(selectCartLoadingInfo);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCartError(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [cartError]);

  useEffect(() => {
    const params = getSearchParams(searchParams);
    dispatch(productListThunk(params));
  }, [searchParams, dispatch]);

  useEffect(() => {
    if (!cart.id) {
      dispatch(getCartThunk());
    }
  }, [cart.id, dispatch]);

  return (
    <>
      {status === 'loading' && <Loader />}
      {error && <ErrorMessage text={error} />}

      {status === 'success' && !error && productList.length > 0 && (
        <ul className={styles.products}>
          {productList.map((item) => (
            <ProductCard item={item} key={item.productId} className={styles.products__item} />
          ))}
        </ul>
      )}
      {status === 'success' && !error && productList.length === 0 && (
        <div className={styles.products__error}>No items found¯\_(:|)_/¯</div>
      )}

      {isCartError && <ErrorMessage text={'Something wrong with Cart. Try again!'} className={styles.error__message} />}
    </>
  );
}

export default ProductsList;
