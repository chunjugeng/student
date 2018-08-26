import * as mobx from 'mobx';
import { runInAction, action, observable } from 'mobx';

mobx.configure({ enforceActions: true });
export default new class Property {
    @observable
    app = {
        property: []
    }

    @action
    initData = () => {
        let property = [
            {
                "property": "Property1",
                "_id": "Property1",
                "list": [
                    {
                        "name": "Room1",
                        "price": "250"
                    }
                ]
            },
            {
                "property": "Property2",
                "_id": "Property2",
                "list": [
                    {
                        "name": "Room1",
                        "price": "250"
                    },
                    {
                        "name": "Room2",
                        "price": "250"
                    }
                ]
            },
            {
                "property": "Property3",
                "_id": "Property3",
                "list": [
                    {
                        "name": "Room1",
                        "price": "150"
                    },
                    {
                        "name": "Room2",
                        "price": "50"
                    },
                    {
                        "name": "Room3",
                        "price": "20"
                    }
                ]
            }
        ];
        property.map((d) => {
            let groups = [];
            let len = d.list.length;
            if (len > 1) {
                let columnCount = Math.ceil(len / 2);
                for (let i = 0; i < 2; i++) {
                    groups[i] = d.list.slice(columnCount * i, columnCount * (i + 1));
                }
                d.list = groups;
            }
            if (len == 1) {
                groups[0] = d.list.slice(0, 1);
                d.list = groups;
            }
        });

        runInAction(() => {
            this.app.property = property;
        });
    }

}