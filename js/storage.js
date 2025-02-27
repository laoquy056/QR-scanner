document.addEventListener("DOMContentLoaded", function () {
    loadTable();
});

// 📌 Xử lý chọn ảnh và lưu vào localStorage
document.getElementById("imageInput").addEventListener("change", function (event) {
    let file = event.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function (e) {
            localStorage.setItem("latestImage", e.target.result); // Lưu ảnh dạng base64
        };
        reader.readAsDataURL(file);
    }
});

// 📌 Lưu thông tin kiểm kho
function saveData() {
    let qrData = document.getElementById("qr-data").innerText;
    let note = document.getElementById("note").value;
    let quantity = document.getElementById("quantity").value;
    let timestamp = new Date().toLocaleString();
    let image = localStorage.getItem("latestImage"); // Lấy ảnh vừa chọn

    if (qrData === "Chưa có") {
        alert("❌ Không có dữ liệu QR để lưu!");
        return;
    }

    let qrList = JSON.parse(localStorage.getItem("qrList")) || [];

    // 📌 Kiểm tra trùng mã QR, không cho phép lưu trùng
    let exists = qrList.some(entry => entry.qrData === qrData);
    if (exists) {
        alert("⚠️ Mã QR này đã tồn tại trong danh sách!");
        return;
    }

    qrList.push({ qrData, note, quantity, timestamp, image });
    localStorage.setItem("qrList", JSON.stringify(qrList));

    // 📌 Sau khi lưu, cập nhật lại bảng và xóa ảnh tạm
    loadTable();
    localStorage.removeItem("latestImage");
}

// 📌 Xóa toàn bộ danh sách kiểm kho
function clearData() {
    if (confirm("Bạn có chắc muốn xóa toàn bộ danh sách?")) {
        localStorage.removeItem("qrList");
        loadTable();
    }
}

// 📌 Tải lại danh sách kiểm kho từ `localStorage`
function loadTable() {
    let qrList = JSON.parse(localStorage.getItem("qrList")) || [];
    let tableBody = document.getElementById("qr-table-body");
    tableBody.innerHTML = "";

    qrList.forEach(entry => {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${entry.qrData}</td>
            <td>${entry.note}</td>
            <td>${entry.quantity}</td>
            <td>${entry.timestamp}</td>
            <td>${entry.image ? `<img src="${entry.image}" width="50">` : "Không có ảnh"}</td>
        `;

        tableBody.appendChild(row);
    });
}
