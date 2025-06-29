class TalkingPeople {
    constructor(scene) {
        this.scene = scene;
        this.group = new THREE.Group();

        // Create two people
        this.person1 = this.createPerson(0x3498db); // Blue
        this.person2 = this.createPerson(0xe67e22); // Orange

        // Position them facing each other
        this.person1.position.set(-0.7, 0, 0);
        this.person2.position.set(0.7, 0, 0);
        this.person1.rotation.y = Math.PI / 8;
        this.person2.rotation.y = -Math.PI / 8;

        this.group.add(this.person1);
        this.group.add(this.person2);

        // Place in the middle of the gallery
        this.group.position.set(0, 0, 0);

        scene.add(this.group);

        this.time = 0;
    }

    createPerson(color) {
        const group = new THREE.Group();

        // Body
        const body = new THREE.Mesh(
            new THREE.CylinderGeometry(0.12, 0.12, 0.6, 16),
            new THREE.MeshStandardMaterial({ color })
        );
        body.position.y = 0.6;
        group.add(body);

        // Head
        const head = new THREE.Mesh(
            new THREE.SphereGeometry(0.16, 16, 16),
            new THREE.MeshStandardMaterial({ color: 0xffe0bd })
        );
        head.position.y = 1.0;
        group.add(head);

        // Left Leg
        const leftLeg = new THREE.Mesh(
            new THREE.CylinderGeometry(0.05, 0.05, 0.4, 12),
            new THREE.MeshStandardMaterial({ color: 0x222222 })
        );
        leftLeg.position.set(-0.07, 0.2, 0);
        group.add(leftLeg);

        // Right Leg
        const rightLeg = new THREE.Mesh(
            new THREE.CylinderGeometry(0.05, 0.05, 0.4, 12),
            new THREE.MeshStandardMaterial({ color: 0x222222 })
        );
        rightLeg.position.set(0.07, 0.2, 0);
        group.add(rightLeg);

        // Left Arm
        const leftArm = new THREE.Mesh(
            new THREE.CylinderGeometry(0.04, 0.04, 0.32, 12),
            new THREE.MeshStandardMaterial({ color: 0x888888 })
        );
        leftArm.position.set(-0.18, 0.75, 0);
        leftArm.rotation.z = Math.PI / 4;
        group.add(leftArm);

        // Right Arm
        const rightArm = new THREE.Mesh(
            new THREE.CylinderGeometry(0.04, 0.04, 0.32, 12),
            new THREE.MeshStandardMaterial({ color: 0x888888 })
        );
        rightArm.position.set(0.18, 0.75, 0);
        rightArm.rotation.z = -Math.PI / 4;
        group.add(rightArm);

        // Mouth (for talking animation)
        const mouth = new THREE.Mesh(
            new THREE.CylinderGeometry(0.03, 0.03, 0.01, 16),
            new THREE.MeshStandardMaterial({ color: 0x8d5524 })
        );
        mouth.position.set(0, 1.02, 0.15);
        mouth.rotation.x = Math.PI / 2;
        group.add(mouth);

        group.userData.mouth = mouth;

        return group;
    }

    update(delta) {
        this.time += delta;

        // Animate mouth (talking)
        [this.person1, this.person2].forEach((person, idx) => {
            const mouth = person.userData.mouth;
            if (mouth) {
                // Open/close mouth in a talking pattern, offset for variety
                mouth.scale.y = 1 + 0.5 * Math.abs(Math.sin(this.time * 3 + idx));
            }
        });
    }
}


