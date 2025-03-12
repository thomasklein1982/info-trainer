import initSqlJs from 'sql.js';
import workletURL from "sql.js/dist/sql-wasm.wasm?url";


let SQLite=await initSqlJs({
  locateFile: (file) => workletURL,
});

const SQL = new SQLite.Database();
export default SQL;