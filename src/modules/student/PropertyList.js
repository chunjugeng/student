
import propertyData from './propertyList.json';

export default class PropertyList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            property: [],
            isApp: false
        };
    }

    componentDidMount() {
        let screenW = window.innerWidth;
        if (screenW <= 768) {
            this.setState({isApp: true});
        } else {
            this.initData();
        }
    }

    initData =()=> {
        propertyData.map((d)=> {
            let groups = [];
            let len = d.list.length;
            if (len >0 && len > 2) {
                let columnCount = Math.ceil(len/2);
                for(let i = 0; i < columnCount; i++) {
                    groups[i] = d.list.slice(columnCount * i, columnCount * (i + 1));
                }
                d.list = groups;
            }
            if (len==1) {
                groups[0] = d.list.slice(0, 1);
                d.list = groups;
            }
        });
        this.setState({property: propertyData});
    }

    render() {
        let {property, isApp} = this.state;
        return(
            <div className="property property-list">
                <h1>Property List</h1>
                {!isApp && property.length > 0 && property.map((d, i)=> (
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

                {isApp && propertyData.map((d, i)=> (
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