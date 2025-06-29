class Artwork {
    constructor(scene, position, artworkData) {
        this.scene = scene;
        this.position = position;
        this.artworkData = artworkData;
        this.mesh = null;
        this.originalScale = new THREE.Vector3(1, 1, 1);
        this.isHovered = false;
        this.isSelected = false;
        this.animationSpeed = 0.02;
        this.rotationSpeed = 0.005;
        
        this.createArtwork();
        this.setupInteractivity();
    }

    createArtwork() {
        if (this.artworkData.type === 'photoFrame') {
            this.createPhotoFrame();
        } else {
            const geometry = this.createGeometry();
            const material = this.createMaterial();
            this.mesh = new THREE.Mesh(geometry, material);
            this.mesh.position.copy(this.position);
            this.mesh.userData.artwork = this;
            this.mesh.userData.artworkData = this.artworkData;
            
            // Enable shadows for all artworks
            this.mesh.castShadow = true;
            this.mesh.receiveShadow = true;
            
            this.scene.add(this.mesh);
        }
    }

    createPhotoFrame() {
        // Create a group to hold the box, frame, and picture
        this.mesh = new THREE.Group();
        this.mesh.position.copy(this.position);
        this.mesh.userData.artwork = this;
        this.mesh.userData.artworkData = this.artworkData;
        
        // Create the box container
        const boxGeometry = new THREE.BoxGeometry(4, 3, 0.3);
        const boxMaterial = new THREE.MeshPhongMaterial({
            color: 0x2c3e50,
            shininess: 30,
            transparent: false,
            opacity: 1.0
        });
        const box = new THREE.Mesh(boxGeometry, boxMaterial);
        box.castShadow = true;
        box.receiveShadow = true;
        
        // Create the outer frame (larger plane)
        const frameGeometry = new THREE.PlaneGeometry(3.5, 2.5);
        const frameMaterial = new THREE.MeshPhongMaterial({
            color: this.artworkData.frameColor || 0x8B4513, // Brown frame
            shininess: 60,
            transparent: false,
            opacity: 1.0
        });
        const frame = new THREE.Mesh(frameGeometry, frameMaterial);
        frame.position.z = 0.15; // Inside the box
        frame.castShadow = true;
        frame.receiveShadow = true;
        frame.userData.isInteractive = true;
        frame.userData.onClick = () => this.onClick();
        frame.userData.onHover = () => this.onHover();
        frame.userData.onHoverOut = () => this.onHoverOut();
        
        // Create the inner picture with custom artwork
        const pictureGeometry = new THREE.PlaneGeometry(3.1, 2.1);
        const pictureMaterial = this.createCustomArtwork();
        const picture = new THREE.Mesh(pictureGeometry, pictureMaterial);
        picture.position.z = 0.16; // Slightly in front of frame
        picture.castShadow = true;
        picture.receiveShadow = true;
        
        // Add all elements to the group
        this.mesh.add(box);
        this.mesh.add(frame);
        this.mesh.add(picture);
        
        this.scene.add(this.mesh);
    }

    createCustomArtwork() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        
        // Create gradient background based on artwork type
        if (this.artworkData.title === "Golden Memories") {
            // Sunset gradient
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, '#ff6b35');   // Orange
            gradient.addColorStop(0.3, '#f7931e'); // Golden
            gradient.addColorStop(0.6, '#ffd23f'); // Yellow
            gradient.addColorStop(1, '#ff6b9d');   // Pink
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw sun
            ctx.beginPath();
            ctx.arc(canvas.width * 0.8, canvas.height * 0.2, 60, 0, 2 * Math.PI);
            ctx.fillStyle = '#ffeb3b';
            ctx.fill();
            
            // Draw mountains
            ctx.fillStyle = '#4a4a4a';
            ctx.beginPath();
            ctx.moveTo(0, canvas.height * 0.7);
            ctx.lineTo(canvas.width * 0.3, canvas.height * 0.4);
            ctx.lineTo(canvas.width * 0.6, canvas.height * 0.6);
            ctx.lineTo(canvas.width, canvas.height * 0.5);
            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(0, canvas.height);
            ctx.fill();
            
        } else if (this.artworkData.title === "Silver Elegance") {
            // Mountain landscape
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, '#87ceeb');   // Sky blue
            gradient.addColorStop(0.6, '#98fb98'); // Light green
            gradient.addColorStop(1, '#228b22');   // Forest green
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw snow-capped mountains
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.moveTo(0, canvas.height * 0.6);
            ctx.lineTo(canvas.width * 0.2, canvas.height * 0.3);
            ctx.lineTo(canvas.width * 0.4, canvas.height * 0.5);
            ctx.lineTo(canvas.width * 0.6, canvas.height * 0.2);
            ctx.lineTo(canvas.width * 0.8, canvas.height * 0.4);
            ctx.lineTo(canvas.width, canvas.height * 0.3);
            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(0, canvas.height);
            ctx.fill();
            
            // Add some clouds
            ctx.fillStyle = '#ffffff';
            ctx.globalAlpha = 0.8;
            ctx.beginPath();
            ctx.arc(canvas.width * 0.3, canvas.height * 0.2, 30, 0, 2 * Math.PI);
            ctx.arc(canvas.width * 0.4, canvas.height * 0.2, 25, 0, 2 * Math.PI);
            ctx.arc(canvas.width * 0.5, canvas.height * 0.2, 35, 0, 2 * Math.PI);
            ctx.fill();
            ctx.globalAlpha = 1.0;
            
        } else if (this.artworkData.title === "Ocean Breeze") {
            // Flower garden
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, '#87ceeb');   // Sky blue
            gradient.addColorStop(0.7, '#90ee90'); // Light green
            gradient.addColorStop(1, '#228b22');   // Dark green
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw flowers
            const flowerColors = ['#ff69b4', '#ff1493', '#ff6347', '#ff4500', '#ffd700'];
            for (let i = 0; i < 8; i++) {
                const x = canvas.width * (0.1 + i * 0.1);
                const y = canvas.height * (0.6 + Math.sin(i) * 0.1);
                const color = flowerColors[i % flowerColors.length];
                
                // Draw flower petals
                ctx.fillStyle = color;
                for (let j = 0; j < 8; j++) {
                    const angle = (j * Math.PI * 2) / 8;
                    const petalX = x + Math.cos(angle) * 25;
                    const petalY = y + Math.sin(angle) * 25;
                    ctx.beginPath();
                    ctx.arc(petalX, petalY, 8, 0, 2 * Math.PI);
                    ctx.fill();
                }
                
                // Draw flower center
                ctx.fillStyle = '#ffff00';
                ctx.beginPath();
                ctx.arc(x, y, 12, 0, 2 * Math.PI);
                ctx.fill();
                
                // Draw stem
                ctx.strokeStyle = '#228b22';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(x, y + 12);
                ctx.lineTo(x, canvas.height * 0.9);
                ctx.stroke();
            }
        }
        
        // Create texture from canvas
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        
        return new THREE.MeshBasicMaterial({
            map: texture,
            transparent: false,
            opacity: 1.0
        });
    }

    createGeometry() {
        switch (this.artworkData.type) {
            case 'sculpture':
                return new THREE.SphereGeometry(1, 32, 32);
            case 'painting':
                return new THREE.PlaneGeometry(2, 1.5);
            case 'picture':
                return new THREE.PlaneGeometry(2.5, 1.8);
            case 'photoFrame':
                return new THREE.PlaneGeometry(3.5, 2.5);
            case 'rectangle':
                return new THREE.PlaneGeometry(2.8, 2);
            case 'installation':
                return new THREE.BoxGeometry(1.5, 2, 1.5);
            case 'digital':
                return new THREE.TorusGeometry(1, 0.3, 16, 100);
            case 'abstract':
                return new THREE.OctahedronGeometry(1);
            default:
                return new THREE.BoxGeometry(1, 1, 1);
        }
    }

    createMaterial() {
        const material = new THREE.MeshPhongMaterial({
            color: this.artworkData.color || 0xffffff,
            shininess: 100,
            transparent: true,
            opacity: 0.9
        });

        // Add texture if available
        if (this.artworkData.texture) {
            const textureLoader = new THREE.TextureLoader();
            material.map = textureLoader.load(this.artworkData.texture);
        }

        // Special handling for picture type (2D artworks without frames)
        if (this.artworkData.type === 'picture') {
            material.shininess = 50;
            material.transparent = false;
            material.opacity = 1.0;
            // Add subtle glow effect
            material.emissive = new THREE.Color(0x222222);
        }

        // Special handling for photoFrame type (2D artworks with visible frames)
        if (this.artworkData.type === 'photoFrame') {
            material.shininess = 80;
            material.transparent = false;
            material.opacity = 1.0;
            // Add frame effect with darker border
            material.emissive = new THREE.Color(0x333333);
        }

        // Special handling for rectangle type (simple 2D rectangle)
        if (this.artworkData.type === 'rectangle') {
            material.shininess = 40;
            material.transparent = false;
            material.opacity = 1.0;
            // Add subtle glow effect
            material.emissive = new THREE.Color(0x111111);
        }

        // Add procedural texture for some artworks
        if (this.artworkData.type === 'digital') {
            material.wireframe = true;
            material.color.setHex(0x00ffff);
        }

        if (this.artworkData.type === 'abstract') {
            material.wireframe = true;
            material.color.setHex(0xff6b6b);
        }

        return material;
    }

    setupInteractivity() {
        if (this.artworkData.type !== 'photoFrame') {
            this.mesh.userData.isInteractive = true;
            this.mesh.userData.onClick = () => this.onClick();
            this.mesh.userData.onHover = () => this.onHover();
            this.mesh.userData.onHoverOut = () => this.onHoverOut();
        }
    }

    onClick() {
        this.isSelected = !this.isSelected;
        this.showArtworkInfo();
        
        if (this.isSelected) {
            if (this.artworkData.type === 'photoFrame') {
                this.mesh.children.forEach(child => {
                    if (child.material) {
                        child.material.emissive.setHex(0x333333);
                    }
                });
                this.mesh.scale.setScalar(1.1);
            } else {
                this.mesh.material.emissive.setHex(0x333333);
                this.mesh.scale.setScalar(1.1);
            }
        } else {
            if (this.artworkData.type === 'photoFrame') {
                this.mesh.children.forEach(child => {
                    if (child.material) {
                        child.material.emissive.setHex(0x000000);
                    }
                });
                this.mesh.scale.copy(this.originalScale);
            } else {
                this.mesh.material.emissive.setHex(0x000000);
                this.mesh.scale.copy(this.originalScale);
            }
        }
    }

    onHover() {
        if (!this.isHovered) {
            this.isHovered = true;
            if (this.artworkData.type === 'photoFrame') {
                this.mesh.children.forEach(child => {
                    if (child.material) {
                        child.material.emissive.setHex(0x222222);
                    }
                });
                this.mesh.scale.setScalar(1.05);
            } else {
                this.mesh.material.emissive.setHex(0x222222);
                this.mesh.scale.setScalar(1.05);
            }
        }
    }

    onHoverOut() {
        if (this.isHovered && !this.isSelected) {
            this.isHovered = false;
            if (this.artworkData.type === 'photoFrame') {
                this.mesh.children.forEach(child => {
                    if (child.material) {
                        child.material.emissive.setHex(0x000000);
                    }
                });
                this.mesh.scale.copy(this.originalScale);
            } else {
                this.mesh.material.emissive.setHex(0x000000);
                this.mesh.scale.copy(this.originalScale);
            }
        }
    }

    showArtworkInfo() {
        const infoPanel = document.getElementById('artwork-info');
        const title = document.getElementById('artwork-title');
        const description = document.getElementById('artwork-description');

        title.textContent = this.artworkData.title;
        description.textContent = this.artworkData.description;
        
        infoPanel.classList.remove('hidden');
    }

    update() {
        // Rotate the artwork slowly
        this.mesh.rotation.y += this.rotationSpeed;
        
        // Add floating animation for sculptures
        if (this.artworkData.type === 'sculpture') {
            this.mesh.position.y = this.position.y + Math.sin(Date.now() * 0.001) * 0.1;
        }
        
        // Add pulsing animation for digital art
        if (this.artworkData.type === 'digital') {
            const scale = 1 + Math.sin(Date.now() * 0.003) * 0.1;
            this.mesh.scale.setScalar(scale);
        }
        
        // Add morphing animation for abstract pieces
        if (this.artworkData.type === 'abstract') {
            this.mesh.rotation.x += this.rotationSpeed * 0.5;
            this.mesh.rotation.z += this.rotationSpeed * 0.3;
        }
        
        // Add gentle floating animation for pictures
        if (this.artworkData.type === 'picture') {
            this.mesh.position.y = this.position.y + Math.sin(Date.now() * 0.0008) * 0.05;
            // Very subtle rotation for pictures
            this.mesh.rotation.y += this.rotationSpeed * 0.3;
        }
        
        // Add gentle floating animation for photo frames
        if (this.artworkData.type === 'photoFrame') {
            this.mesh.position.y = this.position.y + Math.sin(Date.now() * 0.0006) * 0.03;
            // Very subtle rotation for photo frames
            this.mesh.rotation.y += this.rotationSpeed * 0.2;
        }
        
        // Add gentle floating animation for rectangles
        if (this.artworkData.type === 'rectangle') {
            this.mesh.position.y = this.position.y + Math.sin(Date.now() * 0.0007) * 0.04;
            // Very subtle rotation for rectangles
            this.mesh.rotation.y += this.rotationSpeed * 0.25;
        }
    }

    dispose() {
        if (this.mesh) {
            this.scene.remove(this.mesh);
            this.mesh.geometry.dispose();
            this.mesh.material.dispose();
        }
    }
}

// Inside your Artwork class or where you create/interact with artworks:
mesh.userData.originalColor = mesh.material.color.getHex();

mesh.addEventListener('click', function () {
    // Generate a random color
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    mesh.material.color.set('#' + randomColor);
});