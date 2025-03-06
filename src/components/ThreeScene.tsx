// "use client";
// import React, { useRef, useState } from 'react';
// import { Environment } from '@react-three/drei';
// import { Canvas, useFrame, useLoader } from '@react-three/fiber';
// import { Mesh } from 'three';
// import { GLTFLoader } from 'three/examples/jsm/Addons.js';

// const MyMesh = () => {
//     const refMesh = useRef<Mesh>(null!);
//     const fileUrl = './assets/gltf/fire_axe.glb';
//     const object3d = useLoader(GLTFLoader,fileUrl);

//     useFrame(()=>{
//         if(refMesh.current){
//             refMesh.current.rotation.x+=0.01;
//         }
//     })
//     return (
//     <mesh ref={refMesh}>
//         <primitive object={object3d.scene} dispose={null}></primitive>
//     </mesh>)
// }

// function Box(props:any){
//     const ref = useRef<Mesh>(null!);
//     const [hovered, hover] = useState(false);
//     const [clicked, click] = useState(false);

//     const fileUrl = './assets/gltf/fire_axe.glb';
//     const object3d = useLoader(GLTFLoader,fileUrl);

//     useFrame((state,delta)=>(ref.current.rotation.y+=delta));

//     return (
//         <mesh
//             {...props}
//             ref={ref}
//             scale={clicked?1.5:1}
//             onClick={(event)=>click(!clicked)}
//             onPointerOver={(event)=>(event.stopPropagation(),hover(true))}
//             onPointerOut={(event)=>hover(false)}
//         >
//             <primitive object={object3d.scene} dispose={null}/>
//             <meshStandardMaterial color={hovered?'hotpink':'orange'}/>
//         </mesh>
//     )

// }

// export default function ThreeExample () {
//   return (
//     <Canvas>
//         <Environment preset='city'/>
//         <ambientLight intensity={Math.PI/3}/>
//         <Box position={[100,50,-100]}/>
//     </Canvas>
//   )
// }
"use client";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import React, { useRef, Suspense, useEffect } from "react";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { gsap } from "gsap";

function Axe(props: any) {
  const refMesh = useRef<Mesh>(null!);
  const { nodes, materials } = useGLTF("./assets/gltf/fire_axe.glb");
  console.log(nodes, "nodos");
  const fileUrl = "./assets/gltf/fire_axe.glb";
  const object3d = useLoader(GLTFLoader, fileUrl);
  console.log(object3d, "obj3d");
  useFrame(() => {
    if (refMesh.current) {
      // refMesh.current.rotation.y+=0.01;
    }
  });

  useEffect(() => {
    // Animation mit GSAP
    gsap.to(refMesh.current.rotation, {
      y: Math.PI * 2,
      duration: 5,
      repeat: -1,
      ease: "power1.inOut",
    });
  }, [refMesh]);

  return (
    <group dispose={null} scale={[-0.1, -0.1, -0.1]}>
      <mesh ref={refMesh} {...props} scale={1} position={[0.5, -10, 0.5]}>
        <primitive object={object3d.scene} dispose={null} />
      </mesh>
    </group>
  );
}

export default function ThreeScene() {
  return (
    <div>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Axe position={[0.5, 0.5, 0.5]} />
      </Canvas>
    </div>
  );
}
