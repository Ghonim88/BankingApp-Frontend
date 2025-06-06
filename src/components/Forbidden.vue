<template>
<div id="app">
<div class="background-pattern"></div>
<div class="floating-elements">
<div class="floating-element" v-for="n in 6" :key="n"></div>
</div>

<div class="container">
<div class="error-card">
<div class="lock-icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
<circle cx="12" cy="16" r="1"/>
<path d="M7 11V7a5 5 0 0 1 10 0v4"/>
</svg>
</div>

<div class="error-code">403</div>
<h1 class="error-title">Access Restricted</h1>
<p class="error-description">
Your current security clearance level does not permit access to this banking resource. 
Please verify your credentials or contact your account manager for assistance.
</p>
</div>
</div>
</div>
</template>

<script setup>
import { onMounted } from 'vue'

function createSparkle(x, y) {
const sparkle = document.createElement('div')
sparkle.style.position = 'fixed'
sparkle.style.left = x + 'px'
sparkle.style.top = y + 'px'
sparkle.style.width = '4px'
sparkle.style.height = '4px'
sparkle.style.background = '#edcb83'
sparkle.style.borderRadius = '50%'
sparkle.style.pointerEvents = 'none'
sparkle.style.zIndex = '1000'
sparkle.style.animation = 'sparkleAnimation 1s ease-out forwards'
document.body.appendChild(sparkle)
setTimeout(() => sparkle.remove(), 1000)
}

onMounted(() => {
document.addEventListener('mousemove', (e) => {
if (Math.random() > 0.95) {
createSparkle(e.clientX, e.clientY)
}
})

const style = document.createElement('style')
style.textContent = `
@keyframes sparkleAnimation {
0% { opacity: 1; transform: scale(0) rotate(0deg); }
50% { opacity: 1; transform: scale(1) rotate(180deg); }
100% { opacity: 0; transform: scale(0) rotate(360deg); }
}
`
document.head.appendChild(style)
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
background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%);
min-height: 100vh;
overflow: hidden;
position: relative;
}

.background-pattern {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
opacity: 0.05;
background-image: 
radial-gradient(circle at 20% 50%, #edcb83 1px, transparent 1px),
radial-gradient(circle at 40% 20%, #edcb83 1px, transparent 1px),
radial-gradient(circle at 60% 70%, #edcb83 1px, transparent 1px),
radial-gradient(circle at 80% 30%, #edcb83 1px, transparent 1px);
background-size: 100px 100px, 150px 150px, 120px 120px, 90px 90px;
animation: float 20s ease-in-out infinite;
z-index: 0;
pointer-events: none ;
}

@keyframes float {
0%, 100% { transform: translateY(0px) rotate(0deg); }
50% { transform: translateY(-10px) rotate(2deg); }
}

.container {
display: flex;
justify-content: center;
align-items: center;
min-height: 100vh;
padding: 2rem;
position: relative;
z-index: 0;
}

.error-card {
background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(20px);
border: 1px solid rgba(237, 203, 131, 0.2);
border-radius: 24px;
padding: 4rem 3rem;
text-align: center;
max-width: 500px;
width: 100%;
position: relative;
overflow: hidden;
animation: slideUp 0.8s ease-out;
}

@keyframes slideUp {
from {
opacity: 0;
transform: translateY(30px);
}
to {
opacity: 1;
transform: translateY(0);
}
}

.error-card::before {
content: '';
position: absolute;
top: 0;
left: -100%;
width: 100%;
height: 100%;
background: linear-gradient(90deg, transparent, rgba(184, 138, 68, 0.2), transparent);
animation: shimmer 2s infinite;
}


@keyframes shimmer {
0% { left: -100%; }
100% { left: 100%; }
}

.lock-icon {
width: 80px;
height: 80px;
margin: 0 auto 2rem;
background: linear-gradient(135deg, #edcb83, #f4d794);
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
position: relative;
animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(237, 203, 131, 0.7); }
50% { transform: scale(1.05); box-shadow: 0 0 0 20px rgba(237, 203, 131, 0); }
}

.lock-icon svg {
width: 40px;
height: 40px;
color: #000;
}

.error-card {
background: #000; /* Solid black background */
border: 2px solid #b88a44; /* Rich gold border */
border-radius: 24px;
padding: 4rem 3rem;
text-align: center;
max-width: 500px;
width: 100%;
position: relative;
overflow: hidden;
animation: slideUp 0.8s ease-out;
color: #000; /* Default fallback if needed */
}



@keyframes glow {
from { filter: drop-shadow(0 0 10px rgba(237, 203, 131, 0.5)); }
to { filter: drop-shadow(0 0 20px rgba(237, 203, 131, 0.8)); }
}

.error-title {
font-size: 2rem;
font-weight: 700;
color:white;
margin-bottom: 1rem;
letter-spacing: -0.02em;
}

.error-description {
font-size: 1.1rem;
color: white;
line-height: 1.6;
margin-bottom: 2.5rem;
}

.action-buttons {
display: flex;
gap: 1rem;
justify-content: center;
flex-wrap: wrap;
}

.btn {
padding: 0.875rem 2rem;
border: none;
border-radius: 12px;
font-weight: 600;
font-size: 1rem;
cursor: pointer;
transition: all 0.3s ease;
text-decoration: none;
display: inline-flex;
align-items: center;
gap: 0.5rem;
position: relative;
overflow: hidden;
}

.btn-primary {
background: linear-gradient(135deg, #edcb83, #f4d794);
color: #000;
}

.btn-primary:hover {
transform: translateY(-2px);
box-shadow: 0 10px 25px rgba(237, 203, 131, 0.3);
}

.btn-secondary {
background: rgba(255, 255, 255, 0.1);
color: white;
border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-secondary:hover {
background: rgba(255, 255, 255, 0.2);
transform: translateY(-2px);
}

.security-notice {
position: absolute;
bottom: 2rem;
left: 50%;
transform: translateX(-50%);
color: rgba(255, 255, 255, 0.5);
font-size: 0.875rem;
text-align: center;
}

.floating-elements {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
pointer-events: none;
}

.floating-element {
position: absolute;
width: 4px;
height: 4px;
background: #edcb83;
border-radius: 50%;
opacity: 0.6;
animation: floatAround 15s linear infinite;
}

@keyframes floatAround {
0% { transform: translateY(100vh) rotate(0deg); }
100% { transform: translateY(-100vh) rotate(360deg); }
}

.floating-element:nth-child(1) { left: 10%; animation-delay: -2s; animation-duration: 12s; }
.floating-element:nth-child(2) { left: 20%; animation-delay: -4s; animation-duration: 18s; }
.floating-element:nth-child(3) { left: 30%; animation-delay: -6s; animation-duration: 14s; }
.floating-element:nth-child(4) { left: 70%; animation-delay: -8s; animation-duration: 16s; }
.floating-element:nth-child(5) { left: 80%; animation-delay: -10s; animation-duration: 13s; }
.floating-element:nth-child(6) { left: 90%; animation-delay: -12s; animation-duration: 17s; }

.error-code {
font-size: 8rem; /* Bigger size */
font-weight: 900;
color: #b88a44; /* Rich/dark gold */
line-height: 1;
margin-bottom: 1rem;
text-shadow: 0 0 8px rgba(184, 138, 68, 0.4);
}
@media (max-width: 640px) {
.error-card {
padding: 3rem 2rem;
margin: 1rem;
}




.error-title {
font-size: 1.5rem;

}

.action-buttons {
flex-direction: column;
}

.btn {
width: 100%;
justify-content: center;
}
}
</style>
