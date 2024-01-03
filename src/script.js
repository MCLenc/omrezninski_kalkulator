
let nacObr_selectVal = '2-tarif';


// EventListener funkcije - te so na voljo po tem, ko se naloži DOM
document.addEventListener('DOMContentLoaded', function () {

    // Sproži funkcijo za izračun, ko je kliknjen gumb "Izračunaj stroške"
    const calculate_expenses_button = document.getElementById('calculate_button');
    if (calculate_expenses_button) {
        calculate_expenses_button.addEventListener('click', calculateExpenses);
    }
    

    // Sproži funkcijo za ponastavitev, ko je kliknjen gumb "Ponastavi"
    const clear_display_button = document.getElementById('clear_display');
    if (clear_display_button) {
        clear_display_button.addEventListener('click', clearDisplay);
    }
    

    // Pridobi vrednosti za izbor načina obračuna
    const radioButtons_nacObr = document.querySelectorAll('input[name="nacObr"]');
    let et_elements = document.getElementsByClassName('et');
    let mt_elements = document.getElementsByClassName('mt');
    let vt_elements = document.getElementsByClassName('vt');


    // Prikaži VT/MT ali ET elemente glede na izbiro načina obračuna
    radioButtons_nacObr.forEach(function (radioButton_nacObr) {
        // Add an event listener to each radio button
        radioButton_nacObr.addEventListener('change', function () {
            // Preveri izbiro gumba za način obračuna
            if (radioButton_nacObr.value === '1-tarif') {
                // Prikaži ET elemente
                for (let i=0; i<et_elements.length; i+=1){
                    et_elements[i].style.display = 'block';
                    mt_elements[i].style.display = 'none';
                    vt_elements[i].style.display = 'none';
                    nacObr_selectVal = '1-tarif';
                }
                // Nastavi vse vnose uporabnika za VT/MT elemente na 0
                document.getElementById('price-en-mt').value = 0;
                document.getElementById('price-en-vt').value = 0;
                document.getElementById('e-mt').value = 0;
                document.getElementById('e-vt').value = 0;
            }
            else if (radioButton_nacObr.value === '2-tarif') {
                // Prikaži VT/MT elemente
                for (let i=0; i<et_elements.length; i+=1){
                    et_elements[i].style.display = 'none';
                    mt_elements[i].style.display = 'block';
                    vt_elements[i].style.display = 'block';
                    nacObr_selectVal = '2-tarif';
                }
                // Nastavi vse vnose uporabnike za ET elemente na 0
                document.getElementById('price-en-et').value = 0;
                document.getElementById('e-et').value = 0;
            }
        });
    });


    // Pridobi vrednosti za izbor načina obračuna
    const radioButtons_sezona = document.querySelectorAll('input[name="sezona"]');
    let cb_1_elements = document.getElementsByClassName('cb-1');
    let cb_2_elements = document.getElementsByClassName('cb-2');
    let cb_3_elements = document.getElementsByClassName('cb-3');
    let cb_4_elements = document.getElementsByClassName('cb-4');
    let cb_5_elements = document.getElementsByClassName('cb-5');
    

    // Prikaži elemente glede na sezone.
    // Prikaži ČB1-ČB4 za višjo sezono in ČB2-ČB5 za nižjo sezono
    radioButtons_sezona.forEach(function (radioButton_sezona) {
        // Add an event listener to each radio button
        radioButton_sezona.addEventListener('change', function () {
            // Preveri izbiro gumba za sezono
            if (radioButton_sezona.value === 'visja') {
                // Prikaži elemente ČB1-ČB4
                for (let i=0; i<cb_1_elements.length; i+=1){
                    cb_1_elements[i].style.display = 'block';
                    cb_2_elements[i].style.display = 'block';
                    cb_3_elements[i].style.display = 'block';
                    cb_4_elements[i].style.display = 'block';
                    cb_5_elements[i].style.display = 'none';
                }
                // Nastavi vse vnose uporabnika za ČB5 elemente na 0
                document.getElementById('e-cb5').value = 0;
                document.getElementById('m-cb5').value = 0;
                document.getElementById('m-ex-cb5').value = 0;
            }
            else if (radioButton_sezona.value === 'nizja') {
                // Prikaži elemente ČB2-ČB5
                for (let i=0; i<cb_1_elements.length; i+=1){
                    cb_1_elements[i].style.display = 'none';
                    cb_2_elements[i].style.display = 'block';
                    cb_3_elements[i].style.display = 'block';
                    cb_4_elements[i].style.display = 'block';
                    cb_5_elements[i].style.display = 'block';
                }
                // Nastavi vse vnose uporabnika za ČB1 elemente na 0
                document.getElementById('e-cb1').value = 0;
                document.getElementById('m-cb1').value = 0;
                document.getElementById('m-ex-cb1').value = 0;
            }
        });
    });


    // Pridobi vrednosti checkbox-a za upoštevanje presežnih moči
    const m_ex_chkBox = document.getElementById('m-ex-choice');

    // Nastavi vrednosti št. presežkov in stroškov presežkov na 0
    m_ex_chkBox.addEventListener('change', function () {
        if (m_ex_chkBox.checked == false) {
            for (let i = 1; i < 6; i++) {
                document.getElementById(`m-ex-cb${i}`).value = 0;
                document.getElementById(`expense-m-ex-cb${i}`).value = 0;
            }
        }
    });


    // Pridobi vrednosti checkbox-a za upoštevanje energentov
    let en_chkBox = document.getElementById('energent-choice');

    // Nastavi vrednosti cenika energenta in stroškov energenta na 0
    en_chkBox.addEventListener('change', function () {
        if (en_chkBox.checked == false) {
            document.getElementById(`price-en-mt`).value = 0;
            document.getElementById(`price-en-vt`).value = 0;
            document.getElementById(`price-en-et`).value = 0;
        }
    });

    
    // V copyright tekst dodaj trenutno leto
    document.getElementById(`footer-year`).innerHTML = new Date().getFullYear();
});




// Nastavi začetne vrednosti
function clearDisplay() {
    // Ponovno naloži spletno stran - nastavitve vseh gumbov se bodo resetirale, polja bodo šla na 0.
    location.reload();
}




// Pridobi vnešene vrednosti uporabnika
function getUserInputValues() {
    // Polji za količino porabljene energije in dogovorjene moči po ČB (vnos uporabnika)
    let e_cb = [];
    let m_cb = [];
    let m_ex_cb = [];

    // Pridobi vnos uporabnika - porabljena energija, dogovorjene močiin presežki po ČB
    for (let i = 1; i < 6; i++) {
        // Pridobi vnose energij
        let e_cbx = parseFloat(document.getElementById(`e-cb${i}`).value);
        if (isNaN(e_cbx) || e_cbx < 0)    // Preveri, če je uporabnik pustil polje prazno ali če je vrednost negativna
        {e_cb.push(0);}
        else
        {e_cb.push(e_cbx);}
        // Pridobi vnose dog. moči
        let m_cbx = parseFloat(document.getElementById(`m-cb${i}`).value);
        if (isNaN(m_cbx) || m_cbx < 0)
        {m_cb.push(0);}
        else
        {m_cb.push(m_cbx);}
        // Pridobi vnose presežkov
        let m_ex_cbx = parseFloat(document.getElementById(`m-ex-cb${i}`).value);
        if (isNaN(m_ex_cbx) || m_ex_cbx < 0)
        {m_ex_cb.push(0);}
        else
        {m_ex_cb.push(m_ex_cbx);}
    }
    
    // Pridobi vnos uporabnika - porabljena energija in dogovorjene moči po tarifah
    // Pridobi vnos energije MT
    let e_mt = parseFloat(document.getElementById('e-mt').value);
    if (isNaN(e_mt) || e_mt < 0)
    {e_mt = 0;}
    // Pridobi vnos energije VT
    let e_vt = parseFloat(document.getElementById('e-vt').value);
    if (isNaN(e_vt) || e_vt < 0)
    {e_vt = 0;}
    // Pridobi vnos energije ET
    let e_et = parseFloat(document.getElementById('e-et').value);
    if (isNaN(e_et) || e_et < 0)
    {e_et = 0;}
    // Pridobi vnos obračunske moči
    let m_obr = parseFloat(document.getElementById('m-obr').value);
    if (isNaN(m_obr) || m_obr < 0)
    {m_obr = 0;}

    // Pridobi vnos uporabnika - cena energenta
    let price_en_mt = parseFloat(document.getElementById('price-en-mt').value);
    if (Number.isNaN(price_en_mt))
    {price_en_mt = 0;}

    let price_en_vt = parseFloat(document.getElementById('price-en-vt').value);
    if (Number.isNaN(price_en_vt))
    {price_en_vt = 0;}
    
    let price_en_et = parseFloat(document.getElementById('price-en-et').value);
    if (Number.isNaN(price_en_et))
    {price_en_et = 0;}

    // Vrni vrednosti
    return [e_cb, m_cb, m_ex_cb, e_mt, e_vt, e_et, m_obr, price_en_mt, price_en_vt, price_en_et];
}




// Prikaži rezultate
function showOutputs(cost_e_cb, cost_m_cb, cost_ex_m_cb, cost_agg_new,
    cost_e_mt, cost_e_vt, cost_e_et, cost_m_obr, cost_agg_old,
    cost_en_mt, cost_en_vt, cost_en_et, cost_en_agg, cost_agg) {
    // Prikaži parcialne stroške omrežnine po ČB
    for (let i = 1; i < 6; i++) {
    document.getElementById(`expense-e-cb${i}`).value = cost_e_cb[i-1].toFixed(3);
    document.getElementById(`expense-m-cb${i}`).value = cost_m_cb[i-1].toFixed(3);
    document.getElementById(`expense-m-ex-cb${i}`).value = cost_ex_m_cb[i-1].toFixed(3);
    }

    // Prikaži skupne stroške omrežnine - nov način
    let cost_agg_new_formatted = cost_agg_new.toLocaleString('sl-SI', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 });  // Pretvori izračun v lokalni zapis decimalnih številk ("," za decimalno ločilo, "." za tisočice)
    document.getElementById('expense-e-omr-new').innerHTML = cost_agg_new_formatted;

    // Prikaži parcialne stroške omrežnine po tarifah
    document.getElementById('expense-e-mt').value = cost_e_mt.toFixed(3);
    document.getElementById('expense-e-vt').value = cost_e_vt.toFixed(3);
    document.getElementById('expense-e-et').value = cost_e_et.toFixed(3);
    document.getElementById('expense-m-obr').value = cost_m_obr.toFixed(3);

    // Prikaži skupne stroške omrežnine - star način
    let cost_agg_old_formatted = cost_agg_old.toLocaleString('sl-SI', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('expense-e-omr-old').innerHTML = cost_agg_old_formatted;

    // Prikaži parcialne stroške energenta
    document.getElementById('expense-en-mt').value = cost_en_mt.toFixed(3);
    document.getElementById('expense-en-vt').value = cost_en_vt.toFixed(3);
    document.getElementById('expense-en-et').value = cost_en_et.toFixed(3);

    // Prikaži skupne stroške energentov
    let cost_en_agg_formatted = cost_en_agg.toLocaleString('sl-SI', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('expense-e-en').innerHTML = cost_en_agg_formatted;

    // Prikaži skupni strošek celotnega računa
    let cost_agg_formatted = cost_agg.toLocaleString('sl-SI', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('expense-total').innerHTML = cost_agg_formatted;
}




// Izračunaj stroške
function calculateExpenses() {
    
    // Pridobi vnose uporabnika
    const[e_cb, m_cb, m_ex_cb, e_mt, e_vt, e_et, m_obr, price_en_mt, price_en_vt, price_en_et] = getUserInputValues();

        
    // NASTAVI STATILČNE CENIKE STROŠKOV
    // Cena omrežnine za energijo [uporabniska_skupina][casovni_blok]
    const price_e_cb = [[0.01925, 0.01844, 0.01837, 0.01838, 0.01847],
                        [0.01454, 0.01389, 0.01369, 0.0133, 0.01329],
                        [0.01263, 0.01204, 0.01181, 0.0114, 0.01139],
                        [0.0081, 0.00797, 0.00762, 0.00742, 0.00736],
                        [0.00829, 0.00813, 0.00776, 0.00753, 0.00748]];
    // Cena omrežnine za dogovorjeno moc [uporabniska_skupina][casovni_blok]
    const price_m_cb = [[3.61324, 0.8824, 0.19137, 0.01316, 0],
                        [5.33444, 1.08944, 0.14257, 0.00368, 0],
                        [4.18586, 0.88405, 0.11318, 0.00107, 0],
                        [1.95873, 0.44459, 0.07189, 0.0014, 0],
                        [0.56683, 0.25891, 0.05109, 0.00186, 0]];
    // Cena omrežnine za presezno moc [uporabniska_skupina][casovni_blok]
    const price_ex_m_cb = [[3.61324, 0.8824, 0.19137, 0.01316, 0],
                        [5.33444, 1.08944, 0.14257, 0.00368, 0],
                        [4.18586, 0.88405, 0.11318, 0.00107, 0],
                        [1.95873, 0.44459, 0.07189, 0.0014, 0],
                        [0.56683, 0.25891, 0.05109, 0.00186, 0]];
    // Faktor utežitve presežne moči za leto 2024
    Fex = 0.9;
    // Cena omrežnine za energijo [napetostni_nivo][nacin_prikljucitve][odjemna_skupina] (za MT/VT/ET)
    // CENIK ZA 2024
    // const price_e_vt = [[[0.04308, 0.04308, 0.01144, 0.02290, 0.01689], [0.01218, 0.00765]],
    //                     [[0.01252, 0.00789], [0.00097, 0.00074]],
    //                     [[0.00153, 0.00145, 0.00158]]];
    
    // const price_e_mt = [[[0.03311, 0.03311, 0.00882, 0.01759, 0.01298], [0.00936, 0.00592]],
    //                     [[0.00964, 0.00608], [0.00075, 0.00057]],
    //                     [[0.00118, 0.00111, 0.00123]]];
    
    // const price_e_et = [[[0.03973, 0.03973, 0, 0, 0], [0, 0]],
    //                     [[0, 0], [0, 0]],
    //                     [[0, 0, 0]]];

    // const price_m_obr = [[[0.79600, 0.79600, 2.37398, 4.74796, 5.71190], [3.60756, 4.33074]], 
    //                      [[2.47536, 3.22148], [3.05375, 3.09043]],
    //                      [[1.10050, 1.02089, 0.95460]]];


    // CENIK ZA 2023
    const price_e_vt = [[[0.04182, 0.04182, 0.01111, 0.02223, 0.01639], [0.01183, 0.00743]],
                        [[0.01217, 0.00767], [0.00095, 0.00072]],
                        [[0.00149, 0.00141, 0.00154]]];
    
    const price_e_mt = [[[0.03215, 0.03215, 0.00856, 0.01708, 0.01261], [0.00909, 0.00575]],
                        [[0.00937, 0.00591], [0.00073, 0.00055]],
                        [[0.00115, 0.00108, 0.00120]]];
    
    const price_e_et = [[[0.03858, 0.03858, 0, 0, 0], [0, 0]],
                        [[0, 0], [0, 0]],
                        [[0, 0, 0]]];

    const price_m_obr = [[[0.77417, 0.77417, 2.30549, 4.61098, 5.54684], [3.50514, 4.20754]],
                         [[2.40595, 3.13080], [2.97166, 3.00735]],
                         [[1.07303, 0.99541, 0.93077]]];



    



    // IZRAČUNAJ STROŠKE OMREŽNINE
    // Polja za izračun stroškov omrežnine po ČB (izhodni rezultat)
    let cost_e_cb = [];
    let cost_m_cb = [];
    let cost_ex_m_cb = [];

    // Polja za izračun stroškov omrežnine po tarifah (izhodni rezultat)
    let cost_e_vt = null;
    let cost_e_mt = null;
    let cost_e_et = null;
    let cost_m_obr = null;

    
    // Skrij opozorilo - napačno izbrana kombinacija: vrsta odjema, način priključitve, nap. nivo
    let odjSk = document.getElementById('warn-odjSk');
    odjSk.style.display = 'none';

    // Pridobi vnos uporabnika za izbor uporabniške skupine
    const usk_selectVal = document.querySelector('input[name="usk"]:checked').value;
    // Pridobi vnos uporabnika za izbor parametrov odjemne skupine
    const odjSk_selectVal = document.querySelector('input[name="odjSk"]:checked').value;
    const nacPrik_selectVal = document.querySelector('input[name="nacPrik"]:checked').value;
    const napNivo_selectVal = document.querySelector('input[name="napNivo"]:checked').value;
    

    // Izračunaj stroške omrežnine (glede na izbrano odjemno skupino) - stroški starega načina omrežnine
    // Stroški omrežnine v primeru izbire napetostnega nivoja NN
    if (napNivo_selectVal == "NN" && nacPrik_selectVal == "omrezje" && odjSk_selectVal == "gospodinjstvo") {
        cost_e_mt = e_mt * price_e_mt[0][0][0];
        cost_e_vt = e_vt * price_e_vt[0][0][0];
        cost_e_et = e_et * price_e_et[0][0][0];
        cost_m_obr = m_obr * price_m_obr[0][0][0];
    }
    else if (napNivo_selectVal == "NN" && nacPrik_selectVal == "omrezje" && odjSk_selectVal == "bmm") {
        cost_e_mt = e_mt * price_e_mt[0][0][1];
        cost_e_vt = e_vt * price_e_vt[0][0][1];
        cost_e_et = e_et * price_e_et[0][0][1];
        cost_m_obr = m_obr * price_m_obr[0][0][1];
    }
    else if (napNivo_selectVal == "NN" && nacPrik_selectVal == "omrezje" && odjSk_selectVal == "polnjenjeEV") {
        cost_e_mt = e_mt * price_e_mt[0][0][2];
        cost_e_vt = e_vt * price_e_vt[0][0][2];
        cost_e_et = e_et * price_e_et[0][0][2];
        cost_m_obr = m_obr * price_m_obr[0][0][2];
    }
    else if (napNivo_selectVal == "NN" && nacPrik_selectVal == "omrezje" && odjSk_selectVal == "tPod2500h") {
        cost_e_mt = e_mt * price_e_mt[0][0][3];
        cost_e_vt = e_vt * price_e_vt[0][0][3];
        cost_e_et = e_et * price_e_et[0][0][3];
        cost_m_obr = m_obr * price_m_obr[0][0][3];
    }
    else if (napNivo_selectVal == "NN" && nacPrik_selectVal == "omrezje" && odjSk_selectVal == "tNad2500h") {
        cost_e_mt = e_mt * price_e_mt[0][0][4];
        cost_e_vt = e_vt * price_e_vt[0][0][4];
        cost_e_et = e_et * price_e_et[0][0][4];
        cost_m_obr = m_obr * price_m_obr[0][0][4];
    }
    else if (napNivo_selectVal == "NN" && nacPrik_selectVal == "zbiralke" && odjSk_selectVal == "tPod2500h") {
        cost_e_mt = e_mt * price_e_mt[0][1][0];
        cost_e_vt = e_vt * price_e_vt[0][1][0];
        cost_e_et = e_et * price_e_et[0][1][0];
        cost_m_obr = m_obr * price_m_obr[0][1][0];
    }
    else if (napNivo_selectVal == "NN" && nacPrik_selectVal == "zbiralke" && odjSk_selectVal == "tNad2500h") {
        cost_e_mt = e_mt * price_e_mt[0][1][1];
        cost_e_vt = e_vt * price_e_vt[0][1][1];
        cost_e_et = e_et * price_e_et[0][1][1];
        cost_m_obr = m_obr * price_m_obr[0][1][1];
    }
    // Stroški omrežnine v primeru izbire napetostnega nivoja SN
    else if (napNivo_selectVal == "SN" && nacPrik_selectVal == "omrezje" && odjSk_selectVal == "tPod2500h") {
        cost_e_mt = e_mt * price_e_mt[1][0][0];
        cost_e_vt = e_vt * price_e_vt[1][0][0];
        cost_e_et = e_et * price_e_et[1][0][0];
        cost_m_obr = m_obr * price_m_obr[1][0][0];
    }
    else if (napNivo_selectVal == "SN" && nacPrik_selectVal == "omrezje" && odjSk_selectVal == "tNad2500h") {
        cost_e_mt = e_mt * price_e_mt[1][0][1];
        cost_e_vt = e_vt * price_e_vt[1][0][1];
        cost_e_et = e_et * price_e_et[1][0][1];
        cost_m_obr = m_obr * price_m_obr[1][0][1];
    }
    else if (napNivo_selectVal == "SN" && nacPrik_selectVal == "zbiralke" && odjSk_selectVal == "tPod2500h") {
        cost_e_mt = e_mt * price_e_mt[1][1][0];
        cost_e_vt = e_vt * price_e_vt[1][1][0];
        cost_e_et = e_et * price_e_et[1][1][0];
        cost_m_obr = m_obr * price_m_obr[1][1][0];
    }
    else if (napNivo_selectVal == "SN" && nacPrik_selectVal == "zbiralke" && odjSk_selectVal == "tNad2500h") {
        cost_e_mt = e_mt * price_e_mt[1][1][1];
        cost_e_vt = e_vt * price_e_vt[1][1][1];
        cost_e_et = e_et * price_e_et[1][1][1];
        cost_m_obr = m_obr * price_m_obr[1][1][1];
    }
    // Stroški omrežnine v primeru izbire napetostnega nivoja VN
    else if (napNivo_selectVal == "VN" && nacPrik_selectVal == "omrezje" && odjSk_selectVal == "tNad2500h") {
        cost_e_mt = e_mt * price_e_mt[2][0][0];
        cost_e_vt = e_vt * price_e_vt[2][0][0];
        cost_e_et = e_et * price_e_et[2][0][0];
        cost_m_obr = m_obr * price_m_obr[2][0][0];
    }
    else if (napNivo_selectVal == "VN" && nacPrik_selectVal == "omrezje" && odjSk_selectVal == "tMed2500In6000h") {
        cost_e_mt = e_mt * price_e_mt[2][0][1];
        cost_e_vt = e_vt * price_e_vt[2][0][1];
        cost_e_et = e_et * price_e_et[2][0][1];
        cost_m_obr = m_obr * price_m_obr[2][0][1];
    }
    else if (napNivo_selectVal == "VN" && nacPrik_selectVal == "omrezje" && odjSk_selectVal == "tNad6000h") {
        cost_e_mt = e_mt * price_e_mt[2][0][2];
        cost_e_vt = e_vt * price_e_vt[2][0][2];
        cost_e_et = e_et * price_e_et[2][0][2];
        cost_m_obr = m_obr * price_m_obr[2][0][2];
    }
    // V primeru, da uporabnik izbere neveljavno kombinacijo odjemne skupine nastavi stroške na 0 EUR in prikaži obvestilo
    else {
        cost_e_mt = 0;
        cost_e_vt = 0;
        cost_e_et = 0;
        cost_m_obr = 0;
        // Prikaži opozorilo - napačno izbrana kombinacija: vrsta odjema, način priključitve, nap. nivo
        odjSk.style.display = 'block';
    }


    // Skrij opozorilo - napačna izbira odjemne skupine glede na izbran način obračuna
    let odjSk_et = document.getElementById('warn-odjSk-et');
    odjSk_et.style.display = 'none';
    
    // Prikaži opozorilo - napačna izbira odjemne skupine glede na izbran način obračuna
    if (nacObr_selectVal == '1-tarif' && (odjSk_selectVal != "gospodinjstvo" && odjSk_selectVal != "bmm")) {
        // Prikaži opozorilo
        odjSk_et.style.display = 'block';
        cost_e_et = 0;
    }
    else {
        // Skrij opozorilo
        odjSk_et.style.display = 'none';
    }


    
    // Izračunaj stroške omrežnine (glede na izbrano uporabniško skupino) - stroški novega načina omrežnine
    switch (usk_selectVal) {
        case 'usk-0':
            for (let i = 0; i < 5; i++) {
                cost_e_cb.push(e_cb[i] * price_e_cb[0][i]);
                cost_m_cb.push(m_cb[i] * price_m_cb[0][i]);
                cost_ex_m_cb.push(Fex * m_ex_cb[i] * price_ex_m_cb[0][i]);
            }
            break;
        case 'usk-1':
            for (let i = 0; i < 5; i++) {
                cost_e_cb.push(e_cb[i] * price_e_cb[1][i]);
                cost_m_cb.push(m_cb[i] * price_m_cb[1][i]);
                cost_ex_m_cb.push(Fex * m_ex_cb[i] * price_ex_m_cb[1][i]);
            }
            break;
        
        case 'usk-2':
            for (let i = 0; i < 5; i++) {
                cost_e_cb.push(e_cb[i] * price_e_cb[2][i]);
                cost_m_cb.push(m_cb[i] * price_m_cb[2][i]);
                cost_ex_m_cb.push(Fex * m_ex_cb[i] * price_ex_m_cb[2][i]);
            }
            break;
        case 'usk-3':
            for (let i = 0; i < 5; i++) {
                cost_e_cb.push(e_cb[i] * price_e_cb[3][i]);
                cost_m_cb.push(m_cb[i] * price_m_cb[3][i]);
                cost_ex_m_cb.push(Fex * m_ex_cb[i] * price_ex_m_cb[3][i]);
            }
            break;
        case 'usk-4':
            for (let i = 0; i < 5; i++) {
                cost_e_cb.push(e_cb[i] * price_e_cb[4][i]);
                cost_m_cb.push(m_cb[i] * price_m_cb[4][i]);
                cost_ex_m_cb.push(Fex * m_ex_cb[i] * price_ex_m_cb[4][i]);
            }
            break;
        default:
            cost_e_cb = [0, 0, 0, 0, 0];
            cost_m_cb = [0, 0, 0, 0, 0];
            cost_ex_m_cb = [0, 0, 0, 0, 0];
    }
    
    
    // Izračunaj stroške energenta
    let cost_en_mt = price_en_mt * e_mt;
    let cost_en_vt = price_en_vt * e_vt;
    let cost_en_et = price_en_et * e_et;

    
    // AGREGACIJA STROŠKOV
    // Agregiraj stroške po ČB za omrežnino za energijo in dogovorjeno moč
    cost_e_agg_new = cost_e_cb.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    cost_m_agg_new = cost_m_cb.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    cost_ex_m_agg_new = cost_ex_m_cb.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    cost_agg_new = cost_e_agg_new + cost_m_agg_new + cost_ex_m_agg_new;

    // Agregiraj stroške po tarifah za omrežnino za energijo in dogovorjeno moč
    cost_agg_old = cost_e_mt + cost_e_vt + cost_e_et + cost_m_obr;

    // Agregiraj stroške energentov
    cost_en_agg = cost_en_mt + cost_en_vt + cost_en_et;

    // Agregiraj vse stroške
    cost_agg = cost_agg_new + cost_agg_old + cost_en_agg;

    
    // PRIKAZ STROŠKOV
    showOutputs(cost_e_cb, cost_m_cb, cost_ex_m_cb, cost_agg_new,
        cost_e_mt, cost_e_vt, cost_e_et, cost_m_obr, cost_agg_old,
        cost_en_mt, cost_en_vt, cost_en_et, cost_en_agg, cost_agg);
}



