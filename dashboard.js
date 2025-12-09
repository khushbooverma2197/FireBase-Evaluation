// ---- CONFIG ----
const BASE_URL = "https://fir-app-6aa3b-default-rtdb.asia-southeast1.firebasedatabase.app";

// ---- STATE ----
let currentUser = null;
let currentDate = null;
let activities = {}; // {id: {title, category, minutes}}
let editingId = null;
let chart = null;
let isInitialized = false;

// ---- DOM ----
const userEmailSpan = document.getElementById("userEmail");
const logoutBtn = document.getElementById("logoutBtn");
const dateInput = document.getElementById("dateInput");
const activityForm = document.getElementById("activityForm");
const saveBtn = document.getElementById("saveBtn");
const nameInput = document.getElementById("activityName");
const categoryInput = document.getElementById("activityCategory");
const minutesInput = document.getElementById("activityMinutes");
const totalSpan = document.getElementById("totalMinutes");
const remainingSpan = document.getElementById("remainingMinutes");
const analyseBtn = document.getElementById("analyseBtn");
const activitiesBody = document.getElementById("activitiesBody");
const noDataState = document.getElementById("noDataState");
const dashboardContent = document.getElementById("dashboardContent");
const dashTotalHours = document.getElementById("dashTotalHours");
const dashActivityCount = document.getElementById("dashActivityCount");
const chartCanvas = document.getElementById("categoryChart");

// ---- AUTH CHECK (Firebase Authentication) ----
auth.onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }
  
  currentUser = user;
  if (userEmailSpan) {
    userEmailSpan.textContent = user.email;
  }
  
  if (!isInitialized) {
    initializeApp();
    isInitialized = true;
  }
});

// ---- TOAST NOTIFICATIONS ----
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideInRight 0.4s ease-out reverse';
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// ---- HELPERS ----
function getUserId() {
  // Create a safe user ID from email by replacing special chars
  return currentUser.uid || currentUser.email.replace(/[.@#$\[\]]/g, '_');
}

function userDayUrl(date) {
  return `${BASE_URL}/users/${getUserId()}/${date}.json`;
}

function userActivityUrl(date, id) {
  return `${BASE_URL}/users/${getUserId()}/${date}/${id}.json`;
}

function computeTotals() {
  let totalMinutes = 0;
  let categoryTotals = {};
  const ids = Object.keys(activities);
  ids.forEach((id) => {
    const act = activities[id];
    const m = Number(act.minutes) || 0;
    totalMinutes += m;
    const cat = act.category || "Uncategorized";
    categoryTotals[cat] = (categoryTotals[cat] || 0) + m;
  });
  return {
    totalMinutes,
    categoryTotals,
    activityCount: ids.length,
  };
}

function updateSummaryUI() {
  const { totalMinutes } = computeTotals();
  totalSpan.textContent = totalMinutes;
  remainingSpan.textContent = 1440 - totalMinutes;
  analyseBtn.disabled = totalMinutes !== 1440;
}

// ---- FETCH & RENDER ----
async function loadDay(date) {
  if (!date) return;
  try {
    const token = await currentUser.getIdToken();
    const response = await fetch(`${userDayUrl(date)}?auth=${token}`);
    const data = await response.json();
    activities = data || {};
    renderActivities();
    updateSummaryUI();
    resetDashboard();
  } catch (err) {
    console.error("Error loading day:", err);
  }
}

function renderActivities() {
  activitiesBody.innerHTML = "";
  const ids = Object.keys(activities);
  if (ids.length === 0) {
    const empty = document.createElement("div");
    empty.className = "table-row";
    empty.innerHTML =
      "<span>No activities yet</span><span></span><span></span><span></span>";
    activitiesBody.appendChild(empty);
    return;
  }
  ids.forEach((id) => {
    const act = activities[id];
    const row = document.createElement("div");
    row.className = "table-row";
    const titleSpan = document.createElement("span");
    titleSpan.textContent = act.title;
    const catSpan = document.createElement("span");
    catSpan.textContent = act.category || "-";
    const minSpan = document.createElement("span");
    minSpan.textContent = act.minutes;
    const actions = document.createElement("span");
    const editBtn = document.createElement("button");
    editBtn.className = "action-btn action-edit";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => startEdit(id));
    const delBtn = document.createElement("button");
    delBtn.className = "action-btn action-delete";
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => deleteActivity(id));
    actions.append(editBtn, delBtn);
    row.append(titleSpan, catSpan, minSpan, actions);
    activitiesBody.appendChild(row);
  });
}

// ---- ADD / EDIT / DELETE ----
function startEdit(id) {
  const act = activities[id];
  if (!act) return;
  editingId = id;
  nameInput.value = act.title;
  categoryInput.value = act.category;
  minutesInput.value = act.minutes;
  saveBtn.textContent = "Save Changes";
  nameInput.focus();
}

function deleteActivity(id) {
  if (!confirm("Delete this activity?")) return;
  
  currentUser.getIdToken().then((token) => {
    fetch(`${userActivityUrl(currentDate, id)}?auth=${token}`, { method: "DELETE" })
      .then(() => {
        showToast('Activity deleted successfully', 'success');
        if (editingId === id) {
          editingId = null;
          saveBtn.textContent = "Add Activity";
          activityForm.reset();
        }
        loadDay(currentDate);
      })
      .catch((err) => {
        console.error("Delete error:", err);
        showToast('Failed to delete activity', 'error');
      });
  });
}

// ---- ANALYTICS ----
analyseBtn.addEventListener("click", () => {
  const { totalMinutes, categoryTotals, activityCount } = computeTotals();
  if (activityCount === 0) {
    showNoData();
    showToast('No activities to analyze', 'error');
    return;
  }
  showToast('Analytics generated successfully!', 'success');
  const hours = (totalMinutes / 60).toFixed(1);
  dashTotalHours.textContent = hours;
  dashActivityCount.textContent = activityCount;
  const labels = Object.keys(categoryTotals);
  const data = Object.values(categoryTotals);
  if (chart) chart.destroy();
  chart = new Chart(chartCanvas, {
    type: "pie",
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor: [
            "#667eea",
            "#764ba2",
            "#f093fb",
            "#4facfe",
            "#43e97b",
            "#fa709a",
            "#fee140",
            "#30cfd0",
            "#a8edea",
            "#ff6b6b",
          ],
        },
      ],
    },
    options: {
      plugins: {
        legend: { position: "bottom", labels: { color: "#fff" } },
      },
    },
  });
  showDashboard();
});

function showDashboard() {
  noDataState.style.display = "none";
  dashboardContent.classList.remove("hidden");
}

function showNoData() {
  dashboardContent.classList.add("hidden");
  noDataState.style.display = "block";
}

function resetDashboard() {
  const { activityCount } = computeTotals();
  if (activityCount === 0) {
    showNoData();
  }
}

// ---- INITIALIZATION FUNCTION ----
function initializeApp() {
  console.log("Initializing app for user:", currentUser.email);
  
  // Set today's date as default if no date is selected
  if (dateInput && !dateInput.value) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
    currentDate = today;
    console.log("Set default date to today:", today);
  }
  
  // Register logout handler
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      console.log("Logout button clicked");
      try {
        await auth.signOut();
        console.log("Signed out successfully");
      } catch (error) {
        console.error("Logout error:", error);
        alert("Error logging out. Please try again.");
      }
    });
  }
  
  // Register form submission handler
  if (activityForm) {
    activityForm.addEventListener("submit", handleFormSubmit);
  }
  
  // Register date change handler
  if (dateInput) {
    dateInput.addEventListener("change", handleDateChange);
  }
  
  // Load data for current date
  if (currentDate) {
    loadDay(currentDate);
  }
  
// ---- FORM SUBMISSION HANDLER ----
async function handleFormSubmit(e) {
  e.preventDefault();
  console.log("Form submitted");
  
  if (!currentDate) {
    alert("Please select a date first.");
    return;
  }
  
  const title = nameInput.value.trim();
  const category = categoryInput.value.trim();
  const minutes = Number(minutesInput.value);
  
  console.log("Form data:", { title, category, minutes, currentDate });
  
  if (!title || !category || !minutes) {
    alert("Fill all the fields.");
    return;
  }
  
  const { totalMinutes } = computeTotals();
  let oldMinutes = 0;
  if (editingId && activities[editingId]) {
    oldMinutes = Number(activities[editingId].minutes) || 0;
  }
  const newTotal = totalMinutes - oldMinutes + minutes;
  if (newTotal > 1440) {
    alert("Total minutes for a day cannot exceed 1440.");
    return;
  }
  
  const payload = { title, category, minutes };
  
  try {
    const token = await currentUser.getIdToken();
    
    if (editingId) {
      // UPDATE
      await fetch(`${userActivityUrl(currentDate, editingId)}?auth=${token}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      editingId = null;
      saveBtn.textContent = "Add Activity";
      activityForm.reset();
      showToast('Activity updated successfully!', 'success');
      loadDay(currentDate);
    } else {
      // ADD
      await fetch(`${userDayUrl(currentDate)}?auth=${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      activityForm.reset();
      showToast('Activity added successfully!', 'success');
      loadDay(currentDate);
    }
  } catch (err) {
    console.error("Error saving activity:", err);
    alert("Error saving activity. Please try again.");
  }
}

// ---- DATE CHANGE HANDLER ----
function handleDateChange(e) {
  currentDate = e.target.value;
  editingId = null;
  saveBtn.textContent = "Add Activity";
  activityForm.reset();
  if (currentDate) {
    loadDay(currentDate);
  } else {
    activities = {};
    renderActivities();
    updateSummaryUI();
    resetDashboard();
  }
}}
