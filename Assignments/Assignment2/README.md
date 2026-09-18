# Exploring JSONB in PostgreSQL as an Alternative to MongoDB

## Aim

To study the use of `JSONB` in PostgreSQL and understand how PostgreSQL can support both traditional SQL-based relational data and flexible NoSQL-style document data.

## Introduction

PostgreSQL is mainly a relational database management system where data is stored in the form of tables, rows, and columns. However, PostgreSQL also provides a data type called `JSONB`.

`JSONB` allows us to store JSON-like data inside a PostgreSQL table. Because of this, PostgreSQL can handle both structured relational data and flexible document-style data similar to MongoDB.

Therefore, PostgreSQL can be used as a hybrid database for many applications.

## What is JSONB?

`JSONB` stands for JSON Binary.

It allows PostgreSQL to store JSON data in an optimized binary format. Unlike normal table columns, JSONB data does not always need to follow the same structure.

For example:

```json
{
  "name": "Anjali",
  "branch": "CSE",
  "skills": ["Java", "Python"]
}
```

Another record can have different fields:

```json
{
  "name": "Rahul",
  "branch": "ECE",
  "phone": "9876543210"
}
```

Both records can be stored inside the same JSONB column.

## Creating a Table Using JSONB

A PostgreSQL table can be created as:

```sql
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    data JSONB
);
```

Here, `id` is a normal relational column while `data` stores flexible JSON information.

## Inserting JSONB Data

```sql
INSERT INTO students (data)
VALUES (
    '{
        "name": "Anjali",
        "branch": "CSE",
        "age": 21,
        "skills": ["Java", "Python", "SQL"]
    }'
);
```

Another record can contain different fields:

```sql
INSERT INTO students (data)
VALUES (
    '{
        "name": "Rahul",
        "branch": "ECE",
        "phone": "9876543210"
    }'
);
```

This is similar to MongoDB because every record does not need to contain exactly the same fields.

## Retrieving Data from JSONB

We can access values stored inside JSONB using PostgreSQL operators.

For example:

```sql
SELECT data->>'name'
FROM students;
```

The `->>` operator returns the value as text.

To find all students belonging to the CSE branch:

```sql
SELECT *
FROM students
WHERE data->>'branch' = 'CSE';
```

## Working with Nested JSON

JSONB can also store nested objects.

Example:

```json
{
  "name": "Kunal",
  "internship": {
    "company": "Google",
    "duration": "2 months"
  }
}
```

The company can be retrieved using:

```sql
SELECT data->'internship'->>'company'
FROM students;
```

## Working with Arrays

JSONB can also store arrays.

Example:

```json
{
  "name": "Anjali",
  "skills": ["Java", "Python", "SQL"]
}
```

To find records containing Java:

```sql
SELECT *
FROM students
WHERE data @> '{"skills":["Java"]}';
```

Here, `@>` checks whether one JSON value contains another JSON value.

## Using SQL and JSONB Together

The main advantage of PostgreSQL is that we do not have to store everything as JSON.

For example:

```sql
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    sap_id VARCHAR(20) UNIQUE,
    name VARCHAR(100),
    branch VARCHAR(50),
    extra_details JSONB
);
```

The important and fixed information can be stored using normal SQL columns:

* SAP ID
* Name
* Branch

Flexible information can be stored using JSONB:

```json
{
  "skills": ["Java", "Python"],
  "github": "student123",
  "certifications": ["AWS"]
}
```

Therefore, PostgreSQL allows relational and document-style data to exist together.

## JSONB Indexing

PostgreSQL also allows indexing JSONB data.

For example:

```sql
CREATE INDEX student_data_index
ON students
USING GIN (data);
```

A GIN index can improve the speed of searching inside JSONB data, especially when the database contains many records.

## PostgreSQL JSONB vs MongoDB

| Feature            | PostgreSQL with JSONB   | MongoDB                                  |
| ------------------ | ----------------------- | ---------------------------------------- |
| Data Storage       | Tables + JSON documents | Collections + Documents                  |
| SQL Support        | Yes                     | No traditional SQL                       |
| Flexible Schema    | Yes using JSONB         | Yes                                      |
| Relationships      | Strong support          | Possible using references                |
| JOIN Operations    | Yes                     | Limited compared to relational databases |
| Foreign Keys       | Yes                     | No traditional foreign keys              |
| Nested Objects     | Yes                     | Yes                                      |
| Arrays             | Yes                     | Yes                                      |
| Indexing JSON Data | Yes                     | Yes                                      |
| Transactions       | Yes                     | Yes                                      |

## How PostgreSQL Works as Both SQL and NoSQL

PostgreSQL is still mainly a relational SQL database.

However, JSONB gives it many features normally associated with NoSQL document databases.

It can be represented as:

```text
PostgreSQL
     |
     |-------------------------
     |                       |
Relational Data          JSONB Data
     |                       |
Tables                  JSON Objects
Rows                    Arrays
Columns                 Nested Data
Foreign Keys            Flexible Fields
JOINs                    Document-style Data
```

For example, in an e-commerce application, fixed product information can be stored using SQL columns:

```text
product_id
name
price
category
```

Product-specific information can be stored inside JSONB.

For a laptop:

```json
{
  "processor": "Intel i7",
  "ram": "16GB",
  "storage": "1TB"
}
```

For a T-shirt:

```json
{
  "size": "M",
  "color": "Black",
  "material": "Cotton"
}
```

This avoids creating unnecessary columns for every possible product type.

## Can PostgreSQL Replace MongoDB?

PostgreSQL with JSONB can replace MongoDB in many applications where both relational data and flexible JSON data are required.

For example, applications involving:

* Users
* Students
* Products
* Orders
* Courses
* Employee information

can use normal PostgreSQL tables for structured data and JSONB for flexible data.

However, MongoDB may still be more suitable when the complete application is heavily based on document-style data with frequently changing structures.

## Advantages of Using JSONB

The main advantages are:

* Allows flexible data structures.
* Supports nested JSON objects.
* Supports arrays.
* Can be queried using SQL.
* Supports indexing.
* Can be combined with normal relational columns.
* Reduces the need for maintaining separate SQL and NoSQL databases.
* Provides PostgreSQL features such as joins, constraints, foreign keys, and transactions.

## Conclusion

PostgreSQL is primarily an SQL relational database, but its `JSONB` data type allows it to provide many NoSQL-style features.

Using JSONB, developers can store flexible JSON documents while still using traditional PostgreSQL features such as tables, relationships, joins, constraints, and SQL queries.

Therefore, PostgreSQL can be used as a hybrid solution where:

**Structured data → Normal PostgreSQL columns**

**Flexible or semi-structured data → JSONB**

This makes PostgreSQL suitable for applications where both relational and document-based data are required.
