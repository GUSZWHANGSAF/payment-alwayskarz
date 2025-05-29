// skytecchid
document.addEventListener('DOMContentLoaded', () => {
   
    setTimeout(() => {
      const loadingScreen = document.getElementById('loadingScreen');
      loadingScreen.style.opacity = '0';
      loadingScreen.style.visibility = 'hidden';
      
      const container = document.querySelector('.container');
      container.classList.add('loaded');
      
      createParticles();
      
      showWelcomeMessage();
    }, 2000); 
  });
  
  function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = window.innerWidth < 768 ? 30 : 50;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.top = `${Math.random() * 100}vh`;
      
      const duration = Math.random() * 20 + 10;
      particle.style.animationDuration = `${duration}s`;
      
      particle.style.animationDelay = `${Math.random() * 5}s`;
      
      particlesContainer.appendChild(particle);
    }
  }
  

  function showWelcomeMessage() {
    const welcomeMsg = document.createElement('div');
    welcomeMsg.innerHTML = `
      <div class="payment-details active" style="background: rgba(15, 26, 42, 0.9);">
        <div class="details-header">
          <i class="details-icon fas fa-hand-wave"></i>
          <h3 class="details-title">Selamat Datang!</h3>
        </div>
        <p>Silakan pilih metode pembayaran yang Anda inginkan.</p>
      </div>
    `;
    document.querySelector('.container').insertBefore(welcomeMsg, document.querySelector('.footer'));
    
    setTimeout(() => {
      welcomeMsg.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }
  
  function showPayment(method) {
    const detailsSection = document.getElementById('payment-details');
    let content = '';
    
    const paymentData = {
      dana: {
        icon: 'fa-wallet',
        name: 'DANA',
        number: '0838-4325-2269',
        instructions: 'Kirim ke nomor DANA di atas atau scan QR code di aplikasi DANA Anda.'
      },
      gopay: {
        icon: 'fa-money-bill-wave',
        name: 'GOPAY',
        number: '-',
        instructions: 'Mohon maaf, saya belum mempunyai ewallet Gopay'
      },
      seabank: {
        icon: 'fa-piggy-bank',
        name: 'SeaBank',
        number: '-',
        instructions: 'Mohon maaf, saya belum mempunyai Seabank'
      },
      bri: {
        icon: 'fa-university',
        name: 'BRI',
        number: '-',
        instructions: 'Mohon maaf, saya belum mempunyai BRI'
      },
      ovo: {
        icon: 'fa-mobile-alt',
        name: 'OVO',
        number: '-',
        instructions: 'Mohon maaf, saya belum mempunyai ewallet Ovo'
      },
      qris: {
        icon: 'fa-qrcode',
        name: 'QRIS',
        number: '',
        instructions: 'Scan QR code di bawah ini menggunakan aplikasi bank atau e-wallet yang mendukung QRIS.'
      }
    };
    
    const data = paymentData[method];
    
    if (method === 'qris') {
      content = `
        <div class="details-header">
          <i class="details-icon fas ${data.icon}"></i>
          <h3 class="details-title">${data.name}</h3>
        </div>
        <p>${data.instructions}</p>
        <div class="qris-container">
          <img src="https://e.top4top.io/p_3412v63nw1.png" alt="QRIS Code" class="qris-img">
        </div>
        <p class="instructions">Pastikan Anda melakukan pembayaran dengan nominal yang benar.</p>
      `;
    } else {
      content = `
        <div class="details-header">
          <i class="details-icon fas ${data.icon}"></i>
          <h3 class="details-title">${data.name}</h3>
        </div>
        <p>${data.instructions}</p>
        <div class="payment-number" onclick="copyToClipboard('${data.number}')">
          ${data.number}
        </div>
        <p class="instructions">Klik nomor di atas untuk menyalin. Konfirmasi pembayaran akan diproses dalam 1x24 jam.</p>
      `;
    }
    
    detailsSection.innerHTML = content;
    detailsSection.classList.add('active');
    
    setTimeout(() => {
      detailsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }
  
  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      const element = event.target;
      element.classList.add('copied');
      setTimeout(() => {
        element.classList.remove('copied');
      }, 2000);
    });
  }