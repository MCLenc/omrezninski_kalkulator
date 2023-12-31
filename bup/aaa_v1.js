// EventListener funkcije - te so na voljo po tem, ko se naloži DOM
document.addEventListener('DOMContentLoaded', function () {

    // Add an event listener for calculating expenses
    const calculate_expenses_button = document.getElementById('calculate_button');
    if (calculate_expenses_button) {
        calculate_expenses_button.addEventListener('click', calculateExpenses);
    }
    

    // Add an event listener for clearing display
    const clear_display_button = document.getElementById('clear_display');
    if (clear_display_button) {
        clear_display_button.addEventListener('click', clearDisplay);
    }
    

    // Pridobi vrednosti div elementov za vt, mt, et
    var radioButtons = document.querySelectorAll('input[name="nacObr"]');
    var et_elements = document.getElementsByClassName('et');
    var mt_elements = document.getElementsByClassName('mt');
    var vt_elements = document.getElementsByClassName('vt');


    // Prikaži VT/MT ali ET elemente glede na izbiro načina obračuna
    radioButtons.forEach(function (radioButton) {
        // Add an event listener to each radio button
        radioButton.addEventListener('change', function () {
            // Preveri izbiro gumba za način obračuna
            if (radioButton.value === '1-tarif') {
                // Prikaži ET elemente
                for (var i=0; i<et_elements.length; i+=1){
                    et_elements[i].style.display = 'block';
                    mt_elements[i].style.display = 'none';
                    vt_elements[i].style.display = 'none';
                }
                // Nastavi vse vnose uporabnike za VT/MT elemente na 0
                document.getElementById('price-en-mt').value = 0;
                document.getElementById('price-en-vt').value = 0;
                document.getElementById('e-mt').value = 0;
                document.getElementById('e-vt').value = 0;
            }
            else if (radioButton.value === '2-tarif') {
                // Show VT/MT
                for (var i=0; i<et_elements.length; i+=1){
                    et_elements[i].style.display = 'none';
                    mt_elements[i].style.display = 'block';
                    vt_elements[i].style.display = 'block';
                }
                // Nastavi vse vnose uporabnike za ET elemente na 0
                document.getElementById('price-en-et').value = 0;
                document.getElementById('e-et').value = 0;
            }
        });
    });


    // Pridobi vrednosti checkbox-a za upoštevanje presežnih moči
    let m_ex_chkBox = document.getElementById('m-ex-choice');

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
    // console.log(new Date().getFullYear());
    document.getElementById(`footer-year`).innerHTML = new Date().getFullYear();
});





function clearDisplay() {
    // Ponovno naloži spletno stran - nastavitve vseh gumbov se bodo resetirale, polja bodo šla na 0.
    location.reload();
    // for (let i = 1; i < 6; i++) {
    //     document.getElementById(`e-cb${i}`).value = 0;
    //     document.getElementById(`m-cb${i}`).value = 0;
    //     document.getElementById(`m-ex-cb${i}`).value = 0;
    //     document.getElementById(`expense-e-cb${i}`).value = 0;
    //     document.getElementById(`expense-m-cb${i}`).value = 0;
    //     document.getElementById(`expense-m-ex-cb${i}`).value = 0;
    // }
    
    // document.getElementById('e-mt').value = 0;
    // document.getElementById('e-vt').value = 0;
    // document.getElementById('e-et').value = 0;
    // document.getElementById('m-obr').value = 0;

    // document.getElementById('price-en-mt').value = 0;
    // document.getElementById('price-en-vt').value = 0;
    // document.getElementById('price-en-et').value = 0;

    // document.getElementById('expense-e-mt').value = 0;
    // document.getElementById('expense-e-vt').value = 0;
    // document.getElementById('expense-e-et').value = 0;
    // document.getElementById('expense-m-obr').value = 0;

    // document.getElementById('expense-en-mt').value = 0;
    // document.getElementById('expense-en-vt').value = 0;
    // document.getElementById('expense-en-et').value = 0;

    // document.getElementById('expense-e-omr-new').innerHTML = '0';
    // document.getElementById('expense-e-omr-old').innerHTML = '0';
    // document.getElementById('expense-e-en').innerHTML = '0';
    // document.getElementById('expense-total').innerHTML = '0';

    

    // document.getElementById('usk-0').checked = true;
    // odjSk-gospodinjstvo
    // nacPrik-om
    // napNivo-NN
}

function calculateExpenses() {
    
    // Polji za količino porabljene energije in dogovorjene moči po ČB (vnos uporabnika)
    let e_cb = [];
    let m_cb = [];
    let m_ex_cb = [];
    
    // Pridobi vnos uporabnika porabljena energija in dogovorjene moči po ČB
    for (let i = 1; i < 6; i++) {
        
        let e_cbx = parseFloat(document.getElementById(`e-cb${i}`).value);
        if (isNaN(e_cbx))    // Preveri, če je uporabnik pustil polje prazno
        {e_cb.push(0);}
        else
        {e_cb.push(e_cbx);}
        
        let m_cbx = parseFloat(document.getElementById(`m-cb${i}`).value);
        if (isNaN(m_cbx))
        {m_cb.push(0);}
        else
        {m_cb.push(m_cbx);}

        let m_ex_cbx = parseFloat(document.getElementById(`m-ex-cb${i}`).value);
        if (isNaN(m_ex_cbx))
        {m_ex_cb.push(0);}
        else
        {m_ex_cb.push(m_ex_cbx);}
        
        // e_cb.push(parseFloat(document.getElementById(`e-cb${i}`).value));
        // m_cb.push(parseFloat(document.getElementById(`m-cb${i}`).value));
        // m_ex_cb.push(parseFloat(document.getElementById(`m-ex-cb${i}`).value));
    }
    console.log(m_ex_cb);
    
    // Pridobi vnos uporabnika porabljena energija in dogovorjene moči po tarifah
    let e_mt = parseFloat(document.getElementById('e-mt').value);
    if (isNaN(e_mt))
    {e_mt = 0;}

    let e_vt = parseFloat(document.getElementById('e-vt').value);
    if (isNaN(e_vt))
    {e_vt = 0;}

    let e_et = parseFloat(document.getElementById('e-et').value);
    if (isNaN(e_et))
    {e_et = 0;}

    let m_obr = parseFloat(document.getElementById('m-obr').value);
    if (isNaN(m_obr))
    {m_obr = 0;}

    

    // Cena omrežnine za energijo [uporabniska_skupina][casovni_blok]
    const price_e_cb = [[1, 2, 3.14, 4, 5], [1, 3, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5]];
    // Cena omrežnine za dogovorjeno moc [uporabniska_skupina][casovni_blok
    const price_m_cb = [[11, 12, 13, 14, 15], [11, 13, 13, 14, 15], [11, 12, 13, 14, 15], [11, 12, 13, 14, 15], [11, 12, 13, 14, 15]];
    // Cena omrežnine za presezno moc [uporabniska_skupina][casovni_blok
    const price_ex_m_cb = [[110, 120, 130, 140, 150], [110, 120, 130, 140, 150], [110, 120, 130, 140, 150], [110, 120, 130, 140, 150], [110, 120, 130, 140, 150]];

    // Cena omrežnine za energijo [napetostni_nivo][nacin_prikljucitve][odjemna_skupina] (za MT/VT/ET)
    const price_e_vt = [[[1, 2, 3, 4], [30, 40]],
                        [[300, 400], [3000, 4000]]];
    const price_e_mt = [[[1, 2, 3, 4], [30, 40]],
                        [[300, 400], [3000, 4000]]];
    const price_e_et = [[[1, 2, 3, 4], [30, 40]],
                        [[300, 400], [3000, 4000]]];
    const price_m_obr = [[[1, 2, 3, 4], [30, 40]],
                         [[300, 400], [3000, 4000]]];

    // Pridobi vnos uporabnika cena energenta
    let price_en_mt = parseFloat(document.getElementById('price-en-mt').value);
    if (Number.isNaN(price_en_mt))
    {price_en_mt = 0;}

    let price_en_vt = parseFloat(document.getElementById('price-en-vt').value);
    if (Number.isNaN(price_en_vt))
    {price_en_vt = 0;}
    
    let price_en_et = parseFloat(document.getElementById('price-en-et').value);
    if (Number.isNaN(price_en_et))
    {price_en_et = 0;}

    // Polja za izračun stroškov omrežnine po ČB (izhodni rezultat)
    let cost_e_cb = [];
    let cost_m_cb = [];
    let cost_ex_m_cb = [];

    // Polja za izračun stroškov omrežnine po tarifah (izhodni rezultat)
    let cost_e_vt = null;
    let cost_e_mt = null;
    let cost_e_et = null;
    let cost_m_obr = null;

    
    



    // name = "usk" value="usk-0 / usk-1 / ..."
    // name="nacObr" value="1-tarif / 2-tarif"
    // name="odjSk" value="gospodinjstvo / bmm / tPod2500h / tNad2500h"
    // name="nacPrik" value="omrezje / zbiralke"
    // name="napNivo" value="NN / SN"
    
    // Skrij opozorilo - napačno izbrana kombinacija: vrsta odjema, način priključitve, nap. nivo
    let odjSk = document.getElementById('warn-odjSk');
    odjSk.style.display = 'none';

    const usk_selectVal = document.querySelector('input[name="usk"]:checked').value;
    const odjSk_selectVal = document.querySelector('input[name="odjSk"]:checked').value;
    const nacPrik_selectVal = document.querySelector('input[name="nacPrik"]:checked').value;
    const napNivo_selectVal = document.querySelector('input[name="napNivo"]:checked').value;
    

    // Izračunaj stroške omrežnine glede za napetostni nivo NN
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
    else if (napNivo_selectVal == "NN" && nacPrik_selectVal == "omrezje" && odjSk_selectVal == "tPod2500h") {
        cost_e_mt = e_mt * price_e_mt[0][0][2];
        cost_e_vt = e_vt * price_e_vt[0][0][2];
        cost_e_et = e_et * price_e_et[0][0][2];
        cost_m_obr = m_obr * price_m_obr[0][0][2];
    }
    else if (napNivo_selectVal == "NN" && nacPrik_selectVal == "omrezje" && odjSk_selectVal == "tNad2500h") {
        cost_e_mt = e_mt * price_e_mt[0][0][3];
        cost_e_vt = e_vt * price_e_vt[0][0][3];
        cost_e_et = e_et * price_e_et[0][0][3];
        cost_m_obr = m_obr * price_m_obr[0][0][3];
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
    // Izračunaj stroške omrežnine glede za napetostni nivo SN
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
    else {
        cost_e_mt = 0;
        cost_e_vt = 0;
        cost_e_et = 0;
        cost_m_obr = 0;
        // Prikaži opozorilo - napačno izbrana kombinacija: vrsta odjema, način priključitve, nap. nivo
        odjSk.style.display = 'block';
    }

    



    // Izračunaj stroške omrežnine glede na izbrano uporabniško skupino
    switch (usk_selectVal) {
        case 'usk-0':
            for (let i = 0; i < 5; i++) {
                cost_e_cb.push(e_cb[i] * price_e_cb[0][i]);
                cost_m_cb.push(m_cb[i] * price_m_cb[0][i]);
                cost_ex_m_cb.push(m_ex_cb[i] * price_ex_m_cb[0][i]);
            }
            break;
        case 'usk-1':
            for (let i = 0; i < 5; i++) {
                cost_e_cb.push(e_cb[i] * price_e_cb[1][i]);
                cost_m_cb.push(m_cb[i] * price_m_cb[1][i]);
                cost_ex_m_cb.push(m_ex_cb[i] * price_ex_m_cb[1][i]);
            }
            break;
        
        case 'usk-2':
            for (let i = 0; i < 5; i++) {
                cost_e_cb.push(e_cb[i] * price_e_cb[2][i]);
                cost_m_cb.push(m_cb[i] * price_m_cb[2][i]);
                cost_ex_m_cb.push(m_ex_cb[i] * price_ex_m_cb[2][i]);
            }
            break;
        case 'usk-3':
            for (let i = 0; i < 5; i++) {
                cost_e_cb.push(e_cb[i] * price_e_cb[3][i]);
                cost_m_cb.push(m_cb[i] * price_m_cb[3][i]);
                cost_ex_m_cb.push(m_ex_cb[i] * price_ex_m_cb[3][i]);
            }
            break;
        case 'usk-4':
            for (let i = 0; i < 5; i++) {
                cost_e_cb.push(e_cb[i] * price_e_cb[4][i]);
                cost_m_cb.push(m_cb[i] * price_m_cb[4][i]);
                cost_ex_m_cb.push(m_ex_cb[i] * price_ex_m_cb[4][i]);
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
    // Prikaži parcialne stroške omrežnine po ČB
    for (let i = 1; i < 6; i++) {
        document.getElementById(`expense-e-cb${i}`).value = cost_e_cb[i-1];
        document.getElementById(`expense-m-cb${i}`).value = cost_m_cb[i-1];
        document.getElementById(`expense-m-ex-cb${i}`).value = cost_ex_m_cb[i-1];
    }

   

    let cost_agg_new_formatted = cost_agg_new.toLocaleString('sl-SI', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 });  // Pretvori izračun v lokalni zapis decimalnih številk ("," za decimalno ločilo, "." za tisočice)
    document.getElementById('expense-e-omr-new').innerHTML = cost_agg_new_formatted;


    // Prikaži parcialne stroške omrežnine po tarifah
    document.getElementById('expense-e-mt').value = cost_e_mt;
    document.getElementById('expense-e-vt').value = cost_e_vt;
    document.getElementById('expense-e-et').value = cost_e_et;
    document.getElementById('expense-m-obr').value = cost_m_obr;

    // Prikaži skupne stroške omrežnine - star način
    let cost_agg_old_formatted = cost_agg_old.toLocaleString('sl-SI', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('expense-e-omr-old').innerHTML = cost_agg_old_formatted;


    // Prikaži parcialne stroške energenta
    document.getElementById('expense-en-mt').value = cost_en_mt;
    document.getElementById('expense-en-vt').value = cost_en_vt;
    document.getElementById('expense-en-et').value = cost_en_et;

    // Prikaži skupne stroške energentov
    let cost_en_agg_formatted = cost_en_agg.toLocaleString('sl-SI', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('expense-e-en').innerHTML = cost_en_agg_formatted;


    // Prikaži skupni strošek celotnega računa
    let cost_agg_formatted = cost_agg.toLocaleString('sl-SI', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('expense-total').innerHTML = cost_agg_formatted;
    
   

}