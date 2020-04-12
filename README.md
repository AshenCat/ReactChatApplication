# General Specifications

## Project Members

- Klifford Agujar 101145584
- Kevin Hy 101078240
- Igor Teixeira Belem 100907699

## Admin Credentials

admin/admin

## Frontend

- [ ] Base frontend chat app W/ Socket.io
- [x] React-Material for UI
- [ ] Guest
  - [x] Chat Screen
  - [ ] Admin Login Screen [JWT, or PASSPORT.JS]
- [ ] Admin
  - [x] Event History : Event Type(CONNECTED, JOINED, ERROR), Date, Time, User, EventID, PPID
  - [x] Chat History(Pagination, Sorting, Filter) : MessageID, Date, Time, MessageSender, MessageReceiver, Message, Room
  - [x] Rooms(Pagination, Sorting, Filter) : RoomID, Room Name, Created Date, Edit Date, Status, Add New Room
  - [ ] Add/Edit Room Screen(Basic validation, no nameless room) : RoomName, Status(Active, Inactive)

## Backend

- [ ] Base backend
  - [ ] Socket.io
  - [x] Database API
- [x] Database - MongoDB Remote
- [x] Admin User table
- [x] Event History : Event Type(CONNECTED, JOINED, ERROR), Date, Time, User, EventID, PPID
- [x] Chat History : MessageID, Date, Time, Sender, Receiver, Message, Room
- [x] Rooms : RoomID, Room Name, Created Date, Edit Date, Status

## API targets

`htttp://localhost:${port}/api/events`
`htttp://localhost:${port}/api/chatlog`
`htttp://localhost:${port}/api/rooms`

## Technologies

React Notification System by Igor Prado https://github.com/igorprado/react-notification-system
Moment.js
Material Design for Bootstrap
React Bootstrap
