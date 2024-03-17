import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';

import Template from './components/Template';
import * as p from './pages';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Template />,
      children: [
        {
          path: '/',
          element: <p.Main />
        },
        {
          path: '/employee',
          element: <p.Employee />
        },
        {
          path: '/order',
          element: <p.Order />
        },
        {
          path: '/position',
          element: <p.Position />
        },
        {
          path: '/department',
          element: <p.Department />
        },
        {
          path: '/vacancy',
          element: <p.Vacancy />
        },
        {
          path: '/application',
          element: <p.Application />
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />
}

export default App
