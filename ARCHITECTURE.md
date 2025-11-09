Data Flow:

User draws → client captures stroke data (x, y, color, width).

Client sends this data to the server via WebSocket.

Server broadcasts it to all connected clients.

Clients render received strokes on their canvases.

This creates a seamless shared drawing experience across users.

WebSocket Protocol:

Communication happens through Socket.IO events:

draw → sends stroke data

undo, redo, clear → manage canvas state

connect, disconnect → handle user sessions

All messages are small JSON objects for fast transmission.

Undo/Redo Strategy:

Each drawing action is stored in a stack.

Undo: Removes the last action from the stack.

Redo: Restores the most recent undone action.
The server ensures all clients stay synchronized.

Performance Decisions:

Used WebSockets for real-time bi-directional updates.

Sent only incremental stroke data (not full canvas).

Throttled draw events to reduce bandwidth.

Rendering handled client-side for low server load.

Conflict Resolution:

Server timestamps each drawing event and rebroadcasts them in order.
This ensures all users see the same final result, even if they draw simultaneously.

