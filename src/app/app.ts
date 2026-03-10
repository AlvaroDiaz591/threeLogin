import { Component, ElementRef, AfterViewInit, ViewChild, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Import dinámico de Three.js será usado en runtime (evita errores en SSR)

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit {
  protected readonly title = signal('ElThree');

  @ViewChild('viewer360', { static: false }) viewer360Ref?: ElementRef<HTMLDivElement>;

  async ngAfterViewInit(): Promise<void> {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    if (!this.viewer360Ref) return;

    const THREE = await import('three');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, this.viewer360Ref.nativeElement.clientWidth / this.viewer360Ref.nativeElement.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 0.1);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(this.viewer360Ref.nativeElement.clientWidth, this.viewer360Ref.nativeElement.clientHeight);
    this.viewer360Ref.nativeElement.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('/assets/habitacion360.jpg', (texture: any) => {
      const geometry = new THREE.SphereGeometry(500, 60, 40);
      geometry.scale(-1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
    });

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.rotateSpeed = 0.4;
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
  }
}
