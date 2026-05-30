const amountContainer = document.querySelector(".mortgage-amount");
const termContainer = document.querySelector(".mortgage-term");
const rateContainer = document.querySelector(".interest-rate");

const amountInput = document.getElementById("amount-input");
const termInput = document.getElementById("term-input");
const rateInput = document.getElementById("rate-input");

const amountError = document.getElementById("amount-error");
const termError = document.getElementById("term-error");
const rateError = document.getElementById("rate-error");
const mortgageTypeError = document.getElementById("mortgage-type-error");

const monthlyResult = document.getElementById("monthly-amount");
const totalResult = document.getElementById("total-amount");

const emptyResultDisplay = document.getElementById("empty-result-display");
const outputtedResultDisplay = document.getElementById("outputted-result-display");

const calculateBtn = document.getElementById("calculate-btn");
const clearAllBtn = document.getElementById("clear-all-btn");

function calculateRepayment(amount, rate, years) {
    const r = rate / 100 / 12;
    const n = years * 12;

    const monthly = amount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = monthly * n;

    return {monthly, total};
}

function calculateInterestOnly(amount, rate, years) {
    const monthly = amount * (rate / 100) / 12;
    const total = monthly * years * 12;

    return {monthly, total};
}

function formatCurrency(number) {
    return number.toLocaleString("en-GB", {
        style: "currency",
        currency: "GBP"
    });
}

function updateDisplay (amount, total) {
    emptyResultDisplay.classList.add("hidden");
    outputtedResultDisplay.classList.remove("hidden");

    monthlyResult.textContent = formatCurrency(amount);
    totalResult.textContent = formatCurrency(total);
}

calculateBtn.addEventListener('click', () => {
    let hasErrors = false;

    amountError.classList.add("hidden");
    termError.classList.add("hidden");
    rateError.classList.add("hidden");
    mortgageTypeError.classList.add("hidden");

    amountContainer.classList.remove("error");
    termContainer.classList.remove("error");
    rateContainer.classList.remove("error");

    const mortgageType = document.querySelector('input[name="mortgage-type"]:checked');

    if (!amountInput.value) {
        amountError.classList.remove("hidden");
        amountContainer.classList.add("error");
        hasErrors = true;
    }

    if (!termInput.value) {
        termError.classList.remove("hidden");
        termContainer.classList.add("error");
        hasErrors = true;
    }

    if (!rateInput.value) {
        rateError.classList.remove("hidden");
        rateContainer.classList.add("error");
        hasErrors = true;
    }

    if (!mortgageType) {
        mortgageTypeError.classList.remove("hidden");
        hasErrors = true;
    }

    if (hasErrors) return;

    let result;

    if (mortgageType.value === "repayment") {
        result = calculateRepayment(amountInput.value, rateInput.value, termInput.value);
    } else {
        result = calculateInterestOnly(amountInput.value, rateInput.value, termInput.value);
    }
    
    updateDisplay(result.monthly, result.total);
});

clearAllBtn.addEventListener('click', () => {
    amountInput.value = "";
    termInput.value = "";
    rateInput.value = "";

    document.querySelectorAll('input[name="mortgage-type"]').forEach(radio => {
        radio.checked = false;
    });

    amountError.classList.add("hidden");
    termError.classList.add("hidden");
    rateError.classList.add("hidden");
    mortgageTypeError.classList.add("hidden");

    amountContainer.classList.remove("error");
    termContainer.classList.remove("error");
    rateContainer.classList.remove("error");

    monthlyResult.textContent = "";
    totalResult.textContent = "";

    emptyResultDisplay.classList.remove("hidden");
    outputtedResultDisplay.classList.add("hidden");
});