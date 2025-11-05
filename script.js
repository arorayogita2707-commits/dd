function showPage(id) {
  document.getElementById("home").style.display = "none";
  document.querySelectorAll(".page").forEach(p => p.style.display = "none");
  document.getElementById(id).style.display = "block";
}
function goHome() {
  document.querySelectorAll(".page").forEach(p => p.style.display = "none");
  document.getElementById("home").style.display = "block";
}

// --- QR Scanner ---
let scanner;
function startScanner() {
  scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
  scanner.addListener('scan', content => {
    document.getElementById('scanResult').innerText = `Scanned: ${content}`;
    const hash = content.replace('#', '');
    if (document.getElementById(hash)) showPage(hash);
  });
  Instascan.Camera.getCameras().then(cameras => {
    if (cameras.length > 0) scanner.start(cameras[0]);
    else alert('No camera found!');
  }).catch(e => console.error(e));
}
function stopScan() { if (scanner) scanner.stop(); }
window.onload = startScanner;
