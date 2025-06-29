class BackgroundEffects {
    constructor(scene) {
        this.scene = scene;
        this.particles = [];
        this.initParticles();
    }

    initParticles() {
        const particleCount = 120;
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const colors = [];
        for (let i = 0; i < particleCount; i++) {
            positions.push(
                (Math.random() - 0.5) * 40,
                Math.random() * 10 + 1,
                (Math.random() - 0.5) * 40
            );
            const color = new THREE.Color().setHSL(Math.random(), 0.7, 0.7);
            colors.push(color.r, color.g, color.b);
        }
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        const material = new THREE.PointsMaterial({
            size: 0.3,
            vertexColors: true,
            transparent: true,
            opacity: 0.7
        });
        this.particleSystem = new THREE.Points(geometry, material);
        this.scene.add(this.particleSystem);
    }

    update() {
        if (this.particleSystem) {
            const positions = this.particleSystem.geometry.attributes.position;
            for (let i = 0; i < positions.count; i++) {
                let y = positions.getY(i);
                y += Math.sin(Date.now() * 0.001 + i) * 0.01;
                if (y > 12) y = 1;
                positions.setY(i, y);
            }
            positions.needsUpdate = true;
        }
    }

    dispose() {
        if (this.particleSystem) {
            this.scene.remove(this.particleSystem);
            this.particleSystem.geometry.dispose();
            this.particleSystem.material.dispose();
        }
    }
}