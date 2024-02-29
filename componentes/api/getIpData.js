// api/getIpData.js
export default async function handler(req, res) {
    try {
        const apiUrl = 'https://ip-api.com/json/';
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Erro ao obter dados da API:', error);
        res.status(500).json({ error: 'Erro ao obter dados da API' });
    }
}