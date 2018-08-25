
import App from '~/modules/student/App';
import { Provider } from 'mobx-react';
import { renderToString } from 'react-dom/server';
import PropertyStore from '~/stores/Property';
import EditPropertyStore from '~/stores/EditProperty';
import ejsRender from './ejs-render';

function render(currMod, cf) {
    let app = Object.create(null);
    cf.html = renderToString(
        <Provider property={new PropertyStore(app)} editProperty={new EditPropertyStore(app)}>
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