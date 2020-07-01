## React-Chat

A chat application created from scratch with typescript, react, redux and socketio.

A live version of the project can be found at https://chat.friz.xyz/

### How does it work
The app relies on a redux store for holding all the state. When a user first enters is assigned with a random username and connects to the websocket server. 

Afterwards when a user sends a message every other user gets notified and the message is being added to the conversation.

A user has the option to change the interface color, clock display, how messages are being sent and to select one from two languages (English, Greek).

### Features
- [x] Responsive design 
- [x] Supports portrait and landscape orientation
- [x] Supports multiple themes 
- [x] Supports multiple languages 
- [x] Saves settings on local storage
- [x] Syncs settings between tabs
- [x] Supports reset to default settings
- [x] Supports emojis
- [x] Parses URLs
- [x] Embeds Youtube videos 
- [x] Embeds images
- [x] Blinks the document title on unread messages
- [x] Unread messages counter
-  Notification sound on new message
-  Online users counter

### Tech Features
- [x] React
- [x] Typescript
- [x] Redux
- [x] Socket.io
- [x] No external component or css library
- [x] Custom boilerplate
- [x] Custom webpack configuration
- [x] Last version of major all browsers is supported
- [x] CSS Modules
- [x] SCSS
- [x] Jest

### Quick start
```npm start```

This command will create a production ready frontend app and will start the websocket server that also serves the frontend code.

### Development
```npm run serve```

This command will create a development server with hot-reload for the frontend app and also will start the websocket server

### Build
```npm run build```

This command will output a production ready frontend code at the `build` directory.
