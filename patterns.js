const protocolos = [
  {
    protocoloID: "0x01",
    protocoloName: "Login Packet",
    protocoloNameBr: "Pacote de Login",
    description:
      "Utilizado para estabelecer uma conexão entre o terminal e o servidor, contendo informações de identificação do terminal.",
  },
  {
    protocoloID: "0x13",
    protocoloName: "Heartbeat Packet",
    protocoloNameBr: "Pacote de Batimento",
    description:
      "Mantém a conectividade do link GPRS, indicando que o terminal está ativo e conectado.",
  },
  {
    protocoloID: "0x21",
    protocoloName: "Response to Online Command by Terminal",
    protocoloNameBr: "Resposta a Comando Online pelo Terminal",
    description:
      "Resposta do terminal a um comando online enviado pelo servidor.",
  },
  {
    protocoloID: "0x22",
    protocoloName: "GPS location packet (UTC)",
    protocoloNameBr: "Pacote de Localização GPS (UTC)",
    description:
      "Transmite dados de localização GPS do terminal, incluindo coordenadas, velocidade e direção.",
  },
  {
    protocoloID: "0x26",
    protocoloName: "Alarm Data (UTC)",
    protocoloNameBr: "Dados de Alarme (UTC)",
    description:
      "Transmite dados de alarme do terminal, incluindo informações sobre eventos de alarme ocorridos.",
  },
  {
    protocoloID: "0x28",
    protocoloName: "LBS Multi-base Extended Information Packet",
    protocoloNameBr: "Pacote de Informação Estendida Multi-base LBS",
    description:
      "Transmite dados de localização baseados em LBS (Localização por Estação Base) com informações estendidas.",
  },
  {
    protocoloID: "0x2A",
    protocoloName: "GPS Address Request Packet (UTC)",
    protocoloNameBr: "Pacote de Solicitação de Endereço GPS (UTC)",
    description:
      "Solicitação de endereço GPS do terminal com base na localização atual.",
  },
  {
    protocoloID: "0x80",
    protocoloName: "Online Command",
    protocoloNameBr: "Comando Online",
    description:
      "Comando enviado pelo servidor ao terminal enquanto está online.",
  },
  {
    protocoloID: "0x8A",
    protocoloName: "Time Calibration Packet",
    protocoloNameBr: "Pacote de Calibração de Tempo",
    description:
      "Pacote usado para sincronizar o tempo do terminal com o servidor.",
  },
  {
    protocoloID: "0x94",
    protocoloName: "Information Transfer Packet",
    protocoloNameBr: "Pacote de Transferência de Informação",
    description:
      "Transfere vários tipos de informações não relacionadas à localização GPS do terminal.",
  },
  {
    protocoloID: "0x17",
    protocoloName: "Chinese Address Packet",
    protocoloNameBr: "Pacote de Endereço Chinês",
    description:
      "Transmite o endereço em caracteres chineses com base na localização do terminal.",
  },
  {
    protocoloID: "0x97",
    protocoloName: "English Address Packet",
    protocoloNameBr: "Pacote de Endereço em Inglês",
    description:
      "Transmite o endereço em caracteres ingleses com base na localização do terminal.",
  },
  {
    protocoloID: "0xA0",
    protocoloName: "GPS Location Packet (UTC, 4G Base Station Data)",
    protocoloNameBr:
      "Pacote de Localização GPS (UTC, Dados de Estação Base 4G)",
    description:
      "Transmite dados de localização GPS do terminal, incluindo informações de estação base 4G.",
  },
  {
    protocoloID: "0xA1",
    protocoloName: "LBS Multi-base Extended Information Packet (4G)",
    protocoloNameBr: "Pacote de Informação Estendida Multi-base LBS (4G)",
    description:
      "Transmite dados de localização baseados em LBS com informações estendidas para redes 4G.",
  },
  {
    protocoloID: "0xA4",
    protocoloName: "Multi-fence Alarm Packet (4G)",
    protocoloNameBr: "Pacote de Alarme de Múltiplas Cercas (4G)",
    description:
      "Transmite dados de alarme relacionados a cercas geográficas múltiplas em redes 4G.",
  },
];
