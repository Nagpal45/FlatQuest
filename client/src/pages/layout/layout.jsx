import { Navigate, Outlet} from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import './layout.scss'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export function Layout() {
    return (
        <div className="layout">
            <div className="navbar">
                <Navbar />
            </div>
            <div className="content">
               <Outlet/>
            </div>
        </div>
    )
}

export function RequireAuth(){
    const {currentUser} = useContext(AuthContext);

    if(!currentUser){
        return <Navigate to="/login"/>
    }

    return (
        currentUser && <div className="layout">
            <div className="navbar">
                <Navbar />
            </div>
            <div className="content">
               <Outlet/>
            </div>
        </div>
    )
}
