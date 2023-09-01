import { IUser } from '../types/interfaces';
import { IAuthSlice } from '../store/auth/types';
import { IProductSlice } from '../store/product/types';
import { IProduct } from '../types/interfaces';
import { ICatalogSlice } from '../store/catalog/types';
import { IUserSlice } from '../store/user/types';

export const initialUser: IUser = {
  id: '',
  version: 0,
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  date: '',
  month: '',
  year: '',
  defaultShippingAddressId: '',
  defaultBillingAddressId: '',
  shippingAddressIds: [],
  billingAddressIds: [],
  addresses: [],
};

export const initialUserState: IUserSlice = {
  status: 'initial',
  error: '',
  user: initialUser,
};

export const initialProduct: IProduct = {
  artist: '',
  title: '',
  year: '',
  description: '',
  images: [],
  price: 0,
  discountPrice: 0,
  productId: '',
  dimensions: '',
  size: '',
  medium: '',
  color: '',
};

export const initialAuthState: IAuthSlice = {
  isAuthorized: !!localStorage.getItem('token'),
  isNewUser: false,
  status: 'initial',
  error: '',
  userId: '',
};

export const initialProductSlice: IProductSlice = {
  status: 'initial',
  error: '',
  product: initialProduct,
};

export const initialProductListSlice: ICatalogSlice = {
  status: 'initial',
  error: '',
  productList: [],
  categories: [],
};
