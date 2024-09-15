window.onload = function () {
    // Remove a classe que pausa as animações e inicia as flores
    document.body.classList.remove("not-loaded");

    // Inicia o áudio automaticamente quando as flores começam a surgir
    const audio = document.getElementById('background-audio');
    audio.volume = 0.2; // Define o volume inicial

    // Tenta tocar o áudio automaticamente
    audio.play().then(() => {
        console.log("Áudio iniciado automaticamente.");
    }).catch(function (error) {
        console.log("Autoplay bloqueado. O áudio será iniciado no clique.");
    });

    // Se o autoplay for bloqueado, o áudio começará no primeiro toque do usuário
    function startAudio() {
        if (audio.paused) {
            audio.play().then(() => {
                console.log("Áudio iniciado após interação do usuário.");
            }).catch((error) => {
                console.log("Falha ao iniciar o áudio:", error);
            });
        }
        // Remove o event listener após tocar o áudio
        document.body.removeEventListener('pointerdown', startAudio);
    }

    // Adiciona listener para iniciar o áudio no primeiro toque caso o autoplay seja bloqueado
    document.body.addEventListener('pointerdown', startAudio);

    // Variável para controlar se o mouse está pressionado
    let isMouseDown = false;

    // Função para criar estrelas na posição do mouse ou toque
    function createStars(e) {
        e.preventDefault(); // Evita comportamentos indesejados no toque

        const numStars = 20; // Número de estrelinhas
        const xPos = e.pageX || e.touches?.[0]?.pageX;
        const yPos = e.pageY || e.touches?.[0]?.pageY;

        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            document.body.appendChild(star);

            // Defina a posição inicial como o ponto de clique/toque
            star.style.left = `${xPos}px`;
            star.style.top = `${yPos}px`;

            // Gera uma posição de destino aleatória para cada estrela
            const angle = Math.random() * 360; // Direção aleatória
            const distance = Math.random() * 140 + 60; // Distância aleatória
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            // Define a direção da animação usando variáveis CSS personalizadas
            star.style.setProperty('--x', `${x}px`);
            star.style.setProperty('--y', `${y}px`);

            // Variar o tamanho das estrelas (de 4px a 10px)
            const size = Math.random() * 10 + 8;
            star.style.setProperty('--size', `${size}px`);

            // Variar as cores das estrelas
            const colors = ['#ffffff', '#ffdd00', '#00ffdd', '#ff0077', '#00aaff'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            star.style.setProperty('--color', color);

            // Definir o brilho da estrela (glow)
            star.style.setProperty('--glow', color);

            // Variar a duração da animação (0.6s a 1.2s)
            const duration = Math.random() * 0.6 + 0.6;
            star.style.setProperty('--duration', `${duration}s`);

            // Remova a estrela após a animação
            setTimeout(() => {
                star.remove();
            }, duration * 1000); // Remover baseado na duração
        }
    }

    // Função que cria estrelas continuamente enquanto o mouse está sendo arrastado
    function handleMouseMove(e) {
        if (isMouseDown) {
            createStars(e);
        }
    }

    // Função que controla a criação contínua de estrelas enquanto o mouse está pressionado
    function startCreatingStars(e) {
        isMouseDown = true;
        createStars(e); // Cria estrelas ao iniciar o clique
    }

    // Função que para a criação de estrelas quando o mouse é solto
    function stopCreatingStars() {
        isMouseDown = false;
    }

    // Evento que captura o mouse down e inicia a criação contínua de estrelas
    document.body.addEventListener('mousedown', startCreatingStars);

    // Evento para capturar o movimento do mouse enquanto o botão está pressionado
    document.body.addEventListener('mousemove', handleMouseMove);

    // Evento que captura o mouse up para parar a criação de estrelas
    document.body.addEventListener('mouseup', stopCreatingStars);

    // Eventos para toque em dispositivos móveis (touchstart, touchmove e touchend)
    document.body.addEventListener('touchstart', startCreatingStars);
    document.body.addEventListener('touchmove', handleMouseMove);
    document.body.addEventListener('touchend', stopCreatingStars);
};
