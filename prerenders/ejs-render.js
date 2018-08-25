import fs from 'fs';
import ejs from 'ejs';
export default function ejsRender(cf) {
    ejs.renderFile(cf.tpl, { title: cf.title, body: cf.html, params: cf.params }, (err, body) => {
        if (err) {
            throw err;
        } else {
            if (fs.existsSync(cf.outputFile)) {
                fs.unlinkSync(cf.outputFile);
            }
            fs.writeFileSync(cf.outputFile, body);
        }
    });
}