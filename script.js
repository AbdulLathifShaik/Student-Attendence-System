function updateDateTime() {
  const now = new Date();
  document.getElementById("datetime").value = now.toLocaleString();
}
updateDateTime();
setInterval(updateDateTime, 1000);

window.onload = function () {
  showAttendance();
};

function addAttendance() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const datetime = document.getElementById("datetime").value;

  if (!name || !email) {
    alert("Please fill in all fields.");
    return;
  }

  const record = {
    id: Date.now(),
    name,
    email,
    datetime,
  };

  let data = JSON.parse(localStorage.getItem("attendanceList")) || [];
  data.push(record);
  localStorage.setItem("attendanceList", JSON.stringify(data));

  document.getElementById("attendanceForm").reset();
  updateDateTime();
  showAttendance();
}

function showAttendance() {
  const tbody = document.getElementById("attendanceTableBody");
  tbody.innerHTML = "";
  const data = JSON.parse(localStorage.getItem("attendanceList")) || [];

  data.forEach((item, index) => {
    const row = `
      <tr>
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>${item.email}</td>
        <td>${item.datetime}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editRecord(${item.id})">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteRecord(${item.id})">Delete</button>
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}


function deleteRecord(id) {
  let data = JSON.parse(localStorage.getItem("attendanceList")) || [];
  data = data.filter(record => record.id !== id);
  localStorage.setItem("attendanceList", JSON.stringify(data));
  showAttendance();
}

function editRecord(id) {
  const data = JSON.parse(localStorage.getItem("attendanceList")) || [];
  const record = data.find(item => item.id === id);

  if (record) {
    document.getElementById("name").value = record.name;
    document.getElementById("email").value = record.email;


    const updatedData = data.filter(item => item.id !== id);
    localStorage.setItem("attendanceList", JSON.stringify(updatedData));
    showAttendance();
  }
}
