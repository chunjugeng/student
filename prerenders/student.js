
import App from '~/modules/student/App';
import { Provider } from 'mobx-react';
import { renderToString } from 'react-dom/server';
import PropertyStore from '~/stores/Property';
import EditPropertyStore from '~/stores/EditProperty';
import ejsRender from './ejs-render';

function render(currMod, cf) {
    cf.html = renderToString(
        <Provider property={PropertyStore} edit={EditPropertyStore}>
            <App />
        </Provider>
    );

    cf.outputFile = cf.htmlFile;
    cf.params = {
        title: cf.title
    };
    ejsRender(cf);
}

export default render;