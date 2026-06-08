# WWM PeerJS-Broker

Ein eigener, kleiner **PeerJS-Signalisierungs-Server** für *Wer wird Millionär – Live*.

## Warum?

Bisher hängt das Spiel am **öffentlichen Gratis-Broker `0.peerjs.com`**. Der ist von
aller Welt geteilt und **drosselt pro IP** (Antwort `HTTP 429 – Too Many Requests`).
In einer Klasse hängen ~25 Geräte hinter **einer einzigen Schul-IP** → das Limit reißt →
alle fliegen mit *„Lost connection to server"* raus. Mal geht's, mal nicht.

Dieser eigene Broker hat **kein fremdes Rate-Limit**. Du bestimmst die Grenzen,
und eine ganze Klasse an einer IP ist kein Problem mehr.

## Deployment auf Render.com (gratis, ohne Kreditkarte)

1. Gehe auf **https://render.com** und melde dich an (z. B. mit deinem GitHub-Konto).
2. Klicke **New +** → **Web Service**.
3. Wähle **Build and deploy from a Git repository** → verbinde dieses Repo
   (`wwm-peer-broker`).
4. Render erkennt Node automatisch. Prüfe nur:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type / Plan:** **Free**
5. **Create Web Service** klicken und warten, bis oben **„Live"** steht.
6. Kopiere die URL oben, z. B. `https://wwm-peer-broker.onrender.com`.
7. **Schicke mir genau diese URL** – dann stelle ich `host.html` und `player.html`
   auf deinen Broker um.

### Test, ob er läuft
Öffne die URL im Browser. Es erscheint eine kleine JSON-Antwort des PeerJS-Servers
(„name: PeerJS Server" o. ä.). Das heißt: Broker ist online. ✅

## ⚠️ Wichtig: Der Gratis-Tarif „schläft ein"

Render fährt einen Free-Service nach **15 Minuten ohne Zugriff** herunter. Der erste
Aufruf danach dauert dann **~30–50 Sekunden** (Kaltstart). Solange im Unterricht
ständig etwas läuft, bleibt er wach.

**Tipp für den Schulbetrieb:** Öffne die Broker-URL **1–2 Minuten vor der Stunde**
einmal im Browser, damit er aufgeweckt ist, bevor die Klasse beitritt.
(Optional dauerhaft wach halten: kostenloser Dienst wie UptimeRobot, der die URL
alle 10 Minuten anpingt.)

## Was danach im Spiel geändert wird

In `host.html` und `player.html` wird aus

```js
peer = new Peer(null, { debug: 2, config: { iceServers } });
```

dann

```js
peer = new Peer(null, {
  host: 'DEINE-URL.onrender.com',   // ohne https:// und ohne /
  port: 443,
  path: '/',
  secure: true,
  debug: 2,
  config: { iceServers }
});
```

Die TURN-Server (Metered) bleiben unverändert – nur die **Signalisierung** wandert
vom überlasteten Gratis-Broker auf deinen eigenen Server.
