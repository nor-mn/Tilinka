'use client';
import { Environment } from '@react-three/drei';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import React, { useRef } from 'react';
import { Mesh } from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

function Axe(props:any){
    const refMesh = useRef<Mesh>(null!);
    const fileUrl = './assets/gltf/fire_axe.glb';
    const object3d = useLoader(GLTFLoader,fileUrl);

    useFrame(()=>{
        if(refMesh.current){
            refMesh.current.rotation.y+=0.01;
        }
    });

    return(
        <mesh 
            ref={refMesh}
            {...props}
            scale={1}
        >
            <primitive object={object3d.scene} dispose={null}/>
        </mesh>
    )
}

export default function ThreeScene(){
    
    return (
        <div style={{ width: "100%", height: "50vh", position: "absolute" }} >
            <Canvas flat linear>
                <Environment preset='city'/>
                <Axe position={[50,-10,-40]}/>
            </Canvas> 
        </div>
    );
}
