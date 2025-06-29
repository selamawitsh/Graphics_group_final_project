class ColorThemeManager {
    constructor(gallery) {
        this.gallery = gallery;
        this.themes = [
            {
                name: "Classic Dark",
                floor: 0x2c3e50,
                wall: 0x34495e,
                accent: 0xff6b6b
            },
            {
                name: "Sunset",
                floor: 0xffd23f,
                wall: 0xff6b35,
                accent: 0xf7931e
            },
            {
                name: "Ocean",
                floor: 0x4682b4,
                wall: 0x4ecdc4,
                accent: 0x00bfff
            },
            {
                name: "Forest",
                floor: 0x228b22,
                wall: 0x90ee90,
                accent: 0x2ecc40
            }
        ];
        this.current = 0;
        this.applyTheme(this.themes[this.current]);
        document.getElementById('theme-switcher').onclick = () => this.nextTheme();
    }

    applyTheme(theme) {
        // Change floor and wall colors
        this.gallery.scene.traverse(obj => {
            if (obj.isMesh && obj.material && obj.material.color) {
                if (obj.geometry.type === "PlaneGeometry" && obj.position.y < 0.1) {
                    obj.material.color.setHex(theme.floor);
                } else if (obj.geometry.type === "PlaneGeometry") {
                    obj.material.color.setHex(theme.wall);
                }
            }
        });
        // Optionally, update accent colors for lights or UI
        document.body.style.setProperty('--accent-color', `#${theme.accent.toString(16)}`);
    }

    nextTheme() {
        this.current = (this.current + 1) % this.themes.length;
        this.applyTheme(this.themes[this.current]);
    }
}