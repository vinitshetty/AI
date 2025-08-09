import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  RefreshCw,
  Eye,
  Code,
  Play,
  Settings,
  Sparkles,
  ArrowUp,
  HelpCircle,
  Monitor,
  Tablet,
  Smartphone,
  Square,
  Circle,
  Triangle,
  Diamond,
  Star,
  ArrowRight,
  Type,
  Image,
  Minus,
  Plus,
  Download,
  Share2,
  Trash2,
  Move,
  RotateCw,
  Link,
  Bold,
  Italic,
  List,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Connection types
const CONNECTION_TYPES = {
  SOLID: 'solid',
  DASHED: 'dashed',
  DOTTED: 'dotted'
};

const ARROW_TYPES = {
  NONE: 'none',
  UNI: 'uni',
  BI: 'bi'
};

// Header Component
const Header = ({ blogTitle, setBlogTitle, onPreview, onExport, onShare }) => {
  return (
    <div className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-md flex items-center justify-center">
            <span className="text-white text-xs font-bold">M</span>
          </div>
          <div className="flex items-center space-x-1">
            <input
              type="text"
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
              placeholder="Enter diagram title..."
              className="bg-transparent text-sm font-medium focus:outline-none focus:bg-gray-700 px-2 py-1 rounded min-w-0 w-48 text-white"
            />
            <button className="text-gray-400 hover:text-white">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 8 8">
                <path d="M1.5 2.5L4 5l2.5-2.5" stroke="currentColor" strokeWidth="1" fill="none"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 ml-8">
          <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded text-sm font-medium text-white">
            AI
          </button>
          <button className="p-2 hover:bg-gray-700 rounded text-white">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded text-white">
            <Monitor className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded text-white">
            <Tablet className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button 
          onClick={onPreview}
          className="flex items-center space-x-2 px-3 py-1.5 text-sm hover:bg-gray-700 rounded text-white"
        >
          <Eye className="w-4 h-4" />
          <span>Preview</span>
        </button>
        <button className="flex items-center space-x-2 px-3 py-1.5 text-sm hover:bg-gray-700 rounded text-white">
          <Code className="w-4 h-4" />
          <span>Code</span>
        </button>
        
        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm font-semibold text-white">
          V
        </div>
        
        <button className="p-2 hover:bg-gray-700 rounded text-white">
          <Play className="w-4 h-4" />
        </button>
        <button className="p-2 hover:bg-gray-700 rounded text-white">
          <Settings className="w-4 h-4" />
        </button>
        
        <button 
          onClick={onExport}
          className="bg-gray-700 hover:bg-gray-600 px-4 py-1.5 rounded text-sm font-medium text-white flex items-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>Export</span>
        </button>
        <button 
          onClick={onShare}
          className="bg-blue-600 hover:bg-blue-500 px-4 py-1.5 rounded text-sm font-medium text-white flex items-center space-x-2"
        >
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

// Rich Text Editor Component
const RichTextEditor = ({ content, onChange, onClose }) => {
  const [text, setText] = useState(content || '');
  
  const insertFormatting = (format) => {
    const textarea = document.getElementById('rich-text-area');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = text.substring(start, end);
    let newText = text;
    
    switch (format) {
      case 'bold':
        newText = text.substring(0, start) + `**${selectedText || 'bold text'}**` + text.substring(end);
        break;
      case 'italic':
        newText = text.substring(0, start) + `*${selectedText || 'italic text'}*` + text.substring(end);
        break;
      case 'bullet':
        const lines = text.split('\n');
        const currentLine = text.substring(0, start).split('\n').length - 1;
        lines[currentLine] = `• ${lines[currentLine] || ''}`;
        newText = lines.join('\n');
        break;
      default:
        break;
    }
    
    setText(newText);
  };

  const handleSave = () => {
    onChange(text);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-96 max-w-full">
        <h3 className="text-lg font-semibold text-white mb-4">Edit Text</h3>
        
        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => insertFormatting('bold')}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded text-white"
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertFormatting('italic')}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded text-white"
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertFormatting('bullet')}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded text-white"
            title="Bullet Point"
          >
            <List className="w-4 h-4" />
          </button>
        </div>

        <textarea
          id="rich-text-area"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here..."
          className="w-full h-40 bg-gray-700 border border-gray-600 rounded-lg p-3 text-white resize-none focus:outline-none focus:border-gray-500"
        />
        
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

// Connection Line Component
const ConnectionLine = ({ connection, onSelect, isSelected, onDelete }) => {
  const { startX, startY, endX, endY, type, arrowType, text } = connection;
  
  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;
  
  const angle = Math.atan2(endY - startY, endX - startX);
  const length = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
  
  const getStrokeDashArray = () => {
    switch (type) {
      case CONNECTION_TYPES.DASHED:
        return '10,5';
      case CONNECTION_TYPES.DOTTED:
        return '2,3';
      default:
        return 'none';
    }
  };

  const renderArrows = () => {
    const arrowSize = 8;
    const arrows = [];
    
    if (arrowType === ARROW_TYPES.UNI || arrowType === ARROW_TYPES.BI) {
      // End arrow
      arrows.push(
        <polygon
          key="end-arrow"
          points={`${endX},${endY} ${endX - arrowSize * Math.cos(angle - 0.5)},${endY - arrowSize * Math.sin(angle - 0.5)} ${endX - arrowSize * Math.cos(angle + 0.5)},${endY - arrowSize * Math.sin(angle + 0.5)}`}
          fill="#6b7280"
        />
      );
    }
    
    if (arrowType === ARROW_TYPES.BI) {
      // Start arrow
      arrows.push(
        <polygon
          key="start-arrow"
          points={`${startX},${startY} ${startX + arrowSize * Math.cos(angle - 0.5)},${startY + arrowSize * Math.sin(angle - 0.5)} ${startX + arrowSize * Math.cos(angle + 0.5)},${startY + arrowSize * Math.sin(angle + 0.5)}`}
          fill="#6b7280"
        />
      );
    }
    
    return arrows;
  };

  return (
    <g>
      <line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke={isSelected ? "#3b82f6" : "#6b7280"}
        strokeWidth={isSelected ? "3" : "2"}
        strokeDasharray={getStrokeDashArray()}
        style={{ cursor: 'pointer' }}
        onClick={() => onSelect(connection.id)}
      />
      {renderArrows()}
      {text && (
        <text
          x={midX}
          y={midY - 5}
          fill="#e5e7eb"
          fontSize="12"
          textAnchor="middle"
          style={{ cursor: 'pointer' }}
          onClick={() => onSelect(connection.id)}
        >
          {text}
        </text>
      )}
      {isSelected && (
        <circle
          cx={midX}
          cy={midY}
          r="8"
          fill="#ef4444"
          style={{ cursor: 'pointer' }}
          onClick={() => onDelete(connection.id)}
        >
          <title>Delete Connection</title>
        </circle>
      )}
    </g>
  );
};

// Tool definitions
const TOOLS = [
  { id: 'select', name: 'Select', component: <Move className="w-5 h-5" />, type: 'cursor' },
  { id: 'rectangle', name: 'Rectangle', component: <Square className="w-5 h-5" />, type: 'shape' },
  { id: 'circle', name: 'Circle', component: <Circle className="w-5 h-5" />, type: 'shape' },
  { id: 'triangle', name: 'Triangle', component: <Triangle className="w-5 h-5" />, type: 'shape' },
  { id: 'diamond', name: 'Diamond', component: <Diamond className="w-5 h-5" />, type: 'shape' },
  { id: 'star', name: 'Star', component: <Star className="w-5 h-5" />, type: 'shape' },
  { id: 'text', name: 'Text Box', component: <Type className="w-5 h-5" />, type: 'text' },
  { id: 'connect', name: 'Connect', component: <Link className="w-5 h-5" />, type: 'connection' }
];

// Toolbar Component
const Toolbar = ({ selectedTool, setSelectedTool, onClearCanvas, connectionType, setConnectionType, arrowType, setArrowType }) => {
  return (
    <div className="w-24 bg-gray-800 border-r border-gray-700 py-4 flex flex-col items-center">
      <h2 className="text-xs font-semibold text-gray-400 mb-4 transform -rotate-90 whitespace-nowrap">TOOLS</h2>
      
      <div className="space-y-2 flex-1">
        {TOOLS.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setSelectedTool(tool.id)}
            onDragStart={(e) => {
              e.dataTransfer.setData('tool', tool.id);
              e.dataTransfer.setData('toolType', tool.type);
            }}
            draggable={tool.type !== 'cursor' && tool.type !== 'connection'}
            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
              tool.type === 'cursor' || tool.type === 'connection' ? 'cursor-pointer' : 'cursor-grab active:cursor-grabbing'
            } ${
              selectedTool === tool.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            }`}
            title={tool.name}
          >
            {tool.component}
          </button>
        ))}
      </div>

      {/* Connection Options */}
      {selectedTool === 'connect' && (
        <div className="mt-4 p-2 bg-gray-700 rounded-lg w-full">
          <div className="text-xs text-gray-300 mb-2 text-center">Line Type</div>
          <div className="grid grid-cols-1 gap-1">
            <button
              onClick={() => setConnectionType(CONNECTION_TYPES.SOLID)}
              className={`p-1 rounded text-xs ${connectionType === CONNECTION_TYPES.SOLID ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'}`}
            >
              Solid
            </button>
            <button
              onClick={() => setConnectionType(CONNECTION_TYPES.DASHED)}
              className={`p-1 rounded text-xs ${connectionType === CONNECTION_TYPES.DASHED ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'}`}
            >
              Dash
            </button>
            <button
              onClick={() => setConnectionType(CONNECTION_TYPES.DOTTED)}
              className={`p-1 rounded text-xs ${connectionType === CONNECTION_TYPES.DOTTED ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'}`}
            >
              Dot
            </button>
          </div>
          
          <div className="text-xs text-gray-300 mb-2 mt-3 text-center">Arrow</div>
          <div className="grid grid-cols-1 gap-1">
            <button
              onClick={() => setArrowType(ARROW_TYPES.NONE)}
              className={`p-1 rounded text-xs ${arrowType === ARROW_TYPES.NONE ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'}`}
            >
              None
            </button>
            <button
              onClick={() => setArrowType(ARROW_TYPES.UNI)}
              className={`p-1 rounded text-xs ${arrowType === ARROW_TYPES.UNI ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'}`}
            >
              →
            </button>
            <button
              onClick={() => setArrowType(ARROW_TYPES.BI)}
              className={`p-1 rounded text-xs ${arrowType === ARROW_TYPES.BI ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'}`}
            >
              ↔
            </button>
          </div>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-700">
        <button
          onClick={onClearCanvas}
          className="w-12 h-12 rounded-lg flex items-center justify-center transition-colors bg-red-700 hover:bg-red-600 text-white"
          title="Clear Canvas"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// Canvas Shape Component
const CanvasShape = ({ shape, isSelected, onSelect, onMove, onDelete, onResize, onEditText }) => {
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState(null);

  const handleMouseDown = (e) => {
    e.stopPropagation();
    onSelect(shape.id);
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    onEditText(shape.id);
  };

  const handleResizeStart = (e, handle) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeHandle(handle);
  };

  const renderText = (text) => {
    if (!text) return '';
    
    return text.split('\n').map((line, index) => {
      // Handle markdown-like formatting
      let processedLine = line
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
      
      if (line.startsWith('• ')) {
        processedLine = processedLine.replace('• ', '');
        return (
          <div key={index} className="flex items-start">
            <span className="mr-2">•</span>
            <span dangerouslySetInnerHTML={{ __html: processedLine }} />
          </div>
        );
      }
      
      return (
        <div key={index} dangerouslySetInnerHTML={{ __html: processedLine }} />
      );
    });
  };

  const getShapeStyle = () => {
    const baseStyle = {
      position: 'absolute',
      left: shape.x,
      top: shape.y,
      width: shape.width || 120,
      height: shape.height || 80,
      minWidth: '80px',
      minHeight: '40px',
      cursor: 'move',
      border: isSelected ? '2px solid #3b82f6' : '2px solid #6b7280',
      backgroundColor: shape.color || '#374151',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '12px',
      userSelect: 'none',
      padding: '8px',
      overflow: 'hidden',
      wordWrap: 'break-word'
    };

    switch (shape.type) {
      case 'circle':
        return { ...baseStyle, borderRadius: '50%' };
      case 'diamond':
        return { ...baseStyle, transform: 'rotate(45deg)', fontSize: '10px' };
      case 'triangle':
        return { ...baseStyle, clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' };
      default:
        return { ...baseStyle, borderRadius: '8px' };
    }
  };

  const renderResizeHandles = () => {
    if (!isSelected) return null;
    
    const handles = [
      { position: 'nw', cursor: 'nw-resize', style: { top: -4, left: -4 } },
      { position: 'ne', cursor: 'ne-resize', style: { top: -4, right: -4 } },
      { position: 'sw', cursor: 'sw-resize', style: { bottom: -4, left: -4 } },
      { position: 'se', cursor: 'se-resize', style: { bottom: -4, right: -4 } }
    ];

    return handles.map(handle => (
      <div
        key={handle.position}
        className="absolute w-2 h-2 bg-blue-600 border border-white"
        style={{ ...handle.style, cursor: handle.cursor }}
        onMouseDown={(e) => handleResizeStart(e, handle.position)}
      />
    ));
  };

  return (
    <>
      <div
        style={getShapeStyle()}
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
      >
        <div className={`text-center ${shape.type === 'diamond' ? 'transform -rotate-45' : ''}`}>
          {renderText(shape.text || 'Double-click to edit')}
        </div>
        {renderResizeHandles()}
      </div>
      {isSelected && (
        <button
          onClick={() => onDelete(shape.id)}
          className="absolute bg-red-600 hover:bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs z-10"
          style={{ left: shape.x + (shape.width || 120), top: shape.y - 8 }}
          title="Delete"
        >
          ×
        </button>
      )}
    </>
  );
};

// Canvas Component
const Canvas = ({ 
  shapes, 
  connections,
  selectedShape, 
  selectedConnection,
  selectedTool,
  connectionType,
  arrowType,
  onAddShape, 
  onSelectShape, 
  onSelectConnection,
  onMoveShape, 
  onDeleteShape,
  onDeleteConnection,
  onResizeShape,
  onEditShapeText,
  onAddConnection,
  onEditConnectionText
}) => {
  const canvasRef = useRef(null);
  const svgRef = useRef(null);
  const [draggedShape, setDraggedShape] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStart, setConnectionStart] = useState(null);
  const [tempConnection, setTempConnection] = useState(null);
  const [showTextEditor, setShowTextEditor] = useState(false);
  const [editingTarget, setEditingTarget] = useState(null);

  const getShapeCenter = (shape) => ({
    x: shape.x + (shape.width || 120) / 2,
    y: shape.y + (shape.height || 80) / 2
  });

  const findShapeAt = (x, y) => {
    return shapes.find(shape => {
      return x >= shape.x && x <= shape.x + (shape.width || 120) &&
             y >= shape.y && y <= shape.y + (shape.height || 80);
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const toolId = e.dataTransfer.getData('tool');
    const toolType = e.dataTransfer.getData('toolType');
    
    if (toolId && toolType !== 'cursor' && toolType !== 'connection') {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - 60;
      const y = e.clientY - rect.top - 40;
      
      onAddShape({
        id: Date.now().toString(),
        type: toolId,
        x,
        y,
        width: 120,
        height: 80,
        color: '#374151',
        text: ''
      });
    }
  };

  const handleCanvasClick = (e) => {
    if (e.target === canvasRef.current || e.target === svgRef.current) {
      if (selectedTool === 'connect' && !isConnecting) {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const shape = findShapeAt(x, y);
        
        if (shape) {
          setIsConnecting(true);
          setConnectionStart(shape.id);
          const center = getShapeCenter(shape);
          setTempConnection({
            startX: center.x,
            startY: center.y,
            endX: x,
            endY: y
          });
        }
      } else {
        onSelectShape(null);
        onSelectConnection(null);
        setIsConnecting(false);
        setConnectionStart(null);
        setTempConnection(null);
      }
    }
  };

  const handleCanvasMouseMove = (e) => {
    if (isConnecting && tempConnection) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setTempConnection(prev => ({
        ...prev,
        endX: x,
        endY: y
      }));
    }
  };

  const handleShapeClick = (shapeId, e) => {
    e.stopPropagation();
    
    if (selectedTool === 'connect' && isConnecting && connectionStart) {
      if (shapeId !== connectionStart) {
        const startShape = shapes.find(s => s.id === connectionStart);
        const endShape = shapes.find(s => s.id === shapeId);
        
        if (startShape && endShape) {
          const startCenter = getShapeCenter(startShape);
          const endCenter = getShapeCenter(endShape);
          
          onAddConnection({
            id: Date.now().toString(),
            startShapeId: connectionStart,
            endShapeId: shapeId,
            startX: startCenter.x,
            startY: startCenter.y,
            endX: endCenter.x,
            endY: endCenter.y,
            type: connectionType,
            arrowType: arrowType,
            text: ''
          });
        }
      }
      
      setIsConnecting(false);
      setConnectionStart(null);
      setTempConnection(null);
    } else {
      onSelectShape(shapeId);
      onSelectConnection(null);
    }
  };

  const handleEditText = (targetId, isConnection = false) => {
    setEditingTarget({ id: targetId, isConnection });
    setShowTextEditor(true);
  };

  const handleTextSave = (newText) => {
    if (editingTarget.isConnection) {
      onEditConnectionText(editingTarget.id, newText);
    } else {
      onEditShapeText(editingTarget.id, newText);
    }
    setShowTextEditor(false);
    setEditingTarget(null);
  };

  const getCurrentText = () => {
    if (!editingTarget) return '';
    
    if (editingTarget.isConnection) {
      const connection = connections.find(c => c.id === editingTarget.id);
      return connection?.text || '';
    } else {
      const shape = shapes.find(s => s.id === editingTarget.id);
      return shape?.text || '';
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 min-h-96">
      <h2 className="text-lg font-semibold mb-4 text-white">Flowchart Canvas</h2>
      <div 
        ref={canvasRef}
        className="bg-gray-900 rounded-lg h-96 border-2 border-dashed border-gray-600 relative overflow-hidden"
        style={{ cursor: selectedTool === 'connect' ? 'crosshair' : 'default' }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleCanvasClick}
        onMouseMove={handleCanvasMouseMove}
      >
        {/* Grid background */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        
        {/* SVG for connections */}
        <svg
          ref={svgRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ pointerEvents: 'none' }}
        >
          {connections.map((connection) => (
            <g key={connection.id} style={{ pointerEvents: 'all' }}>
              <ConnectionLine
                connection={connection}
                isSelected={selectedConnection === connection.id}
                onSelect={onSelectConnection}
                onDelete={onDeleteConnection}
              />
            </g>
          ))}
          
          {tempConnection && (
            <line
              x1={tempConnection.startX}
              y1={tempConnection.startY}
              x2={tempConnection.endX}
              y2={tempConnection.endY}
              stroke="#3b82f6"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          )}
        </svg>
        
        {/* Shapes */}
        {shapes.map((shape) => (
          <CanvasShape
            key={shape.id}
            shape={shape}
            isSelected={selectedShape === shape.id}
            onSelect={(id) => handleShapeClick(id)}
            onMove={onMoveShape}
            onDelete={onDeleteShape}
            onResize={onResizeShape}
            onEditText={(id) => handleEditText(id, false)}
          />
        ))}
        
        {/* Instructions */}
        {shapes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center text-gray-400">
              <p className="text-sm mb-2">Create your flowchart here</p>
              <p className="text-xs opacity-75">Drag shapes from the toolbar, then use Connect tool to link them</p>
            </div>
          </div>
        )}
      </div>

      {/* Rich Text Editor Modal */}
      {showTextEditor && (
        <RichTextEditor
          content={getCurrentText()}
          onChange={handleTextSave}
          onClose={() => setShowTextEditor(false)}
        />
      )}
    </div>
  );
};

// Text Section Component
const TextSection = ({ title, text, setText, maxLength = 500 }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <span className="text-sm text-gray-400">{text.length}/{maxLength}</span>
      </div>
      <textarea
        value={text}
        onChange={(e) => {
          if (e.target.value.length <= maxLength) {
            setText(e.target.value);
          }
        }}
        placeholder={`Write your ${title.toLowerCase()} content here...`}
        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-4 text-gray-200 resize-none focus:outline-none focus:border-gray-500 min-h-32"
        rows={4}
      />
    </div>
  );
};

// Main Application Component
const FlowchartApp = () => {
  const [blogTitle, setBlogTitle] = useState('');
  const [headerText, setHeaderText] = useState('');
  const [footerText, setFooterText] = useState('');
  const [selectedTool, setSelectedTool] = useState('select');
  const [shapes, setShapes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [selectedShape, setSelectedShape] = useState(null);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [connectionType, setConnectionType] = useState(CONNECTION_TYPES.SOLID);
  const [arrowType, setArrowType] = useState(ARROW_TYPES.UNI);

  const handleAddShape = (shape) => {
    setShapes(prev => [...prev, shape]);
  };

  const handleSelectShape = (shapeId) => {
    setSelectedShape(shapeId);
    setSelectedConnection(null);
    if (shapeId) {
      setSelectedTool('select');
    }
  };

  const handleSelectConnection = (connectionId) => {
    setSelectedConnection(connectionId);
    setSelectedShape(null);
  };

  const handleMoveShape = (shapeId, updates) => {
    setShapes(prev => prev.map(shape => 
      shape.id === shapeId ? { ...shape, ...updates } : shape
    ));
    
    // Update connected lines
    setConnections(prev => prev.map(conn => {
      let updatedConn = { ...conn };
      
      if (conn.startShapeId === shapeId) {
        const shape = shapes.find(s => s.id === shapeId);
        if (shape) {
          const newShape = { ...shape, ...updates };
          const center = {
            x: newShape.x + (newShape.width || 120) / 2,
            y: newShape.y + (newShape.height || 80) / 2
          };
          updatedConn.startX = center.x;
          updatedConn.startY = center.y;
        }
      }
      
      if (conn.endShapeId === shapeId) {
        const shape = shapes.find(s => s.id === shapeId);
        if (shape) {
          const newShape = { ...shape, ...updates };
          const center = {
            x: newShape.x + (newShape.width || 120) / 2,
            y: newShape.y + (newShape.height || 80) / 2
          };
          updatedConn.endX = center.x;
          updatedConn.endY = center.y;
        }
      }
      
      return updatedConn;
    }));
  };

  const handleDeleteShape = (shapeId) => {
    setShapes(prev => prev.filter(shape => shape.id !== shapeId));
    setConnections(prev => prev.filter(conn => 
      conn.startShapeId !== shapeId && conn.endShapeId !== shapeId
    ));
    setSelectedShape(null);
  };

  const handleDeleteConnection = (connectionId) => {
    setConnections(prev => prev.filter(conn => conn.id !== connectionId));
    setSelectedConnection(null);
  };

  const handleResizeShape = (shapeId, newSize) => {
    setShapes(prev => prev.map(shape => 
      shape.id === shapeId ? { ...shape, ...newSize } : shape
    ));
  };

  const handleEditShapeText = (shapeId, newText) => {
    setShapes(prev => prev.map(shape => 
      shape.id === shapeId ? { ...shape, text: newText } : shape
    ));
  };

  const handleAddConnection = (connection) => {
    setConnections(prev => [...prev, connection]);
  };

  const handleEditConnectionText = (connectionId, newText) => {
    setConnections(prev => prev.map(conn => 
      conn.id === connectionId ? { ...conn, text: newText } : conn
    ));
  };

  const handleClearCanvas = () => {
    if (window.confirm('Are you sure you want to clear the entire canvas?')) {
      setShapes([]);
      setConnections([]);
      setSelectedShape(null);
      setSelectedConnection(null);
    }
  };

  const handlePreview = () => {
    const previewData = {
      title: blogTitle,
      header: headerText,
      footer: footerText,
      shapes: shapes.length,
      connections: connections.length
    };
    alert(`Preview:\n\nTitle: ${previewData.title || 'Untitled'}\nShapes: ${previewData.shapes}\nConnections: ${previewData.connections}\n\nFull preview functionality would render the complete diagram.`);
  };

  const handleExport = () => {
    const data = {
      title: blogTitle,
      header: headerText,
      footer: footerText,
      shapes: shapes,
      connections: connections,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${blogTitle || 'flowchart'}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    const shareData = {
      title: blogTitle || 'My Flowchart',
      text: `Check out my flowchart with ${shapes.length} shapes and ${connections.length} connections!`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      navigator.share(shareData);
    } else {
      // Fallback - copy to clipboard
      const shareText = `${shareData.title}\n${shareData.text}\n${shareData.url}`;
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Flowchart details copied to clipboard!');
      }).catch(() => {
        alert('Sharing not supported. Please copy the URL manually.');
      });
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Header 
        blogTitle={blogTitle}
        setBlogTitle={setBlogTitle}
        onPreview={handlePreview}
        onExport={handleExport}
        onShare={handleShare}
      />

      <div className="flex flex-1">
        <Toolbar
          selectedTool={selectedTool}
          setSelectedTool={setSelectedTool}
          onClearCanvas={handleClearCanvas}
          connectionType={connectionType}
          setConnectionType={setConnectionType}
          arrowType={arrowType}
          setArrowType={setArrowType}
        />

        <div className="flex-1 bg-gray-900 relative p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            <TextSection 
              title="Header"
              text={headerText}
              setText={setHeaderText}
              maxLength={500}
            />

            <Canvas
              shapes={shapes}
              connections={connections}
              selectedShape={selectedShape}
              selectedConnection={selectedConnection}
              selectedTool={selectedTool}
              connectionType={connectionType}
              arrowType={arrowType}
              onAddShape={handleAddShape}
              onSelectShape={handleSelectShape}
              onSelectConnection={handleSelectConnection}
              onMoveShape={handleMoveShape}
              onDeleteShape={handleDeleteShape}
              onDeleteConnection={handleDeleteConnection}
              onResizeShape={handleResizeShape}
              onEditShapeText={handleEditShapeText}
              onAddConnection={handleAddConnection}
              onEditConnectionText={handleEditConnectionText}
            />

            <TextSection 
              title="Footer"
              text={footerText}
              setText={setFooterText}
              maxLength={500}
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-800 border-t border-gray-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-700 rounded text-white">
            <Sparkles className="w-4 h-4" />
          </button>
          <span className="text-sm text-gray-400">
            Tool: {selectedTool.charAt(0).toUpperCase() + selectedTool.slice(1)}
          </span>
        </div>
        
        <div className="text-sm text-gray-400 flex items-center space-x-4">
          <span>Shapes: {shapes.length}</span>
          <span>Connections: {connections.length}</span>
          <span>Selected: {selectedShape ? 'Shape' : selectedConnection ? 'Connection' : 'None'}</span>
        </div>

        <div className="flex items-center">
          <button className="p-2 hover:bg-gray-700 rounded text-white" title="Help">
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlowchartApp;