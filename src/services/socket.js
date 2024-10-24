let io;

export const socketIOSetup = (socketIO) => {
    io = socketIO;

    io.on('connection', (socket) => {
        socket.on('join', (userId) => {
            if (userId) {
                socket.join(`user:${userId}`);
                console.log(`User ${userId} joined their room`);
            } else {
                console.error('Invalid userId provided for joining');
            }
        });

        socket.on('disconnect', () => {
            console.log(`User ${socket.id} disconnected`);
        });
    });
};

export const emitTaskUpdate = (event, task) => {
    if (!io) return;

    task.assignees.forEach(assigneeId => {
        io.to(`user:${assigneeId}`).emit(event, task);
    });
};
