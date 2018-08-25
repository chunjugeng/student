

import properties from './properties.json';
import {inject, observer}from 'mobx-react';
import cn from 'classnames';
import EditRoomInfo from './EditRoomInfo';

@inject('editProperty')
@observer
export default class EditProperty extends React.Component {
    render() {
        let store = this.props.editProperty;
        let {propertyData, currRoom, currIndex, isShowNewProerty} = this.props.editProperty.app;
        return(
            <div className="property edit-property">
                <h1>Edit Properties<span className="add-new-property-btn" onClick={store.addProperty}>Add new property</span></h1>
                <div className="content">
                    <div className="room-list">
                        <ul>
                            {propertyData && propertyData.map((d, i)=>(
                                <li key={i} className={cn({active: i == currIndex})} onClick={store.changeProperty} data-index={i} data-id={d._id}>
                                    {d.property}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {!isShowNewProerty ?
                        <div className="room-detail">
                            <h5>Price</h5>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Room name</th>
                                        <th>Price(per week)</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currRoom && currRoom.list.map((v, k)=>(
                                        <tr key={k}>
                                            <td>{v.name}</td>
                                            <td>£{v.price}</td>
                                            <td className="edit">Edit</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <EditRoomInfo  />
                        </div>
                        :
                        <div className="set-new-property">
                            <span className="close" onClick={store.hideNewPropertyModel}>X</span>
                            <div className="select-property">
                                <h5>Property name</h5>
                                <select>
                                    <option value="Select a property" selected="selected">Select a property</option>
                                    {properties.map((d, i)=> (
                                        <option value={d.name} key={i}>{d.name}</option>
                                    ))}
                                </select>
                                <h5>Price</h5>
                                <EditRoomInfo  />
                                <div className="submit-btn">
                                    <button className="save" disabled={store.isDisableBtn}>Save</button>
                                    <button>Cancel</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}