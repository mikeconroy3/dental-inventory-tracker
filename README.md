# Dental Inventory Tracker (QR Code Version)

This is a mobile-friendly Progressive Web App (PWA) for tracking dental office inventory using QR codes.

## Features
- QR code scanning to decrement item quantity
- Threshold alerts and reorder links
- Firebase Firestore backend
- Works on both Android and iPhone (camera required)

## Setup Instructions

1. Clone or download the project.
2. Create a Firebase project and Firestore database.
3. Replace values in `firebase-config.js` with your Firebase project settings.
4. Create a Firestore collection named `items` and add documents like:
```json
{
  "name": "Nitrile Gloves",
  "quantity": 10,
  "minThreshold": 3,
  "orderUrl": "https://supplier.com/gloves",
  "qrId": "gloves123"
}
