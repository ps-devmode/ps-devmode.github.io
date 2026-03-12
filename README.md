# ⚡ EV Charging Time Calculator (แอปคำนวณเวลาตั้งชาร์จรถยนต์ไฟฟ้า)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

เว็บแอปพลิเคชันสำหรับคำนวณเวลาที่ต้องใช้ในการชาร์จรถยนต์ไฟฟ้า (EV) ช่วยให้ผู้ใช้งานสามารถตั้งเวลาชาร์จไฟ (Scheduled Charging) ได้อย่างแม่นยำ พร้อมระบบบันทึกค่าอัตโนมัติ และ UI/UX ที่ทันสมัยใช้งานง่ายบนทุกขนาดหน้าจอ

---

## ✨ Features (จุดเด่นของโปรเจกต์)

- 🔋 **Accurate Calculation:** คำนวณพลังงานที่ต้องชาร์จเพิ่ม (kWh) และแปลงเป็นเวลาชั่วโมง/นาทีที่ต้องตั้งเวลาชาร์จได้อย่างแม่นยำ
- 💾 **Smart Auto-Save:** ระบบ `LocalStorage` จดจำค่าล่าสุดที่ผู้ใช้กรอกอัตโนมัติ ไม่ต้องพิมพ์ใหม่เมื่อเปิดเว็บครั้งหน้า
- 🛡️ **Input Validation:** ป้องกันการกรอกข้อมูลผิดพลาด เช่น ค่าติดลบ, เปอร์เซ็นต์เกิน 100% หรือค่า Loss ที่ทำให้ระบบคำนวณผิดพลาด
- 🎨 **Modern UI/UX:** ออกแบบด้วย **Tailwind CSS** สวยงาม สะอาดตา รองรับ Responsive Design (Mobile-First)
- 💰 **Monetization Ready:** มีการเตรียมพื้นที่ Ad Slot (Responsive) ไว้สำหรับติดโฆษณา เช่น Google AdSense, MGID หรือ Affiliate Banner 

---

## 🛠️ Tech Stack (เทคโนโลยีที่ใช้)

- **Frontend:** HTML5, Vanilla JavaScript (ES6+)
- **Styling:** Tailwind CSS (via CDN)
- **Font:** Google Fonts (Sarabun)
- **Storage:** Web Storage API (LocalStorage)

---

## 🚀 Getting Started (วิธีการติดตั้งและใช้งาน)

เนื่องจากโปรเจกต์นี้เขียนด้วย Vanilla JavaScript และใช้ Tailwind แบบ CDN คุณจึงไม่ต้องลง Node.js หรือรัน Build Process ใดๆ สามารถเปิดใช้งานได้ทันที!
