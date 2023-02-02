// Appelée au chargement de la page
function startConnect() {
  // Initialise une nouvelle connexion de client Paho
  clientID = "clientID-" + parseInt(Math.random() * 100);

  // Initialise une nouvelle connexion de client Paho
  client = new Paho.MQTT.Client("test.mosquitto.org", 8080, clientID);

  // Définit les gestionnaires de rappel
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;

  // Connecte le client, si réussi, appeler la fonction onConnect
  client.connect({
    onSuccess: onConnect,
  });
}

// Appelée lorsque le client se connecte
function onConnect() {
  // S'abonne au sujet demandé
  console.log("connected");
  client.subscribe("Luminosite1998");
}

// Appelée lorsque le client perd sa connexion
function onConnectionLost(responseObject) {
  document.getElementById("lightsensor").innerHTML = "ERROR: Connection lost";
  if (responseObject.errorCode !== 0) {
    document.getElementById("lightsensor").innerHTML =
      "ERROR: " + +responseObject.errorMessage;
  }
}

// Appelée lorsqu'un message arrive
function onMessageArrived(message) {
  const luminometer = document.querySelector("#lightsensor");
  const brightnessLevel = document.querySelector("#brightness-level");
  let brightness = message.payloadString;
  console.log(message);
  brightnessLevel.innerHTML = brightness + "lx";
  luminometer.style.scale = `${brightness / 100}`;
}
