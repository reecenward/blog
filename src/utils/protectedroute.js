import {Outlet, Navigate} from 'react-router-dom'

const PortectedRoute = () => {
    let auth = {'token': true}
    return (
        auth.token ? <Outlet/> : <Navigate to='/login'/>
    );
}

export default PortectedRoute;