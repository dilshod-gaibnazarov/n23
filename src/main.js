import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import router from './routes/users.route.js';
import { errorHandle } from './middlewares/error.middleware.js';

const app = new Koa();
const PORT = 3000;

app.use(bodyParser());

app.use(errorHandle);

app.use(router.routes())
    .use(router.allowedMethods());

app.listen(PORT, () => console.log('server running on port', PORT));
