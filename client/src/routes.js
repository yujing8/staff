import { Navigate,useRoutes } from 'react-router-dom';
import Login from './login/Login'
import Dashboard from './dashboard/Dashboard';
import Staff from './staff/Staff';
import Department from './department/Department'
import Position from "./position/Position"
export default function Router() {
    const routes = useRoutes([

        
       
        {
            path: '/dashboard',
            element: <Dashboard />,
            children: [
                { element: <Navigate to="/dashboard/staff" />, index: true },
                { path: 'staff', element: <Staff /> },
                { path: 'department', element: <Department /> },
                { path: 'position', element: <Position /> }
              ]
        },
        {
            path: '/',
            element: <Login />
        }
        
    ]);

    return routes;
}
