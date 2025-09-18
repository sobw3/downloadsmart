document.addEventListener('DOMContentLoaded', () => {
    //
    // -------------------------------------------------------------------
    //           ⚠️  COLOQUE A URL DO SEU SITE PRINCIPAL AQUI  ⚠️
    // -------------------------------------------------------------------
    // Exemplo: 'https://meu-smartfridge.com.br'
    //
    const URL_DO_SEU_APP = 'https://www.smartfridgebrasil.shop'
    // -------------------------------------------------------------------
    //

    let installPrompt = null;
    const installButton = document.getElementById('install-button');
    const iosInstructions = document.getElementById('ios-instructions');

    /**
     * A "mágica" acontece aqui:
     * Criamos um `iframe` invisível que carrega a URL do seu app principal.
     * Ao carregar, o navegador vê o `manifest.json` do seu app e dispara o evento
     * 'beforeinstallprompt', que nós capturamos para usar no nosso botão.
     */
    function prepareInstall() {
        const iframe = document.createElement('iframe');
        iframe.src = URL_DO_SEU_APP;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
    }

    // --- LÓGICA DE INSTALAÇÃO DO PWA ---
    const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    if (isIos) {
        installButton.classList.add('hidden');
        iosInstructions.classList.remove('hidden');
    } else {
        // Ouve o evento que o navegador dispara quando um site (o do iframe) é instalável.
        window.addEventListener('beforeinstallprompt', (event) => {
            event.preventDefault();
            installPrompt = event;
            installButton.classList.remove('hidden');
        });

        // Chama a função para preparar a instalação
        prepareInstall();
    }

    installButton.addEventListener('click', async () => {
        if (!installPrompt) return;

        installButton.disabled = true;
        installButton.classList.add('installing');

        // Simula um tempo de "instalação" com a animação
        setTimeout(() => {
            installPrompt.prompt();
            
            installPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('Usuário instalou o app');
                } else {
                    console.log('Usuário cancelou a instalação');
                }
                // Esconde o botão e reseta o prompt
                installButton.classList.add('hidden');
                installPrompt = null;
            });
        }, 2000); // 2 segundos de animação
    });
});