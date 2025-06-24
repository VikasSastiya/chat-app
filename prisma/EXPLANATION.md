## id String @id @default(cuid())

### This means:

id is of type String

It is the primary key (@id)

Its value is automatically generated using cuid() when a new user is created


### Why @default is used?

It tells Prisma:
"If user doesn't give a value for id, generate one automatically using cuid()."

So you don't have to manually assign ids.



## emailVerified DateTime? @map("email_verified")

### @map() tells Prisma:

> “In the database, this field has a different name

### 📦 Bonus: Works for enums, models, and fields

You can also use @@map to rename entire models or table names!

model User {
  id String @id
  @@map("users") // Table is called "users", but model is "User"
}


### Why use DateTime?

Because it helps you know when the email was verified. For example:

You want to show: "Email verified on June 24, 2025".

Or you want to allow access only if email was verified within 24 hours.

Or track verification history.