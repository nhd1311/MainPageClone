# Pipeline Phát Triển: MainPageClone

> Phiên bản: 1.0.0 | Ngày: 2026-04-17

---

## 1. Tổng Quan Pipeline

```
Developer
    │
    ▼
┌─────────────┐    push/PR    ┌──────────────────────────────────────┐
│  Local Dev  │ ────────────► │           CI Pipeline                │
│             │               │  ┌─────┐ ┌──────┐ ┌─────┐ ┌──────┐ │
│  npm start  │               │  │Lint │►│ Test │►│Build│►│Deploy│ │
│  npm test   │               │  └─────┘ └──────┘ └─────┘ └──────┘ │
└─────────────┘               └──────────────────────────────────────┘
                                                          │
                                                          ▼
                                               ┌──────────────────┐
                                               │  Production/     │
                                               │  Staging Env     │
                                               └──────────────────┘
```

---

## 2. Git Branching Strategy

```
main ─────────────────────────────────────────────────► Production
  │
  ├── develop ──────────────────────────────────────► Staging
  │     │
  │     ├── feature/stock-board-filter
  │     ├── feature/realtime-websocket
  │     ├── feature/mobile-responsive
  │     └── fix/price-color-bug
  │
  └── hotfix/* ────────────────────────────────────► Emergency fix
```

### Quy tắc đặt tên branch

| Loại | Pattern | Ví dụ |
|---|---|---|
| Tính năng mới | `feature/<tên>` | `feature/language-toggle` |
| Sửa lỗi | `fix/<tên>` | `fix/stock-row-alignment` |
| Hotfix production | `hotfix/<tên>` | `hotfix/blank-page-crash` |
| Cải tiến | `improve/<tên>` | `improve/scss-variables` |

### Quy tắc commit message

```
<type>(<scope>): <mô tả ngắn>

Ví dụ:
feat(stockboard): add VN30 tab filtering
fix(layout): fix blank page on first load
style(scss): update color variables for dark mode
refactor(useStocks): simplify useMemo dependency array
docs: add specification and pipeline docs
```

---

## 3. Môi Trường

| Môi trường | Branch | URL | Mục đích |
|---|---|---|---|
| Local | any | localhost:3000 | Phát triển hàng ngày |
| Staging | develop | staging.example.com | QA, review nội bộ |
| Production | main | app.example.com | Người dùng thực |

---

## 4. CI/CD Pipeline Chi Tiết

### 4.1 Trigger

| Sự kiện | Pipeline chạy |
|---|---|
| Push lên `feature/*` | Lint + Test |
| Pull Request → `develop` | Lint + Test + Build + Deploy Staging |
| Merge → `main` | Lint + Test + Build + Deploy Production |

### 4.2 Stage 1 — Lint & Format

```yaml
# .github/workflows/ci.yml (mẫu)
- name: Lint
  run: |
    cd web
    npm run lint        # ESLint (CRA built-in)
    npm run lint:scss   # Stylelint cho SCSS
```

**Kiểm tra:**
- ESLint rules (React hooks, unused vars, no-console)
- SCSS syntax errors
- Import order

### 4.3 Stage 2 — Unit Tests

```yaml
- name: Test
  run: |
    cd web
    npm test -- --watchAll=false --coverage
```

**Kiểm tra:**
- Component rendering tests (React Testing Library)
- Hook logic tests (`useStocks` filtering)
- Translation key completeness
- Coverage threshold: ≥ 70%

### 4.4 Stage 3 — Build

```yaml
- name: Build
  run: |
    cd web
    npm run build
  env:
    REACT_APP_ENV: staging   # hoặc production
```

**Kiểm tra:**
- Build không có lỗi TypeScript/JS
- Bundle size warning (CRA mặc định: > 500KB cảnh báo)
- Static asset optimization

### 4.5 Stage 4 — Deploy

```yaml
- name: Deploy Staging
  if: github.ref == 'refs/heads/develop'
  run: |
    # Ví dụ deploy lên Netlify / Vercel / S3
    npx netlify deploy --dir=web/build --site=$NETLIFY_SITE_ID

- name: Deploy Production
  if: github.ref == 'refs/heads/main'
  run: |
    npx netlify deploy --prod --dir=web/build --site=$NETLIFY_SITE_ID
```

---

## 5. GitHub Actions Workflow Mẫu

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop, 'feature/**', 'fix/**']
  pull_request:
    branches: [main, develop]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: web/package-lock.json

      - name: Install dependencies
        run: cd web && npm ci

      - name: Lint
        run: cd web && npm run lint

      - name: Test
        run: cd web && npm test -- --watchAll=false --coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v4

  build-and-deploy:
    needs: lint-and-test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/develop'
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: web/package-lock.json

      - name: Install dependencies
        run: cd web && npm ci

      - name: Build
        run: cd web && npm run build
        env:
          REACT_APP_ENV: ${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }}

      - name: Deploy
        run: |
          cd web
          npx netlify deploy \
            ${{ github.ref == 'refs/heads/main' && '--prod' || '' }} \
            --dir=build \
            --site=${{ secrets.NETLIFY_SITE_ID }} \
            --auth=${{ secrets.NETLIFY_AUTH_TOKEN }}
```

---

## 6. Checklist Trước Khi Tạo Pull Request

```
□ Code chạy được ở local (npm start)
□ Không có lỗi console
□ Tests pass (npm test)
□ Build thành công (npm run build)
□ Responsive kiểm tra trên mobile (DevTools)
□ Ngôn ngữ VI/EN hoạt động đúng
□ Màu tăng/giảm/tham chiếu đúng
□ Không có hardcode string (dùng translations.js)
□ Commit message theo convention
□ Branch name theo convention
```

---

## 7. Quy Trình Phát Triển Tính Năng

```
1. Tạo branch từ develop
   git checkout develop && git pull
   git checkout -b feature/ten-tinh-nang

2. Phát triển & test local
   cd web && npm start

3. Commit thường xuyên
   git add <files>
   git commit -m "feat(scope): mô tả"

4. Push và tạo PR
   git push origin feature/ten-tinh-nang
   → Tạo PR trên GitHub: feature/* → develop

5. Code review
   → Ít nhất 1 approval
   → CI pipeline xanh

6. Merge vào develop
   → Squash and merge (giữ history gọn)

7. Test trên staging
   → QA verify trên staging.example.com

8. Release: develop → main
   → Tạo PR: develop → main
   → CI deploy tự động lên production
```

---

## 8. Environment Variables

```bash
# web/.env.development
REACT_APP_ENV=development
REACT_APP_API_URL=http://localhost:8080/api   # (tương lai)

# web/.env.staging
REACT_APP_ENV=staging
REACT_APP_API_URL=https://api-staging.example.com/api

# web/.env.production
REACT_APP_ENV=production
REACT_APP_API_URL=https://api.example.com/api
```

> Lưu ý: Không commit file `.env` thực — chỉ commit `.env.example`

---

## 9. Roadmap Tích Hợp API Thực

```
Phase 1 (Hiện tại)
  └── Mock data tĩnh (Data.js)

Phase 2 (Ngắn hạn)
  └── REST API polling mỗi 5 giây
      ├── GET /api/stocks?market=VN30
      └── GET /api/indices

Phase 3 (Dài hạn)
  └── WebSocket real-time
      └── ws://api.example.com/stream
```

---

## 10. Monitoring & Alerts (Tương Lai)

| Công cụ | Mục đích |
|---|---|
| Sentry | Tracking JS errors production |
| Google Analytics | User behavior |
| Lighthouse CI | Performance regressions |
| Uptime Robot | Availability monitoring |
