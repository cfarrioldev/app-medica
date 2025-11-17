for i in $(seq 1 10); do
  node -e "
    const { Client } = require('pg');
    const c = new Client({
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT || 5432,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });
    c.connect().then(()=>{console.log('db up'); process.exit(0)}).catch(()=>process.exit(1));
  " && break
  echo 'Esperando DB...'; sleep 2
done

npx ts-node ./node_modules/typeorm/cli.js -d ./data-source.ts migration:run

node dist/main.js
