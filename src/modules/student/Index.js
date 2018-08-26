
import { Provider } from 'mobx-react';
import App from './App';
import PropertyStore from '~/stores/Property';
import EditPropertyStore from '~/stores/EditProperty';

import '~/styles/base.scss';

const rootEl = document.getElementById('root');
if (rootEl) {
    ReactDOM.render(
        <Provider property={PropertyStore} edit={EditPropertyStore}>
            <App />
        </Provider>
        , rootEl);
}