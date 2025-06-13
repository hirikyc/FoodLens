import UploaderModel from './uploader.js';
import FoodLensMLAPI from '../../data/FoodLensMLAPI';

export default function uploadPagePresenter() {
  const model = new UploaderModel();

  const video = document.getElementById("video");
  const canvas = document.getElementById("canvas");
  const preview = document.getElementById("preview");
  const fileInput = document.getElementById("fileInput");
  const captureBtn = document.getElementById("capture");
  const startCameraBtn = document.getElementById("startCamera");
  const allowCameraBtn = document.getElementById("allowCamera");
  const cameraMode = document.getElementById("cameraMode");
  const permissionPrompt = document.getElementById("permissionPrompt");
  const dropArea = document.getElementById("drop-area");
  const predictionResult = document.getElementById("prediction-result");
  const analyzeBtn = document.getElementById("analyzeBtn");
  const stopCameraBtn = document.getElementById("stopCamera");
  const removeImageBtn = document.getElementById("removeImageBtn");

  let stream;
  let lastSelectedFile = null;

  if (permissionPrompt) permissionPrompt.style.display = "block";

  if (allowCameraBtn) allowCameraBtn.onclick = async () => {
    permissionPrompt.style.display = "none";
    try {
      const result = await navigator.permissions.query({ name: "camera" });
      if (result.state === "denied") {
        alert("Akses kamera ditolak. Silakan izinkan dari pengaturan browser.");
      }
    } catch (err) {}
    alert("Kamera siap digunakan. Silakan klik tombol 'Buka Kamera'.");
  };

  if (startCameraBtn) startCameraBtn.onclick = async () => {
    const facingMode = cameraMode.value;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: false,
      });
      video.srcObject = stream;
      video.style.display = "block";
      captureBtn.style.display = "inline-block";
      if (stopCameraBtn) stopCameraBtn.style.display = "inline-block";
    } catch (err) {
      alert("Gagal membuka kamera: " + err.message);
    }
  };

  if (stopCameraBtn) stopCameraBtn.onclick = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      stream = null;
    }
    video.srcObject = null;
    video.style.display = "none";
    captureBtn.style.display = "none";
    stopCameraBtn.style.display = "none";
  };
  
  if (cameraMode) cameraMode.onchange = async () => {
    if (video.style.display === "block") {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: cameraMode.value },
          audio: false,
        });
        video.srcObject = stream;
      } catch (err) {
        alert("Gagal mengganti kamera: " + err.message);
      }
    }
  };

  function showRemoveBtn() {
    if (removeImageBtn) removeImageBtn.style.display = "inline-block";
  }
  function hideRemoveBtn() {
    if (removeImageBtn) removeImageBtn.style.display = "none";
  }

  async function handleImageFile(file) {
    // Preview
    const reader = new FileReader();
    reader.onload = () => {
      model.setImageData(reader.result);
      preview.src = reader.result;
      preview.style.display = "block";
      if (analyzeBtn) analyzeBtn.style.display = "inline-block";
      showRemoveBtn();
    };
    reader.readAsDataURL(file);
    lastSelectedFile = file;
    predictionResult.textContent = '';
  }

  if (analyzeBtn) analyzeBtn.onclick = async () => {
    if (!lastSelectedFile) {
      predictionResult.textContent = 'Silakan pilih atau ambil gambar terlebih dahulu.';
      return;
    }
    predictionResult.innerHTML = '<span class="prediksi-title">Memprediksi...</span>';
    try {
      const result = await FoodLensMLAPI.predictFood(lastSelectedFile);
      console.log('Hasil prediksi mentah:', result); // DEBUG
  
      // Ambil string hasil prediksi dari result.data[0]
      const text = result.data && result.data[0] ? result.data[0] : "";
  
      // Parsing bagian atas (food, origin, confidence)
      const foodMatch = text.match(/Food: (.*)/);
      const originMatch = text.match(/Origin: (.*)/);
      const confidenceMatch = text.match(/Confidence: (.*)%/);
  
      // Parsing rekomendasi restoran
      const rekomStart = text.indexOf('Rekomendasi Restoran:');
      let rekomList = [];
      if (rekomStart !== -1) {
        const rekomText = text.slice(rekomStart + 'Rekomendasi Restoran:'.length).trim();
        // Split tiap rekomendasi (pakai bullet)
        rekomList = rekomText.split(/• /).filter(Boolean).map(r => {
          // Ambil baris-baris info
          const lines = r.split('\n').map(l => l.trim()).filter(Boolean);
          return {
            name: lines[0] || '',
            lokasi: (lines.find(l => l.startsWith('Lokasi:')) || '').replace('Lokasi:', '').trim(),
            rating: (lines.find(l => l.startsWith('Rating:')) || '').replace('Rating:', '').trim(),
            cuisine: (lines.find(l => l.startsWith('Masakan:')) || '').replace('Masakan:', '').trim(),
          };
        });
      }
  
      // Render hasil
      predictionResult.innerHTML = `
        <div class="prediksi-food"><b>Food:</b> ${foodMatch ? foodMatch[1] : '-'}</div>
        <div class="prediksi-origin"><b>Origin:</b> ${originMatch ? originMatch[1] : '-'}</div>
        <div class="prediksi-confidence"><b>Confidence:</b> ${confidenceMatch ? confidenceMatch[1] : '-'}%</div>
        <div class="prediksi-rekom-title" style="margin-top:12px;"><b>Rekomendasi Restoran:</b></div>
        <ul class="prediksi-rekom-list" style="margin-top:4px;">
          ${rekomList.length > 0 ? rekomList.map(r => `
            <li style="margin-bottom:10px;">
              <b>• ${r.name}</b><br>
              Lokasi: ${r.lokasi}<br>
              Rating: ${r.rating}<br>
              Masakan: ${r.cuisine}
            </li>
          `).join('') : '<li>Tidak ada rekomendasi ditemukan.</li>'}
        </ul>
        <div class="prediksi-note">Catatan: <b>origin</b> = asal makanan berasal, <b>cuisine</b> = lokasi restoran</div>
      `;
    } catch (err) {
      console.error('Error in analyze:', err);
      predictionResult.innerHTML = `
        <div class="error-message">
          Gagal memproses gambar: ${err.message}
        </div>
      `;
    }
  };

  if (captureBtn) captureBtn.onclick = async () => {
    canvas.style.display = "block";
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/png");
    model.setImageData(imageData);
    preview.src = imageData;
    preview.style.display = "block";
    if (analyzeBtn) analyzeBtn.style.display = "inline-block";
    showRemoveBtn();
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    video.style.display = "none";
    captureBtn.style.display = "none";
    // Convert dataURL to Blob for upload
    const blob = await (await fetch(imageData)).blob();
    const file = new File([blob], "capture.png", { type: "image/png" });
    lastSelectedFile = file;
    predictionResult.textContent = '';
  };

  if (removeImageBtn) removeImageBtn.onclick = () => {
    preview.src = "";
    preview.style.display = "none";
    if (analyzeBtn) analyzeBtn.style.display = "none";
    if (fileInput) fileInput.value = "";
    predictionResult.textContent = "";
    lastSelectedFile = null;
    hideRemoveBtn();
  };

  if (fileInput) fileInput.onchange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    handleImageFile(file);
  };

  // Drag & Drop
  if (dropArea) {
    dropArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropArea.style.background = '#f0f0f0';
    });
    dropArea.addEventListener('dragleave', (e) => {
      e.preventDefault();
      dropArea.style.background = '';
    });
    dropArea.addEventListener('drop', (e) => {
      e.preventDefault();
      dropArea.style.background = '';
      const file = e.dataTransfer.files[0];
      if (file) handleImageFile(file);
    });
    // Klik area = buka file dialog
    dropArea.addEventListener('click', () => fileInput && fileInput.click());
  }
}
