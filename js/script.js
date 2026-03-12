// --- Config & Initial State ---
const STORAGE_KEY = 'EV_CALC_DATA';
const DEFAULT_VALUES = {
    batteryCapacity: 50.25,
    startPercent: 20,
    targetPercent: 80,
    chargingPower: 7.4,
    lossPercent: 10
};

// --- DOM Elements ---
const inputs = {
    batteryCapacity: document.getElementById('batteryCapacity'),
    startPercent: document.getElementById('startPercent'),
    targetPercent: document.getElementById('targetPercent'),
    chargingPower: document.getElementById('chargingPower'),
    lossPercent: document.getElementById('lossPercent')
};

const outputs = {
    diff: document.getElementById('outputDiff'),
    energyToBat: document.getElementById('outputEnergyToBat'),
    energyWall: document.getElementById('outputEnergyWall'),
    hours: document.getElementById('outputHours'),
    timeFormatted: document.getElementById('outputTimeFormatted')
};

const btnReset = document.getElementById('btnReset');

// --- Functions ---

// 1. โหลดข้อมูลจาก LocalStorage (ถ้าไม่มีให้ใช้ Default)
function loadFromStorage() {
    const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const dataToLoad = savedData ? { ...DEFAULT_VALUES, ...savedData } : DEFAULT_VALUES;

    Object.keys(inputs).forEach(key => {
        inputs[key].value = dataToLoad[key];
    });
}

// 2. เซฟข้อมูลลง LocalStorage
function saveToStorage() {
    const dataToSave = {};
    Object.keys(inputs).forEach(key => {
        dataToSave[key] = parseFloat(inputs[key].value) || 0;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
}

// 3. ป้องกันการพิมพ์ค่าที่ผิดปกติ (Validation)
function validateInputs() {
    let start = parseFloat(inputs.startPercent.value) || 0;
    let target = parseFloat(inputs.targetPercent.value) || 0;
    let loss = parseFloat(inputs.lossPercent.value) || 0;

    // จำกัดค่า % ไม่ให้เกิน 100 และไม่ต่ำกว่า 0
    if (start < 0) inputs.startPercent.value = 0;
    if (start > 100) inputs.startPercent.value = 100;
    if (target < 0) inputs.targetPercent.value = 0;
    if (target > 100) inputs.targetPercent.value = 100;

    // ป้องกัน Loss เป็น 100% เพราะจะทำให้หารด้วยศูนย์
    if (loss < 0) inputs.lossPercent.value = 0;
    if (loss >= 100) inputs.lossPercent.value = 99;
}

// 4. ฟังก์ชันหลักสำหรับคำนวณ
function calculate() {
    validateInputs();
    saveToStorage();

    const capacity = parseFloat(inputs.batteryCapacity.value) || 0;
    const startPct = parseFloat(inputs.startPercent.value) || 0;
    const targetPct = parseFloat(inputs.targetPercent.value) || 0;
    const power = parseFloat(inputs.chargingPower.value) || 0;
    const lossPct = parseFloat(inputs.lossPercent.value) || 0;

    // 1️⃣ % ที่ต้องชาร์จเพิ่ม
    let diffPct = targetPct - startPct;
    if (diffPct < 0) diffPct = 0;

    // 2️⃣ พลังงานเข้าแบตจริง
    const energyToBat = capacity * (diffPct / 100);

    // 3️⃣ พลังงานดึงจากปลั๊ก
    const lossFactor = 1 - (lossPct / 100);
    const energyWall = lossFactor > 0 ? energyToBat / lossFactor : 0;

    // 4️⃣ ชั่วโมงที่ต้องตั้งเวลา
    const totalHours = power > 0 ? energyWall / power : 0;

    // 5️⃣ แปลงเป็น ชั่วโมง : นาที
    const hoursInt = Math.floor(totalHours);
    const minutesDecimal = (totalHours - hoursInt) * 60;
    const minutesInt = Math.round(minutesDecimal);

    let finalHours = hoursInt;
    let finalMinutes = minutesInt;
    if (finalMinutes === 60) {
        finalHours += 1;
        finalMinutes = 0;
    }

    const minutesStr = finalMinutes.toString().padStart(2, '0');
    const timeStr = `${finalHours}:${minutesStr}`;

    // Update UI
    outputs.diff.textContent = `${diffPct.toFixed(0)}%`;
    outputs.energyToBat.textContent = `${energyToBat.toFixed(2)} kWh`;
    outputs.energyWall.textContent = `${energyWall.toFixed(2)} kWh`;
    outputs.hours.textContent = `${totalHours.toFixed(2)} ชม.`;
    outputs.timeFormatted.textContent = timeStr;
}

// 5. รีเซ็ตกลับค่าเริ่มต้น
function resetApp() {
    localStorage.removeItem(STORAGE_KEY);
    loadFromStorage();
    calculate();
}

// --- Event Listeners ---
Object.values(inputs).forEach(input => {
    // ใช้ event 'input' เพื่อคำนวณทันทีที่พิมพ์
    input.addEventListener('input', calculate);
});

btnReset.addEventListener('click', resetApp);

// --- Initialize App ---
function init() {
    loadFromStorage();
    calculate();
}

// รันเมื่อโหลดหน้าเว็บเสร็จ
document.addEventListener('DOMContentLoaded', init);
