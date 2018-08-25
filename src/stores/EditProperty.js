import {runInAction, action, observable, computed} from 'mobx';
import data from '~/modules/student/propertyList.json';
export default class EditProperty {
    @observable
    app = {
        propertyData: data,
        currRoom: data[0],
        currIndex: 0,
        roomName: '',
        price: ''
    }

    @action
    changeProperty=(e)=> {
        let currIndex = e.target.getAttribute('data-index');
        let _id = e.target.getAttribute('data-id');
        runInAction(()=> {
            this.app.isShowNewProerty = false;
           return data.map(d => {
                if (_id == d._id) {
                    this.app.currIndex= currIndex;
                    this.app.currRoom = d;
                }
            });
        });
    }

    @action
    onChange=(e)=> {
        let value = e.target.value;
        this.app[e.target.name] = value;
    }
    
    @action
    add = ()=> {
        data.map((d)=> {
            if (this.app.currRoom._id == d._id) {
                d.list.map(l=> {
                    if (this.app.roomName == l.name.toLowerCase() ) {
                        runInAction(()=> {
                            l.price = this.app.price;
                            this.app.currRoom = d;
                        });
                    }
                });
            }
        });
    }

    @action 
    addProperty =()=> {
        runInAction(()=> {
            this.app.currIndex = -1;
            this.app.isShowNewProerty = true;
        });
    }

    @action 
    hideNewPropertyModel =()=> {
        runInAction(()=> {
            this.app.currIndex = 0;
            this.app.isShowNewProerty = false;
        });
    }

    @computed
    get isDisableBtn() {
        return !this.app.roomName || !this.app.price;
    }
}