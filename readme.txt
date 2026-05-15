npm init --y

npm i -D typescript

npx tsc --init

    "rootDir": "./src",
    "outDir": "./dist",

    // Environment Settings
    // See also https://aka.ms/tsconfig/module
    "module": "esnext",
    "target": "esnext",
    "types": ["node"],








npm i express
npm i --save-dev @types/express





npm i -D tsx

  "scripts": {
    "dev": "tsx watch ./src/server.ts",
    "test": "echo \"Error: no test specified\" && exit 1"
  },

  "type": "module",





npm run dev