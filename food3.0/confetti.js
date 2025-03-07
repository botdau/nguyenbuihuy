
// Confetti animation based on canvas
class Confetti {
    constructor() {
      this.canvas = document.createElement('canvas');
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.canvas.style.position = 'fixed';
      this.canvas.style.top = '0';
      this.canvas.style.left = '0';
      this.canvas.style.pointerEvents = 'none';
      this.canvas.style.zIndex = '1001';
      this.ctx = this.canvas.getContext('2d');
      
      this.particles = [];
      this.colors = ['#f5a623', '#e94e38', '#28a745', '#17a2b8', '#6610f2'];
      
      document.body.appendChild(this.canvas);
    }
    
    createParticles() {
      const particleCount = 100;
      for (let i = 0; i < particleCount; i++) {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height - this.canvas.height,
          size: Math.random() * 5 + 3,
          color: this.colors[Math.floor(Math.random() * this.colors.length)],
          speed: Math.random() * 3 + 2,
          angle: Math.random() * 2 * Math.PI,
          rotation: Math.random() * 0.2 - 0.1,
          rotationSpeed: Math.random() * 0.01
        });
      }
    }
    
    animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        
        this.ctx.fillStyle = p.color;
        this.ctx.beginPath();
        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.rotation);
        
        // Draw a small rectangle for confetti piece
        this.ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
        
        this.ctx.restore();
        
        // Update position
        p.y += p.speed;
        p.x += Math.sin(p.angle) * 2;
        p.rotation += p.rotationSpeed;
        
        // If particle is out of canvas, remove it
        if (p.y > this.canvas.height) {
          this.particles.splice(i, 1);
          i--;
        }
      }
      
      if (this.particles.length > 0) {
        requestAnimationFrame(this.animate.bind(this));
      } else {
        // Remove canvas when animation is complete
        document.body.removeChild(this.canvas);
      }
    }
    
    start() {
      this.createParticles();
      this.animate();
    }
  }
  
  // Create global confetti function
  window.celebrateOrder = function() {
    const confetti = new Confetti();
    confetti.start();
  };
  