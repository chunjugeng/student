
import data from './propertyList.json';
import {inject, observer}from 'mobx-react';

@inject('property')
@observer
export default class PropertyList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isApp: false
        };
    }
    componentWillMount() {
        this.props.property.initData();
    }
    componentDidMount() {
        let screenW = window.innerWidth;
        if (screenW <= 768) {
            this.setState({isApp: true});
        } else {
            this.props.property.initData();
        }
    }

    render() {
        let {isApp} = this.state;
        let {property} = this.props.property.app;
        return(
            <div className="property property-list">
                <h1>Property List</h1>
                {!isApp && property && property.map((d, i)=> (
                    <div className="table" key={i}>
                        <h5>{d.property}</h5>
                        {d.list.length > 0 && d.list.map((l, j)=> (
                            <table key={j}>
                                <thead>
                                    <tr>
                                        <th>Room name</th>
                                        <th>Price(per week)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {l.map((v, k)=> (
                                        <tr key={k}>
                                            <td>{v.name}</td>
                                            <td>£{v.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ))}
                    </div>
                ))}

                {isApp && data.map((d, i)=> (
                    <div className="table" key={i}>
                        <h5>{d.property}</h5>
                        <table>
                            <thead>
                                <tr>
                                    <th>Room name</th>
                                    <th>Price(per week)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {d.list.length > 0 && d.list.map((l, j)=> (
                                    <tr key={j}>
                                        <td>{l.name}</td>
                                        <td>£{l.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
                {/* <div className="table">
                    <h5>Property 1</h5>
                    <table>
                        <thead>
                            <tr>
                                <th>Room name</th>
                                <th>Price(per week)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Room name</td>
                                <td>Price(per week)</td>
                            </tr>
                        </tbody>
                    </table>
                    <table>
                        <thead>
                            <tr>
                                <th>Room name</th>
                                <th>Price(per week)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Room name</td>
                                <td>Price(per week)</td>
                            </tr>
                        </tbody>
                    </table>
                </div> */}
            </div>
        );
    }
}