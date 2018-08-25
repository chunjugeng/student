
import { Provider } from 'mobx-react';
import App from './App';
import EditPropertyStore from '~/stores/EditProperty';
import '~/styles/base.scss';

const app = window['app'] || {};
const editProperty = new EditPropertyStore(app);

const rootEl = document.getElementById('root');
if (rootEl) {
    ReactDOM.render(
        <Provider editProperty={editProperty}>
          <App /> 
        </Provider>
    , rootEl);
}