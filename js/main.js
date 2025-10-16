const cryptoApi = new CryptoAPI();
const cryptoContainer = document.getElementById('crypto-container');

function createCryptoCard(crypto) {
    const priceChange = crypto.price_change_percentage_24h;
    const priceChangeClass = priceChange >= 0 ? 'price-up' : 'price-down';
    
    // Na versão anterior, era uma 'div'. A versão semântica usa 'article'.
    return `
        <article class="crypto-card fade-in">
            <div class="crypto-header">
                <img src="${crypto.image}" alt="Logo of ${crypto.name}" width="32">
                <h3>${crypto.name} (${crypto.symbol.toUpperCase()})</h3>
            </div>
            <div class="crypto-price">
                <p>Price: $${crypto.current_price.toLocaleString()}</p>
                <p class="${priceChangeClass}">24h: ${priceChange.toFixed(2)}%</p>
            </div>
            <div class="crypto-details">
                <p>Market Cap: $${crypto.market_cap.toLocaleString()}</p>
                <p>Volume: $${crypto.total_volume.toLocaleString()}</p>
            </div>
        </article>
    `;
}

async function updateCryptoData() {
    const data = await cryptoApi.getCryptoData();
    cryptoContainer.innerHTML = data.map(crypto => createCryptoCard(crypto)).join('');
}

// Initial load
updateCryptoData();

// Update every 30 seconds
setInterval(updateCryptoData, 30000);

// Add scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    });

    document.querySelectorAll('.feature-card, .crypto-card').forEach((el) => {
        observer.observe(el);
    });
});