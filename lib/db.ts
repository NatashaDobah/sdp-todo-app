import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Create the database file : must persist when restarted 
const dbPath = path.join(process.cwd(), 'todo.db');
const db = new Database(dbPath);

// Enable foreign key support
db.pragma('foreign_keys = ON');

// Run the schema
const schemaPath = path.join(process.cwd(), 'db/schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf-8');
db.exec(schema);

export default db;