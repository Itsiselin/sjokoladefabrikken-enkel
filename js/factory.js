const gateButton = document.getElementById('open-gate');
gateButton.addEventListener('click', () => {
    document.getElementById('factory-scene').classList.add('open');
    document.getElementById('workshop').hidden = false;
    gateButton.setAttribute('aria-expanded', 'true');
    gateButton.textContent = 'Velkommen inn →';
    document.getElementById('gate-message').textContent = 'Velg din sjokolade nedenfor.';
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    setTimeout(() => document.getElementById('builder').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }), reduced ? 0 : 1250);
});
let station = 0;
const fields = [...form.querySelectorAll('fieldset')];
function showStation(index) {
    station = Math.max(0, Math.min(2, index));
    fields.forEach((field, i) => { field.hidden = i !== station; });
    document.querySelectorAll('.station-nav li').forEach((item, i) => {
        item.classList.toggle('active', i === station);
        if (i === station) item.setAttribute('aria-current', 'step'); else item.removeAttribute('aria-current');
    });
    document.getElementById('prev-station').hidden = station === 0;
    document.getElementById('next-station').hidden = station === 2;
    document.getElementById('finish').hidden = station !== 2;
}
document.getElementById('prev-station').addEventListener('click', () => { showStation(station - 1); fields[station].querySelector('input').focus(); });
document.getElementById('next-station').addEventListener('click', () => { showStation(station + 1); fields[station].querySelector('input').focus(); });
form.addEventListener('keydown', event => {
    if (event.key === 'Enter' && event.target.tagName === 'INPUT' && station < 2) { event.preventDefault(); showStation(station + 1); }
});
const recipes = {
    sweet: { chocolate: 'milk', toppings: ['caramel', 'candy'], name: 'Myk karamellglede', reason: 'Melkesjokolade gir en rund base. Karamell og godteri gjør den søt og leken.' },
    fresh: { chocolate: 'white', toppings: ['raspberry'], name: 'Bringebærdrøm', reason: 'Hvit sjokolade og bringebær kombinerer sødme med en frisk bærsmak.' },
    nutty: { chocolate: 'dark', toppings: ['hazelnut', 'caramel'], name: 'Mørk og knasende', reason: 'Mørk sjokolade, hasselnøtter og karamell gir kontrast mellom fylde, knas og sødme.' },
    surprise: { chocolate: 'pink', toppings: ['raspberry', 'candy'], name: 'Rosa overraskelse', reason: 'Rosa sjokolade med bringebær og fargerikt godteri gir en fruktig og leken kombinasjon.' }
};
let suggestedRecipe;
document.querySelectorAll('[data-taste]').forEach(button => button.addEventListener('click', () => {
    suggestedRecipe = recipes[button.dataset.taste];
    document.querySelectorAll('[data-taste]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    const output = document.getElementById('professor-answer');
    output.replaceChildren(textElement('strong', suggestedRecipe.name), textElement('p', suggestedRecipe.reason), textElement('p', `Forslag: ${calculatePrice({ ...suggestedRecipe, gift: false })} kr uten gaveinnpakning.`));
    document.getElementById('apply-taste').hidden = false;
}));
document.getElementById('apply-taste').addEventListener('click', () => {
    if (!suggestedRecipe) return;
    form.querySelector(`[name="chocolate"][value="${suggestedRecipe.chocolate}"]`).checked = true;
    toppingInputs.forEach(input => { input.checked = suggestedRecipe.toppings.includes(input.value); });
    if (!document.getElementById('name').value.trim()) document.getElementById('name').value = suggestedRecipe.name;
    updatePreview(); showStation(0);
    document.getElementById('professor').open = false;
    document.getElementById('builder').scrollIntoView({ behavior: 'smooth' });
});
const canvas = document.getElementById('result-image');
const ctx = canvas.getContext('2d');
let imageFile = null;
function roundedRect(x, y, width, height, radius, color) {
    ctx.fillStyle = color; ctx.beginPath(); ctx.roundRect(x, y, width, height, radius); ctx.fill();
}
function centeredText(text, y, size, font, color, maxWidth = 940) {
    ctx.font = `${size}px ${font}`;
    while (ctx.measureText(text).width > maxWidth && size > 18) { size -= 2; ctx.font = `${size}px ${font}`; }
    ctx.fillStyle = color; ctx.textAlign = 'center'; ctx.fillText(text, 540, y);
}
function drawResult(order) {
    ctx.clearRect(0, 0, 1080, 1080); ctx.fillStyle = '#ede2d3'; ctx.fillRect(0, 0, 1080, 1080);
    ctx.strokeStyle = '#ecc784'; ctx.lineWidth = 3; ctx.strokeRect(30, 30, 1020, 1020);
    centeredText('SJOKOLADEFABRIKKEN', 100, 27, 'Arial', '#8b2f2f');
    centeredText(order.name, 177, 57, 'Georgia', '#3e2723');
    ctx.save(); ctx.shadowColor = '#242b3338'; ctx.shadowBlur = 35; ctx.shadowOffsetY = 20;
    roundedRect(320, 230, 440, 590, 25, chocolates[order.chocolate].color); ctx.restore();
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 3; col++) {
            const x = 339 + col * 138, y = 250 + row * 139;
            const gradient = ctx.createLinearGradient(x, y, x + 123, y + 123);
            gradient.addColorStop(0, '#ffffff2e'); gradient.addColorStop(1, '#0000002e');
            roundedRect(x, y, 124, 124, 11, gradient);
            ctx.strokeStyle = '#ffffff25'; ctx.lineWidth = 3; ctx.strokeRect(x + 9, y + 9, 106, 106);
        }
    }
    order.toppings.forEach((key, group) => {
        for (let i = 0; i < 10; i++) {
            const x = 354 + ((i * 97 + group * 67) % 367), y = 272 + ((i * 113 + group * 137) % 493);
            ctx.save(); ctx.shadowColor = '#0005'; ctx.shadowBlur = 4; ctx.shadowOffsetY = 3;
            ctx.fillStyle = toppings[key].color; ctx.textAlign = 'center'; ctx.font = '42px Arial'; ctx.fillText(toppings[key].symbol, x, y); ctx.restore();
        }
    });
    centeredText(chocolates[order.chocolate].name, 887, 31, 'Georgia', '#3e2723');
    centeredText(order.toppings.map(key => toppings[key].name).join(' · ') || 'Ren sjokolade. Helt din.', 937, 25, 'Arial', '#8b2f2f');
    centeredText('LAGET AV MEG · DIGITAL SJOKOLADEPROTOTYPE', 1005, 18, 'Arial', '#8b2f2f');
    imageFile = null;
    canvas.toBlob(blob => {
        if (blob) imageFile = new File([blob], 'min-sjokolade.png', { type: 'image/png' });
    }, 'image/png');
}
form.addEventListener('submit', () => {
    if (!document.getElementById('confirmation').hidden && orders.length) drawResult(orders[0]);
});
document.getElementById('new-order').addEventListener('click', () => { showStation(0); form.querySelector('[name="chocolate"]').focus({ preventScroll: true }); });
document.getElementById('download-image').addEventListener('click', () => {
    if (!imageFile) { document.getElementById('share-message').textContent = 'Bildet klargjøres. Prøv igjen om et øyeblikk.'; return; }
    const url = URL.createObjectURL(imageFile); const link = document.createElement('a');
    link.href = url; link.download = 'min-sjokolade.png'; document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    document.getElementById('share-message').textContent = 'Bildet er lastet ned. Åpne Instagram eller Facebook og velg bildet i et nytt innlegg.';
});
async function shareImage(app) {
    const message = document.getElementById('share-message');
    if (!imageFile) { message.textContent = 'Bildet klargjøres. Prøv igjen om et øyeblikk.'; return; }
    if (navigator.canShare && navigator.canShare({ files: [imageFile] })) {
        try {
            await navigator.share({ files: [imageFile], title: 'Min egen sjokolade', text: 'Min egen smak fra den digitale Sjokoladefabrikken.' });
            message.textContent = 'Delingsmenyen er avsluttet. Publisering fullføres i appen du valgte.';
        } catch (error) {
            message.textContent = error.name === 'AbortError' ? 'Deling avbrutt. Du kan også laste ned bildet.' : 'Deling er ikke tilgjengelig her. Last ned bildet og legg det ut i appen.';
        }
    } else {
        message.textContent = `Denne nettleseren støtter ikke bildedeling. Trykk «Last ned bilde», åpne ${app} og legg bildet til i et nytt innlegg. På mobil kan delingsmenyen tilby appen hvis den støtter bildeformatet.`;
    }
}
document.getElementById('share-instagram').addEventListener('click', () => shareImage('Instagram'));
document.getElementById('share-facebook').addEventListener('click', () => shareImage('Facebook'));
showStation(0);
