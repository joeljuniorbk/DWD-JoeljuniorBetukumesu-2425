// === DECLARATIES ===
const planner = document.getElementById("planner");
const parts = document.querySelectorAll(".planner-part");
const icon = document.getElementById("icon");
const resetBtn = document.getElementById("reset-btn");
const themeToggle = document.getElementById("theme-toggle");
const modal = document.getElementById("edit-modal");
const modalForm = modal.querySelector("form");
const modalEditor = modal.querySelector(".modal-editor");
const modalMessage = modal.querySelector(".modal-message");
const cancelBtn = modal.querySelector(".btn-cancel");
const okBtn = modal.querySelector(".btn-ok");

let currentEditPart = null;
const MAX_CHARS = 500;

// === FUNCTIES ===

// activeer dagdeel
function setActive(part) {
  document.querySelector(".current")?.classList.remove("current");
  part.classList.add("current");
  icon.src = part.dataset.icon;
}

// reset alle taken
function resetDag() {
  parts.forEach(p => p.querySelector(".task").innerHTML = "");
}

// toggle donker/licht
function toggleTheme() {
  document.body.classList.toggle("dark");
}

// toon modal met taaktekst
function openModal(part) {
  currentEditPart = part;
  const taak = part.querySelector(".task").innerHTML.replaceAll("<br>", "\n");
  modalEditor.value = taak;
  modalMessage.textContent = `aantal karakters over: ${MAX_CHARS - taak.length}`;
  modal.classList.remove("hidden");
  modalEditor.focus();
}

// sluit modal
function closeModal() {
  modal.classList.add("hidden");
}

// update karakters live
function updateCharCount() {
  const text = modalEditor.value;
  const remaining = MAX_CHARS - text.length;
  modalMessage.textContent = `aantal karakters over: ${remaining}`;
  modalEditor.maxLength = MAX_CHARS;
}

// opslaan en sluiten modal
function confirmModal(e) {
  e.preventDefault();
  if (currentEditPart) {
    const taakText = modalEditor.value.trim().replaceAll("\n", "<br>");
    currentEditPart.querySelector(".task").innerHTML = taakText;
  }
  closeModal();
}

// === EVENTS ===

// dagdeel klikken
planner.addEventListener("click", (e) => {
  const part = e.target.closest(".planner-part");
  if (part) setActive(part);
});

// clear knop
planner.addEventListener("click", (e) => {
  if (e.target.classList.contains("task-clear")) {
    e.preventDefault();
    e.target.closest(".planner-part").querySelector(".task").innerHTML = "";
  }
});

// edit knop
planner.addEventListener("click", (e) => {
  if (e.target.classList.contains("task-edit")) {
    e.preventDefault();
    const part = e.target.closest(".planner-part");
    openModal(part);
  }
});

// reset dag
resetBtn.addEventListener("click", resetDag);

// toggle theme
themeToggle.addEventListener("click", toggleTheme);

// sluit modal
cancelBtn.addEventListener("click", closeModal);

// ESC sluit modal
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// update tekstlimiet
modalEditor.addEventListener("input", updateCharCount);

// bevestig modal
modalForm.addEventListener("submit", confirmModal);

// navigatie met pijltjestoetsen
planner.addEventListener("keydown", (e) => {
  const current = document.querySelector(".current");
  let next = null;

  if (e.key === "ArrowDown") {
    next = current?.nextElementSibling;
  } else if (e.key === "ArrowUp") {
    next = current?.previousElementSibling;
  }

  if (next && next.classList.contains("planner-part")) {
    setActive(next);
    next.scrollIntoView({ behavior: "smooth", block: "center" });
  }
});
