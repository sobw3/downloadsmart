document.addEventListener('DOMContentLoaded', () => {
    //
    // -------------------------------------------------------------------
    //           ⚠️  COLOQUE A URL DO SEU SITE PRINCIPAL AQUI  ⚠️
    // -------------------------------------------------------------------
    const URL_DO_SEU_APP = 'https://www.smartfridgebrasil.shop/';
    // -------------------------------------------------------------------
    //

    let installPrompt = null;
    const installButton = document.getElementById('install-button');
    const iosInstructions = document.getElementById('ios-instructions');
    const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    // --- LÓGICA PARA IPHONE (iOS) ---
    if (isIos) {
        // Mostra o botão e as instruções do iPhone
        installButton.classList.remove('hidden');
        iosInstructions.classList.remove('hidden');

        // Ação do botão: Apenas redireciona para o app principal
        installButton.addEventListener('click', () => {
            window.location.href = URL_DO_SEU_APP;
        });

    // --- LÓGICA PARA ANDROID E DESKTOP ---
    } else {
        // Ouve o evento que o navegador dispara quando um site é instalável
        window.addEventListener('beforeinstallprompt', (event) => {
            console.log('Evento de instalação capturado!');
            event.preventDefault(); // Impede o pop-up automático
            installPrompt = event; // Guarda o evento para usar depois
            installButton.classList.remove('hidden'); // Mostra o botão "OBTER"
        });

        // Ação do botão: Inicia a animação e depois o pop-up de instalação
        installButton.addEventListener('click', async () => {
            if (!installPrompt) return;

            installButton.disabled = true;
            installButton.classList.add('installing');

            // Simula um tempo de "download" com a animação
            setTimeout(async () => {
                await installPrompt.prompt(); // Mostra o pop-up de instalação do navegador
                
                const { outcome } = await installPrompt.userChoice;
                console.log(`Resultado: ${outcome}`);

                // Esconde o botão e reseta o prompt
                installButton.classList.add('hidden');
                installPrompt = null;
            }, 2000); // 2 segundos de animação
        });

        // Carrega o iframe invisível para acionar o evento 'beforeinstallprompt'
        const iframe = document.createElement('iframe');
        iframe.src = URL_DO_SEU_APP;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
    }
});
