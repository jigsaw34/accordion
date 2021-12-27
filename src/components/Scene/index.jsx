import React from 'react'
import { 
  Scene, 
  Engine, 
  ArcRotateCamera, 
  Vector3,
  SceneLoader,
  HemisphericLight,
  Tools,
  Color3,
  // ActionManager,
  // ExecuteCodeAction,
  StandardMaterial,
} from '@babylonjs/core';
import "@babylonjs/loaders";

import Item from './item'
import { config } from '../../data';
import './style.scss'

const frame = {
  frame: { names: ['MTB Full Suspension_primitive0', 'hardtail 1.0_primitive5'] },
  rims: { names: ['MTB Full Suspension_primitive50', 'MTB Full Suspension_primitive29', 'hardtail 1.0_primitive41', ] },
}

const Scene3D = () => {
  const [isSelectMesh, setIsSelectMesh] = React.useState(false);
  const canvasRef = React.useRef();
  const fpsRef = React.useRef();

  React.useEffect(() => {
    const engine = new Engine(canvasRef.current, true, {}, true);
    // engine.displayLoadingUI();

    const scene = createScene(engine);
    const events = [
      {name: 'remove', cb: handleRemove},
      {name: 'edit_palette', cb: handleChangeMeshColor},
    ];
    
    engine.runRenderLoop(() => {
      scene.render();
      fpsRef.current.textContent = engine.getFps().toFixed() + " fps";
    })

    handleCustomEvents(events, scene);
  }, []);

  const createScene = (engine) => {
    const scene = new Scene(engine);
    scene.clearColor = new Color3.FromHexString("#ffffff");

    const camera = new ArcRotateCamera("Camera", Math.PI * 2, Tools.ToRadians(80), 18, new Vector3( 0, 1, -1 ), scene);
    // This makes the camera interactive
    camera.attachControl(canvasRef.current, true);
    camera.lowerBetaLimit = camera.beta - Tools.ToRadians(0)
    camera.upperBetaLimit = camera.beta + Tools.ToRadians(0);
    camera.lowerRadiusLimit = 15;
    camera.upperRadiusLimit = 20;

    new HemisphericLight('light', new Vector3(0,1,0), scene);
    sceneLoadMesh(scene, 'bike2.glb');

    return scene;
  }

  const sceneLoadMesh = (scene, nameMesh) => {
    SceneLoader.ImportMesh("", `${process.env.PUBLIC_URL}/assets/`, nameMesh, scene, (mesh) => {
      // scene.onReadyObservable.add(() => {
      //   const meshes = mesh.length;

      //   for (let i = 0; i < meshes; i+=1) {
      //     const el = mesh[i];
      //     el.isPickable = true;
      //     el.actionManager = new ActionManager(scene);
      //     el.actionManager.registerAction(new ExecuteCodeAction(
      //       ActionManager.OnPickTrigger, evt => {
      //         console.log(evt.source.name, 'evt');
      //       }
      //     ))
      //   }
      // })
    });
  }

  const emitColorChangeEvent = (color, meshName) => {
    const params = {
      detail: {
        meshName,
        color,
      }
    };

  	const event = new CustomEvent('edit_palette', params);
  	window.dispatchEvent(event)
  }

  const emitRemoveSceneChangeEvent = () => {
  	const event = new CustomEvent('remove');
  	window.dispatchEvent(event)
  }

  const handleCustomEvents = (events, scene) =>
    events.map(event => 
      window.addEventListener(event.name, event.cb.bind(null, scene))
    )

  const handleChangeMeshColor = (scene, e) => {
    const { detail:{ meshName, color } } = e;
    const material = new StandardMaterial(scene);

    meshName.forEach(m => {
      const mesh = scene.getMeshByID(m);
      if (mesh) {
        mesh.material = material;
        material.diffuseColor = new Color3.FromHexString(color);
        return;
      }
    });
  }

  const handleRemove = (scene, _) => {
    if (scene.meshes.length) {
      scene.meshes.forEach(mesh => mesh.dispose());
      sceneLoadMesh(scene, 'frame.glb');
      setIsSelectMesh(true);
    }
  }

  return (
    <div className='root'>
      <div className='fps' ref={fpsRef} />
      <canvas ref={canvasRef} width={800} height={500} />
      <div className='side-right'>
        <div className='head'>Design your bicycle</div>
        <div className='components'>
          <div className='component'>
            <h2>Frame</h2>
            <Item
              data={config.frame}
              onChangeColor={emitColorChangeEvent}
              meshName={frame.frame.names}
            />
          <div className='component'>
            <h2>Rims</h2>
            <Item
              data={config.rims}
              onChangeColor={emitColorChangeEvent}
              meshName={frame.rims.names}
            />
          </div>
          <div className="componnet">
            <h2>Body type</h2>
            <div className="item">
            <span className='box-color' style={{background: '#f7f7f7'}}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/frame.png`} 
                alt="frame" 
              />
            </span>
              <div className='content'>
                <button 
                  type='button' 
                  onClick={emitRemoveSceneChangeEvent}
                  disabled={isSelectMesh}
                >
                  + ADD
                </button>
                <b>Male frame</b>
                <span>200.00 EUR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
};

export default Scene3D;