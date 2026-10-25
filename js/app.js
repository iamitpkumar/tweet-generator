/**
 * Tweet Studio - Modern Social Media Quote Generator
 * Clean, reactive application with 1:1, 4:5, 9:16 aspect ratios,
 * Dark (#000000) & Light (#ffffff) themes, multi-tweet generation,
 * Retina PNG export, and pixel-perfect printing.
 */

// Fallback avatar
const currentAvatar = (typeof DEFAULT_AVATAR_B64 !== 'undefined') ? DEFAULT_AVATAR_B64 : "assets/default_avatar.png";

// Official Verified Badge SVG
const VERIFIED_BADGE_SVG = `
<svg viewBox="0 0 24 24" class="tweet-badge-svg" aria-label="Verified account">
  <path fill="#1d9bf0" d="M22.5 12.5c0-1.58-.8-2.95-2-3.77.54-1.51.27-3.22-.81-4.29-1.07-1.08-2.78-1.35-4.29-.81C14.58 2.45 13.2 1.65 11.62 1.65c-1.58 0-2.96.8-3.78 1.98-1.51-.54-3.22-.27-4.29.81-1.08 1.07-1.35 2.78-.81 4.29-1.2 1.07-1.99 2.45-1.99 4.02 0 1.58.79 2.96 1.99 3.78-.54 1.51-.27 3.22.81 4.29 1.07 1.08 2.78 1.35 4.29.81 1.07 1.2 2.45 2 4.03 2 1.58 0 2.96-.8 3.78-1.98 1.51.54 3.22.27 4.29-.81 1.08-1.07 1.35-2.78.81-4.29 1.2-1.07 2-2.45 2-4.04z" />
  <path fill="#ffffff" d="M10.2 16.2L6.4 12.4l1.4-1.4 2.4 2.4 6-6 1.4 1.4z" />
</svg>`;

// Three Dots Menu SVG
const MORE_DOTS_SVG = `
<svg viewBox="0 0 24 24">
  <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
</svg>`;

// Twitter/X Authentic Engagement Icons
const REPLY_SVG = `<svg viewBox="0 0 24 24" class="engagement-icon" aria-hidden="true"><g><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"/></g></svg>`;

const RETWEET_SVG = `<svg viewBox="0 0 24 24" class="engagement-icon" aria-hidden="true"><g><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.9 2 2 2H16v2H7.5C5.01 20 3 17.99 3 15.5V7.55L0.932 9.48 0 8.02l4.5-4.14zM19.5 20.12l-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.9-2-2-2H8V4h8.5C18.99 4 21 6.01 21 8.5v7.95l2.068-1.93.932 1.46-4.5 4.14z"/></g></svg>`;

const LIKE_SVG = `<svg viewBox="0 0 24 24" class="engagement-icon" aria-hidden="true"><g><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-2.415.11-4.3 2.11-4.3 4.65 0 2.51 1.289 4.75 3.238 6.64l6.007 5.84 6.008-5.84c1.949-1.89 3.238-4.13 3.238-6.64 0-2.54-1.885-4.55-4.3-4.65zm-4.695 14.8l-5.388-5.23C4.837 13.39 3.75 11.53 3.75 9.65c0-1.93 1.439-3.47 3.273-3.55 1.036-.05 2.18.43 3.102 1.68l1.877 2.54 1.876-2.54c.923-1.25 2.067-1.73 3.103-1.68 1.834.08 3.272 1.62 3.272 3.55 0 1.88-1.087 3.74-2.871 5.42L12.002 20.3z"/></g></svg>`;

const VIEWS_SVG = `<svg viewBox="0 0 24 24" class="engagement-icon" aria-hidden="true"><g><path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"/></g></svg>`;

const BOOKMARK_SVG = `<svg viewBox="0 0 24 24" class="engagement-icon" aria-hidden="true"><g><path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"/></g></svg>`;

const SHARE_SVG = `<svg viewBox="0 0 24 24" class="engagement-icon" aria-hidden="true"><g><path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41L7.71 9.71 6.3 8.29 12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21.01 3 19.9 3 18.51V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"/></g></svg>`;

// Application State
const state = {
  profile: {
    displayName: "Amit P. Kumar",
    username: "@iamitpkumar",
    avatar: currentAvatar,
    verified: true
  },
  meta: {
    date: "2h",
    replies: "1.2K",
    retweets: "4.6K",
    likes: "15K",
    views: "404K"
  },
  tweets: [
    {
      id: 1,
      text: "Do things at your own pace.\nLife's not a race."
    }
  ],
  activeTweetIndex: 0,
  aspectRatio: "1-1", // '1-1' | '4-5' | '9-16'
  viewMode: "single",  // 'single' | 'gallery'
  styling: {
    theme: "dark", // 'dark' (#000000) | 'light' (#ffffff)
    fontSize: 28,
    alignment: "center", // 'center' | 'top'
    showMoreMenu: true,
    showDate: true,
    showEngagements: true
  }
};

// DOM References
const elements = {
  appWorkspace: document.querySelector(".app-workspace"),

  // Top Header
  ratioPills: document.querySelectorAll(".pill-item[data-ratio]"),
  themePills: document.querySelectorAll(".pill-item[data-theme]"),
  topPrintBtn: document.getElementById("topPrintBtn"),
  topDownloadBtn: document.getElementById("topDownloadBtn"),
  topCopyBtn: document.getElementById("topCopyBtn"),

  // Mobile Sub-Nav
  mobileTabPreview: document.getElementById("mobileTabPreview"),
  mobileTabEdit: document.getElementById("mobileTabEdit"),
  mobileRatioPills: document.querySelectorAll(".mobile-pill[data-ratio]"),
  mobileThemePills: document.querySelectorAll(".mobile-pill[data-theme]"),

  // Profile Settings
  avatarBox: document.getElementById("avatarBox"),
  avatarImg: document.getElementById("avatarImg"),
  avatarFileInput: document.getElementById("avatarFileInput"),
  uploadAvatarBtn: document.getElementById("uploadAvatarBtn"),
  resetAvatarBtn: document.getElementById("resetAvatarBtn"),
  displayNameInput: document.getElementById("displayNameInput"),
  usernameInput: document.getElementById("usernameInput"),
  toggleVerified: document.getElementById("toggleVerified"),
  verifiedStatusHint: document.getElementById("verifiedStatusHint"),
  verifiedStatusBanner: document.getElementById("verifiedStatusBanner"),

  // Tweets Manager
  tweetsCountBadge: document.getElementById("tweetsCountBadge"),
  tweetsTabsNav: document.getElementById("tweetsTabsNav"),
  tweetsEditorList: document.getElementById("tweetsEditorList"),
  addTweetBtn: document.getElementById("addTweetBtn"),

  // Date & Engagements
  toggleShowDate: document.getElementById("toggleShowDate"),
  tweetDateInput: document.getElementById("tweetDateInput"),
  toggleShowEngagements: document.getElementById("toggleShowEngagements"),
  engagementsInputsGroup: document.getElementById("engagementsInputsGroup"),
  metricRepliesInput: document.getElementById("metricRepliesInput"),
  metricRetweetsInput: document.getElementById("metricRetweetsInput"),
  metricLikesInput: document.getElementById("metricLikesInput"),
  metricViewsInput: document.getElementById("metricViewsInput"),

  // Style Settings
  sidebarRatioButtons: document.querySelectorAll("#sidebarRatioControl .seg-button"),
  themeCards: document.querySelectorAll(".theme-card-box"),
  fontSizeSlider: document.getElementById("fontSizeSlider"),
  fontSizeBadge: document.getElementById("fontSizeBadge"),
  alignmentControl: document.getElementById("alignmentControl"),
  toggleMoreMenu: document.getElementById("toggleMoreMenu"),

  // Canvas Viewport & Dock
  canvasStage: document.getElementById("canvasStage"),
  cardsDisplayContainer: document.getElementById("cardsDisplayContainer"),
  canvasBottomDock: document.getElementById("canvasBottomDock"),
  dockNavGroup: document.getElementById("dockNavGroup"),
  dockNavIndicator: document.getElementById("dockNavIndicator"),
  prevCardBtn: document.getElementById("prevCardBtn"),
  nextCardBtn: document.getElementById("nextCardBtn"),
  viewModeSingleBtn: document.getElementById("viewModeSingleBtn"),
  viewModeGalleryBtn: document.getElementById("viewModeGalleryBtn"),

  // CSV Modal
  csvModal: document.getElementById("csvModal"),
  closeCsvModalBtn: document.getElementById("closeCsvModalBtn"),
  csvModalCancelBtn: document.getElementById("csvModalCancelBtn"),
  csvModalSubmitBtn: document.getElementById("csvModalSubmitBtn"),
  downloadSampleCsvBtn: document.getElementById("downloadSampleCsvBtn"),
  csvDropZone: document.getElementById("csvDropZone"),
  csvFileInput: document.getElementById("csvFileInput"),
  csvFileInfoBox: document.getElementById("csvFileInfoBox"),
  csvFileName: document.getElementById("csvFileName"),
  csvDetectedCount: document.getElementById("csvDetectedCount"),
  csvPreviewList: document.getElementById("csvPreviewList"),

  printModal: document.getElementById("printModal"),
  closePrintModalBtn: document.getElementById("closePrintModalBtn"),
  printModalCancelBtn: document.getElementById("printModalCancelBtn"),
  printAllPagesBtn: document.getElementById("printAllPagesBtn"),
  printCurrentPageBtn: document.getElementById("printCurrentPageBtn"),
  printModalCount: document.getElementById("printModalCount"),
  printModalRatio: document.getElementById("printModalRatio"),
  printModalTheme: document.getElementById("printModalTheme"),

  printStagingContainer: document.getElementById("printStagingContainer"),
  toastContainer: document.getElementById("toastContainer")
};

/* ==========================================================================
   Persistence: Cookies & LocalStorage Auto-Save
   ========================================================================== */

const STORAGE_KEY = "tweet_studio_recent_work_v1";
const COOKIE_KEY = "tweet_studio_cookie_v1";

function setCookie(name, value, days = 365) {
  try {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
  } catch (err) {
    console.warn("Could not write cookie:", err);
  }
}

function getCookie(name) {
  try {
    const cookies = document.cookie ? document.cookie.split("; ") : [];
    for (const c of cookies) {
      const [key, ...val] = c.split("=");
      if (key === name) {
        return decodeURIComponent(val.join("="));
      }
    }
  } catch (err) {
    console.warn("Could not read cookie:", err);
  }
  return null;
}

let saveDebounceTimer = null;

function saveState() {
  clearTimeout(saveDebounceTimer);
  saveDebounceTimer = setTimeout(saveStateImmediately, 180);
}

function saveStateImmediately() {
  try {
    // 1. Full persistence via localStorage (including custom avatar & all tweets)
    const payload = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, payload);

    // 2. Cookie mirror (lightweight without large binary data to respect 4KB cookie limit)
    const cookieSnapshot = {
      profile: {
        displayName: state.profile.displayName,
        username: state.profile.username,
        verified: state.profile.verified,
        hasCustomAvatar: state.profile.avatar !== currentAvatar
      },
      meta: state.meta,
      tweetsCount: state.tweets.length,
      activeTweetIndex: state.activeTweetIndex,
      aspectRatio: state.aspectRatio,
      viewMode: state.viewMode,
      styling: state.styling,
      savedAt: Date.now()
    };
    setCookie(COOKIE_KEY, JSON.stringify(cookieSnapshot));
  } catch (err) {
    console.warn("Error auto-saving state:", err);
  }
}

function loadSavedState() {
  try {
    let saved = null;
    const rawLocal = localStorage.getItem(STORAGE_KEY);
    if (rawLocal) {
      saved = JSON.parse(rawLocal);
    } else {
      const rawCookie = getCookie(COOKIE_KEY);
      if (rawCookie) {
        saved = JSON.parse(rawCookie);
      }
    }

    if (saved && typeof saved === "object") {
      if (saved.profile) {
        if (saved.profile.displayName) state.profile.displayName = saved.profile.displayName;
        if (saved.profile.username) state.profile.username = saved.profile.username;
        if (typeof saved.profile.verified === "boolean") state.profile.verified = saved.profile.verified;
        if (saved.profile.avatar) state.profile.avatar = saved.profile.avatar;
      }
      if (saved.meta) {
        state.meta = { ...state.meta, ...saved.meta };
      }
      if (Array.isArray(saved.tweets) && saved.tweets.length > 0) {
        state.tweets = saved.tweets;
      }
      if (typeof saved.activeTweetIndex === "number" && saved.activeTweetIndex >= 0) {
        state.activeTweetIndex = Math.min(saved.activeTweetIndex, state.tweets.length - 1);
      }
      if (saved.aspectRatio) {
        state.aspectRatio = saved.aspectRatio;
      }
      if (saved.viewMode) {
        state.viewMode = saved.viewMode;
      }
      if (saved.styling) {
        state.styling = { ...state.styling, ...saved.styling };
      }
      return true;
    }
  } catch (err) {
    console.warn("Could not load saved work:", err);
  }
  return false;
}

/* ==========================================================================
   Initialization
   ========================================================================== */

function init() {
  // Restore recent work from cookies / localStorage
  loadSavedState();

  document.body.className = `theme-${state.styling.theme}`;
  if (elements.appWorkspace) {
    elements.appWorkspace.classList.add("mobile-mode-preview");
  }

  // Synchronize inputs with state
  if (elements.displayNameInput) elements.displayNameInput.value = state.profile.displayName;
  if (elements.usernameInput) elements.usernameInput.value = state.profile.username;
  if (elements.avatarImg) elements.avatarImg.src = state.profile.avatar;
  if (elements.toggleVerified) elements.toggleVerified.checked = state.profile.verified;
  if (elements.verifiedStatusHint) {
    elements.verifiedStatusHint.textContent = state.profile.verified ? "Active" : "Deactivated";
  }
  if (elements.verifiedStatusBanner) {
    elements.verifiedStatusBanner.classList.toggle("deactivated", !state.profile.verified);
  }

  // Date & Engagements inputs
  if (elements.toggleShowDate) elements.toggleShowDate.checked = state.styling.showDate;
  if (elements.tweetDateInput) {
    elements.tweetDateInput.value = state.meta.date;
    elements.tweetDateInput.disabled = !state.styling.showDate;
  }

  if (elements.toggleShowEngagements) elements.toggleShowEngagements.checked = state.styling.showEngagements;
  if (elements.engagementsInputsGroup) {
    elements.engagementsInputsGroup.style.opacity = state.styling.showEngagements ? "1" : "0.35";
    elements.engagementsInputsGroup.style.pointerEvents = state.styling.showEngagements ? "auto" : "none";
  }
  if (elements.metricRepliesInput) elements.metricRepliesInput.value = state.meta.replies;
  if (elements.metricRetweetsInput) elements.metricRetweetsInput.value = state.meta.retweets;
  if (elements.metricLikesInput) elements.metricLikesInput.value = state.meta.likes;
  if (elements.metricViewsInput) elements.metricViewsInput.value = state.meta.views;

  // Styling inputs
  if (elements.fontSizeSlider) elements.fontSizeSlider.value = state.styling.fontSize;
  if (elements.fontSizeBadge) elements.fontSizeBadge.textContent = `${state.styling.fontSize}px`;
  if (elements.toggleMoreMenu) elements.toggleMoreMenu.checked = state.styling.showMoreMenu;

  // Ratio Buttons & Pills
  elements.ratioPills.forEach(p => p.classList.toggle("active", p.dataset.ratio === state.aspectRatio));
  elements.mobileRatioPills.forEach(p => p.classList.toggle("active", p.dataset.ratio === state.aspectRatio));
  elements.sidebarRatioButtons.forEach(b => b.classList.toggle("active", b.dataset.ratio === state.aspectRatio));

  // Theme Buttons & Pills
  elements.themePills.forEach(p => p.classList.toggle("active", p.dataset.theme === state.styling.theme));
  elements.mobileThemePills.forEach(p => p.classList.toggle("active", p.dataset.theme === state.styling.theme));
  elements.themeCards.forEach(c => c.classList.toggle("active", c.dataset.theme === state.styling.theme));

  // Alignment buttons
  if (elements.alignmentControl) {
    elements.alignmentControl.querySelectorAll(".seg-button").forEach(b => {
      b.classList.toggle("active", b.dataset.align === state.styling.alignment);
    });
  }

  // View Mode buttons
  if (elements.viewModeSingleBtn && elements.viewModeGalleryBtn) {
    elements.viewModeSingleBtn.classList.toggle("active", state.viewMode === "single");
    elements.viewModeGalleryBtn.classList.toggle("active", state.viewMode === "gallery");
  }

  bindEvents();
  renderTweetsTabs();
  renderSidebarEditor();
  renderPreview();
  updateDockNav();

  // Save immediately when user leaves or refreshes the page
  window.addEventListener("beforeunload", saveStateImmediately);
}

/* ==========================================================================
   Aspect Ratio & Theme Synchronization
   ========================================================================== */

function setAspectRatio(ratio) {
  state.aspectRatio = ratio;

  // Header pills
  elements.ratioPills.forEach(p => {
    p.classList.toggle("active", p.dataset.ratio === ratio);
  });

  // Mobile quick pills
  elements.mobileRatioPills.forEach(p => {
    p.classList.toggle("active", p.dataset.ratio === ratio);
  });

  // Sidebar ratio buttons
  elements.sidebarRatioButtons.forEach(b => {
    b.classList.toggle("active", b.dataset.ratio === ratio);
  });

  renderPreview();
  saveState();
  showToast(`Ratio set to ${ratio.replace('-', ':')}`, "info");
}

/* ==========================================================================
   Event Bindings
   ========================================================================== */

function bindEvents() {
  // Ratio Switchers (Header, Mobile, and Sidebar)
  elements.ratioPills.forEach(pill => {
    pill.addEventListener("click", () => setAspectRatio(pill.dataset.ratio));
  });

  elements.mobileRatioPills.forEach(pill => {
    pill.addEventListener("click", () => setAspectRatio(pill.dataset.ratio));
  });

  elements.sidebarRatioButtons.forEach(btn => {
    btn.addEventListener("click", () => setAspectRatio(btn.dataset.ratio));
  });

  // Theme Switchers (Header, Mobile, and Sidebar)
  elements.themePills.forEach(pill => {
    pill.addEventListener("click", () => setTheme(pill.dataset.theme));
  });

  elements.mobileThemePills.forEach(pill => {
    pill.addEventListener("click", () => setTheme(pill.dataset.theme));
  });

  elements.themeCards.forEach(card => {
    card.addEventListener("click", () => setTheme(card.dataset.theme));
  });

  // Mobile View Switcher (Preview vs Edit)
  if (elements.mobileTabPreview && elements.mobileTabEdit) {
    elements.mobileTabPreview.addEventListener("click", () => {
      elements.mobileTabPreview.classList.add("active");
      elements.mobileTabEdit.classList.remove("active");
      elements.appWorkspace.classList.remove("mobile-mode-edit");
      elements.appWorkspace.classList.add("mobile-mode-preview");
    });

    elements.mobileTabEdit.addEventListener("click", () => {
      elements.mobileTabEdit.classList.add("active");
      elements.mobileTabPreview.classList.remove("active");
      elements.appWorkspace.classList.remove("mobile-mode-preview");
      elements.appWorkspace.classList.add("mobile-mode-edit");
    });
  }

  // Top Header Action Buttons
  elements.topPrintBtn.addEventListener("click", () => {
    if (state.tweets.length > 1) {
      openPrintModal();
    } else {
      executePrint(false);
    }
  });

  elements.topDownloadBtn.addEventListener("click", () => {
    if (state.viewMode === "gallery" || state.tweets.length > 1) {
      downloadAllTweetsPNG();
    } else {
      downloadSingleTweetPNG(state.activeTweetIndex);
    }
  });

  elements.topCopyBtn.addEventListener("click", copyActiveCardToClipboard);

  // Profile Inputs
  elements.displayNameInput.addEventListener("input", (e) => {
    state.profile.displayName = e.target.value.trim() || "Amit P. Kumar";
    renderPreview();
    saveState();
  });

  elements.usernameInput.addEventListener("input", (e) => {
    let val = e.target.value.trim();
    if (val && !val.startsWith("@")) val = "@" + val;
    state.profile.username = val || "@iamitpkumar";
    renderPreview();
    saveState();
  });

  if (elements.toggleVerified) {
    elements.toggleVerified.addEventListener("change", (e) => {
      state.profile.verified = e.target.checked;
      if (elements.verifiedStatusHint) {
        elements.verifiedStatusHint.textContent = e.target.checked ? "Active" : "Deactivated";
      }
      if (elements.verifiedStatusBanner) {
        elements.verifiedStatusBanner.classList.toggle("deactivated", !e.target.checked);
      }
      renderPreview();
      saveState();
    });
  }

  // Avatar Upload Handlers
  elements.avatarBox.addEventListener("click", () => elements.avatarFileInput.click());
  elements.uploadAvatarBtn.addEventListener("click", () => elements.avatarFileInput.click());
  elements.avatarFileInput.addEventListener("change", handleAvatarFile);

  // Drag & drop avatar
  elements.avatarBox.addEventListener("dragover", (e) => {
    e.preventDefault();
    elements.avatarBox.style.borderColor = "var(--primary)";
  });
  elements.avatarBox.addEventListener("dragleave", () => {
    elements.avatarBox.style.borderColor = "rgba(255, 255, 255, 0.15)";
  });
  elements.avatarBox.addEventListener("drop", (e) => {
    e.preventDefault();
    elements.avatarBox.style.borderColor = "rgba(255, 255, 255, 0.15)";
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processAvatarFile(e.dataTransfer.files[0]);
    }
  });

  elements.resetAvatarBtn.addEventListener("click", () => {
    state.profile.avatar = currentAvatar;
    elements.avatarImg.src = currentAvatar;
    renderPreview();
    saveState();
    showToast("Reset to default profile picture", "info");
  });

  // Tweets Manager
  elements.addTweetBtn.addEventListener("click", addNewTweet);

  // Date & Engagements
  if (elements.toggleShowDate) {
    elements.toggleShowDate.addEventListener("change", (e) => {
      state.styling.showDate = e.target.checked;
      if (elements.tweetDateInput) elements.tweetDateInput.disabled = !e.target.checked;
      renderPreview();
      saveState();
    });
  }

  if (elements.tweetDateInput) {
    elements.tweetDateInput.addEventListener("input", (e) => {
      state.meta.date = e.target.value;
      renderPreview();
      saveState();
    });
  }

  if (elements.toggleShowEngagements) {
    elements.toggleShowEngagements.addEventListener("change", (e) => {
      state.styling.showEngagements = e.target.checked;
      if (elements.engagementsInputsGroup) {
        elements.engagementsInputsGroup.style.opacity = e.target.checked ? "1" : "0.35";
        elements.engagementsInputsGroup.style.pointerEvents = e.target.checked ? "auto" : "none";
      }
      renderPreview();
      saveState();
    });
  }

  if (elements.metricRepliesInput) {
    elements.metricRepliesInput.addEventListener("input", (e) => {
      state.meta.replies = e.target.value;
      renderPreview();
      saveState();
    });
  }

  if (elements.metricRetweetsInput) {
    elements.metricRetweetsInput.addEventListener("input", (e) => {
      state.meta.retweets = e.target.value;
      renderPreview();
      saveState();
    });
  }

  if (elements.metricLikesInput) {
    elements.metricLikesInput.addEventListener("input", (e) => {
      state.meta.likes = e.target.value;
      renderPreview();
      saveState();
    });
  }

  if (elements.metricViewsInput) {
    elements.metricViewsInput.addEventListener("input", (e) => {
      state.meta.views = e.target.value;
      renderPreview();
      saveState();
    });
  }

  // Styling
  elements.fontSizeSlider.addEventListener("input", (e) => {
    state.styling.fontSize = parseInt(e.target.value, 10);
    elements.fontSizeBadge.textContent = `${state.styling.fontSize}px`;
    renderPreview();
    saveState();
  });

  elements.alignmentControl.querySelectorAll(".seg-button").forEach(btn => {
    btn.addEventListener("click", () => {
      elements.alignmentControl.querySelectorAll(".seg-button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.styling.alignment = btn.dataset.align;
      renderPreview();
      saveState();
    });
  });

  elements.toggleMoreMenu.addEventListener("change", (e) => {
    state.styling.showMoreMenu = e.target.checked;
    renderPreview();
    saveState();
  });

  // Dock Navigation
  elements.prevCardBtn.addEventListener("click", () => {
    if (state.activeTweetIndex > 0) {
      state.activeTweetIndex--;
      renderTweetsTabs();
      renderSidebarEditor();
      renderPreview();
      updateDockNav();
      saveState();
    }
  });

  elements.nextCardBtn.addEventListener("click", () => {
    if (state.activeTweetIndex < state.tweets.length - 1) {
      state.activeTweetIndex++;
      renderTweetsTabs();
      renderSidebarEditor();
      renderPreview();
      updateDockNav();
      saveState();
    }
  });

  // View Mode
  elements.viewModeSingleBtn.addEventListener("click", () => setViewMode("single"));
  elements.viewModeGalleryBtn.addEventListener("click", () => setViewMode("gallery"));

  // CSV Modal Events
  elements.closeCsvModalBtn.addEventListener("click", closeCsvModal);
  elements.csvModalCancelBtn.addEventListener("click", closeCsvModal);
  elements.downloadSampleCsvBtn.addEventListener("click", downloadSampleCSV);
  elements.csvDropZone.addEventListener("click", () => elements.csvFileInput.click());
  elements.csvFileInput.addEventListener("change", handleCsvFileInput);
  elements.csvModalSubmitBtn.addEventListener("click", importParsedTweets);

  // Drag & drop CSV
  elements.csvDropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    elements.csvDropZone.classList.add("dragover");
  });
  elements.csvDropZone.addEventListener("dragleave", () => {
    elements.csvDropZone.classList.remove("dragover");
  });
  elements.csvDropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    elements.csvDropZone.classList.remove("dragover");
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processCsvFile(e.dataTransfer.files[0]);
    }
  });

  // Print Modal
  elements.closePrintModalBtn.addEventListener("click", closePrintModal);
  elements.printModalCancelBtn.addEventListener("click", closePrintModal);
  elements.printAllPagesBtn.addEventListener("click", () => {
    closePrintModal();
    executePrint(true);
  });
  elements.printCurrentPageBtn.addEventListener("click", () => {
    closePrintModal();
    executePrint(false);
  });

  // Keyboard navigation
  window.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
    if (e.key === "ArrowLeft") elements.prevCardBtn.click();
    if (e.key === "ArrowRight") elements.nextCardBtn.click();
  });
}

/* ==========================================================================
   Theme Management (Dark #000000 / Light #ffffff)
   ========================================================================== */

function setTheme(themeName) {
  state.styling.theme = themeName;
  document.body.className = `theme-${themeName}`;

  // Header pills
  elements.themePills.forEach(pill => {
    pill.classList.toggle("active", pill.dataset.theme === themeName);
  });

  // Mobile quick pills
  elements.mobileThemePills.forEach(pill => {
    pill.classList.toggle("active", pill.dataset.theme === themeName);
  });

  // Sidebar cards
  elements.themeCards.forEach(card => {
    card.classList.toggle("active", card.dataset.theme === themeName);
  });

  renderPreview();
  saveState();
  showToast(`Switched to ${themeName === "light" ? "Light" : "Dark"} mode`, "info");
}

/* ==========================================================================
   Avatar Upload & Processing
   ========================================================================== */

function handleAvatarFile(e) {
  if (e.target.files && e.target.files[0]) {
    processAvatarFile(e.target.files[0]);
  }
}

function processAvatarFile(file) {
  if (!file.type.startsWith("image/")) {
    showToast("Please choose an image file (PNG, JPG, WebP)", "info");
    return;
  }
  const reader = new FileReader();
  reader.onload = (event) => {
    state.profile.avatar = event.target.result;
    elements.avatarImg.src = state.profile.avatar;
    renderPreview();
    saveState();
    showToast("Profile photo updated!", "success");
  };
  reader.readAsDataURL(file);
}

/* ==========================================================================
   Multi-Tweet Management
   ========================================================================== */

function addNewTweet() {
  const newId = Date.now();
  state.tweets.push({
    id: newId,
    text: "Type your next quote or tweet here..."
  });
  state.activeTweetIndex = state.tweets.length - 1;
  renderTweetsTabs();
  renderSidebarEditor();
  renderPreview();
  updateDockNav();
  saveState();
  showToast("Added new tweet card", "success");
}

function duplicateTweet(index) {
  const original = state.tweets[index];
  state.tweets.splice(index + 1, 0, {
    id: Date.now(),
    text: original.text
  });
  state.activeTweetIndex = index + 1;
  renderTweetsTabs();
  renderSidebarEditor();
  renderPreview();
  updateDockNav();
  saveState();
  showToast("Duplicated tweet", "success");
}

function deleteTweet(index) {
  if (state.tweets.length <= 1) {
    showToast("At least one tweet is required", "info");
    return;
  }
  state.tweets.splice(index, 1);
  if (state.activeTweetIndex >= state.tweets.length) {
    state.activeTweetIndex = state.tweets.length - 1;
  }
  renderTweetsTabs();
  renderSidebarEditor();
  renderPreview();
  updateDockNav();
  saveState();
  showToast("Tweet removed", "info");
}

function renderTweetsTabs() {
  const total = state.tweets.length;
  elements.tweetsCountBadge.textContent = total;

  if (total <= 1) {
    elements.tweetsTabsNav.style.display = "none";
    return;
  }

  elements.tweetsTabsNav.style.display = "flex";
  elements.tweetsTabsNav.innerHTML = "";

  state.tweets.forEach((_, idx) => {
    const tab = document.createElement("button");
    tab.type = "button";
    tab.className = `tweet-tab-btn ${idx === state.activeTweetIndex ? "active" : ""}`;
    tab.textContent = `Tweet #${idx + 1}`;
    tab.addEventListener("click", () => {
      state.activeTweetIndex = idx;
      renderTweetsTabs();
      renderSidebarEditor();
      renderPreview();
      updateDockNav();
      saveState();
    });
    elements.tweetsTabsNav.appendChild(tab);
  });
}

function renderSidebarEditor() {
  elements.tweetsEditorList.innerHTML = "";

  const idx = state.activeTweetIndex;
  const tweet = state.tweets[idx] || state.tweets[0];

  const box = document.createElement("div");
  box.className = "tweet-editor-box active";
  box.innerHTML = `
    <div class="tweet-box-top">
      <span class="tweet-tag-pill">Editing Tweet #${idx + 1} of ${state.tweets.length}</span>
      <div class="tweet-actions-group">
        <button type="button" class="btn btn-ghost btn-sm duplicate-btn" title="Duplicate tweet">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px;"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
        </button>
        ${state.tweets.length > 1 ? `
          <button type="button" class="btn btn-ghost btn-sm delete-btn" title="Delete tweet" style="color: #ef4444;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        ` : ''}
      </div>
    </div>
    <textarea class="field-textarea current-tweet-text" rows="4" placeholder="Enter tweet content...">${escapeHTML(tweet.text)}</textarea>
    <div class="tweet-char-count">${tweet.text.length} characters</div>

    <!-- Full-width Button to Upload CSV with tweets -->
    <div class="csv-upload-btn-wrapper">
      <button type="button" class="btn btn-full-width" id="openCsvModalBtn" title="Upload a CSV file containing tweets">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px;">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="12" y1="18" x2="12" y2="12"></line>
          <line x1="9" y1="15" x2="15" y2="15"></line>
        </svg>
        <span>Upload CSV File with Tweets</span>
      </button>
    </div>
  `;

  const textarea = box.querySelector(".current-tweet-text");
  textarea.addEventListener("input", (e) => {
    state.tweets[idx].text = e.target.value;
    box.querySelector(".tweet-char-count").textContent = `${e.target.value.length} characters`;
    
    // Live update preview
    const liveBody = document.querySelector(`.tweet-card[data-card-index="${idx}"] .tweet-quote-text`);
    if (liveBody) liveBody.textContent = e.target.value;

    saveState();
  });

  box.querySelector(".duplicate-btn").addEventListener("click", () => duplicateTweet(idx));
  const delBtn = box.querySelector(".delete-btn");
  if (delBtn) delBtn.addEventListener("click", () => deleteTweet(idx));

  // CSV button trigger
  box.querySelector("#openCsvModalBtn").addEventListener("click", openCsvModal);

  elements.tweetsEditorList.appendChild(box);
}

/* ==========================================================================
   CSV Upload Modal & Parser
   ========================================================================== */

let parsedCsvTweets = [];

function openCsvModal() {
  parsedCsvTweets = [];
  elements.csvFileInput.value = "";
  elements.csvFileInfoBox.style.display = "none";
  elements.csvModalSubmitBtn.disabled = true;
  elements.csvModal.classList.add("show");
}

function closeCsvModal() {
  elements.csvModal.classList.remove("show");
}

function downloadSampleCSV() {
  const sampleCSV = `Tweet
"Do things at your own pace. Life's not a race."
"Consistency is more important than perfection."
"Small daily habits create massive long-term results."
"Focus on what you can control, let go of what you cannot."
"Your time is limited, don't waste it living someone else's life."
"Difficult roads often lead to beautiful destinations."`;

  const blob = new Blob([sampleCSV], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "sample-tweets.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast("Downloaded sample-tweets.csv!", "success");
}

function handleCsvFileInput(e) {
  if (e.target.files && e.target.files[0]) {
    processCsvFile(e.target.files[0]);
  }
}

function processCsvFile(file) {
  if (!file.name.toLowerCase().endsWith(".csv") && file.type !== "text/csv") {
    showToast("Please select a valid .csv file", "info");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const content = e.target.result;
    const tweets = parseCSV(content);

    if (tweets.length === 0) {
      showToast("No tweets found in this CSV file", "info");
      elements.csvFileInfoBox.style.display = "none";
      elements.csvModalSubmitBtn.disabled = true;
      return;
    }

    parsedCsvTweets = tweets;
    elements.csvFileName.textContent = file.name;
    elements.csvDetectedCount.textContent = `${tweets.length} tweet${tweets.length > 1 ? 's' : ''} detected`;

    // Render preview of first 5 items
    elements.csvPreviewList.innerHTML = "";
    tweets.slice(0, 5).forEach((t, i) => {
      const item = document.createElement("div");
      item.className = "csv-preview-item";
      item.textContent = `${i + 1}. ${t}`;
      elements.csvPreviewList.appendChild(item);
    });

    if (tweets.length > 5) {
      const more = document.createElement("div");
      more.className = "csv-preview-item";
      more.style.fontStyle = "italic";
      more.textContent = `... and ${tweets.length - 5} more tweets`;
      elements.csvPreviewList.appendChild(more);
    }

    elements.csvFileInfoBox.style.display = "block";
    elements.csvModalSubmitBtn.disabled = false;
  };

  reader.readAsText(file, "UTF-8");
}

function parseCSV(text) {
  if (!text) return [];

  // Remove BOM if present
  if (text.charCodeAt(0) === 0xFEFF) {
    text = text.slice(1);
  }

  const rows = [];
  let currentRow = [];
  let currentVal = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        currentVal += '"';
        i++; // skip escaped double quote
      } else if (char === '"') {
        inQuotes = false;
      } else {
        currentVal += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        currentRow.push(currentVal.trim());
        currentVal = '';
      } else if (char === '\r') {
        // skip carriage return
      } else if (char === '\n') {
        currentRow.push(currentVal.trim());
        if (currentRow.some(c => c.length > 0)) {
          rows.push(currentRow);
        }
        currentRow = [];
        currentVal = '';
      } else {
        currentVal += char;
      }
    }
  }

  if (currentVal.length > 0 || inQuotes) {
    currentRow.push(currentVal.trim());
  }
  if (currentRow.some(c => c.length > 0)) {
    rows.push(currentRow);
  }

  if (rows.length === 0) return [];

  // Check if first row is header
  let tweetColIdx = 0;
  let startIndex = 0;

  const header = rows[0].map(h => h.toLowerCase());
  const headerIdx = header.findIndex(h =>
    h === 'tweet' || h === 'tweets' || h === 'content' || h === 'quote' || h === 'quotes' || h === 'text' || h === 'post'
  );

  if (headerIdx !== -1) {
    tweetColIdx = headerIdx;
    startIndex = 1;
  } else {
    startIndex = 0;
    tweetColIdx = 0;
  }

  const results = [];
  for (let r = startIndex; r < rows.length; r++) {
    const val = rows[r][tweetColIdx];
    if (val && val.trim().length > 0) {
      results.push(val.trim());
    }
  }

  return results;
}

function importParsedTweets() {
  if (parsedCsvTweets.length === 0) return;

  state.tweets = parsedCsvTweets.map((quote, idx) => ({
    id: Date.now() + idx,
    text: quote
  }));
  state.activeTweetIndex = 0;

  closeCsvModal();
  renderTweetsTabs();
  renderSidebarEditor();
  renderPreview();
  updateDockNav();
  saveState();
  showToast(`Successfully imported ${state.tweets.length} tweets from CSV!`, "success");
}

/* ==========================================================================
   Card Rendering
   ========================================================================== */

function createTweetCardElement(tweet, index, ratioClass) {
  const isLight = state.styling.theme === "light";
  const themeClass = isLight ? "theme-light" : "theme-dark";
  const alignClass = state.styling.alignment === "top" ? "align-top" : "";

  // Proportional font sizing: 9:16 has naturally larger font for Story impact!
  let dynamicFontSize = state.styling.fontSize;
  if (ratioClass === "9-16") {
    dynamicFontSize = Math.round(state.styling.fontSize * 1.15);
  }

  const meta = tweet.meta || state.meta;

  const card = document.createElement("div");
  card.className = `tweet-card ratio-${ratioClass} ${themeClass}`;
  card.dataset.cardIndex = index;

  card.innerHTML = `
    <div class="tweet-inner ${alignClass}">
      <div class="tweet-content-container">
        <!-- Header: Avatar + Names + Date + Dots -->
        <div class="tweet-header-row">
          <div class="tweet-profile-group">
            <div class="tweet-avatar-box">
              <img src="${state.profile.avatar}" alt="Avatar">
            </div>
            <div class="tweet-name-details">
              <div class="tweet-header-info">
                <span class="tweet-author-name">${escapeHTML(state.profile.displayName)}</span>
                ${state.profile.verified ? VERIFIED_BADGE_SVG : ''}
                <span class="tweet-author-handle">${escapeHTML(state.profile.username)}</span>
                ${state.styling.showDate && meta.date ? `
                  <span class="tweet-header-dot">·</span>
                  <span class="tweet-header-date">${escapeHTML(meta.date)}</span>
                ` : ''}
              </div>
            </div>
          </div>
          ${state.styling.showMoreMenu ? `
            <div class="tweet-dots-icon">
              ${MORE_DOTS_SVG}
            </div>
          ` : ''}
        </div>

        <!-- Body: Tweet Quote Text -->
        <div class="tweet-quote-text" style="font-size: ${dynamicFontSize}px;">${escapeHTML(tweet.text)}</div>

        <!-- Twitter/X Authentic Engagements Bar -->
        ${state.styling.showEngagements ? `
          <div class="tweet-engagements-bar">
            <div class="engagement-item" title="Replies">
              ${REPLY_SVG}
              <span class="engagement-count">${escapeHTML(meta.replies)}</span>
            </div>
            <div class="engagement-item" title="Reposts">
              ${RETWEET_SVG}
              <span class="engagement-count">${escapeHTML(meta.retweets)}</span>
            </div>
            <div class="engagement-item" title="Likes">
              ${LIKE_SVG}
              <span class="engagement-count">${escapeHTML(meta.likes)}</span>
            </div>
            <div class="engagement-item" title="Views">
              ${VIEWS_SVG}
              <span class="engagement-count">${escapeHTML(meta.views)}</span>
            </div>
            <div class="engagement-actions-right">
              <div class="engagement-icon-only" title="Bookmark">
                ${BOOKMARK_SVG}
              </div>
              <div class="engagement-icon-only" title="Share">
                ${SHARE_SVG}
              </div>
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;

  return card;
}

function renderPreview() {
  elements.cardsDisplayContainer.innerHTML = "";

  if (state.viewMode === "single") {
    elements.canvasStage.classList.remove("gallery-view");

    const currentTweet = state.tweets[state.activeTweetIndex] || state.tweets[0];
    const cardElement = createTweetCardElement(currentTweet, state.activeTweetIndex, state.aspectRatio);
    elements.cardsDisplayContainer.appendChild(cardElement);

  } else {
    // Gallery Mode - Canva-style Vertical Cards Stream
    elements.canvasStage.classList.add("gallery-view");

    const stream = document.createElement("div");
    stream.className = "cards-gallery-vertical-stream";

    state.tweets.forEach((tweet, idx) => {
      const rowWrapper = document.createElement("div");
      rowWrapper.className = "gallery-card-row-wrapper";

      const frame = document.createElement("div");
      frame.className = "gallery-card-frame";

      // Canva-style header toolbar for this card
      const toolbar = document.createElement("div");
      toolbar.className = "gallery-card-toolbar no-print";
      toolbar.innerHTML = `
        <div class="gallery-card-page-badge">
          <span>Card #${idx + 1} of ${state.tweets.length}</span>
        </div>
        <div class="gallery-card-toolbar-actions">
          <button type="button" class="btn btn-secondary btn-sm single-edit-btn" title="Focus and edit this tweet">
            <i class="fa-solid fa-pen" style="font-size: 0.72rem; margin-right: 4px;"></i> Edit
          </button>
          <button type="button" class="btn btn-secondary btn-sm single-png-btn" title="Save 1080p PNG">
            <i class="fa-solid fa-download" style="font-size: 0.72rem; margin-right: 4px;"></i> Save PNG
          </button>
          <button type="button" class="btn btn-ghost btn-sm single-print-btn" title="Print this card">
            <i class="fa-solid fa-print" style="font-size: 0.72rem; margin-right: 4px;"></i> Print
          </button>
        </div>
      `;

      toolbar.querySelector(".single-edit-btn").addEventListener("click", () => {
        state.activeTweetIndex = idx;
        setViewMode("single");
        renderTweetsTabs();
        renderSidebarEditor();
        const editorTextarea = document.querySelector(".current-tweet-text");
        if (editorTextarea) editorTextarea.focus();
      });

      toolbar.querySelector(".single-png-btn").addEventListener("click", () => downloadSingleTweetPNG(idx));
      toolbar.querySelector(".single-print-btn").addEventListener("click", () => {
        state.activeTweetIndex = idx;
        executePrint(false);
      });

      const cardElement = createTweetCardElement(tweet, idx, state.aspectRatio);

      // Clicking directly on the card selects it for editing in the sidebar
      cardElement.style.cursor = "pointer";
      cardElement.title = `Click to edit Tweet #${idx + 1}`;
      cardElement.addEventListener("click", (e) => {
        if (!e.target.closest("button")) {
          state.activeTweetIndex = idx;
          renderTweetsTabs();
          renderSidebarEditor();
          const editorTextarea = document.querySelector(".current-tweet-text");
          if (editorTextarea) editorTextarea.focus();
        }
      });

      frame.appendChild(toolbar);
      frame.appendChild(cardElement);
      rowWrapper.appendChild(frame);
      stream.appendChild(rowWrapper);
    });

    elements.cardsDisplayContainer.appendChild(stream);
  }
}

function updateDockNav() {
  const total = state.tweets.length;
  const current = state.activeTweetIndex + 1;
  elements.dockNavIndicator.textContent = `${current} / ${total}`;

  elements.prevCardBtn.disabled = state.activeTweetIndex === 0;
  elements.nextCardBtn.disabled = state.activeTweetIndex === total - 1;

  if (total <= 1 || state.viewMode === "gallery") {
    elements.dockNavGroup.style.display = "none";
  } else {
    elements.dockNavGroup.style.display = "flex";
  }
}

function setViewMode(mode) {
  state.viewMode = mode;
  elements.viewModeSingleBtn.classList.toggle("active", mode === "single");
  elements.viewModeGalleryBtn.classList.toggle("active", mode === "gallery");
  updateDockNav();
  renderPreview();
  saveState();
}

/* ==========================================================================
   PRINT FUNCTIONALITY
   ========================================================================== */

function openPrintModal() {
  elements.printModalCount.textContent = state.tweets.length;
  elements.printModalRatio.textContent = state.aspectRatio.replace("-", ":");
  elements.printModalTheme.textContent = state.styling.theme === "light" ? "Light" : "Dark";
  elements.printModal.classList.add("show");
}

function closePrintModal() {
  elements.printModal.classList.remove("show");
}

function executePrint(printAll) {
  const container = elements.printStagingContainer;
  container.innerHTML = "";

  const themeName = state.styling.theme;
  document.body.className = `theme-${themeName}`;
  container.className = `theme-${themeName}`;

  const tweetsToPrint = printAll ? state.tweets : [state.tweets[state.activeTweetIndex] || state.tweets[0]];

  tweetsToPrint.forEach((tweet, idx) => {
    const pageWrapper = document.createElement("div");
    pageWrapper.className = `print-page-wrapper theme-${themeName}`;

    const card = createTweetCardElement(tweet, idx, state.aspectRatio);
    pageWrapper.appendChild(card);
    container.appendChild(pageWrapper);
  });

  setTimeout(() => {
    window.print();
  }, 100);
}

/* ==========================================================================
   EXPORT AS PNG & CLIPBOARD (Retina 1080p Quality)
   ========================================================================== */

function scaleCardForHDExport(cardElement, aspectRatio) {
  let width = 1080;
  let height = 1080;
  if (aspectRatio === "4-5") height = 1350;
  if (aspectRatio === "9-16") height = 1920;

  cardElement.style.width = `${width}px`;
  cardElement.style.height = `${height}px`;
  cardElement.style.maxWidth = "none";
  cardElement.style.borderRadius = "0";

  const inner = cardElement.querySelector(".tweet-inner");
  if (inner) {
    inner.style.padding = (aspectRatio === "9-16") ? "140px 90px" : "110px 90px";
  }

  const avatar = cardElement.querySelector(".tweet-avatar-box");
  if (avatar) {
    avatar.style.width = "104px";
    avatar.style.height = "104px";
  }

  const name = cardElement.querySelector(".tweet-author-name");
  if (name) name.style.fontSize = "34px";

  const handle = cardElement.querySelector(".tweet-author-handle");
  if (handle) handle.style.fontSize = "26px";

  const headerDate = cardElement.querySelector(".tweet-header-date");
  if (headerDate) headerDate.style.fontSize = "26px";

  const headerDot = cardElement.querySelector(".tweet-header-dot");
  if (headerDot) headerDot.style.fontSize = "26px";

  const badge = cardElement.querySelector(".tweet-badge-svg");
  if (badge) {
    badge.style.width = "34px";
    badge.style.height = "34px";
  }

  const dots = cardElement.querySelector(".tweet-dots-icon svg");
  if (dots) {
    dots.style.width = "36px";
    dots.style.height = "36px";
  }

  const quote = cardElement.querySelector(".tweet-quote-text");
  if (quote) {
    const scaleFactor = (aspectRatio === "9-16") ? 1.85 : 1.7;
    quote.style.fontSize = `${Math.round(state.styling.fontSize * scaleFactor)}px`;
    quote.style.marginTop = "44px";
    quote.style.lineHeight = "1.52";
  }

  const engagementsBar = cardElement.querySelector(".tweet-engagements-bar");
  if (engagementsBar) {
    engagementsBar.style.marginTop = (aspectRatio === "9-16") ? "50px" : "40px";
    engagementsBar.querySelectorAll(".engagement-icon").forEach(icon => {
      icon.style.width = "30px";
      icon.style.height = "30px";
    });
    engagementsBar.querySelectorAll(".engagement-count").forEach(cnt => {
      cnt.style.fontSize = "24px";
    });
    const actionsRight = engagementsBar.querySelector(".engagement-actions-right");
    if (actionsRight) {
      actionsRight.style.gap = "22px";
    }
  }
}

async function downloadSingleTweetPNG(index) {
  const tweet = state.tweets[index] || state.tweets[0];
  showToast("Rendering 1080p high-resolution card...", "info");

  // Create offscreen container
  const tempContainer = document.createElement("div");
  tempContainer.style.position = "fixed";
  tempContainer.style.left = "-9999px";
  tempContainer.style.top = "0";
  tempContainer.style.zIndex = "-1000";

  const cardElement = createTweetCardElement(tweet, index, state.aspectRatio);
  scaleCardForHDExport(cardElement, state.aspectRatio);

  tempContainer.appendChild(cardElement);
  document.body.appendChild(tempContainer);

  const exportBgColor = (state.styling.theme === "light") ? "#ffffff" : "#000000";

  try {
    const canvas = await html2canvas(cardElement, {
      scale: 1, // Rendered natively at 1080px
      useCORS: true,
      backgroundColor: exportBgColor,
      logging: false
    });

    const safeUsername = state.profile.username.replace(/[^a-zA-Z0-9]/g, "");
    const themeSuffix = state.styling.theme;
    const filename = `tweet-${index + 1}-${safeUsername}-${state.aspectRatio}-${themeSuffix}.png`;

    const link = document.createElement("a");
    link.download = filename;
    link.href = canvas.toDataURL("image/png");
    link.click();

    showToast(`Downloaded ${filename}!`, "success");
  } catch (err) {
    console.error("Export error:", err);
    showToast("Export failed. Please try Print > Save as PDF", "info");
  } finally {
    document.body.removeChild(tempContainer);
  }
}

async function downloadAllTweetsPNG() {
  showToast(`Exporting all ${state.tweets.length} tweets as PNG...`, "info");
  for (let i = 0; i < state.tweets.length; i++) {
    await downloadSingleTweetPNG(i);
    await new Promise(r => setTimeout(r, 450));
  }
}

async function copyActiveCardToClipboard() {
  const currentTweet = state.tweets[state.activeTweetIndex] || state.tweets[0];
  showToast("Copying image to clipboard...", "info");

  const tempContainer = document.createElement("div");
  tempContainer.style.position = "fixed";
  tempContainer.style.left = "-9999px";
  tempContainer.style.top = "0";

  const cardElement = createTweetCardElement(currentTweet, state.activeTweetIndex, state.aspectRatio);
  scaleCardForHDExport(cardElement, state.aspectRatio);

  tempContainer.appendChild(cardElement);
  document.body.appendChild(tempContainer);

  const exportBgColor = (state.styling.theme === "light") ? "#ffffff" : "#000000";

  try {
    const canvas = await html2canvas(cardElement, {
      scale: 1,
      useCORS: true,
      backgroundColor: exportBgColor,
      logging: false
    });

    canvas.toBlob(async (blob) => {
      try {
        if (navigator.clipboard && navigator.clipboard.write) {
          const item = new ClipboardItem({ "image/png": blob });
          await navigator.clipboard.write([item]);
          showToast("Image copied to clipboard! (Ready to paste)", "success");
        } else {
          downloadSingleTweetPNG(state.activeTweetIndex);
        }
      } catch (err) {
        console.warn("Clipboard failed, downloading instead:", err);
        downloadSingleTweetPNG(state.activeTweetIndex);
      } finally {
        document.body.removeChild(tempContainer);
      }
    }, "image/png");

  } catch (err) {
    console.error("Copy error:", err);
    if (document.body.contains(tempContainer)) document.body.removeChild(tempContainer);
    downloadSingleTweetPNG(state.activeTweetIndex);
  }
}

/* ==========================================================================
   Utilities
   ========================================================================== */

function escapeHTML(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;

  elements.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.25s ease";
    setTimeout(() => {
      if (elements.toastContainer.contains(toast)) {
        elements.toastContainer.removeChild(toast);
      }
    }, 250);
  }, 2600);
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", init);
