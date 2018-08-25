

import propertyData from './propertyList.json';
import cn from 'classnames';
import {inject, observer} from 'mobx-react';

@inject('editProperty')
@observer
export default class EditRoomInfo extends React.Component {
    constructor() {
        super();
        this.state = {
            isShowHint: false
        };
    }

    showHint =(ev)=> {
        ev.stopPropagation();
        this.setState({isShowHint: true});
        return false;
    }
    
    componentDidMount() {
        document.addEventListener('click', (e)=>{
            if( e.target != this.hint ) {
                this.setState({isShowHint: false});
            }
        }, false);
    }

    render() {
        let store = this.props.editProperty;
        let {roomName, price} = this.props.editProperty.app;
        return(
            <div className="edit-room-info">
                <div className="group-buy">
                    <input type="text" name="roomName" placeholder="Room Name" value={roomName} onChange={store.onChange}/>
                    <span className="price">
                        <input type="tel" name="price" placeholder="Price" value={price} onChange={store.onChange}/>
                        <i onClick={this.showHint} ref={hint=> this.hint=hint}></i>
                        <ul className={cn('hide', {show: this.state.isShowHint})}>
                            <li>GBP</li>
                            <li>USD</li>
                            <li>AUD</li>
                        </ul>
                    </span>
                </div>
                <div className="add-btn">
                    <input type="button" value="Add" onClick={store.add} disabled={store.isDisableBtn} />
                </div>
            </div>
        );
    }
}