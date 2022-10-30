import Head from 'next/head'

import React, { Suspense } from "react";
import {
  useGLTF,
  OrbitControls,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";


export function WineyChair(props) {
  const { nodes, materials } = useGLTF("winey-chair-export-compressed.glb");
  console.log(nodes);
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Cube002.geometry} material={materials["default"]} />
      <mesh geometry={nodes.Cube001.geometry} material={materials["default"]} />
      <mesh
        geometry={nodes.Cube.geometry}
        material={materials.Material}
        scale={0.13}
      />
    </group>
  );
}

export function ChairAndOttoman({ chairColors }) {
  const { nodes, materials } = useGLTF("/armchair.glb");
  return (
    <group dispose={null}>
      <mesh
        geometry={nodes.Untitled003.geometry}
        material={materials.ChairClothMat}
        material-color={chairColors.chairCloth}
      />
      <mesh
        geometry={nodes.Untitled003_1.geometry}
        material={materials.ChairClothMatPipes}
        material-color={chairColors.chairClothPipes}
      />
      <mesh
        geometry={nodes.ChairPart5.geometry}
        material={materials.KedeMat}
        material-color={chairColors.chairLegs}
      />
    </group>
  );
}

// This came along with the auto-generated code and I'm not sure if it has any purpose here.
// useGLTF.preload('winey-chair-export-compressed.glb')

const sunnyChair = {
  name: "sunny",
  colors: {
    chairCloth: "#d0984f",
    chairClothPipes: "#e4b26b",
    chairLegs: "#e3c8ad",
  },
};

const cloudyChair = {
  name: "cloudy",
  colors: {
    chairCloth: "#9aa7b7",
    chairClothPipes: "#748999",
    chairLegs: "#ffffff",
  },
};

const nightChair = {
  name: "night",
  colors: {
    chairCloth: "#12161d",
    chairClothPipes: "#3e4855",
    chairLegs: "#000000",
  },
};

export default function Home() {
  const [chairColors, setChairColors] = React.useState(sunnyChair);

  return (
    <div className="container"><Head>
      <title>Create Next App</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap"
        rel="stylesheet"
      />
    </Head>
      <nav>
        <img src="/arrow-left.svg" alt="arrow left" className="arrow-left" />
        <img src="/shopping-bag.svg" alt="shopping bag" className="shopping-bag" />
      </nav>

      <main className="content">
        <section className="product">
          <div className="product-image">
            <Canvas camera={{ position: [2, 1, 2], fov: 35 }}>
              <spotLight
                intensity={0.4}
                angle={0.1}
                penumbra={1}
                position={[4, 10, 6]}
                castShadow
              />

              <Suspense fallback={null}>
                {/* <WineyChair /> */}
                <ChairAndOttoman
                  chairColors={chairColors.colors}
                  setChairColors={setChairColors}
                />
                <Environment preset="city" />
                <ContactShadows
                  position={[0, -0.3, 0]}
                  opacity={0.3}
                  scale={8}
                  blur={1.8}
                  far={0.6}
                />
              </Suspense>
              <OrbitControls />
            </Canvas>
          </div>

          <div className="product-details">
            <div className="product-details-content">
              <h1>Minimalist Sofa</h1>
              <div className="color-choice-group">
                <button
                  className={`color-choice sunny ${chairColors.name === "sunny" ? "selected" : null
                    }`}
                  onClick={() => setChairColors(sunnyChair)}
                ></button>
                <button
                  className={`color-choice cloudy ${chairColors.name === "cloudy" ? "selected" : null
                    }`}
                  onClick={() => setChairColors(cloudyChair)}
                ></button>
                <button
                  className={`color-choice night ${chairColors.name === "night" ? "selected" : null
                    }`}
                  onClick={() => setChairColors(nightChair)}
                ></button>
              </div>

              <div className="description">
                <strong>Description</strong>
                <p>
                  This chair is clean and minimalist. It's perfect for a small
                  living space, or in a grander space with other furniture.
                </p>
                <p>
                  The materials are of a majestic caliber, and the craftsmanship
                  is legendary.
                </p>
              </div>

              <button className="add-to-cart">Add to cart</button>
            </div>
          </div>
        </section>
      </main>

      <nav className="footer"></nav>
    </div>
  )
}
