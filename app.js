window.onload = function () {
    // Remove a classe que pausa as animações
    document.body.classList.remove("not-loaded");

    // Inicia o áudio sem autoplay
    const audio = document.getElementById('background-audio');
    audio.volume = 0.2; // Define o volume inicial
    audio.play().catch(function (error) {
        console.log("Autoplay bloqueado. O áudio será iniciado no clique.");
    });

    // Se o autoplay for bloqueado, o áudio começará no primeiro clique do usuário
    document.body.addEventListener('click', function () {
        if (audio.paused) {
            audio.play();
        }
    });

    // Evento de clique para criar estrelas
    document.body.addEventListener('click', function (e) {
        const numStars = 60; // Número de estrelinhas
        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            document.body.appendChild(star);

            // Defina a posição inicial como o ponto de clique
            star.style.left = `${e.pageX}px`;
            star.style.top = `${e.pageY}px`;

            // Gera uma posição de destino aleatória para cada estrela
            const angle = Math.random() * 360; // Direção aleatória
            const distance = Math.random() * 120 + 50; // Distância aleatória
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            // Define a direção da animação usando variáveis CSS personalizadas
            star.style.setProperty('--x', `${x}px`);
            star.style.setProperty('--y', `${y}px`);

            // Variar o tamanho das estrelas (de 4px a 10px)
            const size = Math.random() * 6 + 4;
            star.style.setProperty('--size', `${size}px`);

            // Variar as cores das estrelas
            const colors = ['#ffffff', '#ffdd00', '#00ffdd', '#ff0077', '#00aaff'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            star.style.setProperty('--color', color);

            // Definir o brilho da estrela (glow)
            star.style.setProperty('--glow', `${color}`);

            // Variar a duração da animação (0.6s a 1.2s)
            const duration = Math.random() * 0.6 + 0.6;
            star.style.setProperty('--duration', `${duration}s`);

            // Remova a estrela após a animação
            setTimeout(() => {
                star.remove();
            }, duration * 1000); // Remover baseado na duração
        }
    });
};
