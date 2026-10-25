# Tweet Generator & Card Studio 🐦✨

A lightweight, modern, and aesthetic web application to generate high-impact social media quote cards and tweets in **1:1**, **4:5**, and **9:16** aspect ratios. Features native **Dark (`#000000`)** and **Light (`#ffffff`)** themes, permanent Twitter/X verified badge, multi-tweet batch generation, 1080p Retina image export, and pixel-perfect printing.

---

## 🌟 Key Features

- **📐 Multi-Aspect Ratio Support**:
  - `1:1 Square` (1080 × 1080) — Ideal for Instagram carousels, feed posts, and Threads.
  - `4:5 Portrait` (1080 × 1350) — Optimized for vertical Instagram feed visibility.
  - `9:16 Story / Reel` (1080 × 1920) — Sized for Instagram Stories, Reels, TikTok, and YouTube Shorts.
- **🎨 Dark (`#000000`) & Light (`#ffffff`) Themes**:
  - **Pitch Black (`#000000`)**: Deep black canvas with crisp white typography matching viral quote cards.
  - **Clean White (`#ffffff`)**: Crisp white canvas with dark typography (`#0f1419` / `#536471`).
  - Seamless 1-tap switching in both header and sidebar.
- **🛡️ Always-On Blue Verified Badge**:
  - Crisp vector SVG official Twitter/X blue badge (`#1d9bf0`) with white checkmark.
- **👤 Profile Customization**:
  - Custom profile picture upload (file picker and drag-and-drop support).
  - Editable display name and username/handle with automatic `@` prefixing.
  - Reset to default button.
- **⚡ Multiple Tweets & Bulk Quote Generator**:
  - Add multiple tweets one by one or duplicate existing cards.
  - **Bulk Quotes Import**: Paste a list of quotes (separated by new lines) to instantly generate dozens of cards in seconds.
  - Switch between **Focused View** (with pagination) and **All Cards Gallery** view.
- **🖨️ Pixel-Perfect Print (`window.print`)**:
  - Prominent **Print Tweets** button right on top.
  - Custom `@media print` rules: eliminates UI noise, headers, and footers.
  - Automatically prints each card on its own page with full background color preservation.
  - Choose between printing all tweets at once or printing only the current active card.
- **💾 High-Res 1080p Retina Export & Copy**:
  - **Save PNG**: Export native high-resolution (`1080p`) images ready for direct social media upload.
  - **Copy Image**: Copies the rendered card image directly to your clipboard for instant pasting.
- **📱 Fully Responsive Design**:
  - Desktop: Spacious 2-column studio layout with dot-grid canvas.
  - Mobile & Tablet: Sticky mobile navigation with 1-tap switching between `Preview Card` and `Edit Content`, plus quick scrollable pills.
- **✨ Polished UX Details**:
  - Independent sidebar scroll (`overscroll-behavior: contain`).
  - Custom sleek **3px scrollbar** globally.
  - Live character counts and responsive typography scaling.

---

## 🚀 Getting Started

This project is completely plug-and-play with **zero dependencies or build steps** required.

### 1. Clone the repository
```bash
git clone https://github.com/iamitpkumar/tweet-generator.git
cd tweet-generator
```

### 2. Run locally
- **Option A (Direct)**: Double-click `index.html` to open it in any web browser.
- **Option B (Local Web Server)**:
  - If using **XAMPP / WAMP / MAMP**, place the folder in `htdocs` and visit `http://localhost/tweet-generator/`.
  - Or using Node.js:
    ```bash
    npx serve .
    ```
  - Or using Python:
    ```bash
    python -m http.server 8000
    ```

---

## 📁 Project Structure

```
tweet-generator/
├── index.html            # Semantic HTML5 studio layout
├── css/
│   └── style.css         # Complete UI, dark/light themes, 3px scrollbars & @media print
├── js/
│   ├── app.js            # Reactive application logic, aspect ratios & exports
│   ├── default-avatar.js # Embedded base64 default avatar (CORS/offline-safe)
│   └── html2canvas.min.js# Offline high-resolution canvas renderer
├── assets/
│   ├── default_avatar.png# Default profile avatar
│   └── images/           # Preset avatars
├── .gitignore            # Git ignore rules
└── README.md             # Project documentation
```

---

## 🛠️ Built With

- **HTML5 & CSS3** (Custom properties, Flexbox, CSS Grid, `@media print`)
- **Vanilla JavaScript** (ES6+, DOM API, Clipboard API)
- **html2canvas** (Retina PNG rendering)
- **Google Fonts** (`Inter`)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
