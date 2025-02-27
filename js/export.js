function exportToCSV() {
    let qrList = JSON.parse(localStorage.getItem("qrList")) || [];
    if (qrList.length === 0) {
        alert("Không có dữ liệu để xuất!");
        return;
    }

    let csvContent = "Mã QR,Ghi chú,Số lượng,Ngày Giờ Quét,Hình ảnh\n";
    qrList.forEach(entry => {
        let imageData = entry.image ? `[Hình ảnh]` : "Không có ảnh";
        csvContent += `"${entry.qrData}","${entry.note}","${entry.quantity}","${entry.timestamp}","${imageData}"\n`;
    });

    let blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    let link = document.createElement("a");
    link.setAttribute("href", URL.createObjectURL(blob));
    link.setAttribute("download", "danh_sach_kiem_kho.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function exportToExcel() {
    let qrList = JSON.parse(localStorage.getItem("qrList")) || [];
    if (qrList.length === 0) {
        alert("Không có dữ liệu để xuất!");
        return;
    }

    let wb = XLSX.utils.book_new();
    let ws_data = [
        ["Mã QR", "Ghi chú", "Số lượng", "Ngày Giờ Quét", "Hình ảnh"]
    ];

    qrList.forEach(entry => {
        ws_data.push([
            entry.qrData,
            entry.note,
            entry.quantity,
            entry.timestamp,
            entry.image ? "Có ảnh" : "Không có ảnh"
        ]);
    });

    let ws = XLSX.utils.aoa_to_sheet(ws_data);
    XLSX.utils.book_append_sheet(wb, ws, "Danh Sách Kiểm Kho");

    let wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

    function s2ab(s) {
        let buf = new ArrayBuffer(s.length);
        let view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }

    let blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "danh_sach_kiem_kho.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
