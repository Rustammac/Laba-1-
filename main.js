const loginLink = document.getElementById('login-link');
const loginSection = document.getElementById('login-section');
const profileSection = document.getElementById('profile-section');
const loginForm = document.getElementById('login-form');

loginLink.addEventListener('click', function (e) {
  e.preventDefault();
  loginSection.classList.toggle('hidden');
});

const ACCESS_CODE = 'rustam2026'; // пароль для входа

loginForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const enteredCode = document.getElementById('access-code').value;

if (enteredCode === ACCESS_CODE) {
  const name = prompt('Отлично! Как вас зовут?');
  alert(`Добро пожаловать, ${name}! Проверка пройдена успешно.`);
  console.log(`Пользователь "${name}" вошёл в систему в ${new Date().toLocaleTimeString()}`);

  window.location.href = './login/login.html';
} else {
  alert('Неверный код доступа. Попробуйте снова.');
  console.log('Неудачная попытка входа: неверный код');
}
});

// код ниже отвечает за всплытие и закрытие pop up окна

const closeLoginBtn = document.getElementById('close-login');

closeLoginBtn.addEventListener('click', function () {
  loginSection.classList.add('hidden');
});

loginSection.addEventListener('click', function (e) {
  if (e.target === loginSection) {
    loginSection.classList.add('hidden');
  }
});