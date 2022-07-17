const electron = require("electron");
const path = require("path");
const { app, BrowserWindow, Tray, application } = electron;
const isDev = require("electron-is-dev");

// Let Electron reload itself when Webpack watches changes
isDev && require("electron-reload")(__dirname);

// Allows app to avoid garbage collection
global.mainWindow;

let FORCE_QUIT = false;

function createAppInstance() {
  // Define window properties
  global.mainWindow = new BrowserWindow({
    width: 345,
    height: 600,
    title: "spaceship",
    titleBarStyle: "hiddenInset",
    backgroundColor: "#F4F1DE",
    icon: path.join(__dirname, "app/src/assets/icons/png/64x64.png"),
    show: false,
    // resizable: false,
    // minHeight: 800,
    // minWidth: 500,
    // maxHeight: 801,
    // maxWidth: 501,
    skipTaskbar: true,
  });

  // Load window contents
  global.mainWindow.loadURL(`file://${__dirname}/app/index.html`);

  global.mainWindow.on("minimize", function (event) {
    event.preventDefault();
    mainWindow.hide();
  });

  global.mainWindow.on("close", function (event) {
    if (!FORCE_QUIT) {
      event.preventDefault();
      mainWindow.hide();
    }
  });

  // Show window when ready
  console.log(__dirname);
  global.mainWindow.once("ready-to-show", () => {
    global.tray = new Tray(path.join(__dirname, "assets/icons/png/16x16.png"));
    global.tray.on("click", () => {
      global.mainWindow.isVisible()
        ? global.mainWindow.hide()
        : global.mainWindow.show();
    });
    global.tray.on("right-click", () => {
      FORCE_QUIT = true;
      app.quit();
    });
    global.mainWindow.show();
  });

  // Dereference the window object on close
  global.mainWindow.on("closed", function () {
    global.mainWindow = null;
  });
}

// Creates a new window when activated with no other windows open (Mac)
app.on("activate", () => {
  if (global.mainWindow === null) {
    createAppInstance();
  }
});

app.on("ready", createAppInstance);

// app.dock.hide();
