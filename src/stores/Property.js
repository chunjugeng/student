import {runInAction, action, observable} from 'mobx';
import data from '~/modules/student/propertyList.json';
export default class Property {
    @observable
    app = {
        
    }

    @action
    initData =() => {
        data.map((d)=> {
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
            runInAction(()=> {
                this.app.property = data;
            })
        });
    }

}