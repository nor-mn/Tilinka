"use client";
import React, { useRef, useState } from 'react';
import { Environment } from '@react-three/drei';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Mesh } from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

const MyMesh = () => {
    const refMesh = useRef<Mesh>(null!);
    const fileUrl = './assets/gltf/fire_axe.glb';
    const object3d = useLoader(GLTFLoader,fileUrl);

    useFrame(()=>{
        if(refMesh.current){
            refMesh.current.rotation.x+=0.01;
        }
    })
    return (
    <mesh ref={refMesh}>
        <primitive object={object3d.scene} dispose={null}></primitive>
    </mesh>)
}

function Box(props:any){
    const ref = useRef<Mesh>(null!);
    const [hovered, hover] = useState(false);
    const [clicked, click] = useState(false);

    const fileUrl = './assets/gltf/fire_axe.glb';
    const object3d = useLoader(GLTFLoader,fileUrl);

    useFrame((state,delta)=>(ref.current.rotation.y+=delta));

    return (
        <mesh
            {...props}
            ref={ref}
            scale={clicked?1.5:1}
            onClick={(event)=>click(!clicked)}
            onPointerOver={(event)=>(event.stopPropagation(),hover(true))}
            onPointerOut={(event)=>hover(false)}
        >
            <primitive object={object3d.scene} dispose={null}/>
            <meshStandardMaterial color={hovered?'hotpink':'orange'}/>
        </mesh>
    )

}

export default function ThreeExample () {
  return (
    <Canvas>
        <Environment preset='city'/>
        {/* <directionalLight intensity={1} position={[0,3,2]}/>
        <MyMesh/> */}
        <ambientLight intensity={Math.PI/3}/>
        <Box position={[100,50,-100]}/>
    </Canvas>
  )
}
