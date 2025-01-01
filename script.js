const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const ctx = document.getElementById('expense-chart').getContext('2d');

let expenses = [];
let chart;

function updateChart() {
  const categories = [...new Set(expenses.map(e => e.category))];
  const data = categories.map(cat =>
    expenses.filter(e => e.category === cat).reduce((acc, cur) => acc + cur.amount, 0)
  );

  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: categories,
      datasets: [{
        data: data,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
      }]
    }
  });
}

expenseForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('expense-name').value;
  const amount = parseFloat(document.getElementById('expense-amount').value);
  const category = document.getElementById('expense-category').value;

  expenses.push({ name, amount, category });
  expenseList.innerHTML += `<p>${name}: $${amount} (${category})</p>`;
  updateChart();

  expenseForm.reset();
});
