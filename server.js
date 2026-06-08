// WWM PeerJS-Broker - eigener Signalisierungs-Server
// Ersetzt den ueberlasteten oeffentlichen Broker 0.peerjs.com (Rate-Limit 429).
// Laeuft z. B. gratis auf Render.com.

const { PeerServer } = require('peer');

const port = Number(process.env.PORT) || 9000;

PeerServer({
  port: port,
  path: '/',
  proxied: true,            // hinter dem Render-Proxy: X-Forwarded-* vertrauen
  allow_discovery: false,   // keine Peer-Liste nach aussen
  alive_timeout: 60000,     // grosszuegiger, damit Schul-WLAN nicht zu frueh kappt
  expire_timeout: 60000
});

console.log('WWM PeerJS-Broker laeuft auf Port ' + port);
