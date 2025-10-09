class CryptoAPI {
    constructor() {
        this.baseUrl = 'https://api.coingecko.com/api/v3';
    }

    async getCryptoData() {
        try {
            const response = await fetch(
                `${this.baseUrl}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&sparkline=true`
            );
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching crypto data:', error);
            return [];
        }
    }

    async getCryptoPrice(id) {
        try {
            const response = await fetch(
                `${this.baseUrl}/simple/price?ids=${id}&vs_currencies=usd`
            );
            const data = await response.json();
            return data[id].usd;
        } catch (error) {
            console.error('Error fetching price:', error);
            return null;
        }
    }
}