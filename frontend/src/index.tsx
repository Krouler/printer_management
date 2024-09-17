import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { Paths } from './paths';
import { HomePage } from './pages/home';
import { Registration } from './pages/register';
import { Login } from './pages/login';
import { CabinetList } from './pages/list/cabinet';
import { PrinterList } from './pages/list/printer';
import { CartridgeList } from './pages/list/cartridge';
import { SelfPage } from './pages/me';
import { AddressList } from './pages/list/address';
import { ChangeInfo } from './pages/me/update';
import { AddressCreate } from './pages/create/address';
import { CreateCabinet } from './pages/create/cabinet';
import { CreatePrinter } from './pages/create/printer';
import { CreateCartridge } from './pages/create/cartridge';

const router = createBrowserRouter([
  {
    path: Paths.register,
    element: <Registration />
  },
  {
    path: Paths.home,
    element: <HomePage />
  },
  {
    path: Paths.login,
    element: <Login />
  },
  {
    path: Paths.cabinet_list,
    element: <CabinetList />
  },
  {
    path: Paths.address_list,
    element: <AddressList />
  },
  {
    path: Paths.printer_list,
    element: <PrinterList />
  },
  {
    path: Paths.cartridge_list,
    element: <CartridgeList />
  },
  {
    path: Paths.cabinets_create,
    element: <CreateCabinet />
  },
  {
    path: Paths.address_create,
    element: <AddressCreate />
  },
  {
    path: Paths.printer_create,
    element: <CreatePrinter />
  },
  {
    path: Paths.cartridge_create,
    element: <CreateCartridge />
  },
  {
    path: Paths.me,
    element: <SelfPage />
  },
  {
    path: Paths.meUpdate,
    element: <ChangeInfo />
  },
]);

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
