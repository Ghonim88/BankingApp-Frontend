<template>
<div class="constellation">
<div
class="star"
v-for="star in stars"
:key="star.id"
:style="star.style"
></div>
<div class="shooting-star" :style="shootingStarStyle"></div>
</div>

<div class="container">
<div class="error-card">
<div class="compass-icon">
<div class="compass-outer">
  <div class="compass-needle"></div>
  <div class="compass-center"></div>
</div>
</div>

<div class="error-code">404</div>
<h1 class="error-title">PAGE NOT FOUND</h1>
<p class="error-description">
The page you're looking for seems to have wandered off into the digital wilderness.
Let's help you find your way back to familiar territory.
</p>
</div>
</div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const stars = ref([])
const shootingStarStyle = ref({})

const generateStars = () => {
stars.value = []
for (let i = 0; i < 50; i++) {
stars.value.push({
id: i,
style: {
left: `${Math.random() * 100}%`,
top: `${Math.random() * 100}%`,
animationDelay: `${Math.random() * 3}s`,
animationDuration: `${2 + Math.random() * 2}s`
}
})
}
}

const generateShootingStar = () => {
shootingStarStyle.value = {
top: `${Math.random() * 50}%`,
animationDuration: `${3 + Math.random() * 2}s`,
animationDelay: `${Math.random() * 2}s`
}
}

const createCursorEffect = (x, y) => {
const effect = document.createElement('div')
effect.style.position = 'fixed'
effect.style.left = `${x}px`
effect.style.top = `${y}px`
effect.style.width = '6px'
effect.style.height = '6px'
effect.style.background = 'radial-gradient(circle, #edcb83, transparent)'
effect.style.borderRadius = '50%'
effect.style.pointerEvents = 'none'
effect.style.zIndex = 999
effect.style.opacity = 0.6
document.body.appendChild(effect)

setTimeout(() => {
effect.style.transition = 'all 0.5s ease-out'
effect.style.transform = 'scale(2)'
effect.style.opacity = '0'
}, 50)

setTimeout(() => {
effect.remove()
}, 700)
}

onMounted(() => {
generateStars()
generateShootingStar()

setInterval(generateShootingStar, 5000)

document.addEventListener('mousemove', (e) => {
if (Math.random() > 0.98) {
createCursorEffect(e.clientX, e.clientY)
}
})
})
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: radial-gradient(
    ellipse at center, 
    #0a0a0a 0%,        /* Very dark gray near black */
    #000000 90%        /* Pure black */
  );
  min-height: 100vh;
  overflow: hidden;
  position: relative;
}


.constellation {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.star {
    position: absolute;
    width: 2px;
    height: 2px;
    background: #edcb83;
    border-radius: 50%;
    animation: twinkle 3s ease-in-out infinite;
}

@keyframes twinkle {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.2); }
}

.shooting-star {
    position: absolute;
    width: 3px;
    height: 3px;
    background: linear-gradient(45deg, #edcb83, transparent);
    border-radius: 50%;
    animation: shoot 4s linear infinite;
}

@keyframes shoot {
    0% {
        transform: translateX(-100px) translateY(100px);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translateX(100vw) translateY(-100px);
        opacity: 0;
    }
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 2rem;
    position: relative;
    z-index: 10;
}

.error-card {
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(237, 203, 131, 0.08);
    border-radius: 32px;
    padding: 4rem 3rem;
    text-align: center;
    max-width: 600px;
    width: 100%;
    position: relative;
    overflow: hidden;
    animation: fadeInUp 1s ease-out;
    box-shadow: 
        0 25px 50px rgba(0, 0, 0, 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(50px) scale(0.95);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.error-card::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(from 0deg, transparent, rgba(237, 203, 131, 0.1), transparent);
    animation: rotate 4s linear infinite;
    z-index: -1;
}

@keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.compass-icon {
    width: 100px;
    height: 100px;
    margin: 0 auto 2rem;
    position: relative;
    animation: float 3s ease-in-out infinite;
}

@keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(5deg); }
}

.compass-outer {
    width: 100px;
    height: 100px;
    border: 3px solid #edcb83;
    border-radius: 50%;
    position: relative;
    background: radial-gradient(circle, rgba(237, 203, 131, 0.1), transparent);
    animation: compassSpin 8s linear infinite;
}

@keyframes compassSpin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.compass-needle {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 40px;
    background: linear-gradient(to top, #edcb83, #f4d794);
    transform: translate(-50%, -50%);
    border-radius: 2px;
    animation: needleWobble 2s ease-in-out infinite;
}

@keyframes needleWobble {
    0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
    25% { transform: translate(-50%, -50%) rotate(-5deg); }
    75% { transform: translate(-50%, -50%) rotate(5deg); }
}

.compass-center {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 8px;
    height: 8px;
    background: #edcb83;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 10px rgba(237, 203, 131, 0.6);
}

.error-code {
    font-size: 7rem;
    font-weight: 900;
    background: linear-gradient(135deg, #edcb83 0%, #f4d794 50%, #edcb83 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
    margin-bottom: 1.5rem;
    position: relative;
    animation: textGlow 3s ease-in-out infinite alternate;
}

@keyframes textGlow {
    from { 
        filter: drop-shadow(0 0 10px rgba(237, 203, 131, 0.4));
        transform: scale(1);
    }
    to { 
        filter: drop-shadow(0 0 25px rgba(237, 203, 131, 0.7));
        transform: scale(1.02);
    }
}

.error-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: white;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
    animation: slideIn 0.8s ease-out 0.3s both;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(-30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.error-description {
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.7;
    margin-bottom: 3rem;
    animation: slideIn 0.8s ease-out 0.5s both;
}

.search-container {
    margin-bottom: 2.5rem;
    animation: slideIn 0.8s ease-out 0.7s both;
}

.search-box {
    display: flex;
    max-width: 400px;
    margin: 0 auto;
    position: relative;
}

.search-input {
    flex: 1;
    padding: 1rem 1.5rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(237, 203, 131, 0.3);
    border-radius: 16px 0 0 16px;
    color: white;
    font-size: 1rem;
    outline: none;
    transition: all 0.3s ease;
}

.search-input::placeholder {
    color: rgba(255, 255, 255, 0.5);
}

.search-input:focus {
    border-color: #edcb83;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 0 3px rgba(237, 203, 131, 0.1);
}

.search-btn {
    padding: 1rem 1.5rem;
    background: linear-gradient(135deg, #edcb83, #f4d794);
    border: none;
    border-radius: 0 16px 16px 0;
    color: #000;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.search-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(237, 203, 131, 0.3);
}

.action-buttons {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    flex-wrap: wrap;
    animation: slideIn 0.8s ease-out 0.9s both;
}

.btn {
    padding: 1rem 2.5rem;
    border: none;
    border-radius: 16px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    position: relative;
    overflow: hidden;
}

.btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
}

.btn:hover::before {
    left: 100%;
}

.btn-primary {
    background: linear-gradient(135deg, #edcb83, #f4d794);
    color: #000;
    box-shadow: 0 4px 15px rgba(237, 203, 131, 0.3);
}

.btn-primary:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 12px 30px rgba(237, 203, 131, 0.4);
}

.btn-secondary {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
}

.btn-secondary:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 12px 30px rgba(255, 255, 255, 0.1);
}

.help-links {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 2rem;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9rem;
}

.help-link {
    color: rgba(237, 203, 131, 0.8);
    text-decoration: none;
    transition: all 0.3s ease;
    position: relative;
}

.help-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background: #edcb83;
    transition: width 0.3s ease;
}

.help-link:hover {
    color: #edcb83;
}

.help-link:hover::after {
    width: 100%;
}

@media (max-width: 640px) {
    .error-card {
        padding: 3rem 2rem;
        margin: 1rem;
    }
    
    .error-code {
        font-size: 5rem;
    }
    
    .error-title {
        font-size: 2rem;
    }
    
    .search-box {
        flex-direction: column;
        max-width: 100%;
    }
    
    .search-input {
        border-radius: 16px 16px 0 0;
    }
    
    .search-btn {
        border-radius: 0 0 16px 16px;
    }
    
    .action-buttons {
        flex-direction: column;
    }
    
    .btn {
        width: 100%;
        justify-content: center;
    }
    
    .help-links {
        flex-direction: column;
        text-align: center;
        gap: 1rem;
    }
}
</style>
