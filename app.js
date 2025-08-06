// Load inventory and display it
async function loadInventory() {
  const container = document.getElementById('inventory');
  container.innerHTML = '';

  const snapshot = await db.collection("items").get();
  snapshot.forEach(doc => {
    const data = doc.data();
    const alert = data.quantity < data.minThreshold ? '🔴 LOW!' : '';
    container.innerHTML += `
      <div>
        <strong>${data.name}</strong>: ${data.quantity} ${alert}
        ${data.quantity < data.minThreshold ? `<a href="${data.orderUrl}" target="_blank">Order Now</a>` : ''}
      </div>
    `;
  });
}

loadInventory();

// Scan QR code to reduce quantity
function startQrScan() {
  const html5QrCode = new Html5Qrcode("reader");
  html5QrCode.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    async (decodedText) => {
      console.log("QR Code detected:", decodedText);
      html5QrCode.stop();

      const snapshot = await db.collection("items").where("qrId", "==", decodedText).get();
      if (snapshot.empty) {
        alert("No item found for this QR code.");
        return;
      }

      const doc = snapshot.docs[0];
      const data = doc.data();

      await db.collection("items").doc(doc.id).update({
        quantity: firebase.firestore.FieldValue.increment(-1)
      });

      alert(`✅ Scanned: ${data.name}. Quantity reduced.`);
      loadInventory();
    },
    (errorMessage) => {
      // Optional: console.log("Scan error:", errorMessage);
    }
  ).catch(err => {
    console.error("QR scan error:", err);
    alert("Error starting QR scan.");
  });
}

// Add new item to Firestore
function addItem() {
  const name = document.getElementById('itemName').value;
  const qrId = document.getElementById('qrId').value;
  const quantity = parseInt(document.getElementById('quantity').value);
  const minThreshold = parseInt(document.getElementById('minThreshold').value);
  const orderUrl = document.getElementById('orderUrl').value;

  db.collection("items").add({
    name,
    qrId,
    quantity,
    minThreshold,
    orderUrl
  }).then(() => {
    alert("✅ Item added successfully!");
    generateQrCode(qrId);
    loadInventory();
    document.getElementById("addItemForm").reset();
  }).catch(err => {
    console.error("❌ Error adding item:", err);
    alert("Error adding item.");
  });

  return false; // Prevent form reload
}

// Generate and show QR code
function generateQrCode(qrId) {
  const qrContainer = document.getElementById('qrPreview');
  qrContainer.innerHTML = `<h3>QR Code for: ${qrId}</h3>`;

  const canvas = document.createElement('canvas');
  qrContainer.appendChild(canvas);

  const qr = new QRious({
    element: canvas,
    value: qrId,
    size: 200
  });

  const downloadLink = document.createElement('a');
  downloadLink.textContent = "⬇️ Download QR Code";
  downloadLink.href = canvas.toDataURL("image/png");
  downloadLink.download = `${qrId}.png`;
  downloadLink.style.display = 'block';
  downloadLink.style.marginTop = '10px';

  qrContainer.appendChild(downloadLink);
}

