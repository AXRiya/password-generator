const resultEl = document.getElementById('passwordResult');
const lengthEl = document.getElementById('lengthSlider');
const lengthValueEl = document.getElementById('lengthValue');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');

const randomFunc = {
    lower: () => String.fromCharCode(Math.floor(Math.random() * 26) + 97),
    upper: () => String.fromCharCode(Math.floor(Math.random() * 26) + 65),
    number: () => String.fromCharCode(Math.floor(Math.random() * 10) + 48),
    symbol: () => {
        const symbols = '!@#$%^&*(){}[]=<>/,.';
        return symbols[Math.floor(Math.random() * symbols.length)];
    }
};

// Update length display
lengthEl.addEventListener('input', (e) => {
    lengthValueEl.innerText = e.target.value;
});

// Generate Event
generateBtn.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.value = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);

    if (typesCount === 0) return '';

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }

    return generatedPassword.slice(0, length);
}

// ... after calling generatePassword() ...

const password = resultEl.value;
updateStrength(password);

function updateStrength(password) {
    const strengthBar = document.getElementById('strengthBar');
    const strengthLevel = document.getElementById('strengthLevel');
    let strength = 0;

    if (password.length > 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;

    strengthBar.style.width = strength + "%";

    if (strength <= 25) {
        strengthBar.style.backgroundColor = "#ef4444"; // Red
        strengthLevel.innerText = "Weak";
    } else if (strength <= 50) {
        strengthBar.style.backgroundColor = "#f59e0b"; // Orange
        strengthLevel.innerText = "Medium";
    } else if (strength <= 75) {
        strengthBar.style.backgroundColor = "#38bdf8"; // Blue
        strengthLevel.innerText = "Strong";
    } else {
        strengthBar.style.backgroundColor = "#22c55e"; // Green
        strengthLevel.innerText = "Very Strong";
    }
}


// Copy to Clipboard
copyBtn.addEventListener('click', () => {
    const password = resultEl.value;
    if (!password) return;
    
    navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!');
});