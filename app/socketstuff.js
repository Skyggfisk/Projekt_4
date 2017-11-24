"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Socketio {
    socketio(io) {
        io.on("connection", socket => {
            socket.on("enter conversation", conversation => {
                socket.join(conversation);
            });
            socket.on("leave conversation", conversation => {
                socket.leave(conversation);
            });
            socket.on("new message", conversation => {
                io.sockets.in(conversation).emit("refresh messages", conversation);
            });
            socket.on("disconnect", () => {
            });
        });
    }
}
exports.Socketio = Socketio;
//# sourceMappingURL=socketstuff.js.map