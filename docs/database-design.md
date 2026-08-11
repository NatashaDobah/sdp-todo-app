# Database Design

## Schema

## Relationships

This schema consists of a single `tasks` table with no foreign key relationships. Task categorization (`topic`) is stored as a free-text column rather than a normalized reference table, and status is constrained via a CHECK constraint rather than a separate lookup table — appropriate given the small, single-user scope of this app.

### tasks Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INTEGER | PRIMARY KEY, AUTOINCREMENT | Unique task identifier |
| title | TEXT | NOT NULL | Task title |
| description | TEXT | - | Optional task details |
| due_date | TEXT | NOT NULL | Due date in YYYY-MM-DD format |
| topic | TEXT | NOT NULL | Category/topic for sorting |
| status | TEXT | CHECK(status IN ('Todo', 'In-Progress', 'Complete')) | Current status |
| archived | BOOLEAN | DEFAULT 0 | 0=active, 1=archived |
| created_at | TEXT | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TEXT | DEFAULT CURRENT_TIMESTAMP | Last update timestamp |

## Indexes

```sql
CREATE INDEX idx_status ON tasks(status);
CREATE INDEX idx_due_date ON tasks(due_date);
CREATE INDEX idx_archived ON tasks(archived);