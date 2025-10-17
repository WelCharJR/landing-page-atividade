const cryptoApi = new CryptoAPI();
const cryptoContainer = document.getElementById('crypto-container');

// --- Nova Função para criar as bolas flutuantes ---
async function createCryptoBubbles() {
    const bubblesContainer = document.getElementById('crypto-bubbles-container');
    if (!bubblesContainer) return;

    const data = await cryptoApi.getCryptoData();
    // Vamos usar as 10 principais moedas para criar as bolas
    const top10Cryptos = data.slice(0, 10);

    top10Cryptos.forEach(crypto => {
        const bubble = document.createElement('div');
        bubble.className = 'crypto-bubble';

        // Cria a imagem dentro da bola
        const img = document.createElement('img');
        img.src = crypto.image;
        img.alt = crypto.name; // Boa prática de acessibilidade
        bubble.appendChild(img);

        // Define propriedades aleatórias para cada bola
        const size = Math.random() * 80 + 40; // Tamanho entre 40px e 120px
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.top = `${Math.random() * 90}%`;
        bubble.style.left = `${Math.random() * 90}%`;

        // Velocidade de animação aleatória
        const animationDuration = Math.random() * 15 + 10; // Duração entre 10s e 25s
        bubble.style.animationDuration = `${animationDuration}s`;
        
        // Atraso aleatório para a animação não começar toda ao mesmo tempo
        const animationDelay = Math.random() * 5;
        bubble.style.animationDelay = `-${animationDelay}s`;


        bubblesContainer.appendChild(bubble);
    });
}

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
createCryptoBubbles();
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