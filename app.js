const waterSection = document.getElementById('water-section');

if (waterSection) {
  const weekWater = [1.8, 3.2, 0.9, 4.1, 2.5, 1.2, 3.6];
  const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const REFERENCE_MAX = 4;

  function findMax(arr) {
    let max = arr[0];
    for(let i = 1; i < arr.length; i++){
        if(arr[i] > max){
            max = arr[i];
        }
    }
    return max;
  }

  function filterExceeded(arr, limit) {
    const result = [];
    for(let i = 0; i < arr.length; i++){
        if(arr[i] > limit){
            result.push(arr[i]);
        }
    }
    return result;
  }

  function sumWater(arr) {
    let total = 0;
    for(let i = 0; i < arr.length; i++){
        total += arr[i];
    }
    return total;
  }

  const total = sumWater(weekWater);
  const exceeded = filterExceeded(weekWater, 3);
  const max = findMax(weekWater);

  // --- Круги по дням ---
  const grid = document.getElementById('water-grid');

for (let i = 0; i < weekWater.length; i++) {
  const value = weekWater[i];
  const percent = Math.min(100, (value / REFERENCE_MAX) * 100);

  const dayDiv = document.createElement('div');
  dayDiv.className = 'water-day';
  dayDiv.style.animationDelay = `${i * 0.08}s`;
  dayDiv.title = `${dayNames[i] || `День ${i + 1}`}: ${value} л`;
  if (value > 3) dayDiv.classList.add('exceeded');
  if (value <= 1.5) dayDiv.classList.add('low');

  dayDiv.innerHTML = `
    <div class="water-circle" style="--percent: 0">
      <span>${value}л</span>
    </div>
    <div class="water-day-label">${dayNames[i] || `День ${i + 1}`}</div>
  `;
  grid.appendChild(dayDiv);

  // на следующем кадре ставим реальный процент — CSS сам анимирует заполнение
  requestAnimationFrame(() => {
    dayDiv.querySelector('.water-circle').style.setProperty('--percent', percent);
  });
}
  // --- Дни с низким потреблением (цикл, не функция) ---
  let lowDays = 0;
  for (let i = 0; i < weekWater.length; i++) {
    if (weekWater[i] < 1.5){
        lowDays++;
    }
  }
  const lowPercent = (lowDays / weekWater.length) * 100;

  document.getElementById('water-summary').innerHTML = `
    <div class="water-stat"><strong>${total}л</strong><span>всего за неделю</span></div>
    <div class="water-stat"><strong>${max}л</strong><span>максимум за день</span></div>
    <div class="water-stat"><strong>${exceeded.length}</strong><span>дней с превышением</span></div>
    <div class="water-stat"><strong>${lowPercent.toFixed(1)}%</strong><span>дней с низким потреблением</span></div>
  `;

  // --- alert и console.log по заданию ---
  alert(`За неделю вы выпили ${total} литров воды, в ${exceeded.length} днях норма была превышена`);
  console.log(`Дней с низким потреблением: ${lowDays} (${lowPercent.toFixed(1)}% от недели)`);

  const average = total / weekWater.length;
  if (average < 2) {
    console.log('Рекомендуется увеличить потребление воды до 2-2,5 литров в день');
  }
}