import {HashRouter, MemoryRouter, Route, Link, Switch} from 'react-router-dom';

import PropertyList from './PropertyList';
import EditProperty from './EditProperty';
import Nav from './Nav';
const Router = __client__ ? HashRouter : MemoryRouter;

export default class NavList extends React.Component {
    state = {
        H: 0
    }
    componentDidMount() {
        let screenW = window.innerWidth;
        let H = screenW > 768 ? (window.innerHeight-64) + 'px' : '100px';
        this.setState({H});
        
    }
    render() {
        return(
            <div>
                <Router>
                    <div className="container">
                        <ul className="nav-list" style={{height: this.state.H}}>
                            <li className="list">
                                <Nav to="/" label="list" onlyExact={true} />
                            </li>
                            <li className="edit">
                                <Nav to="/edit" label="edit"/>
                            </li>
                        </ul>
                        <Switch>
                            <Route exact path="/" component={PropertyList} />
                            <Route path="/edit" component={EditProperty} />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}