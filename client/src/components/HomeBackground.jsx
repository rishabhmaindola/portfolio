import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const HomeBackground = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        const words = ["Hello", "World", "Rishabh", "Maindola", "Developer"];
        const particles = [];
        const particleCount = 50;
        const particleGeometry = new THREE.BufferGeometry();
        const particlePositions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const x = (Math.random() - 0.5) * 10;
            const y = (Math.random() - 0.5) * 10;
            const z = (Math.random() - 0.5) * 10;
            particlePositions.set([x, y, z], i * 3);
            particles.push({ position: new THREE.Vector3(x, y, z), word: words[Math.floor(Math.random() * words.length)] });
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

        const particleMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05 });
        const particleSystem = new THREE.Points(particleGeometry, particleMaterial);

        scene.add(particleSystem);

        camera.position.z = 5;
        camera.position.y = 2;
        camera.position.x = -2;

        const animate = () => {
            requestAnimationFrame(animate);

            particles.forEach((particle, index) => {
                particle.position.y -= 0.001;
                if (particle.position.y < -5) {
                    particle.position.y = 5;
                }
                particleGeometry.attributes.position.array[index * 3 + 1] = particle.position.y;
            });
            particleGeometry.attributes.position.needsUpdate = true;

            particleSystem.rotation.x += 0.0001;
            particleSystem.rotation.y += 0.001;

            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} />;
};

export default HomeBackground;
