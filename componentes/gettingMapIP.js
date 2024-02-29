document.addEventListener('DOMContentLoaded', async function () {
    let map;

    // Obtém a div de endereço
    const enderecoDiv = document.querySelector('.conteudo__endereco');
  
    // Obtém o elemento span dentro da div de endereço
    const spanIP = enderecoDiv.querySelector('#ip');
    const spanLocation = enderecoDiv.querySelector('#location');
    const spanTimezone = enderecoDiv.querySelector('#timezone');
    const spanISP = enderecoDiv.querySelector('#isp');
  
    const inputIP = document.querySelector('.input');
    const button = document.querySelector('.botao__input');

    async function updateData(ipAddress) {
      try {
          const apiKey = 'e22ae16b7cf624';
          const apiUrl = `https://ipinfo.io/${ipAddress}?token=${apiKey}`;
          const response = await fetch(apiUrl);
  
          if (!response.ok) {
              throw new Error(`Erro na solicitação. Status: ${response.status}`);
          }
  
          const data = await response.json();
    
          // Log para verificar os dados recebidos da API
          console.log(data);
  
        // Atualiza as informações na div de endereço
        // spanIP.textContent = data.query || 'N/A';
        // spanLocation.textContent = `${data.countryCode || 'N/A'}, ${data.city || 'N/A'}`;
        // spanTimezone.textContent = data.timezone || 'N/A';
        // spanISP.textContent = data.isp || 'N/A';

        spanIP.textContent = data.ip || 'N/A';
        spanLocation.textContent = `${data.country || 'N/A'}, ${data.region || 'N/A'}`;
        spanTimezone.textContent = data.timezone || 'N/A';
        spanISP.textContent = data.org || 'N/A';

        updateMap(data.loc);

        } catch (error) {
        console.error('Erro ao obter dados da API:', error);
        }
    }
    function updateMap(location) {
      const [latitude, longitude] = location.split(',');

        if (map) {
            map.remove();
        }
        
        // Inicializa o mapa com as novas coordenadas
        map = L.map('map').setView([latitude, longitude], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 20,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
    
        // Adiciona um marcador no mapa
        var marker = L.marker([latitude, longitude]).addTo(map);
    
        // Adiciona um círculo no mapa
        var circle = L.circle([latitude, longitude], {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5,
          radius: 500
        }).addTo(map);
    
        // Quando clicar no mapa, mostrar as coordenadas
        function onMapClick(e) {
          alert("You clicked the map at " + e.latlng);
        }
    
        map.on('click', onMapClick);
      }

    button.addEventListener('click', function () {
      const newIP = inputIP.value.trim();
      if (newIP) {
          // Atualiza o texto "IP Address"
          spanIP.textContent = newIP;
          // Chama a função para obter informações com base no novo IP
          updateData(newIP);
        }
      });

  // Obtém o endereço IP do cliente
  async function getIpAddress() {
        try {
            // Substitua 'e22ae16b7cf624' pelo seu token de API fornecido pela ipinfo.io
            const apiKey = 'e22ae16b7cf624';
            const response = await fetch(`https://ipinfo.io?token=${apiKey}`);
            const data = await response.json();
            return data.ip || 'N/A';
        } catch (error) {
            console.error('Erro ao obter endereço IP:', error);
            return 'N/A';
        }
    }

// Obtém o endereço IP do cliente e atualiza os dados
const clientIpAddress = await getIpAddress();
updateData(clientIpAddress);
});