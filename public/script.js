document.getElementById("expenseForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const expense = {
      title: document.getElementById("title").value,
      amount: document.getElementById("amount").value,
      category: document.getElementById("category").value,
      date: document.getElementById("date").value,
    };
  
    const res = await fetch("http://localhost:3000/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense)
    });
  
    if (res.ok) {
      alert("Expense added!");
      document.getElementById("expenseForm").reset();
      loadExpenses();
    } else {
      alert("Failed to add expense.");
    }
  });
  
  async function loadExpenses() {
    const res = await fetch("http://localhost:3000/expenses");
    const data = await res.json();
    const list = document.getElementById("expenseList");
    list.innerHTML = "";
    data.forEach(exp => {
      const item = document.createElement("li");
      item.innerText = `${exp.date}: ₹${exp.amount} - ${exp.title} [${exp.category}]`;
      list.appendChild(item);
    });
  }
  
  loadExpenses();
  