socket => {
    socket.on("join", (data) => {
        const { name, room } = data
        const { user, error } = addUser({ id: socket.id, name, room })

        if (error) return

        socket.emit("message", {
            user: "admin",
            text: `${user.name}, it's great to see you in here.`
        })
        socket.broadcast.to(user.room).emit("message", {
            user: "admin",
            text: `${user.name} has just landed to the room.`
        })
        socket.join(user.room)
        io.to(user.room).emit("room-data", {
            room: user.room,
            users: getAllUsers(user.room),
        })
    })
}