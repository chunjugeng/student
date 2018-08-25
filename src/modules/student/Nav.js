import {Route, Link} from 'react-router-dom';
import cn from 'classnames';
const Nav=({label, to, onlyExact=false}) => (
	<Route
		path={to}
		exact={onlyExact}
		children={({match}) => (
            <Link to={to} >
                {label}
            </Link>
		)}
	/>
);
export default Nav;