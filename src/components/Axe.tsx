import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

interface Object3D{
    isMesh?: any,
    geometry?: any,
    material?: any,
}

export function Axe(props:any) {
  const { nodes, materials } = useGLTF('/assets/gltf/fire_axe.glb')
  console.log(nodes,'nodos')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        material={materials['fire_axe_mat.001']}
        position={[0, 12.7, 0]}
      />
    </group>
  )
}

useGLTF.preload('./assets/gltf/fire_axe.glb')