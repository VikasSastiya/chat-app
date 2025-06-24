## id String @id @default(cuid())

### This means:

id is of type String

It is the primary key (@id)

Its value is automatically generated using cuid() when a new user is created


## emailVerified DateTime? @map("email_verified")

### @map() tells Prisma:

> “In the database, this field has a different name

### 📦 Bonus: Works for enums, models, and fields

You can also use @@map to rename entire models or table names!

model User {
  id String @id
  @@map("users") // Table is called "users", but model is "User"
}