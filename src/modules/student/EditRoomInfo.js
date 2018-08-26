

import cn from 'classnames';
import {inject, observer} from 'mobx-react';

@inject('edit')
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
    
    bindFn =(e)=> {
        if( e.target != this.hint ) {
            this.setState({isShowHint: false});
        }
    }
    componentDidMount() {
        document.addEventListener('click', this.bindFn);
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.bindFn);
    }


    render() {
        let store = this.props.edit;
        let {roomName, price} = this.props.edit.app;
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