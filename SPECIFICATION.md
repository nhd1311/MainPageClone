# Đặc Tả Dự Án: MainPageClone

> Phiên bản: 1.0.0 | Ngày: 2026-04-17 | Tác giả: nhd1311

---

## 1. Tổng Quan Dự Án

**Tên dự án:** MainPageClone — Clone trang chủ sàn chứng khoán Việt Nam

**Mục tiêu:** Tái tạo giao diện trang chủ bảng giá chứng khoán (tương tự SSI, VPS, VNDS) với dữ liệu mock thực tế, hỗ trợ đa ngôn ngữ (Tiếng Việt / Tiếng Anh).

**Phạm vi:** Front-end only — không có backend, không có kết nối API thực.

---

## 2. Công Nghệ Sử Dụng

| Hạng mục | Công nghệ | Phiên bản |
|---|---|---|
| Framework | React | 19.2.4 |
| Routing | React Router DOM | 7.13.2 |
| Styling | SCSS (Sass) | 1.98.0 |
| Build tool | Create React App (Webpack) | — |
| Testing | Jest + React Testing Library | — |
| Ngôn ngữ | JavaScript (JSX) | ES2020+ |

---

## 3. Kiến Trúc Hệ Thống

```
┌─────────────────────────────────────────────┐
│                  App.js                     │
│           (React Router v7)                 │
└─────────────────┬───────────────────────────┘
                  │ Route "/"
┌─────────────────▼───────────────────────────┐
│              MainLayout                     │
│  ┌──────────┐ ┌────────┐ ┌──────────────┐  │
│  │  TopBar  │ │ NavBar │ │  BottomBar   │  │
│  └──────────┘ └────────┘ └──────────────┘  │
│  ┌───────────────────────────────────────┐  │
│  │             Dashboard                 │  │
│  │  ┌─────────────────────────────────┐ │  │
│  │  │         IndexTable              │ │  │
│  │  │  [VNI] [HNX] [UPCOM] [VN30]    │ │  │
│  │  └─────────────────────────────────┘ │  │
│  │  ┌─────────────────────────────────┐ │  │
│  │  │           TabBar                │ │  │
│  │  │   VN30  |  HNX  |  UPCOM       │ │  │
│  │  └─────────────────────────────────┘ │  │
│  │  ┌─────────────────────────────────┐ │  │
│  │  │          StockBoard             │ │  │
│  │  │   ┌──────────┐  ┌───────────┐  │ │  │
│  │  │   │PriceBoard│  │ StockRow  │  │ │  │
│  │  │   └──────────┘  └───────────┘  │ │  │
│  │  └─────────────────────────────────┘ │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘

State:
  LanguageContext ──► toàn bộ component tree
  activeTab (useState) ──► Dashboard → StockBoard
  useStocks() ──► lọc dữ liệu theo tab
```

---

## 4. Cấu Trúc Thư Mục

```
MainPageClone/
├── web/
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── App.js                    # Entry router
│   │   ├── index.js                  # ReactDOM render
│   │   ├── components/
│   │   │   ├── MainLayout/           # Wrapper layout toàn trang
│   │   │   ├── Dashboard/            # Container chính, quản lý activeTab
│   │   │   ├── TopBar/               # Thanh navigation trên (tìm kiếm, ngôn ngữ, login)
│   │   │   ├── NavBar/               # Menu điều hướng (Thị trường, Phân tích, v.v.)
│   │   │   ├── BottomBar/            # Footer điều hướng
│   │   │   ├── IndexTable/           # Bảng chỉ số thị trường
│   │   │   ├── IndexCard/            # Card từng chỉ số (VNI, HNX, ...)
│   │   │   ├── TabBar/               # Tab chọn sàn giao dịch
│   │   │   ├── StockBoard/           # Bảng danh sách cổ phiếu
│   │   │   ├── PriceBoard/           # Bảng giá 3 bước (trần/sàn/TC)
│   │   │   └── StockRow/             # Hàng từng cổ phiếu
│   │   ├── context/
│   │   │   ├── LanguageContext.js    # Context đa ngôn ngữ
│   │   │   └── translations.js       # Chuỗi dịch VI/EN
│   │   ├── controllers/
│   │   │   ├── useStocks.js          # Hook lọc/sort cổ phiếu theo tab
│   │   │   ├── stockController.js    # Logic xử lý stock data
│   │   │   └── indexController.js    # Logic xử lý index data
│   │   ├── data/
│   │   │   └── Data.js               # Mock data: 40+ cổ phiếu, 5 chỉ số
│   │   └── styles/
│   │       ├── _variables.scss       # Màu sắc, spacing, breakpoints
│   │       └── _mixins.scss          # SCSS mixins
│   └── package.json
├── SPECIFICATION.md                  # File này
└── PIPELINE.md                       # Tài liệu CI/CD pipeline
```

---

## 5. Tính Năng Chức Năng

### 5.1 Bảng Chỉ Số Thị Trường (IndexTable)
- Hiển thị 5 chỉ số: VNI, HNX, UPCOM, VN30, HNX30
- Mỗi chỉ số hiển thị: giá hiện tại, % thay đổi, biểu đồ mini intraday
- Màu sắc phân biệt: xanh (tăng), đỏ (giảm), vàng (tham chiếu)

### 5.2 Bảng Giá Cổ Phiếu (StockBoard)
- Lọc theo sàn: VN30 / HNX / UPCOM (TabBar)
- Hiển thị 40+ cổ phiếu với các cột:
  - Mã CP, Trần, Sàn, Tham chiếu
  - Giá mua 3 bước (G1/KL1, G2/KL2, G3/KL3)
  - Giá bán 3 bước
  - Tổng KL, Giá khớp lệnh, KL khớp
  - Nước ngoài mua/bán/room

### 5.3 Đa Ngôn Ngữ (i18n)
- Ngôn ngữ mặc định: Tiếng Việt
- Hỗ trợ chuyển đổi: Tiếng Anh
- Quản lý qua React Context API

### 5.4 Navigation
- **TopBar:** Logo, thanh tìm kiếm, chọn ngôn ngữ, nút đăng nhập
- **NavBar:** Menu: Thị trường, Giao dịch, Phân tích, Tin tức, Công cụ
- **BottomBar:** Copyright, links phụ

---

## 6. Quản Lý State

| State | Loại | Scope | Mô tả |
|---|---|---|---|
| `language` | Context | Global | Ngôn ngữ hiển thị (vi/en) |
| `activeTab` | useState | Dashboard | Sàn đang chọn (VN30/HNX/UPCOM) |
| Filtered stocks | useMemo | useStocks hook | Danh sách cổ phiếu sau lọc |

---

## 7. Dữ Liệu

Tất cả dữ liệu là **mock static** trong `src/data/Data.js`:

- **stockData:** Mảng 40+ object cổ phiếu, mỗi object gồm ~25 trường (mã, sàn, giá trần/sàn/TC, bid/ask 3 bước, khối lượng, nước ngoài...)
- **marketData:** Mảng 5 object chỉ số, mỗi object gồm giá, % thay đổi, điểm, dữ liệu chart

> **Hướng phát triển:** Thay thế Data.js bằng WebSocket hoặc REST API thực từ sàn chứng khoán.

---

## 8. Giao Diện & Responsive

- **Desktop first:** Thiết kế chính cho màn hình ≥ 1280px
- **Breakpoints** định nghĩa trong `_variables.scss`
- **Màu sắc chủ đạo:** Xanh đậm (tăng), Đỏ (giảm), Vàng/Cam (tham chiếu/trần)
- **Font:** Hệ thống mặc định (system-ui)

---

## 9. Giới Hạn Hiện Tại

| Hạng mục | Trạng thái |
|---|---|
| API thực | Chưa có — dùng mock data |
| Authentication | Chưa có — nút Login là UI only |
| Real-time updates | Chưa có |
| Mobile responsive | Cơ bản |
| CI/CD | Chưa có |
| Unit tests | Chưa có test case thực |
| Error handling | Chưa có |

---

## 10. Yêu Cầu Môi Trường Phát Triển

```bash
Node.js  >= 18.x
npm      >= 9.x
```

```bash
cd web
npm install
npm start      # http://localhost:3000
npm run build  # Production build → /web/build/
npm test       # Chạy test suite
```
