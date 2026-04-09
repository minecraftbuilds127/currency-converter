const API_KEY = b4a1e20e016dcdf09a1b9d96;

const currencies = [
  'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR', 'MXN',
  'BRL', 'KRW', 'SGD', 'HKD', 'NOK', 'SEK', 'DKK', 'NZD', 'ZAR', 'AED'
];

const fromSelect = document.getElementById('from-currency');
const toSelect = document.getElementById('to-currency');
const convertBtn = document.getElementById('convert-btn');
const resultDiv = document.getElementById('result');
const amountInput = document.getElementById('amount');

// Populate both dropdowns with currencies
currencies.forEach(currency => {
  const option1 = document.createElement('option');
  option1.value = currency;
  option1.textContent = currency;
  fromSelect.appendChild(option1);

  const option2 = document.createElement('option');
  option2.value = currency;
  option2.textContent = currency;
  toSelect.appendChild(option2);
});

// Set defaults: USD -> JPY (since you're Japan-focused lol)
fromSelect.value = 'USD';
toSelect.value = 'JPY';

// Convert function
async function convert() {
  const amount = parseFloat(amountInput.value);
  const from = fromSelect.value;
  const to = toSelect.value;

  if (isNaN(amount) || amount <= 0) {
    resultDiv.textContent = 'Please enter a valid amount.';
    return;
  }

  resultDiv.textContent = 'Converting...';

  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from}/${to}/${amount}`
    );

    const data = await response.json();

    if (data.result === 'success') {
      const converted = data.conversion_result.toFixed(2);
      const rate = data.conversion_rate.toFixed(4);
      resultDiv.innerHTML = `
        <div>
          <div style="font-size:28px; font-weight:700; color:#e94560;">
            ${converted} ${to}
          </div>
          <div style="font-size:13px; color:#8892b0; margin-top:8px;">
            1 ${from} = ${rate} ${to}
          </div>
        </div>
      `;
    } else {
      resultDiv.textContent = 'Conversion failed. Check your API key.';
    }

  } catch (error) {
    resultDiv.textContent = 'Error fetching rates. Check your connection.';
  }
}

convertBtn.addEventListener('click', convert);
