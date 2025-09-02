import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import Modal from 'react-modal';

// Set modal app element for accessibility
if (typeof window !== 'undefined') {
  Modal.setAppElement('#__next');
}

// Panoramic scene component
const PanoramicScene = ({ imageUrl, onClose, rotateSpeed = 1.5 }) => {
  const meshRef = useRef();
  const { camera, gl } = useThree();
  const [isDragging, setIsDragging] = useState(false);
  const [previousMousePosition, setPreviousMousePosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const activePointers = useRef(new Map());

  // Load panoramic texture correctly
  const texture = useLoader(THREE.TextureLoader, imageUrl);
  // Ensure proper color space for correct colors (older three uses sRGBEncoding)
  if (texture) {
    if ('colorSpace' in texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
    } else {
      texture.encoding = THREE.sRGBEncoding;
    }
  }

  // Handle mouse/touch events
  const handlePointerDown = (event) => {
    setIsDragging(true);
    setPreviousMousePosition({
      x: event.clientX,
      y: event.clientY
    });
    try { event.target.setPointerCapture?.(event.pointerId); } catch (_) {}
    activePointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
  };

  const handlePointerMove = (event) => {
    if (!isDragging) return;
    // Multi-touch pinch to zoom
    activePointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (activePointers.current.size >= 2) {
      const points = Array.from(activePointers.current.values());
      const [p1, p2] = points;
      const distance = Math.hypot(p2.x - p1.x, p2.y - p1.y);
      if (!activePointers.current.baseDistance) {
        activePointers.current.baseDistance = distance;
      } else {
        const scale = distance / activePointers.current.baseDistance;
        const nextFov = THREE.MathUtils.clamp(camera.fov / scale, 10, 120);
        camera.fov = nextFov;
        camera.updateProjectionMatrix();
        activePointers.current.baseDistance = distance;
      }
      return;
    }

    const deltaX = event.clientX - previousMousePosition.x;
    const deltaY = event.clientY - previousMousePosition.y;

    const speed = 0.01 * rotateSpeed;
    setRotation(prev => ({
      x: THREE.MathUtils.clamp(prev.x + deltaY * speed, -Math.PI / 2, Math.PI / 2),
      y: prev.y + deltaX * speed
    }));

    setPreviousMousePosition({
      x: event.clientX,
      y: event.clientY
    });
  };

  const handlePointerUp = (event) => {
    setIsDragging(false);
    activePointers.current.delete(event.pointerId);
    if (activePointers.current.size < 2) {
      delete activePointers.current.baseDistance;
    }
  };

  // Handle wheel zoom
  const handleWheel = (event) => {
    event.preventDefault();
    const zoomSpeed = 0.1;
    const delta = event.deltaY > 0 ? 1 + zoomSpeed : 1 - zoomSpeed;
    
    const nextFov = camera.fov * delta;
    if (nextFov > 10 && nextFov < 120) {
      camera.fov = nextFov;
      camera.updateProjectionMatrix();
    }
  };

  // Update rotation on frame
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = rotation.x;
      meshRef.current.rotation.y = rotation.y;
    }
  });

  // Add event listeners to the actual WebGL canvas element
  useEffect(() => {
    const canvas = gl.domElement;
    if (canvas) {
      // Improve mobile touch behavior
      canvas.style.touchAction = 'none';
      canvas.style.webkitTapHighlightColor = 'transparent';

      canvas.addEventListener('wheel', handleWheel, { passive: false });
      canvas.addEventListener('pointerdown', handlePointerDown, { passive: false });
      canvas.addEventListener('pointermove', handlePointerMove, { passive: false });
      canvas.addEventListener('pointerup', handlePointerUp, { passive: false });
      canvas.addEventListener('pointercancel', handlePointerUp, { passive: false });
      canvas.addEventListener('pointerleave', handlePointerUp, { passive: false });

      return () => {
        canvas.removeEventListener('wheel', handleWheel);
        canvas.removeEventListener('pointerdown', handlePointerDown);
        canvas.removeEventListener('pointermove', handlePointerMove);
        canvas.removeEventListener('pointerup', handlePointerUp);
        canvas.removeEventListener('pointercancel', handlePointerUp);
        canvas.removeEventListener('pointerleave', handlePointerUp);
      };
    }
  }, [gl, isDragging, previousMousePosition]);

  return (
    <Sphere ref={meshRef} args={[500, 64, 64]}>
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </Sphere>
  );
};

// Main panoramic viewer component
const PanoramicViewer = ({ imageUrl, isOpen, onClose, rotateSpeed = 1.5 }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Handle image load
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  // Handle image error
  const handleImageError = () => {
    setIsLoading(false);
    console.error('Failed to load panoramic image');
  };

  // Preload image
  useEffect(() => {
    if (isOpen && imageUrl) {
      setIsLoading(true);
      const img = new Image();
      img.onload = handleImageLoad;
      img.onerror = handleImageError;
      img.src = imageUrl;
    }
  }, [isOpen, imageUrl]);

  const customModalStyles = {
    content: {
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      border: 'none',
      background: '#000',
      padding: '0',
      overflow: 'hidden'
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      zIndex: 1000
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customModalStyles}
      contentLabel="Panoramic Viewer"
    >
      <div className="relative w-full h-full">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-3 transition-all duration-200 backdrop-blur-sm"
          aria-label="Close viewer"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p>Loading panoramic view...</p>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="absolute top-4 left-4 z-10 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
          <p className="text-sm">
            <span className="font-medium">Click & Drag:</span> Rotate view • <span className="font-medium">Scroll:</span> Zoom
          </p>
        </div>

        {/* Three.js Canvas */}
        <Canvas
          camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 0] }}
          style={{ width: '100%', height: '100%' }}
        >
          <PanoramicScene imageUrl={imageUrl} onClose={onClose} rotateSpeed={rotateSpeed} />
        </Canvas>
      </div>
    </Modal>
  );
};

export default PanoramicViewer; 