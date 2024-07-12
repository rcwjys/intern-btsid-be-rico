import {app} from "./src/application/web.js";


app.listen(process.env.PORT, () => {
  console.info(`Listening on port ${process.env.PORT}`);
});

