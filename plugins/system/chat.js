/**
 * Welcome to this plugin, in this plugin we will register our own events for SocketIO.
 *
 * What we will be doing here is creating the events for a chat application.
 * The messages send from one user to the other will be recorded in the database.
 */
function ChatPlugin() {

}

/**
 * We call the onAfterStart method to be sure that the socketio server has been started.
 */
ChatPlugin.prototype.onAfterStart = function() {
    if(!Socket.io) {
        return false;
    }

    var rooms = Socket.io.sockets.adapter.rooms;

    Socket.addListener('join', function(group, user_id) {
        // The this object is the socket.
        this.join(group);

        // Save the group and the user combination.
        ObjectManager.get('com://demo/chat.database.row.group')
            .then(function (row) {
                return row.setData({
                    group: group,
                    user_id: user_id
                });
            })
            .then(function(row) {
                row.save();
            });
    });

    Socket.addListener('message', function(group, message) {
        Socket.io.to(group).emit('message', message);
    });
};

module.exports = ChatPlugin;