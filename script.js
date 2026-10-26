let lilithTemaAtual = 'theme-purple-pink';
let lilithModoCards = 'light-cards';

function lilithMudarAba(abaId, evento) {
    if (evento) evento.preventDefault();

    const paginas = document.querySelectorAll('.lilith_tab_page');
    paginas.forEach(p => p.classList.remove('active'));

    const botoes = document.querySelectorAll('.lilith_menu_inner a');
    botoes.forEach(b => b.classList.remove('active'));

    const paginaAlvo = document.getElementById(abaId);
    if (paginaAlvo) paginaAlvo.classList.add('active');

    if (evento && evento.currentTarget) {
        evento.currentTarget.classList.add('active');
    }
}

function lilithTrocarTemaSelect(nomeTema) {
    lilithTemaAtual = nomeTema;
    lilithAtualizarClassesBody();
}

function lilithAlternarModoCards() {
    lilithModoCards = (lilithModoCards === 'light-cards') ? 'dark-cards' : 'light-cards';
    
    const btnTexto = document.getElementById('lilith_mode_text');
    if (btnTexto) {
        btnTexto.textContent = (lilithModoCards === 'light-cards') ? 'Cards: Claro' : 'Cards: Escuro';
    }
    
    lilithAtualizarClassesBody();
}

function lilithAtualizarClassesBody() {
    const body = document.getElementById('container');
    const badge = document.getElementById('lilith_badge_status');

    body.className = '';
    body.classList.add(lilithTemaAtual, lilithModoCards);

    const nomesFormatados = {
        'theme-purple-pink': 'Roxo ➔ Rosa',
        'theme-red-fire': 'Vermelho ➔ Laranja Fogo',
        'theme-emerald-forest': 'Verde Musgo Escuro ➔ Verde Claro',
        'theme-cyber-blue': 'Azul Escuro ➔ Azul Claro',
        'theme-orange-yellow': 'Laranja ➔ Amarelo'
    };

    if (badge) {
        badge.textContent = `Fundo: ${nomesFormatados[lilithTemaAtual]}`;
    }
}

function lilithAbrirModalVideo(titulo, arquivoMp4) {
    const modal = document.getElementById('lilith_modal_overlay');
    document.getElementById('lilith_modal_title').textContent = titulo;
    
    const contentDiv = document.getElementById('lilith_modal_content');
    contentDiv.innerHTML = `<video src="img/${arquivoMp4}" width="100%" height="100%" controls autoplay style="border-radius: 12px; background: #000;"></video>`;
    
    if (modal) modal.style.display = 'flex';
}

function lilithFecharModal(evento) {
    if (evento.target.id === 'lilith_modal_overlay') {
        document.getElementById('lilith_modal_overlay').style.display = 'none';
        document.getElementById('lilith_modal_content').innerHTML = '';
    }
}

function lilithFecharModalForcado() {
    document.getElementById('lilith_modal_overlay').style.display = 'none';
    document.getElementById('lilith_modal_content').innerHTML = '';
}
function lilithToggleAccordion(botao) {
    const painel = botao.nextElementSibling;
    const estaAberto = painel.style.display === 'block';

    const todosPaineis = document.querySelectorAll('.lilith_acc_panel');
    todosPaineis.forEach(p => p.style.display = 'none');

    if (!estaAberto) {
        painel.style.display = 'block';
    }
}

function lilithValidarFormulario(evento) {
    evento.preventDefault();

    const alertBox = document.getElementById('lilith_form_alert');
    
    const nome = document.getElementById('f_nome').value.trim();
    const email = document.getElementById('f_email').value.trim();
    const plataforma = document.getElementById('f_plataforma').value;
    const nota = document.getElementById('f_nota').value;
    
    const radioQuadro = document.querySelector('input[name="f_quadro"]:checked');
    const radioFreq = document.querySelector('input[name="f_freq"]:checked');
    const checkboxNotif = document.getElementById('f_notif').checked;
    
    const mensagem = document.getElementById('f_mensagem').value.trim();

    let erro = '';

    if (nome === "") {
        erro = 'Erro: Preencha o seu Nome ou Nick (Campo 1).';
    } else if (email === "" || !email.includes('@')) {
        erro = 'Erro: Insira um E-mail válido contendo "@" (Campo 2).';
    } else if (plataforma === "") {
        erro = 'Erro: Selecione a plataforma onde assiste (Campo 3).';
    } else if (nota === "" || nota < 1 || nota > 5) {
        erro = 'Erro: Atribua uma nota de 1 a 5 (Campo 4).';
    } else if (!radioQuadro) {
        erro = 'Erro: Selecione o seu quadro favorito (Campo 5).';
    } else if (!radioFreq) {
        erro = 'Erro: Marque a frequência com que assiste (Campo 6).';
    } else if (!checkboxNotif) {
        erro = 'Aviso: Aceite receber as notificações marcando a caixa (Campo 7).';
    } else if (mensagem === "" || mensagem.length < 10) {
        erro = 'Erro: A mensagem deve ter no mínimo 10 caracteres (Campo 8).';
    }

    alertBox.style.display = 'block';

    if (erro !== '') {
        alertBox.className = 'lilith_alert_box error';
        alertBox.textContent = erro;
    } else {
        alertBox.className = 'lilith_alert_box success';
        alertBox.textContent = 'Feedback enviado com sucesso! Muito obrigada, ' + nome + '!';
        
        document.getElementById('lilith_feedback_form').reset();
    }
}