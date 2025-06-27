const toggle = document.getElementById('themeToggle');

toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});
function scrollSubNav(direction) {
  const subNavbar = document.getElementById('subNavbar');
  const scrollAmount = 150;
  if (direction === 'left') {
    subNavbar.scrollLeft -= 150;
  } else {
    subNavbar.scrollLeft += 150;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.hamburger-menu');
  const sidebar = document.querySelector('.sidebar');

  if (hamburger && sidebar) {
    hamburger.addEventListener('click', function () {
      sidebar.classList.toggle('collapsed');
    });
  }

  const sections = document.querySelectorAll('.tutorial-content h1, .tutorial-content h2');
  const navLinks = document.querySelectorAll('.sidebar ul li a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 120) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.querySelector('.nav-links');

  if(menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
  }
});

const codeLines = [
  '<!DOCTYPE html>',
  '<html>',
  '<body>',
  '',
  '  <h1>Hello World</h1>',
  '  <p>This is a paragraph.</p>',
  '',
  '</body>',
  '</html>'
];
const codeTarget = document.getElementById('editor-code');
const resultTarget = document.getElementById('editor-result');
const runBtn = document.getElementById('editorRunBtn');
let codeSoFar = '';
let lineIdx = 0;
let charIdx = 0;
let typing = true;
let highlightCache = '';

function htmlSyntaxHighlight(code) {
  return code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="hl-comment">$1</span>')
    .replace(/(&lt;\/?)([a-zA-Z0-9\-]+)(.*?)(\/?&gt;)/g, function(_, p1, p2, p3, p4) {
      return p1 + '<span class="hl-tag">' + p2 + '</span>' +
        p3.replace(/([a-zA-Z\-]+)(=)(&quot;.*?&quot;|\'.*?\'|[^\s>]*)/g, '<span class="hl-attr">$1</span>$2<span class="hl-value">$3</span>') + p4;
    });
}

function renderResultFinal() {
  const match = codeSoFar.match(/<body>([\s\S]*?)<\/body>/i);
  if (match && resultTarget) {
    resultTarget.innerHTML = match[1];
  }
}

function typeCodeHighlight() {
  if (!typing || !codeTarget) return;
  if (lineIdx >= codeLines.length) {
    highlightCache = htmlSyntaxHighlight(codeSoFar);
    codeTarget.innerHTML = highlightCache;
    renderResultFinal();
    setTimeout(() => {
      if (typing) {
        codeSoFar = '';
        lineIdx = 0;
        charIdx = 0;
        if(resultTarget) resultTarget.innerHTML = '';
        typeCodeHighlight();
      }
    }, 2000); 
    return;
  }
  const line = codeLines[lineIdx];
  if (charIdx <= line.length) {
    const current = codeSoFar + line.slice(0, charIdx);
    highlightCache = htmlSyntaxHighlight(current);
    codeTarget.innerHTML = highlightCache + '<span class="blinking-cursor">|</span>';
    charIdx++;
    setTimeout(typeCodeHighlight, 38 + Math.random() * 40);
  } else {
    codeSoFar += line + '\n';
    charIdx = 0;
    lineIdx++;
    setTimeout(typeCodeHighlight, 120);
  }
}

if (codeTarget && resultTarget) {
  typeCodeHighlight();
}
if (runBtn) {
  runBtn.addEventListener('click', function() {
    typing = false;
    codeSoFar = codeLines.join('\n') + '\n';
    highlightCache = htmlSyntaxHighlight(codeSoFar);
    codeTarget.innerHTML = highlightCache;
    renderResultFinal();
  });
}
const style = document.createElement('style');
style.innerHTML = `.blinking-cursor { animation: blink 1s steps(2, start) infinite; }
@keyframes blink { to { visibility: hidden; } }
.hl-tag { color: #008000; }
.hl-attr { color: #795E26; }
.hl-value { color: #A31515; }
.hl-comment { color: #6A9955; font-style: italic; }
#editor-code { color: #222; }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', function() {
  const spacesSection = document.getElementById('spacesPromo');
  if (spacesSection) {
    const img = spacesSection.querySelector('.spaces-animate-img');
    if ('IntersectionObserver' in window) {
      const observer = new window.IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            console.log('Spaces section is visible!');
            spacesSection.classList.add('visible');
            if (img) img.classList.add('visible');
            observer.disconnect();
          }
        });
      }, { threshold: 0.2 });
      observer.observe(spacesSection);
    } else {
      spacesSection.classList.add('visible');
      if (img) img.classList.add('visible');
    }
    setTimeout(() => {
      if (!spacesSection.classList.contains('visible')) {
        console.log('Spaces section fallback animation triggered!');
        spacesSection.classList.add('visible');
        if (img) img.classList.add('visible');
      }
    }, 1000);
  }
});

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot-nav");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
