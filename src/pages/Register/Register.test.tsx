import { render, screen } from '@testing-library/react';
import * as reduxHooks from 'react-redux';
import * as routerHooks from 'react-router-dom';
import { Register } from './index';

jest.mock('react-redux');
jest.mock('react-router-dom');
jest.mock('../../constant/metaData', () => {});
jest.mock('../../services/sdk/auth/methods', () => {});
jest.mock('../../services/sdk/product/methods', () => {});
jest.mock('../../services/sdk/product-list/methods', () => {});

const useDispatchSpy = jest.spyOn(reduxHooks, 'useDispatch');
const useNavigateSpy = jest.spyOn(routerHooks, 'useNavigate');

describe('Test Login page: ', () => {
  test('should render Login page without error', () => {
    useDispatchSpy.mockReturnValue(jest.fn());
    useNavigateSpy.mockReturnValue(jest.fn());
    const component = render(<Register />);
    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(component).toMatchSnapshot();
  });
});
