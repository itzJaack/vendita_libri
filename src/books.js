document.addEventListener('DOMContentLoaded', () => {
    const libri = [
        {
            disponibile: true,
            classe: "Ⅲª",
            titolo: "Zefiro 1 Edizione Nuovo Esame di Stato / Dalle origini al Cinquecento",
            isbn: "9788839536624",
            prezzo: "20€",
            condizione: "Discreta/Come Nuovo*",
            ebook: false,
            note: "Libro ricoperto con copertina trasparente. *II libro contiene appunti in matita/penna (non miei), i due fascicoli sono come nuovi."
        },
        {
            disponibile: true,
            classe: "Ⅲª",
            titolo: "On Topic B2 SB+WB / Your World, Your Ideas, Your Future",
            isbn: "9788883396762",
            prezzo: "22,50€",
            condizione: "Ottima",
            ebook: false,
            note: "Libro ricoperto con copertina trasparente. Contiene fogli con degli esercizi svolti."
        },
        {
            disponibile: true,
            classe: "Ⅲª",
            titolo: "Storia. Progettare il futuro 2ed. (LA) - Conf. 1 + Atlante Geostoria (LDM) / Dall'anno Mille al Seicento",
            isbn: "9788808317537",
            prezzo: "25,00€",
            condizione: "Come Nuovo",
            ebook: false,
            note: "Libro ricoperto con copertina trasparente."
        },
        {
            disponibile: true,
            classe: "Ⅲª",
            titolo: "Filosofia in dialogo / Volume 1 Dalle origini al Tardo Medioevo + Filosofia per tutti 1",
            isbn: "9788842795401",
            prezzo: "25,00€",
            condizione: "Come nuovo/Nuovo*",
            ebook: false,
            note: "Libro ricoperto con copertina trasparente. *Libro in condizioni semi-nuove, il fascicolo e' nuovo."
        },
        {
            disponibile: false,
            classe: "Ⅲª/Ⅳª",
            titolo: "Colori della matematica - Ed.Blu aggiornata-L.Scient Vol. 3 Gamma+Trigon+Ebook",
            isbn: "9788849424119",
            prezzo: "23,00€",
            condizione: "Buona/Come Nuovo*",
            ebook: false,
            note: "Libro ricoperto con copertina trasparente. *Il libro contiene esercizi svolti in penna (non miei), il fascicolo è come nuovo."
        },
        {
            disponibile: true,
            classe: "Ⅲª",
            titolo: "Fisica di Cutnell e Johnson 2ed. (LA) - Vol. 1 (LDM) / Meccanica e Termodinamica",
            isbn: "9788808070625",
            prezzo: "25,00€",
            condizione: "Nuovo",
            ebook: false,
            note: "Libro ricoperto con copertina trasparente."
        },
        {
            disponibile: true,
            classe: "Ⅲª",
            titolo: "La Divina Commedia. Inferno.",
            isbn: "9788800228565",
            prezzo: "7,50€",
            condizione: "Nuovo",
            ebook: false,
            note: "Libro ricoperto con copertina trasparente. Presenta appunti in matita."
        }
    ];

    const listaLibri = document.getElementById('lista-libri');

    const tabella = document.createElement('table');
    tabella.className = 'tabella-libri';
    tabella.innerHTML = `
        <thead>
            <tr>
                <th>Disponibile</th>
                <th>Classe</th>
                <th>Titolo</th>
                <th>ISBN</th>
                <th>Prezzo</th>
                <th>Condizione</th>
                <th>Ebook</th>
                <th></th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    const corpoTabella = tabella.querySelector('tbody');

    libri.forEach((libro, indice) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><span class="stato-libro ${libro.disponibile ? 'disponibile' : 'non-disponibile'}">${libro.disponibile ? '✔️' : '❌'}</span></td>
            <td>${libro.classe}</td>
            <td>${libro.titolo}</td>
            <td>${libro.isbn}</td>
            <td>${libro.prezzo}</td>
            <td>${libro.condizione}</td>
            <td>${libro.ebook ? 'Sì' : 'No'}</td>
            <td><button class="bottone-acquista" data-indice="${indice}" ${!libro.disponibile ? 'disabled' : ''}>Acquista</button></td>
        `;
        corpoTabella.appendChild(tr);
        if (libro.note) {
            const notaTr = document.createElement('tr');
            notaTr.className = 'riga-nota-libro';
            notaTr.innerHTML = `<td colspan="8" class="nota-libro">${libro.note}</td>`;
            corpoTabella.appendChild(notaTr);
        }
    });
    listaLibri.appendChild(tabella);

    let propostaPrezzo = document.createElement('div');
    propostaPrezzo.id = 'proposta-prezzo';
    propostaPrezzo.style.display = 'none';
    propostaPrezzo.innerHTML = `
        <div class="sfondo-proposta"></div>
        <div class="contenuto-proposta">
            <h3>Proposta di acquisto</h3>
            <div id="titolo-libro-proposta" style="margin-bottom:10px;font-weight:600;"></div>
            <input type="text" id="input-prezzo-proposta" style="width:90%;padding:7px;font-size:1.1em;" />
            <div style="margin-top:14px;display:flex;gap:12px;justify-content:center;">
                <button id="bottone-invia-proposta" class="bottone-acquista">Proponi</button>
                <button id="bottone-annulla-proposta" class="bottone-acquista" style="background:#888;">Annulla</button>
            </div>
        </div>
    `;
    document.body.appendChild(propostaPrezzo);

    let indiceLibroCorrente = null;

    listaLibri.addEventListener('click', function(e) {
        if (e.target.classList.contains('bottone-acquista')) {
            const indice = e.target.getAttribute('data-indice');
            const libro = libri[indice];
            indiceLibroCorrente = indice;
            document.getElementById('titolo-libro-proposta').textContent = libro.titolo;
            document.getElementById('input-prezzo-proposta').value = libro.prezzo;
            propostaPrezzo.style.display = 'flex';
            document.getElementById('input-prezzo-proposta').focus();
        }
    });

    propostaPrezzo.addEventListener('click', function(e) {
        if (e.target.classList.contains('sfondo-proposta') || e.target.id === 'bottone-annulla-proposta') {
            propostaPrezzo.style.display = 'none';
        }
    });
    document.getElementById('bottone-invia-proposta').addEventListener('click', function() {
        const prezzo = document.getElementById('input-prezzo-proposta').value;
        if (prezzo && prezzo.trim() !== "") {
            const libro = libri[indiceLibroCorrente];
            const subject = encodeURIComponent('Libri');
            const to = encodeURIComponent('gibinjacopo@liceoandreamaffei.it');
            const body = encodeURIComponent(`Proposta acquisto: ${libro.titolo}\nPrezzo: ${prezzo}`);
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            if (isMobile) {
                window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
            } else {
                window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`);
            }
            propostaPrezzo.style.display = 'none';
        }
    });

    const infoBtn = document.getElementById('info-btn');
    const extraInfo = document.getElementById('extra-info');
    const closeInfo = document.getElementById('close-info');
    const infoOverlay = document.getElementById('info-overlay');
    if (infoBtn && extraInfo && infoOverlay) {
        infoBtn.addEventListener('click', () => {
            extraInfo.classList.add('show');
            infoOverlay.style.display = 'block';
            document.body.classList.add('info-open');
        });
    }
    if (closeInfo && extraInfo && infoOverlay) {
        closeInfo.addEventListener('click', () => {
            extraInfo.classList.remove('show');
            infoOverlay.style.display = 'none';
            document.body.classList.remove('info-open');
        });
    }
    if (infoOverlay && extraInfo && closeInfo) {
        infoOverlay.addEventListener('click', () => {
            extraInfo.classList.remove('show');
            infoOverlay.style.display = 'none';
            document.body.classList.remove('info-open');
        });
    }
    var mailLink = document.querySelector('#extra-info a[href^="mailto:"]');
    if (mailLink) {
        mailLink.addEventListener('click', function(e) {
            e.preventDefault();
            var email = mailLink.getAttribute('href').replace('mailto:', '');
            window.open('https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(email), '_blank');
        });
    }
});