# Visual Art Gallery - Interactive 3D Web Application

An immersive 3D web-based art gallery built with Three.js, featuring interactive artwork displays, dynamic lighting, and smooth animations.

##  Project Overview

This project demonstrates advanced 3D web development concepts using Three.js, creating an interactive virtual art gallery where users can explore various types of artwork in a 3D environment. The application showcases object-oriented programming, real-time rendering, and modern web development practices.

##  Features

### Core 3D Features
- **5 Unique 3D Artwork Types**: Sculptures, paintings, installations, digital art, and abstract pieces
- **Interactive Camera Controls**: Orbit controls for smooth navigation
- **Dynamic Lighting System**: Ambient, directional, point, and spot lights
- **Real-time Animations**: Floating sculptures, pulsing digital art, morphing abstract pieces
- **Texture Mapping**: Procedural materials and texture support

### User Interaction
- **Mouse Controls**: Click to view artwork details, hover for visual feedback
- **Keyboard Shortcuts**: Quick access to gallery controls
- **Responsive Design**: Works on desktop and mobile devices
- **Information Panels**: Detailed artwork descriptions and metadata

### Technical Features
- **Object-Oriented Architecture**: Clean, maintainable code structure
- **Performance Optimization**: Frame rate monitoring and resource management
- **Error Handling**: Graceful error recovery and user feedback
- **Modern UI/UX**: Beautiful, intuitive interface design

##  Getting Started

### Prerequisites
- Modern web browser with WebGL support
- Local web server (for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/selamawitsh/Graphics_group_final_project
   cd visual-art-gallery
   ```
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   

3. **Open in browser**
   Navigate to `http://localhost:8000`

##  Controls

### Mouse Controls
- **Left Click + Drag**: Rotate camera around the gallery
- **Scroll Wheel**: Zoom in/out
- **Right Click + Drag**: Pan camera
- **Click on Artwork**: View detailed information

### Keyboard Shortcuts
- **L**: Toggle all lights on/off
- **R**: Reset camera to default position
- **A**: Toggle animations on/off
- **H**: Show/hide help information
- **ESC**: Close information panels

##  Technical Architecture

### File Structure
```
visual-art-gallery/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── js/
│   ├── main.js         # Application entry point
│   ├── Gallery.js      # Main gallery class
│   └── Artwork.js      # Individual artwork class
│   └── BackgroundEffects.js  
│   └── ColorThemeManager.js
│   └── InteractiveSpotlights.js
│   └── TalkingPeople.js
└── README.md           # Project documentation
```

### Class Structure

#### `VisualArtGallery` (main.js)
- Application entry point and lifecycle management
- Loading screen and error handling
- Keyboard controls and performance monitoring

#### `Gallery` (Gallery.js)
- 3D scene management and rendering
- Camera controls and lighting setup
- Event handling and user interaction
- Gallery environment creation

#### `Artwork` (Artwork.js)
- Individual artwork representation
- Geometry and material creation
- Interactive behaviors and animations
- Information display management

##  Learning Objectives Achieved

### WebGL and Three.js Basics
- Understanding 3D scene graph structure
- Camera setup and controls
- Material and lighting systems
- Geometry creation and manipulation

### Object-Oriented Programming
- Class-based architecture
- Encapsulation and inheritance
- Event-driven programming
- Resource management

### Interactive 3D Scenes
- Real-time rendering optimization
- User interaction handling
- Animation systems
- Performance monitoring

### Modern Web Development
- ES6+ JavaScript features
- Responsive design principles
- Error handling and debugging
- Cross-browser compatibility

##  Technical Requirements Met

-  **Minimum 5 unique 3D objects**: 5 different artwork types with unique geometries
-  **Camera controls**: OrbitControls implementation with smooth damping
-  **Lighting system**: Ambient, directional, point, and spot lights
-  **User interaction**: Click, hover, keyboard, and drag controls
-  **Texture mapping**: Procedural materials and texture support
-  **Animation**: Mesh movement, object morphing, and user-triggered animations
-  **External hosting**: Ready for GitHub Pages deployment

##  Artwork Types

1. **Cosmic Sphere** (Sculpture)
   - Floating spherical geometry
   - Gentle vertical oscillation
   - Purple metallic material

2. **Digital Dreams** (Digital Art)
   - Wireframe torus geometry
   - Pulsing animation
   - Cyan color scheme

3. **Abstract Harmony** (Abstract)
   - Octahedron geometry
   - Complex rotation patterns
   - Red wireframe material

4. **Modern Canvas** (Painting)
   - Plane geometry
   - Traditional painting representation
   - Orange color scheme

5. **Urban Installation** (Installation)
   - Box geometry
   - Industrial aesthetic
   - Green material

##  Advanced Features

### Lighting System
- **Ambient Light**: Overall scene illumination
- **Directional Light**: Main light source with shadows
- **Point Lights**: Colored accent lighting
- **Spot Light**: Focused gallery lighting

### Animation System
- **Floating Animation**: Sculptures gently float up and down
- **Pulsing Animation**: Digital art expands and contracts
- **Rotation Animation**: Abstract pieces rotate on multiple axes
- **Light Animation**: Point lights move in circular patterns

### Performance Features
- **Frame Rate Monitoring**: Automatic performance tracking
- **Resource Management**: Proper disposal of 3D objects
- **Visibility Optimization**: Pause animations when page is hidden
- **Error Recovery**: Graceful handling of WebGL errors

##  Deployment

### GitHub Pages
1. Push code to GitHub repository
2. Go to repository Settings > Pages
3. Select source branch (usually `main`)
4. Access via `https://github.com/selamawitsh/Graphics_group_final_project`


##  License

This project is created for educational purposes as part of a Software Engineering course.


**Note**: This application requires a modern web browser with WebGL support. For the best experience, use Chrome, Firefox, Safari, or Edge. 
