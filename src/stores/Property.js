import {runInAction, action, observable} from 'mobx';
import data from '~/modules/student/propertyList.json';
export default class Property {
    @observable
    app = {
        
    }

    @action
    initData =() => {
        let groups = [];
        data.map((d)=> {
            let len = d.list.length;
            if (len >0 && len > 2) {
                let columnCount = Math.ceil(len/2);
                for(let i = 0; i < columnCount; i++) {
                    groups[i] = d.list.slice(columnCount * i, columnCount * (i + 1));
                }
                d.list = groups;
            }
            runInAction(()=> {
                this.app.propertyData = data;
            })
        });
    }

}