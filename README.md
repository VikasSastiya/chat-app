<div align="center">
  <img src="https://res.cloudinary.com/dnvl8mqba/image/upload/v1747900058/Chat%20app%C2%A0/logo1_xfymts.png" alt="Chat App" width="50"/>
  
  # Chat App
  # Modern Chat Application
  
  <p>A real-time messaging platform for seamless communication</p>
  <p>Made with ❤️ by Shilesh</p>
  
  ![License](https://img.shields.io/badge/license-MIT-blue)
  ![Status](https://img.shields.io/badge/status-active-brightgreen)
  
</div>

## 👥 Contributors

<a href="https://github.com/AshutoshDM1">
  <img src="https://github.com/AshutoshDM1.png" width="50px" alt="Ashutosh" style="border-radius:50%" />
</a>
<a href="https://github.com/shilesh-rk">
  <img src="https://github.com/ShaileshIshere.png" width="50px" alt="Shilesh" style="border-radius:50%" />
</a>

![Alt](https://repobeats.axiom.co/api/embed/db0943b5106580e55dedcadc7210edb1483b0f4d.svg "Repobeats analytics image")

## ✨ Overview

A modern real-time chat application that enables seamless communication through an intuitive and responsive interface. Built with the latest web technologies to provide a smooth and engaging messaging experience.

## 🚀 Features

- **Real-time Messaging**: Instant message delivery and updates
- **User Authentication**: Secure login and registration system
- **Responsive Design**: Works seamlessly across all devices
- **User Profiles**: Customizable user profiles and avatars
- **Message History**: Access to chat history and search functionality
- **Online Status**: Real-time user presence indicators
- **File Sharing**: Support for sharing images and files
- **Emoji Support**: Rich emoji picker for expressive communication

## 🛠️ Tech Stack

### Frontend

- ![Next.js](https://img.shields.io/badge/-Next.js-000000?style=flat-square&logo=next.js&logoColor=white) **Next.js**: React framework for server-side rendering
- ![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black) **React**: UI component library
- ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) **TypeScript**: Type-safe JavaScript
- ![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) **Tailwind CSS**: Utility-first CSS framework
- ![Socket.io](https://img.shields.io/badge/-Socket.io-010101?style=flat-square&logo=socket.io&logoColor=white) **Socket.io**: Real-time bidirectional communication

### Backend

- ![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white) **Node.js**: Runtime environment
- ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white) **PostgreSQL**: Database for message and user data storage
- ![Prisma](https://img.shields.io/badge/-Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white) **Prisma**: Modern database ORM
- ![Redis](https://img.shields.io/badge/-Redis-DC382D?style=flat-square&logo=redis&logoColor=white) **Redis**: In-memory data store for real-time features

Screenshot:
![Screenshot](https://res.cloudinary.com/dnvl8mqba/image/upload/v1747900071/Chat%20app%C2%A0/image1_bfwzxm.png)
![Screenshot](https://res.cloudinary.com/dnvl8mqba/image/upload/v1747900070/Chat%20app%C2%A0/image2_flt7ju.png)
![Screenshot](https://res.cloudinary.com/dnvl8mqba/image/upload/v1747900069/Chat%20app%C2%A0/image3_k0scfh.png)
![Screenshot](https://res.cloudinary.com/dnvl8mqba/image/upload/v1747900844/Chat%20app%C2%A0/38807952-45c1-4434-b039-6ecc7cca41c5.png)

## 🔧 Getting Started

### Prerequisites

- Node.js (v16+)
- PostgreSQL
- Git

## 📝 License

This project is licensed under the MIT License



### prisma/schema.prisma
id String @id @default(cuid())

## This means:

id is of type String

It is the primary key (@id)

Its value is automatically generated using cuid() when a new user is created