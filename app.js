const validAccount = /^\d{2}-\d{4}-\d{3}$/;
const authOverlay = document.getElementById('authOverlay');
const appShell = document.getElementById('appShell');

function formatAccount(input) {
    const digits = input.value.replace(/\D/g, '').slice(0, 9);
    const parts = [digits.slice(0, 2), digits.slice(2, 6), digits.slice(6, 9)].filter(Boolean);
    input.value = parts.join('-');
}

function validateAccount(value) {
    return validAccount.test(value.trim());
}

function enterPortal() {
    authOverlay.classList.add('hidden');
    appShell.classList.remove('hidden');
    sessionStorage.setItem('waterServeAuthenticated', 'true');
}

function showFeedback(element, message) {
    element.textContent = message;
}

document.querySelectorAll('#loginAccount, #signupAccount').forEach(input => input.addEventListener('input', () => formatAccount(input)));

document.querySelectorAll('.auth-tab').forEach(tab => tab.addEventListener('click', () => {
    const isLogin = tab.dataset.authTab === 'login';
    document.querySelectorAll('.auth-tab').forEach(item => {
        item.classList.toggle('active', item === tab);
        item.setAttribute('aria-selected', item === tab ? 'true' : 'false');
    });
    document.getElementById('loginForm').classList.toggle('hidden', !isLogin);
    document.getElementById('signupForm').classList.toggle('hidden', isLogin);
    document.getElementById('authTitle').textContent = isLogin ? 'Good water, clearly accounted for.' : 'Create your WaterServe access.';
}));

document.getElementById('loginForm').addEventListener('submit', event => {
    event.preventDefault();
    const account = document.getElementById('loginAccount').value;
    const feedback = document.getElementById('loginFeedback');
    if (!validateAccount(account)) {
        showFeedback(feedback, 'Enter a valid account number in the format 12-3456-789.');
        return;
    }
    showFeedback(feedback, '');
    enterPortal();
});

document.getElementById('signupForm').addEventListener('submit', event => {
    event.preventDefault();
    const name = document.getElementById('signupName').value.trim();
    const account = document.getElementById('signupAccount').value;
    const feedback = document.getElementById('signupFeedback');
    if (!name || !validateAccount(account)) {
        showFeedback(feedback, 'Enter your name and a valid CCWD account number in the format 12-3456-789.');
        return;
    }
    showFeedback(feedback, '');
    document.getElementById('loginAccount').value = account;
    enterPortal();
});

function setView(viewName) {
    document.querySelectorAll('.nav-item').forEach(item => item.classList.toggle('active', item.dataset.view === viewName));
    document.querySelectorAll('.view').forEach(view => view.classList.toggle('active', view.id === `${viewName}View`));
    document.getElementById('pageTitle').textContent = viewName === 'history' ? 'Meter & billing history' : viewName === 'report' ? 'Report a problem' : 'Overview';
    document.querySelector('.sidebar').classList.remove('open');
}

document.querySelectorAll('.nav-item, [data-view-link]').forEach(button => button.addEventListener('click', () => setView(button.dataset.view || button.dataset.viewLink)));
document.getElementById('mobileMenu').addEventListener('click', () => document.querySelector('.sidebar').classList.toggle('open'));
document.getElementById('logoutButton').addEventListener('click', () => {
    sessionStorage.removeItem('waterServeAuthenticated');
    appShell.classList.add('hidden');
    authOverlay.classList.remove('hidden');
});

const incidentForm = document.getElementById('incidentForm');
const incidentResult = document.getElementById('incidentResult');
document.getElementById('photo').addEventListener('change', event => {
    document.getElementById('fileName').textContent = event.target.files[0] ? event.target.files[0].name : '';
});
incidentForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!incidentForm.checkValidity()) {
        document.getElementById('incidentFeedback').textContent = 'Complete the required incident details before submitting.';
        incidentForm.reportValidity();
        return;
    }
    const trackingCode = `WS-${Math.floor(100000 + Math.random() * 900000)}`;
    document.getElementById('trackCode').textContent = trackingCode;
    document.getElementById('incidentFeedback').textContent = '';
    incidentForm.classList.add('hidden');
    incidentResult.classList.remove('hidden');
});
document.getElementById('newReport').addEventListener('click', () => {
    incidentForm.reset();
    document.getElementById('fileName').textContent = '';
    incidentResult.classList.add('hidden');
    incidentForm.classList.remove('hidden');
});
document.getElementById('copyCode').addEventListener('click', async () => {
    await navigator.clipboard.writeText(document.getElementById('trackCode').textContent);
});

if (sessionStorage.getItem('waterServeAuthenticated') === 'true') enterPortal();