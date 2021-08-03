'use strict'

var gTrans = {
    title: {
        en: 'Book Shop',
        he: 'חנות ספרים'
    },
    subtitle: {
        en: 'MVC - Model-View-Controller',
        es: 'MVC - Modelo-Vista-Controlador',
        he: 'מודל - ויו - קונטרולר',
    },
    id: {
        en: 'Id',
        he: 'מק"ט'
    },
    name: {
        en: 'Title',
        he: 'שם הספר',
    },
    price: {
        en: 'Price',
        he: 'מחיר'
    },
    actions: {
        en: 'Actions',
        he: 'פעולות',
    },
    rate: {
        en: 'Rating',
        he: 'דירוג',
    },
    prev: {
        en: 'Prev',
        he: 'אחורה',
    },
    next: {
        en: 'Next',
        he: 'קדימה',
    },
    sure: {
        en: 'Are you sure?',
        es: 'Estas Seguru?',
        he: 'בטוח נשמה?',
    },
    add: {
        en: 'Add New Book',
        he: 'הוספת ספר'
    },
    update: {
        en: 'Update',
        he: 'עדכן'
    },
    delete: {
        en: 'Delete',
        he: 'מחק'
    },
    url: {
        en: 'Url',
        he: 'כתובת תמונה'
    },
    bookInput: {
        en: 'Book Name',
        he: 'שם הספר'
    },
    priceInput: {
        en: 'Price',
        he: 'מחיר'
    },
    goBack: {
        en: 'Go Back',
        he: 'חזור'
    },
    submit: {
        en: 'Submit',
        he: 'אשר'
    },
    read: {
        en: 'Read',
        he: 'קריאה'
    }
}

var gCurrLang = 'en';

function getTrans(transKey) {
    // TODO: if key is unknown return 'UNKNOWN'
    var keyTrans = gTrans[transKey]
    if (!keyTrans) return 'UNKNOWN'

    // TODO: get from gTrans
    var txt = keyTrans[gCurrLang]

    // TODO: If translation not found - use english
    if (!txt) txt = keyTrans['en']

    return txt;
}

function doTrans() {
    // TODO: 
    // var els = document.querySelectorAll('[data-trans]'
    // for each el:
    //    get the data-trans and use getTrans to replace the innerText 
    var els = document.querySelectorAll('[data-trans]')

    els.forEach(function (el) {
        var txt = getTrans(el.dataset.trans)
        console.dir(el)
        if (el.nodeName === 'INPUT') {
            el.setAttribute('placeholder', txt)
        } else {
            el.innerText = txt
        }
    })

    // ITP: support placeholder    
}

function setLang(lang) {
    gCurrLang = lang;
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
}

function formatDate(time) {

    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}