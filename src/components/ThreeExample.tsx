'use client';
import { Canvas } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

const ThreeExample:React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current?.appendChild(renderer.domElement);
        camera.position.y = 5;

        if (typeof window !== 'undefined') {
            const geometry = new THREE.BoxGeometry();
            const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            const cube = new THREE.Mesh(geometry, material);
            const loader: GLTFLoader = new GLTFLoader();

            loader.load(
                '/assets/gltf/fire_axe.glb',
                (gltf) => {
                  scene.add(gltf.scene);
                  console.log('subio', loader, scene)
                },
                undefined,
                (error) => {
                  console.error('Error cargando modelo:', error);
                }
              );
          
          // Render the scene and camera
            renderer.render(scene, camera);

            const renderScene = () => {
                cube.rotation.x += 0.01;
                cube.rotation.y += 0.01;
                renderer.render(scene, camera);
                requestAnimationFrame(renderScene);
              };
              
              // Call the renderScene function to start the animation loop
              renderScene();
              
            // Initialize the Three.js scene here (as in the previous example)
        
            const handleResize = () => {
              const width = window.innerWidth;
              const height = window.innerHeight;
        
              camera.aspect = width / height;
              camera.updateProjectionMatrix();
        
              renderer.setSize(width, height);
            };
        
            window.addEventListener('resize', handleResize);
        
            // Clean up the event listener when the component is unmounted
            return () => {
              window.removeEventListener('resize', handleResize);
            };
          }
      }
    }, []);
    return <div className='mx-auto' ref={containerRef} />;
  };
  
  export default ThreeExample;