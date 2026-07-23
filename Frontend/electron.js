import { app, BrowserWindow } from "electron";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let backend;

function createWindow() {

    backend = spawn(
        "node",
        [path.join(__dirname, "../Backend/server.js")],
        {
            cwd: path.join(__dirname, "../Backend"),
            shell: true
        }
    );

    backend.stdout.on("data", data => {
        console.log(data.toString());
    });

    backend.stderr.on("data", data => {
        console.error(data.toString());
    });

    setTimeout(() => {

        const win = new BrowserWindow({

            width: 1400,
            height: 900,
            autoHideMenuBar: true,

            webPreferences: {

                contextIsolation: true

            }

        });

        win.loadFile(path.join(__dirname, "dist/index.html"));

    }, 3000);

}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {

    if (backend) {

        backend.kill();

    }

    app.quit();

});