import { app } from './src/application/web.js';
import { server } from './src/application/socket/server.js';


app.listen(process.env.WEB_PORT, () => {
  console.info(`Listening on port ${process.env.WEB_PORT}`);
});

server.listen(process.env.IO_PORT, () => {
  console.info(`IO.Server on port ${process.env.IO_PORT}`)
})

