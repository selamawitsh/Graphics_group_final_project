// Main application entry point
class VisualArtGallery {
  constructor() {
    this.gallery = null;
    this.isLoaded = false;

    this.init();
  }

  init() {
    // Show loading screen
    this.showLoadingScreen();

    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        this.setupApplication();
      });
    } else {
      this.setupApplication();
    }
  }

  setupApplication() {
    try {
      // Initialize the gallery
      const container = document.body;
      this.gallery = new Gallery(container);

      // Hide loading screen after a short delay
      setTimeout(() => {
        this.hideLoadingScreen();
        this.isLoaded = true;
      }, 2000);

      // Add keyboard controls
      this.setupKeyboardControls();

      // Add performance monitoring
      this.setupPerformanceMonitoring();
    } catch (error) {
      console.error("Failed to initialize gallery:", error);
      this.showErrorMessage(
        "Failed to load the 3D gallery. Please refresh the page."
      );
    }
  }

  showLoadingScreen() {
    const loadingScreen = document.getElementById("loading-screen");
    if (loadingScreen) {
      loadingScreen.style.display = "flex";
    }
  }

  hideLoadingScreen() {
    const loadingScreen = document.getElementById("loading-screen");
    if (loadingScreen) {
      loadingScreen.style.opacity = "0";
      setTimeout(() => {
        loadingScreen.style.display = "none";
      }, 500);
    }
  }

  showErrorMessage(message) {
    const loadingScreen = document.getElementById("loading-screen");
    if (loadingScreen) {
      const content = loadingScreen.querySelector(".loading-content");
      content.innerHTML = `
                <h2>Error</h2>
                <p>${message}</p>
                <button onclick="location.reload()" style="
                    background: #e74c3c;
                    border: none;
                    color: white;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-top: 20px;
                ">Retry</button>
            `;
    }
  }

  setupKeyboardControls() {
    document.addEventListener("keydown", (event) => {
      if (!this.isLoaded) return;

      switch (event.key.toLowerCase()) {
        case "l":
          this.gallery.toggleLights();
          break;
        case "r":
          this.gallery.resetCamera();
          break;
        case "a":
          this.gallery.toggleAnimation();
          break;
        case "escape":
          document.getElementById("artwork-info").classList.add("hidden");
          break;
        case "h":
          this.toggleHelp();
          break;
      }
    });
  }

  toggleHelp() {
    const helpText = `
            <h3>Keyboard Controls</h3>
            <ul>
                <li><strong>L</strong> - Toggle lights</li>
                <li><strong>R</strong> - Reset camera</li>
                <li><strong>A</strong> - Toggle animations</li>
                <li><strong>ESC</strong> - Close info panel</li>
                <li><strong>H</strong> - Show/hide this help</li>
            </ul>
            <h3>Mouse Controls</h3>
            <ul>
                <li><strong>Left Click + Drag</strong> - Rotate camera</li>
                <li><strong>Scroll</strong> - Zoom in/out</li>
                <li><strong>Right Click + Drag</strong> - Pan camera</li>
                <li><strong>Click on artwork</strong> - View details</li>
            </ul>
        `;

    const infoPanel = document.getElementById("artwork-info");
    const title = document.getElementById("artwork-title");
    const description = document.getElementById("artwork-description");

    if (title.textContent === "Keyboard Controls") {
      infoPanel.classList.add("hidden");
    } else {
      title.textContent = "Keyboard Controls";
      description.innerHTML = helpText;
      infoPanel.classList.remove("hidden");
    }
  }

  setupPerformanceMonitoring() {
    // Monitor frame rate
    let frameCount = 0;
    let lastTime = performance.now();

    const checkPerformance = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));

        // Log performance issues
        if (fps < 30) {
          console.warn(`Low frame rate detected: ${fps} FPS`);
        }

        frameCount = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(checkPerformance);
    };

    requestAnimationFrame(checkPerformance);
  }

  // Public methods for external access
  getGallery() {
    return this.gallery;
  }

  isApplicationLoaded() {
    return this.isLoaded;
  }
}

// Initialize the application when the script loads
let app;

// Wait for Three.js to be available
function waitForThreeJS() {
  if (typeof THREE !== "undefined") {
    app = new VisualArtGallery();
  } else {
    setTimeout(waitForThreeJS, 100);
  }
}

waitForThreeJS();

// Global error handling
window.addEventListener("error", (event) => {
  console.error("Global error:", event.error);
  if (app && !app.isApplicationLoaded()) {
    app.showErrorMessage("An error occurred while loading the application.");
  }
});

// Handle page visibility changes
document.addEventListener("visibilitychange", () => {
  if (app && app.isApplicationLoaded() && app.getGallery()) {
    if (document.hidden) {
      // Pause animations when page is not visible
      app.getGallery().animationEnabled = false;
    } else {
      // Resume animations when page becomes visible
      app.getGallery().animationEnabled = true;
    }
  }
});

// Handle beforeunload to clean up resources
window.addEventListener("beforeunload", () => {
  if (app && app.getGallery()) {
    app.getGallery().dispose();
  }
});
