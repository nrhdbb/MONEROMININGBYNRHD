<div align="center">

<img src="https://i.imgur.com/yuqMWVO.png" width="100%"/>

<br/>

[![Node.js](https://img.shields.io/badge/Node.js-v14+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![XMRig](https://img.shields.io/badge/XMRig-Compatible-FF6600?style=for-the-badge&logo=monero&logoColor=white)](https://xmrig.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)](./LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20Linux-lightgrey?style=for-the-badge&logo=windows&logoColor=white)](https://github.com/username/xmrig-web-dashboard)

<br/>

> 🖥️ Dashboard berbasis web untuk **memantau dan mengelola** penambang XMRig secara remote.  
> Dilengkapi dengan fitur **CPU limit**, **remote config**, dan **terminal terintegrasi**.

<br/>

[✨ Fitur](#-fitur-utama) •
[📦 Instalasi](#-instalasi) •
[⚙️ Konfigurasi](#️-konfigurasi) •
[🚀 Jalankan](#-menjalankan-dashboard) •
[🐛 Troubleshooting](#-penanganan-masalah-cpu-100-usage)

</div>

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|-------|-----------|
| 📡 **Monitoring Real-time** | Pantau hashrate, total hash, dan status miner langsung dari browser |
| 🧠 **CPU Control** | Pembatasan penggunaan CPU (default 25%) untuk mencegah server overload |
| 🌐 **Remote Config** | Ubah alamat Wallet dan Pool langsung dari browser tanpa SSH |
| 🖥️ **Terminal Terintegrasi** | Lihat log langsung dari proses XMRig secara real-time |

---

## 🖼️ Preview Dashboard

<div align="center">

```
┌──────────────────────────────────────────────────────┐
│           ⛏️  XMRig Web Dashboard                    │
├──────────────────────────────────────────────────────┤
│                                                      │
│  Status   : ● RUNNING                               │
│  Hashrate : 1.23 KH/s                               │
│  Total    : 456,789 H                               │
│  CPU Usage: ████░░░░░░░░░░░░ 25%                    │
│                                                      │
│  Pool     : pool.supportxmr.com:3333                │
│  Wallet   : 4Ab...xyz                               │
│                                                      │
│  [ ▶ START ]  [ ■ STOP ]  [ ⚙ CONFIG ]             │
│                                                      │
│  Terminal Log:                                       │
│  > [2024-01-01 12:00] speed 10s: 1.23 KH/s         │
│  > [2024-01-01 12:00] accepted (1/0) diff 120001   │
└──────────────────────────────────────────────────────┘
```

🌐 **Akses via browser:** `http://localhost:5136`

</div>

---

## 🛠️ Tech Stack

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![Monero](https://img.shields.io/badge/Monero-FF6600?style=flat-square&logo=monero&logoColor=white)

</div>

---

## 📋 Persyaratan Sistem

| Komponen | Versi Minimum | Link Download |
|----------|--------------|---------------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) | v14 atau lebih baru | [nodejs.org](https://nodejs.org/en/download) |
| ![XMRig](https://img.shields.io/badge/XMRig-Binary-FF6600?style=flat-square) | Versi terbaru | [github.com/xmrig/xmrig/releases](https://github.com/xmrig/xmrig/releases) |
| ![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white) | Opsional | [git-scm.com](https://git-scm.com/downloads) |

---

## 📦 Instalasi

### Step 1 — Clone atau Download Repository

```bash
# Clone via Git
git clone https://github.com/username/xmrig-web-dashboard.git
cd xmrig-web-dashboard
```

> Atau download ZIP langsung dari tombol **Code → Download ZIP** di halaman repository.

---
## 📦 IP MINNER

### Step 2 —  LOKASI IP

```bash
# IP 1
pool.supportxmr.com:3333
# IP 2
 gulf.moneroocean.stream:10128
# IP 3
pool.hashvault.pro:443
```
### Step 3 — Persiapan File

Pastikan semua file berikut berada dalam **satu folder yang sama**:

```
xmrig-web-dashboard/
├── 📄 server.js           ← Server utama
├── 📄 config.json         ← Konfigurasi XMRig
├── 📄 package.json        ← Dependensi Node.js
├── 📁 public/
│   └── 📄 index.html      ← Tampilan dashboard
└── ⚙️  xmrig.exe          ← Binary XMRig (Windows)
    atau system-core       ← Binary XMRig (Linux)
```

> 📥 **Download XMRig binary** dari: [github.com/xmrig/xmrig/releases](https://github.com/xmrig/xmrig/releases)

---

### Step 4 — Install Dependensi

Buka terminal/command prompt di folder proyek, lalu jalankan:

```bash
npm install
```

<details>
<summary>💡 Belum ada Node.js? Klik untuk panduan instalasi</summary>

**Windows:**
1. Download installer dari [nodejs.org](https://nodejs.org/)
2. Jalankan installer dan ikuti petunjuk
3. Restart terminal, lalu cek dengan: `node --version`

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```
</details>

---

## ⚙️ Konfigurasi

### Step 5 — Setup `config.json`

Buka file `config.json` dan pastikan bagian `http` sudah dikonfigurasi untuk API monitoring:

```json
{
  "http": {
    "enabled": true,
    "host": "127.0.0.1",
    "port": 44445,
    "access-token": "secret123"
  },
  "max-threads-hint": 25,
  "max-cpu-usage": 25,
  "priority": 0
}
```

> ⚠️ **Penting:** Jangan ubah `port: 44445` karena server.js menggunakan port ini untuk berkomunikasi dengan XMRig.

---

## 🚀 Menjalankan Dashboard

### Step 6 — Start Server

```bash
npm start
```

Setelah berhasil, buka browser dan akses:

| Environment | URL |
|-------------|-----|
| **Lokal** | `http://localhost:5136` |
| **VPS/Server** | `http://<IP-SERVER>:5136` |

> ✅ Dashboard siap digunakan! Klik tombol **START** untuk mulai mining.

---

## 🐛 Penanganan Masalah CPU 100% Usage

Jika CPU server masih terlalu tinggi setelah berjalan, periksa konfigurasi berikut di `config.json`:

| Parameter | Nilai Default | Fungsi |
|-----------|--------------|--------|
| `max-threads-hint` | `25` | Batasi penggunaan thread CPU (25%) |
| `max-cpu-usage` | `25` | Batas maksimum CPU usage |
| `priority` | `0` | Set ke Idle priority |

```json
{
  "max-threads-hint": 25,
  "max-cpu-usage": 25,
  "priority": 0
}
```

> 🔄 **Setelah mengubah konfigurasi**, tekan tombol **STOP** lalu **START** kembali di dashboard agar perubahan diterapkan.

---

## 📁 Struktur Project

```
xmrig-web-dashboard/
├── 📄 server.js           ← Express server & API handler
├── 📄 config.json         ← Konfigurasi XMRig & CPU limit
├── 📄 package.json        ← Dependencies & scripts
├── 📁 public/
│   └── 📄 index.html      ← Frontend dashboard (HTML/CSS/JS)
├── ⚙️  xmrig.exe          ← XMRig binary (Windows)
└── ⚙️  system-core        ← XMRig binary (Linux)
```

---

## 🔗 Link Berguna

| Sumber | Link |
|--------|------|
| 📦 XMRig Official | [github.com/xmrig/xmrig](https://github.com/xmrig/xmrig) |
| 📥 XMRig Releases | [github.com/xmrig/xmrig/releases](https://github.com/xmrig/xmrig/releases) |
| 📖 XMRig Docs | [xmrig.com/docs](https://xmrig.com/docs/miner) |
| 🌐 Node.js Download | [nodejs.org](https://nodejs.org/en/download) |
| ⛏️ SupportXMR Pool | [supportxmr.com](https://supportxmr.com/) |
| 💰 MoneroOcean Pool | [moneroocean.stream](https://moneroocean.stream/) |

---

## 🤝 Kontribusi

Kontribusi sangat disambut! Silakan:

1. **Fork** repository ini
2. Buat branch baru: `git checkout -b feature/nama-fitur`
3. Commit perubahan: `git commit -m 'feat: tambah fitur X'`
4. Push ke branch: `git push origin feature/nama-fitur`
5. Buat **Pull Request**

---

## ⚠️ Disclaimer

> Project ini dibuat untuk keperluan **edukasi dan penggunaan pribadi** pada server/mesin yang **Anda miliki sendiri**.  
> Pastikan penggunaan sesuai dengan **Terms of Service** provider hosting Anda.

---

## 📄 Lisensi

Didistribusikan di bawah lisensi **ISC**. Lihat [LICENSE](./LICENSE) untuk detail.

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:16213e,50:1a1a2e,100:0a0a0a&height=100&section=footer" width="100%"/>

⭐ **Jika project ini membantu, kasih bintang ya!** ⭐

[![GitHub stars](https://img.shields.io/github/stars/username/xmrig-web-dashboard?style=social)](https://github.com/username/xmrig-web-dashboard)

</div>
