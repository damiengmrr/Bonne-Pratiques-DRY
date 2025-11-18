const amountInput = document.querySelector('#order-amount');
const shippingSelect = document.querySelector('#shipping-type');
const calcButton = document.querySelector('#calc-btn');
const resultEl = document.querySelector('#result');

function formatPrice(value) {
  return value.toFixed(2).replace('.', ',') + ' €';
}

// Version OCP : mapping de stratégies par type de livraison
const SHIPPING_STRATEGIES = {
  standard: (orderAmount) => (orderAmount >= 50 ? 0 : 4.99),
  express: (orderAmount) => (orderAmount >= 100 ? 0 : 9.99),
  pickup: (orderAmount) => (orderAmount >= 30 ? 0 : 2.99)
};

function calculateShippingCost(type, orderAmount) {
  const strategy = SHIPPING_STRATEGIES[type];

  if (!strategy) {
    return 0;
  }

  return strategy(orderAmount);
}

calcButton.addEventListener('click', () => {
  const type = shippingSelect.value;
  const amount = Number(amountInput.value) || 0;

  const shippingCost = calculateShippingCost(type, amount);
  resultEl.textContent =
    'Frais de livraison : ' + formatPrice(shippingCost);
});