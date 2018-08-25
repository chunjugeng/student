
import { Provider } from 'mobx-react';
import App from './App';
import PropertyStore from '~/stores/Property';
import EditPropertyStore from '~/stores/EditProperty';

import '~/styles/base.scss';
import './Body.scss';

const app = window['app'] || {};
const editProperty = new EditPropertyStore(app);
const propertyList = new PropertyStore(app);

const rootEl = document.getElementById('root');
if (rootEl) {
    ReactDOM.render(
        <Provider property={propertyList} editProperty={editProperty}>
          <App /> 
        </Provider>
    , rootEl);
}