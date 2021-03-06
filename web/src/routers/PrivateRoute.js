import { Redirect, Route } from "react-router-dom";
import PropTypes from 'prop-types';

export const PrivateRoute = ( { isAuthenticated, component: Component, ...rest } ) => {

    // console.log( 'rest', rest );
    localStorage.setItem( 'lastPath', '/' );

    return (
        <Route {...rest} component={

            ( props ) => {

                return ( isAuthenticated ) ? ( <Component {...props} /> ) : ( <Redirect to="/login" /> );

            }
        } />
    );

};

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired // Es una función pues es un functional component
};
