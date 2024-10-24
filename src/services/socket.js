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
    if (!io) {
        console.warn('Socket.IO failed');
        return;
    }

    if (!task.assignees || task.assignees.length === 0) {
        console.warn('No users found');
        return;
    }

    task.assignees.forEach(assigneeId => {
        io.to(`user:${assigneeId}`).emit(event, task);
        console.log(`Emitted event ${event} to user:${assigneeId}`);
    });
};