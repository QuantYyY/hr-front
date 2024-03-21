import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Template from './components/Template';
import * as p from './pages';

import * as applicant from './pages/Applicant';
import * as vacancy from './pages/Vacancy';
import * as department from './pages/Department';
import * as position from './pages/Position';


function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Template />,
      children: [
        { path: '/', element: <p.Main /> },
        { path: '/employee', element: <p.Employee /> },
        { path: '/order', element: <p.Order /> },
        {
          path: 'position',
          children: [
            { index: true, element: <p.Position /> },
            { path: 'new', element: <position.PositionNew /> },
            {
              path: ':id', element: <position.PositionEdit />
            },
          ]
        },
        {
          path: 'department',
          children: [
            { index: true, element: <p.Department /> },
            { path: 'new', element: <department.DepartmentNew /> },
            {
              path: ':id', element: <department.DepartmentEdit />
            },
          ]
        },
        {
          path: 'vacancy',
          children: [
            { index: true, element: <p.Vacancy /> },
            { path: 'new', element: <vacancy.VacancyNew /> },
            {
              path: ':id', element: <vacancy.VacancyEdit />
            },
          ]
        },
        {
          path: 'applicant',
          children: [
            { index: true, element: <p.Applicant /> },
            { path: 'new', element: <applicant.ApplicantNew /> },
            {
              path: ':id', element: <applicant.ApplicantEdit />
            },
          ]
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />
}

export default App
