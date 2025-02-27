document.addEventListener("DOMContentLoaded", function () {
    var resultContainer = document.getElementById('qr-reader-results');
    var lastResult = "";

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error("❌ Trình duyệt không hỗ trợ camera!");
        resultContainer.innerHTML = `<div style="color: red;">⚠️ Trình duyệt không hỗ trợ camera!</div>`;
        return;
    }

    var html5QrcodeScanner = new Html5QrcodeScanner("qr-reader", {
        fps: 10,
        qrbox: 250,
        rememberLastUsedCamera: true,
        aspectRatio: 1.0,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
    });

    function onScanSuccess(decodedText) {
        if (decodedText !== lastResult) {
            lastResult = decodedText;
            console.log(`✅ Quét thành công: ${decodedText}`);
            document.getElementById("qr-data").innerText = decodedText;
        }
    }

    function onScanError(qrCodeError) {
        console.warn(`⚠️ Lỗi quét: ${qrCodeError}`);
    }

    html5QrcodeScanner.render(onScanSuccess, onScanError);
});
