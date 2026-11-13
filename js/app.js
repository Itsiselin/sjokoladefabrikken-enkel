const chocolates = {
    milk: { name: 'Melkesjokolade', color: '#895034' },
    dark: { name: 'Mørk sjokolade', color: '#41251e' },
    white: { name: 'Hvit sjokolade', color: '#eedcb1' },
    pink: { name: 'Rosa sjokolade', color: '#cf8991' }
};
const toppings = {
    raspberry: { name: 'Bringebær', price: 15, symbol: '●', color: '#ce4660' },
    hazelnut: { name: 'Hasselnøtter', price: 15, symbol: '◆', color: '#c79862' },
    caramel: { name: 'Karamell', price: 10, symbol: '■', color: '#d99b40' },
    candy: { name: 'Fargerikt godteri', price: 10, symbol: '●', color: '#78a58d' }
};
const form = document.getElementById('configurator');
const toppingInputs = [...form.querySelectorAll('[name="topping"]')];
const money = amount => `${amount} kr`;
function getSelection() {
    return {
        chocolate: form.querySelector('[name="chocolate"]:checked').value,
        toppings: toppingInputs.filter(input => input.checked).map(input => input.value),
        name: document.getElementById('name').value.trim(),
        gift: document.getElementById('gift').checked
    };
}
function calculatePrice(selection) {
    return 189 + selection.toppings.reduce((sum, key) => sum + toppings[key].price, 0) + (selection.gift ? 25 : 0);
}
function updatePreview() {
    const selection = getSelection();
    toppingInputs.forEach(input => { input.disabled = selection.toppings.length >= 3 && !input.checked; });
    document.getElementById('topping-message').textContent = `${selection.toppings.length} av 3 toppinger valgt`;
    document.getElementById('bar').style.setProperty('--chocolate', chocolates[selection.chocolate].color);
    document.getElementById('preview-name').textContent = selection.name || 'Din sjokolade';
    document.getElementById('preview-base').textContent = chocolates[selection.chocolate].name;
    document.getElementById('preview-toppings').textContent = selection.toppings.map(key => toppings[key].name).join(', ') || 'Uten topping';
    document.getElementById('price').textContent = money(calculatePrice(selection));
    const overlay = document.getElementById('topping-preview');
    overlay.replaceChildren();
    selection.toppings.forEach((key, group) => {
        for (let i = 0; i < 8; i++) {
            const piece = document.createElement('span');
            piece.textContent = toppings[key].symbol;
            piece.style.color = toppings[key].color;
            piece.style.left = `${10 + ((i * 31 + group * 17) % 78)}%`;
            piece.style.top = `${8 + ((i * 19 + group * 27) % 80)}%`;
            overlay.append(piece);
        }
    });
}

let orders = [];
function textElement(tag, text) {
    const element = document.createElement(tag);
    element.textContent = text;
    return element;
}
form.addEventListener('input', updatePreview);
form.addEventListener('submit', event => {
    event.preventDefault();
    document.getElementById('confirmation').hidden = true;
    const selection = getSelection();
    const error = document.getElementById('error');
    error.hidden = true;
    if (!selection.name || selection.name.length > 30 || selection.toppings.length > 3) {
        error.textContent = 'Skriv et navn på 1–30 tegn og velg maks tre toppinger.';
        error.hidden = false; return;
    }
    orders = [{ ...selection, price: calculatePrice(selection) }];
    document.getElementById('builder').hidden = true;
    document.getElementById('professor').hidden = true;
    const confirmation = document.getElementById('confirmation');
    confirmation.hidden = false; confirmation.focus(); confirmation.scrollIntoView({ behavior: 'smooth' });
});
document.getElementById('new-order').addEventListener('click', () => {
    form.reset(); updatePreview(); document.getElementById('confirmation').hidden = true;
    document.getElementById('builder').hidden = false;
    document.getElementById('professor').hidden = false;
    document.getElementById('builder').scrollIntoView({ behavior: 'smooth' });
    form.querySelector('[name="chocolate"]').focus({ preventScroll: true });
});
updatePreview();
