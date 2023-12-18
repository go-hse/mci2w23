Verbindung zw. VS Code und Oculus Quest:

1. in VS Code Server-Port auf 8080 setzen

    "liveServer.settings.port": 8080,
    "liveServer.settings.https": {
        "enable": false,
        "cert": "C:\\Users\\adr\\Downloads\\certs\\MCI2.crt",
        "key": "C:\\Users\\adr\\Downloads\\certs\\MCI2.key",
        "passphrase": ""
    },

Live-Server startet, öffnet mit Port 8080.
HTTPS ausschalten. Quest akzeptiert Verbindung zu localhost ohne HTTPS.

2. ADB (Android Developer Bridge) installieren, 
z.B. mit scrcpy https://github.com/Genymobile/scrcpy
* scrcpy entpacken, open_a_terminal_here.bat ausführen

* Quest mit PC per USB verbinden!
* Quest im Entwicklermodus


* im Terminal (ohne Hash)
# adb start-server
# adb devices

* im Terminal, wenn 1 Gerät angezeigt wird. Verbindet VS-Code-Web-Server auf Port 8080 s.o. mit Quest:

## adb reverse REMOTE LOCAL
## REMOTE: Quest; LOCAL: PC

# adb reverse tcp:3000 tcp:8080


3. im Quest-Browser:

http://localhost:3000/

laden.



