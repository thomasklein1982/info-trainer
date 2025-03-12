import initSqlJs from 'sql.js';

let SQLite=await initSqlJs({
  locateFile: (file) => `https://sql.js.org/dist/${file}`,
});

const SQL = new SQLite.Database();
export default SQL;