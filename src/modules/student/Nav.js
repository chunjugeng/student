import {Route, NavLink as Link} from 'react-router-dom';
const Nav=({label, to, onlyExact=false}) => (
	<Link to={to} activeClassName="active" exact={onlyExact} >
		{label}
	</Link>
);
export default Nav;