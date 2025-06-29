class InteractiveSpotlights {
    constructor(scene, camera, renderer) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.spotlights = [];
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        this._onClick = this._onClick.bind(this);
        renderer.domElement.addEventListener('click', this._onClick);
    }

    _onClick(event) {
        // Convert mouse to normalized device coordinates
        const rect = this.renderer.domElement.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);

        // Intersect with floor (assume y=0 plane)
        const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
        const intersectPoint = new THREE.Vector3();
        this.raycaster.ray.intersectPlane(plane, intersectPoint);

        // Add a colored spotlight at the intersection point
        this.addSpotlight(intersectPoint);
    }

    addSpotlight(position) {
        const color = new THREE.Color().setHSL(Math.random(), 0.7, 0.6);
        const spotLight = new THREE.SpotLight(color, 1.2, 10, Math.PI / 6, 0.5);
        spotLight.position.set(position.x, 6, position.z);
        spotLight.target.position.set(position.x, 0, position.z);
        this.scene.add(spotLight);
        this.scene.add(spotLight.target);

        // Optional: add a small sphere to visualize the light source
        const sphere = new THREE.Mesh(
            new THREE.SphereGeometry(0.1, 12, 12),
            new THREE.MeshBasicMaterial({ color })
        );
        sphere.position.copy(spotLight.position);
        this.scene.add(sphere);

        this.spotlights.push({ spotLight, sphere, target: spotLight.target });

        // Limit number of spotlights for performance
        if (this.spotlights.length > 8) {
            const old = this.spotlights.shift();
            this.scene.remove(old.spotLight, old.sphere, old.target);
        }
   }

    update() {
        // Animate spotlight colors
        this.spotlights.forEach((obj, i) => {
            const t = Date.now() * 0.001 + i;
            const color = new THREE.Color().setHSL((t * 0.2 + i * 0.1) % 1, 0.7, 0.6);
            obj.spotLight.color.copy(color);
            obj.sphere.material.color.copy(color);
        });
    }

    dispose() {
        this.renderer.domElement.removeEventListener('dblclick', this._onClick);
        this.spotlights.forEach(obj => {
            this.scene.remove(obj.spotLight, obj.sphere, obj.target);
        });
        this.spotlights = [];
    }
}