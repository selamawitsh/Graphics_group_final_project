class Gallery {
    constructor(container) {
        this.container = container;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.artworks = [];
        this.lights = {};
        this.animationEnabled = true;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.backgroundEffects = null;
        this.themeManager = null;
        
        this.init();
        this.setupLights();
        this.createGalleryEnvironment();
        this.createArtworks();
        this.setupEventListeners();
        // Add background effects and theme manager
        this.backgroundEffects = new BackgroundEffects(this.scene);
        this.themeManager = new ColorThemeManager(this);
        this.talkingPeople = new TalkingPeople(this.scene);
        this.interactiveSpotlights = new InteractiveSpotlights(this.scene, this.camera, this.renderer);
        this.animate();
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x000000, 10, 50);
        
        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 5, 10);
        
        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0.1);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        
        this.container.appendChild(this.renderer.domElement);
        
        // Controls setup
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.screenSpacePanning = false;
        this.controls.minDistance = 3;
        this.controls.maxDistance = 20;
        this.controls.maxPolarAngle = Math.PI / 2;
    }

    setupLights() {
        // Ambient light for overall illumination
        this.lights.ambient = new THREE.AmbientLight(0x404040, 0.4);
        this.scene.add(this.lights.ambient);
        
        // Directional light for main illumination
        this.lights.directional = new THREE.DirectionalLight(0xffffff, 0.8);
        this.lights.directional.position.set(10, 10, 5);
        this.lights.directional.castShadow = true;
        this.lights.directional.shadow.mapSize.width = 2048;
        this.lights.directional.shadow.mapSize.height = 2048;
        this.lights.directional.shadow.camera.near = 0.5;
        this.lights.directional.shadow.camera.far = 50;
        this.lights.directional.shadow.camera.left = -10;
        this.lights.directional.shadow.camera.right = 10;
        this.lights.directional.shadow.camera.top = 10;
        this.lights.directional.shadow.camera.bottom = -10;
        this.scene.add(this.lights.directional);
        
        // Point lights for dramatic effect
        this.lights.point1 = new THREE.PointLight(0xff6b6b, 0.6, 10);
        this.lights.point1.position.set(-5, 3, 0);
        this.scene.add(this.lights.point1);
        
        this.lights.point2 = new THREE.PointLight(0x4ecdc4, 0.6, 10);
        this.lights.point2.position.set(5, 3, 0);
        this.scene.add(this.lights.point2);
        
        // Spot light for focused illumination
        this.lights.spot = new THREE.SpotLight(0xffffff, 0.5, 15, Math.PI / 6, 0.5);
        this.lights.spot.position.set(0, 8, 0);
        this.lights.spot.target.position.set(0, 0, 0);
        this.lights.spot.castShadow = true;
        this.scene.add(this.lights.spot);
        this.scene.add(this.lights.spot.target);
    }

    createGalleryEnvironment() {
        // Floor
        const floorGeometry = new THREE.PlaneGeometry(20, 20);
        const floorMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x2c3e50,
            transparent: true,
            opacity: 0.8
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        this.scene.add(floor);
        
        // Walls
        const wallMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x34495e,
            transparent: true,
            opacity: 0.3
        });
        
        // Back wall
        const backWall = new THREE.Mesh(
            new THREE.PlaneGeometry(20, 10),
            wallMaterial
        );
        backWall.position.set(0, 5, -10);
        this.scene.add(backWall);
        
        // Side walls
        const leftWall = new THREE.Mesh(
            new THREE.PlaneGeometry(20, 10),
            wallMaterial
        );
        leftWall.position.set(-10, 5, 0);
        leftWall.rotation.y = Math.PI / 2;
        this.scene.add(leftWall);
        
        const rightWall = new THREE.Mesh(
            new THREE.PlaneGeometry(20, 10),
            wallMaterial
        );
        rightWall.position.set(10, 5, 0);
        rightWall.rotation.y = -Math.PI / 2;
        this.scene.add(rightWall);
        
        // Ceiling
        const ceiling = new THREE.Mesh(
            new THREE.PlaneGeometry(20, 20),
            new THREE.MeshPhongMaterial({ 
                color: 0x2c3e50,
                transparent: true,
                opacity: 0.5
            })
        );
        ceiling.position.set(0, 10, 0);
        ceiling.rotation.x = Math.PI / 2;
        this.scene.add(ceiling);
    }

    createArtworks() {
        const artworkData = [
            {
                title: "Cosmic Sphere",
                description: "A mesmerizing spherical sculpture that represents the infinite nature of the universe. The piece floats gently, creating a sense of weightlessness and cosmic wonder.",
                type: "sculpture",
                color: 0x8e44ad
            },
            {
                title: "Digital Dreams",
                description: "An interactive digital artwork that pulses with life. The wireframe structure represents the digital age and our connection to technology.",
                type: "digital",
                color: 0x00ffff
            },
            {
                title: "Abstract Harmony",
                description: "A complex geometric composition that explores the relationship between form and space. The piece continuously morphs, creating an ever-changing visual experience.",
                type: "abstract",
                color: 0xff6b6b
            },
            {
                title: "Modern Canvas",
                description: "A contemporary painting that challenges traditional artistic boundaries. The piece uses innovative materials and techniques to create depth and texture.",
                type: "painting",
                color: 0xf39c12
            },
            {
                title: "Urban Installation",
                description: "A site-specific installation that reflects urban life and modern architecture. The piece incorporates industrial materials and geometric forms.",
                type: "installation",
                color: 0x27ae60
            },
            {
                title: "Golden Memories",
                description: "A beautiful sunset scene with golden mountains and a bright sun, capturing the warm glow of evening light. The artwork is framed in an elegant brown frame inside a protective box.",
                type: "photoFrame",
                color: 0xffd700,
                frameColor: 0x8B4513
            },
            {
                title: "Silver Elegance",
                description: "A majestic mountain landscape with snow-capped peaks and fluffy clouds in a clear blue sky. The serene scene is displayed in a sophisticated silver frame within a protective box.",
                type: "photoFrame",
                color: 0xc0c0c0,
                frameColor: 0x696969
            },
            {
                title: "Ocean Breeze",
                description: "A vibrant flower garden with colorful blooms in various shades of pink, red, and yellow. The cheerful scene features multiple flowers with green stems against a sky-blue background.",
                type: "photoFrame",
                color: 0x4682b4,
                frameColor: 0x2f4f4f
            }
        ];

        const positions = [
            new THREE.Vector3(-4, 2, -5),
            new THREE.Vector3(4, 2, -5),
            new THREE.Vector3(0, 3, -8),
            new THREE.Vector3(-6, 2, 0),
            new THREE.Vector3(6, 2, 0),
            new THREE.Vector3(-8, 2, -3),
            new THREE.Vector3(8, 2, -3),
            new THREE.Vector3(0, 2, 5)
        ];

        artworkData.forEach((data, index) => {
            const artwork = new Artwork(this.scene, positions[index], data);
            this.artworks.push(artwork);
        });
    }

    setupEventListeners() {
        // Mouse events for interaction
        window.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            this.checkIntersection();
        });

        window.addEventListener('click', (event) => {
            this.handleClick();
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // UI controls
        document.getElementById('toggle-lights').addEventListener('click', () => {
            this.toggleLights();
        });

        document.getElementById('reset-camera').addEventListener('click', () => {
            this.resetCamera();
        });

        document.getElementById('toggle-animation').addEventListener('click', () => {
            this.toggleAnimation();
        });

        document.getElementById('close-info').addEventListener('click', () => {
            document.getElementById('artwork-info').classList.add('hidden');
        });
    }

    checkIntersection() {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);
        
        let foundInteractive = false;
        
        intersects.forEach(intersect => {
            if (intersect.object.userData.isInteractive) {
                foundInteractive = true;
                if (intersect.object.userData.onHover) {
                    intersect.object.userData.onHover();
                }
            }
        });
        
        if (!foundInteractive) {
            this.artworks.forEach(artwork => {
                if (artwork.onHoverOut) {
                    artwork.onHoverOut();
                }
            });
        }
    }

    handleClick() {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);
        
        intersects.forEach(intersect => {
            if (intersect.object.userData.isInteractive && intersect.object.userData.onClick) {
                intersect.object.userData.onClick();
            }
        });
    }

    toggleLights() {
        const lights = Object.values(this.lights);
        lights.forEach(light => {
            light.intensity = light.intensity > 0 ? 0 : (light === this.lights.ambient ? 0.4 : 0.8);
        });
    }

    resetCamera() {
        this.camera.position.set(0, 5, 10);
        this.controls.reset();
    }

    toggleAnimation() {
        this.animationEnabled = !this.animationEnabled;
        const button = document.getElementById('toggle-animation');
        button.textContent = this.animationEnabled ? 'Toggle Animation' : 'Resume Animation';
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        if (this.animationEnabled) {
            // Update artworks
            this.artworks.forEach(artwork => artwork.update());
            // Animate lights
            const time = Date.now() * 0.001;
            this.lights.point1.position.x = Math.sin(time) * 5;
            this.lights.point2.position.x = Math.cos(time) * 5;
            this.lights.spot.position.y = 8 + Math.sin(time * 0.5) * 2;
            // Update background effects
            if (this.backgroundEffects) this.backgroundEffects.update();
            // Update talking people
            if (this.talkingPeople) this.talkingPeople.update(0.016);
        }
        
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    dispose() {
        this.artworks.forEach(artwork => artwork.dispose());
        if (this.backgroundEffects) this.backgroundEffects.dispose();
        if (this.interactiveSpotlights) this.interactiveSpotlights.dispose();
        this.renderer.dispose();
    }
}
