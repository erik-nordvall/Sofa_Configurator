import './style.css'
import * as dat from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

const colors = {
    Color: 'Default'
}
const seats = {
    Seats: 'Default'
}

/**
 * Base
 */

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader()

// Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

// GLTF loader
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

/**
 * Textures
 */
//3 Seats
const Green_3s_Texture = textureLoader.load('baked_3s_green.jpg')
Green_3s_Texture.flipY = false
Green_3s_Texture.encoding = THREE.sRGBEncoding
const Pink_3s_Texture = textureLoader.load('baked_3s_pink.jpg')
Pink_3s_Texture.flipY = false
Pink_3s_Texture.encoding = THREE.sRGBEncoding
const Gray_3s_Texture = textureLoader.load('baked_3s_gray.jpg')
Gray_3s_Texture.flipY = false
Gray_3s_Texture.encoding = THREE.sRGBEncoding

//2 Seats
const Green_2s_Texture = textureLoader.load('baked_2s_green.jpg')
Green_2s_Texture.flipY = false
Green_2s_Texture.encoding = THREE.sRGBEncoding
const Pink_2s_Texture = textureLoader.load('baked_2s_pink.jpg')
Pink_2s_Texture.flipY = false
Pink_2s_Texture.encoding = THREE.sRGBEncoding
const Gray_2s_Texture = textureLoader.load('baked_2s_gray.jpg')
Gray_2s_Texture.flipY = false
Gray_2s_Texture.encoding = THREE.sRGBEncoding

//1 Seats
const Green_1s_Texture = textureLoader.load('baked_1s_green.jpg')
Green_1s_Texture.flipY = false
Green_1s_Texture.encoding = THREE.sRGBEncoding
const Pink_1s_Texture = textureLoader.load('baked_1s_pink.jpg')
Pink_1s_Texture.flipY = false
Pink_1s_Texture.encoding = THREE.sRGBEncoding
const Gray_1s_Texture = textureLoader.load('baked_1s_gray.jpg')
Gray_1s_Texture.flipY = false
Gray_1s_Texture.encoding = THREE.sRGBEncoding

/**
 * Materials
 */
//Baked material
//3 Seats
const _3s_Material = new THREE.MeshBasicMaterial({map: Green_3s_Texture});
//2 Seats
const _2s_Material = new THREE.MeshBasicMaterial({map: Green_2s_Texture});
//1 Seats
const _1s_Material = new THREE.MeshBasicMaterial({map: Green_1s_Texture});

/**
 * Model
 */
gltfLoader.load(
    '3s.glb', 
    (gltf)=> 
    {   
        gltf.scene.traverse((child) =>
        {
            child.material = _3s_Material
        })
        gltf.scene.name = 'Three_Seat'
        gltf.scene.visible = true
        scene.add(gltf.scene)
        console.log('three seat loaded')

    })

gltfLoader.load(
    '2s.glb', 
    (gltf)=> 
    {   
        gltf.scene.traverse((child) =>
        {
            child.material = _2s_Material
        })
        gltf.scene.name = 'Two_Seat'
        gltf.scene.visible = false
        scene.add(gltf.scene)
        console.log('two seat loaded')
    
    })

gltfLoader.load(
    '1s.glb', 
    (gltf)=> 
    {   
        gltf.scene.traverse((child) =>
        {
            child.material = _1s_Material
        })
        gltf.scene.name = 'One_Seat'
        gltf.scene.visible = false
        scene.add(gltf.scene)
        console.log('one seat loaded')
        
    })


/**
 * UI
 */
const gui = new dat.GUI({
    name: 'Sofa Configurator',
    width: 400
})
gui.add(colors, 'Color', { Green: 'A', Pink: 'B', Gray: 'C' } );
gui.add(seats, 'Seats', { One: 'A', Two: 'B', Three: 'C' } );

//Color UI
gui.controllers[0].onChange(()=>
{
    if (gui.controllers[0].$select.options.selectedIndex == 0) {
        console.log('green')
        _3s_Material.map = Green_3s_Texture
        _2s_Material.map = Green_2s_Texture
        _1s_Material.map = Green_1s_Texture
    }else if (gui.controllers[0].$select.options.selectedIndex == 1) {
        console.log('pink')
        _3s_Material.map = Pink_3s_Texture
        _2s_Material.map = Pink_2s_Texture
        _1s_Material.map = Pink_1s_Texture
    }else if (gui.controllers[0].$select.options.selectedIndex == 2) {
        console.log('gray')
        _3s_Material.map = Gray_3s_Texture
        _2s_Material.map = Gray_2s_Texture
        _1s_Material.map = Gray_1s_Texture
    }   
})


//Seats UI
gui.controllers[1].onChange(()=>
{
    if (gui.controllers[1].$select.options.selectedIndex == 0) {
        console.log('one')
        scene.getObjectByName('One_Seat').visible = true
        scene.getObjectByName('Two_Seat').visible = false
        scene.getObjectByName('Three_Seat').visible = false
    }else if (gui.controllers[1].$select.options.selectedIndex == 1) {
        console.log('two')
        scene.getObjectByName('One_Seat').visible = false
        scene.getObjectByName('Two_Seat').visible = true
        scene.getObjectByName('Three_Seat').visible = false
    }else if (gui.controllers[1].$select.options.selectedIndex == 2) {
        console.log('three')
        scene.getObjectByName('One_Seat').visible = false
        scene.getObjectByName('Two_Seat').visible = false
        scene.getObjectByName('Three_Seat').visible = true
    }
})

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 14
camera.position.y = 5
camera.position.z = 10
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputEncoding = THREE.sRGBEncoding

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()