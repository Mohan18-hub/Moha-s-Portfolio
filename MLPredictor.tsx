/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState, MouseEvent } from 'react';
import { Database, Cpu, Activity, RefreshCw } from 'lucide-react';

interface Node3D {
  x: number;
  y: number;
  z: number;
  label?: string;
  size: number;
  color: string;
}

interface Connection {
  from: number;
  to: number;
}

export default function ThreeDCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [mode, setMode] = useState<'blockchain' | 'quantum'>('blockchain');
  const [isRotating, setIsRotating] = useState(true);
  
  // Angle of rotation (radians)
  const angleX = useRef(0.003);
  const angleY = useRef(0.004);
  const currentAngleX = useRef(0);
  const currentAngleY = useRef(0);
  
  // Mouse dragging state
  const isDragging = useRef(false);
  const prevMouseX = useRef(0);
  const prevMouseY = useRef(0);
  
  // List of 3D nodes and their connection indexes
  const nodes = useRef<Node3D[]>([]);
  const connections = useRef<Connection[]>([]);

  // Labels relevant to Mohan's skills
  const BLOCKCHAIN_LABELS = [
    'Ethereum', 'Solidity', 'Smart Contract', 'Web3', 'ERC-20', 'Consensus', 
    'Cryptography', 'IPFS', 'DApp', 'EVM', 'Ledger', 'Block Hash'
  ];

  const QUANTUM_LABELS = [
    'Qubit', 'Superposition', 'Entanglement', 'Quantum Annealing', 'Samkhya.ai', 
    'Quantum Gate', 'Bloch Sphere', 'Hilbert Space', 'Decoherence', 'Algorithms'
  ];

  // Initialize nodes based on mode
  const initNodes = (currentMode: 'blockchain' | 'quantum') => {
    const newNodes: Node3D[] = [];
    const newConnections: Connection[] = [];
    
    if (currentMode === 'blockchain') {
      // Create a 3D block chain matrix (e.g., blocks connected sequentially)
      // Block 1
      const blockSize = 60;
      const numBlocks = 4;
      
      for (let b = 0; b < numBlocks; b++) {
        const centerZ = (b - (numBlocks - 1) / 2) * 140;
        const centerX = 0;
        const centerY = 0;
        
        // Add 8 vertices of a cube for each block
        const blockStartIndex = newNodes.length;
        const vertices = [
          { x: -blockSize, y: -blockSize, z: -blockSize },
          { x: blockSize, y: -blockSize, z: -blockSize },
          { x: blockSize, y: blockSize, z: -blockSize },
          { x: -blockSize, y: blockSize, z: -blockSize },
          { x: -blockSize, y: -blockSize, z: blockSize },
          { x: blockSize, y: -blockSize, z: blockSize },
          { x: blockSize, y: blockSize, z: blockSize },
          { x: -blockSize, y: blockSize, z: blockSize },
        ];
        
        vertices.forEach((v, idx) => {
          newNodes.push({
            x: centerX + v.x,
            y: centerY + v.y,
            z: centerZ + v.z,
            size: idx === 0 ? 5 : 3,
            color: b === 0 ? '#10B981' : b === 1 ? '#3B82F6' : b === 2 ? '#8B5CF6' : '#EC4899',
            label: idx === 0 ? `Block #${b + 1} (${BLOCKCHAIN_LABELS[b % BLOCKCHAIN_LABELS.length]})` : undefined,
          });
        });
        
        // Connect vertices of the cube
        const cubeEdges = [
          [0, 1], [1, 2], [2, 3], [3, 0], // back face
          [4, 5], [5, 6], [6, 7], [7, 4], // front face
          [0, 4], [1, 5], [2, 6], [3, 7]  // bridging lines
        ];
        
        cubeEdges.forEach(([f, t]) => {
          newConnections.push({ from: blockStartIndex + f, to: blockStartIndex + t });
        });
        
        // Connect sequential blocks via center points or corners
        if (b > 0) {
          // Connect back-face vertex 0 to previous block's front-face vertex 4
          newConnections.push({
            from: blockStartIndex, 
            to: blockStartIndex - 8 + 4
          });
          newConnections.push({
            from: blockStartIndex + 3,
            to: blockStartIndex - 8 + 7
          });
        }
      }
      
      // Add extra stray floating label particles for tech terminology
      for (let i = 0; i < 15; i++) {
        const label = BLOCKCHAIN_LABELS[i % BLOCKCHAIN_LABELS.length];
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        const radius = 180 + Math.random() * 80;
        
        newNodes.push({
          x: radius * Math.sin(phi) * Math.cos(theta),
          y: radius * Math.sin(phi) * Math.sin(theta),
          z: radius * Math.cos(phi),
          size: 4,
          color: '#14B8A6',
          label: label
        });
      }
      
    } else {
      // Quantum mode: a central "nucleus" and concentric orbits with rotating "qubit particles"
      // Center nucleus
      newNodes.push({
        x: 0, y: 0, z: 0,
        size: 14,
        color: '#F59E0B',
        label: 'Quantum Processor'
      });
      
      // 3 Concentric orbits of qubits
      const numOrbits = 3;
      const orbitsColors = ['#6366F1', '#EC4899', '#10B981'];
      
      for (let o = 1; o <= numOrbits; o++) {
        const radius = o * 80;
        const numQubits = 4 + o * 2;
        const orbitStartIndex = newNodes.length;
        
        // Add orbital nodes and construct wireframe ring
        for (let q = 0; q < numQubits; q++) {
          const angle = (q / numQubits) * Math.PI * 2;
          // Distribute orbits at different inclinations to make a 3D atom sphere
          const inclination = (o * Math.PI) / 4;
          
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle) * Math.cos(inclination);
          const z = radius * Math.sin(angle) * Math.sin(inclination);
          
          newNodes.push({
            x, y, z,
            size: q % 3 === 0 ? 6 : 3,
            color: orbitsColors[o - 1],
            label: q === 0 ? QUANTUM_LABELS[(o * 3 + q) % QUANTUM_LABELS.length] : undefined
          });
          
          // Connect adjacent qubits along the orbit
          if (q > 0) {
            newConnections.push({ from: orbitStartIndex + q - 1, to: orbitStartIndex + q });
          }
          if (q === numQubits - 1) {
            newConnections.push({ from: orbitStartIndex + q, to: orbitStartIndex });
          }
          
          // Entanglement links between orbits
          if (o > 1 && q % 2 === 0) {
            const innerOrbitStart = orbitStartIndex - (4 + (o - 1) * 2);
            if (innerOrbitStart > 0) {
              newConnections.push({ 
                from: orbitStartIndex + q, 
                to: innerOrbitStart + (q % (4 + (o - 1) * 2)) 
              });
            }
          }
        }
      }
      
      // Floating wave equations or state vectors as labels
      const waveStates = ['|ψ⟩ = α|0⟩ + β|1⟩', '|01⟩ + |10⟩', 'Hadamard Gate', 'Bloch Sphere', 'CNOT', 'Entangled State'];
      for (let i = 0; i < waveStates.length; i++) {
        const theta = (i / waveStates.length) * Math.PI * 2;
        const radius = 250;
        newNodes.push({
          x: radius * Math.cos(theta),
          y: Math.sin(theta) * 50,
          z: radius * Math.sin(theta),
          size: 5,
          color: '#A78BFA',
          label: waveStates[i]
        });
      }
    }
    
    nodes.current = newNodes;
    connections.current = newConnections;
  };

  useEffect(() => {
    initNodes(mode);
  }, [mode]);

  // 3D Rotations
  const rotateNodes = (ax: number, ay: number) => {
    const cosX = Math.cos(ax);
    const sinX = Math.sin(ax);
    const cosY = Math.cos(ay);
    const sinY = Math.sin(ay);
    
    nodes.current.forEach((node) => {
      // Rotate around X axis
      const y1 = node.y * cosX - node.z * sinX;
      const z1 = node.z * cosX + node.y * sinX;
      
      // Rotate around Y axis
      const x2 = node.x * cosY - z1 * sinY;
      const z2 = z1 * cosY + node.x * sinY;
      
      node.x = x2;
      node.y = y1;
      node.z = z2;
    });
  };

  // Canvas loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationId: number;
    let width = 0;
    let height = 0;
    
    const handleResize = () => {
      if (!containerRef.current) return;
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    handleResize();
    
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Automatic continuous rotation if not dragging and isRotating is active
      if (isRotating && !isDragging.current) {
        currentAngleX.current += (angleX.current - currentAngleX.current) * 0.1;
        currentAngleY.current += (angleY.current - currentAngleY.current) * 0.1;
        rotateNodes(currentAngleX.current, currentAngleY.current);
      }
      
      const fov = 450; // Camera perspective field of view
      const cx = width / 2;
      const cy = height / 2;
      
      // Projection helper
      const project = (node: Node3D) => {
        // Assume camera is at distance 500
        const distance = 500;
        const scale = fov / (distance + node.z);
        return {
          x: cx + node.x * scale,
          y: cy + node.y * scale,
          scale: scale,
          z: node.z
        };
      };
      
      // 1. Draw connections
      ctx.lineWidth = 0.8;
      connections.current.forEach((conn) => {
        const fromNode = nodes.current[conn.from];
        const toNode = nodes.current[conn.to];
        if (!fromNode || !toNode) return;
        
        const pFrom = project(fromNode);
        const pTo = project(toNode);
        
        // Hide connections that are behind camera or clipped
        if (fromNode.z > 350 || toNode.z > 350) return;
        
        // Line transparency based on depth
        const avgZ = (fromNode.z + toNode.z) / 2;
        const opacity = Math.max(0.05, Math.min(0.6, 1 - (avgZ + 200) / 450));
        
        ctx.strokeStyle = mode === 'blockchain' 
          ? `rgba(99, 102, 241, ${opacity})` 
          : `rgba(167, 139, 250, ${opacity})`;
        
        ctx.beginPath();
        ctx.moveTo(pFrom.x, pFrom.y);
        ctx.lineTo(pTo.x, pTo.y);
        ctx.stroke();
      });
      
      // Sort nodes back-to-front (depth buffer) so front objects are drawn on top
      const projectedNodes = nodes.current.map((node, index) => ({
        node,
        projected: project(node),
        index
      })).sort((a, b) => b.projected.z - a.projected.z);
      
      // 2. Draw nodes and label cards
      projectedNodes.forEach(({ node, projected }) => {
        // Skip nodes that are too far behind or extremely close
        if (projected.z > 350) return;
        
        // Node radius based on perspective scale
        const r = node.size * projected.scale;
        if (r <= 0) return;
        
        const opacity = Math.max(0.1, Math.min(1, 1 - (node.z + 200) / 500));
        
        // Outer glowing ring
        ctx.shadowBlur = node.label ? 12 : 3;
        ctx.shadowColor = node.color;
        
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(projected.x, projected.y, r, 0, Math.PI * 2);
        ctx.fill();
        
        // Reset shadow for text drawing
        ctx.shadowBlur = 0;
        
        // Draw elegant futuristic label overlays
        if (node.label && projected.scale > 0.5) {
          ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
          ctx.strokeStyle = node.color;
          ctx.lineWidth = 1;
          
          const text = node.label;
          ctx.font = '500 10px "JetBrains Mono", monospace';
          const textWidth = ctx.measureText(text).width;
          const padX = 8;
          const padY = 5;
          const rectW = textWidth + padX * 2;
          const rectH = 18 + padY;
          const rectX = projected.x - rectW / 2;
          const rectY = projected.y - r - rectH - 5;
          
          // Draw connecting little anchor line
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.4})`;
          ctx.beginPath();
          ctx.moveTo(projected.x, projected.y - r);
          ctx.lineTo(projected.x, rectY + rectH);
          ctx.stroke();
          
          // Draw label box
          ctx.fillStyle = 'rgba(9, 13, 26, 0.9)';
          ctx.strokeStyle = `rgba(167, 139, 250, ${opacity * 0.8})`;
          
          // Rounded rect path
          const radius = 4;
          ctx.beginPath();
          ctx.moveTo(rectX + radius, rectY);
          ctx.lineTo(rectX + rectW - radius, rectY);
          ctx.quadraticCurveTo(rectX + rectW, rectY, rectX + rectW, rectY + radius);
          ctx.lineTo(rectX + rectW, rectY + rectH - radius);
          ctx.quadraticCurveTo(rectX + rectW, rectY + rectH, rectX + rectW - radius, rectY + rectH);
          ctx.lineTo(rectX + radius, rectY + rectH);
          ctx.quadraticCurveTo(rectX, rectY + rectH, rectX, rectY + rectH - radius);
          ctx.lineTo(rectX, rectY + radius);
          ctx.quadraticCurveTo(rectX, rectY, rectX + radius, rectY);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          
          // Draw label text
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.fillText(text, rectX + padX, rectY + 14);
        }
      });
      
      animationId = requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, [mode, isRotating]);

  // Mouse drag handles for 3D navigation
  const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
    isDragging.current = true;
    prevMouseX.current = e.clientX;
    prevMouseY.current = e.clientY;
  };

  const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging.current) return;
    
    const deltaX = e.clientX - prevMouseX.current;
    const deltaY = e.clientY - prevMouseY.current;
    
    prevMouseX.current = e.clientX;
    prevMouseY.current = e.clientY;
    
    // Scale movement to rotation angles
    const speed = 0.007;
    rotateNodes(deltaY * speed, deltaX * speed);
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  return (
    <div ref={containerRef} className="relative w-full h-[450px] bg-slate-950/80 rounded-2xl border border-slate-800/80 overflow-hidden backdrop-blur-xl group shadow-2xl">
      {/* HUD overlay labels */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 pointer-events-none">
        <div className="flex items-center gap-2">
          {mode === 'blockchain' ? (
            <Database className="w-5 h-5 text-indigo-400 animate-pulse" id="hud-icon-bc" />
          ) : (
            <Cpu className="w-5 h-5 text-violet-400 animate-pulse" id="hud-icon-quant" />
          )}
          <span className="text-xs font-mono font-semibold tracking-wider text-slate-400 uppercase">
            3D Quantum-Blockchain System
          </span>
        </div>
        <h3 className="text-lg font-sans font-bold text-white tracking-tight">
          {mode === 'blockchain' ? 'Simulated Ledger Mesh' : 'Bloch Sphere Superposition'}
        </h3>
        <p className="text-xs text-slate-500 font-mono">
          Drag to orbit • Drag/Swipe directly to rotate matrix in 3D
        </p>
      </div>

      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        {/* Play/Pause continuous motion */}
        <button
          onClick={() => setIsRotating(!isRotating)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono border transition-all ${
            isRotating 
              ? 'bg-emerald-950/40 border-emerald-800/50 text-emerald-400' 
              : 'bg-slate-900 border-slate-800 text-slate-400'
          }`}
          id="toggle-rotation-btn"
          title={isRotating ? 'Pause auto-rotation' : 'Resume auto-rotation'}
        >
          <Activity className={`w-3.5 h-3.5 ${isRotating ? 'animate-pulse' : ''}`} />
          {isRotating ? 'AUTO SPIN' : 'PAUSED'}
        </button>

        {/* Mode Selector */}
        <div className="flex bg-slate-900/90 border border-slate-800 rounded-lg p-0.5" id="mode-selector">
          <button
            onClick={() => setMode('blockchain')}
            className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all ${
              mode === 'blockchain'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/30'
                : 'text-slate-400 hover:text-white'
            }`}
            id="mode-bc-btn"
          >
            Blockchain
          </button>
          <button
            onClick={() => setMode('quantum')}
            className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all ${
              mode === 'quantum'
                ? 'bg-violet-600 text-white shadow-md shadow-violet-900/30'
                : 'text-slate-400 hover:text-white'
            }`}
            id="mode-quant-btn"
          >
            Quantum
          </button>
        </div>
      </div>

      {/* Floating telemetry lines in standard style to look authentic but strictly literal */}
      <div className="absolute bottom-4 left-4 z-10 pointer-events-none font-mono text-[9px] text-slate-500 flex flex-col gap-0.5">
        <div>ORBIT_SPEED: {(angleX.current * 100).toFixed(2)} rad/s</div>
        <div>RENDER_MODE: projection_depth_buffered</div>
        <div>MATRIX_DIM: {mode === 'blockchain' ? '4 x Cube(8)' : 'Nucleus + 3_Orbits'}</div>
      </div>

      {/* Actual interactive canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className="w-full h-full cursor-grab active:cursor-grabbing block"
        style={{ touchAction: 'none' }}
      />
    </div>
  );
}
