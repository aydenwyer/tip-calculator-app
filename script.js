// Create variables for the inputs and buttons

const billInput = document.getElementById('billInput');
const personCount = document.getElementById('personCount');
const tipSelecter = document.querySelectorAll('#selectTip');
const customTip = document.getElementById('enterTip');
const resetButton = document.getElementById('clearAll');

// Store bill input value

var billValue = 0;

billInput.addEventListener('blur', (e) => {
    billValue = Number(e.target.value);
})

// Select tip amount

var tipAmount = 0;

tipSelecter.forEach((selecter) => {
    selecter.addEventListener('click', () => {
        removeClicked();
        selecter.classList.add('clicked');
        var chosenPercentage = selecter.innerHTML;
        tipAmount = Number(chosenPercentage.slice(0, -1)) / 100;
    })
})

customTip.addEventListener('blur', (e) => {
    removeClicked();
    tipAmount = e.target.value / 100;
    if (customTip.value != "") {
        customTip.value += "%";
    }
})

// Get people count

var personValue = 1;

personCount.addEventListener('blur', (e) => {
    personValue = Number(e.target.value);

    if (personValue === 0) {
        document.getElementById('errorMessage').style.display = "block";
        personCount.style.outline = "2px solid rgb(255, 145, 0)";
        personValue = 1;
    } else {
        document.getElementById('errorMessage').style.display = "none"
        personCount.style.outline = "";
    }
})

// Calculations

const totalTipAmountText = document.getElementById('totalTipAmount'); 
const totalAmountPerPersonText = document.getElementById('totalAmountPerPerson');
const currencyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

window.addEventListener('click', () => {
    var totalTipAmount = tipAmount * billValue / personValue;
    totalTipAmountText.innerHTML = currencyFormat.format(totalTipAmount);
    totalAmountPerPersonText.innerHTML = currencyFormat.format(totalTipAmount + (billValue / personValue));

    if (tipAmount || billValue !== 0) {
        resetButton.classList.remove('disabled');
        resetAll();
    } else {
        resetButton.classList.add('disabled');
    }
})

// Functions

function removeClicked() {
    for (elem of document.getElementsByClassName("clicked")) {
        elem.classList.remove("clicked");
    }
}

function resetAll() {
    resetButton.addEventListener('click', () => {
        billInput.value = "";
        personCount.value = 1;
        customTip.value = "";
        billValue = 0;
        tipAmount = 0;
        personValue = 1;
        tipSelecter.forEach((selecter) => {
            removeClicked();
            selecter.value = 0;
        })
    })
}



