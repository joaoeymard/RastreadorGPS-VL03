function hexToAscii(hex) {
  let str = "";
  for (let i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return str;
}

function hexToBin(hex) {
  // Remove qualquer prefixo '0x' se existir
  hex = hex.replace(/^0x/, "");

  // Converte cada dígito hexadecimal para seu equivalente binário
  return hex
    .split("")
    .map(function (hexDigit) {
      return parseInt(hexDigit, 16).toString(2).padStart(4, "0");
    })
    .join("");
}

function reverseString(str) {
  return str.split("").reverse().join("");
}

function findProtocolNumber(protocolID) {
  return protocolos.find(
    (protocolo) => protocolo.protocoloID === `0x${protocolID}`
  );
}

function parsePacket(pct) {
  const startBit = pct.slice(0, 4);
  let packetLength,
    protocolNumber,
    informationContent,
    informationSN,
    crc,
    stopBit;

  if (startBit === "7878") {
    packetLength = parseInt(pct.slice(4, 6), 16);
    protocolNumber = pct.slice(6, 8);
    informationContent = pct.slice(8, pct.length - 12);
    informationSN = parseInt(pct.slice(-12, -8), 16);
    crc = pct.slice(-8, -4);
    stopBit = pct.slice(-4);
  } else if (startBit === "7979") {
    packetLength = parseInt(pct.slice(4, 8), 16);
    protocolNumber = pct.slice(8, 10);
    informationContent = pct.slice(10, pct.length - 12);
    informationSN = parseInt(pct.slice(-12, -8), 16);
    crc = pct.slice(-8, -4);
    stopBit = pct.slice(-4);
  } else {
    alert("Formato de pacote não suportado.");
    return;
  }

  return {
    startBit: startBit,
    packetLength: packetLength,
    protocol: findProtocolNumber(protocolNumber) || {
      protocoloID: `0x${protocolNumber}`,
    },
    informationContent: informationContent,
    informationSN: informationSN,
    crc: crc,
    stopBit: stopBit,
  };
}

function decodeProtocol0x01(informationContent) {
  const terminalID = informationContent.slice(0, 16); // ID do terminal, 8 bytes (16 caracteres hexadecimais)
  const typeIdentityCode = informationContent.slice(16, 20); // Código de identidade do tipo de terminal, 2 bytes (4 caracteres hexadecimais)
  const timeZoneOffset = "0" + informationContent.slice(20, 23); // Informações de fuso horário, 2 bytes (3 caracteres hexadecimais)
  const parseTimeZoneOffset = ("0" + parseInt(timeZoneOffset, 16)).slice(-4); // Offset do fuso horário, 4 dígitos decimais
  const timeZoneLanguage = informationContent.slice(23, 24); // Informações de GMT e idioma, 1 byte (2 caracteres hexadecimais)

  const westernTime = hexToBin(timeZoneLanguage)[0] === "1";

  let timeZone = westernTime ? "GMT-" : "GMT+";
  timeZone += `${parseTimeZoneOffset.slice(0, 2)}:${parseTimeZoneOffset.slice(
    2
  )}`;

  const flLanguageChinese = hexToBin(timeZoneLanguage)[3];
  const flLanguageEnglish = hexToBin(timeZoneLanguage)[4];
  let language;

  if (flLanguageChinese === "1") {
    language = "Chinese";
  } else if (flLanguageEnglish === "1") {
    language = "English";
  } else {
    language = "Undefined";
  }

  return {
    payload: informationContent,
    terminalID: terminalID,
    typeIdentityCode: typeIdentityCode,
    timeZone,
    language,
  };
}

function decodeProtocol13(informationContent) {
  return {
    terminalInfo: informationContent.slice(0, 2),
    voltageLevel: parseInt(informationContent.slice(2, 4), 16),
    gsmSignalStrength: parseInt(informationContent.slice(4, 6), 16),
    languagePortStatus: informationContent.slice(6, 10),
  };
}

function decodeProtocol22(informationContent) {
  return {
    dateTime: informationContent.slice(0, 12),
    quantitySatellites: parseInt(informationContent.slice(12, 14), 16),
    latitude: (
      parseInt(informationContent.slice(14, 22), 16) / 1800000
    ).toFixed(6),
    longitude: (
      parseInt(informationContent.slice(22, 30), 16) / 1800000
    ).toFixed(6),
    speed: parseInt(informationContent.slice(30, 32), 16),
    courseStatus: informationContent.slice(32, 36),
    mcc: informationContent.slice(36, 40),
    mnc: informationContent.slice(40, 42),
    lac: informationContent.slice(42, 46),
    cellID: informationContent.slice(46, 52),
    acc: parseInt(informationContent.slice(52, 54), 16) === 1,
    dataUploadMode: informationContent.slice(54, 56),
    mileage: parseInt(informationContent.slice(56, 64), 16),
  };
}

function decodeProtocol94(informationContent) {
  const fields = hexToAscii(informationContent).split(";");
  const infoObj = {};

  fields.forEach((field) => {
    const [key, value] = field.split("=");
    if (key && value) {
      infoObj[key.trim()] = value.trim();
    }
  });

  return infoObj;
}

function formatPacote(pct) {
  pct = pct.trim().toUpperCase();
  const packet = parsePacket(pct);

  let infoObj = {};
  switch (packet.protocol.protocoloID) {
    case "0x01": // Login Packet
      infoObj = decodeProtocol0x01(packet.informationContent);
      break;
    case "0x13": // Heartbeat Packet
      infoObj = decodeProtocol13(packet.informationContent);
      break;
    case "0x22": // GPS Location Packet
      infoObj = decodeProtocol22(packet.informationContent);
      break;
    case "0x94": // Information Transfer Packet
      infoObj = decodeProtocol94(packet.informationContent);
      break;
    default:
      infoObj = packet.informationContent;
  }

  return {
    ...packet,
    informationContent: infoObj,
    payload: pct,
  };
}

function processarPacote() {
  const pacote = document.getElementById("inputPacote").value.trim();
  if (!pacote) {
    alert("Por favor, insira um pacote hexadecimal válido.");
    return;
  }

  const objeto = pacote.split(",").map(formatPacote);

  document.getElementById("outputTexto").value = JSON.stringify(
    objeto,
    null,
    4
  );
}
