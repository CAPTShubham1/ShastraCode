/* ============================================================
   SHASTRACODE — Main Script
   ============================================================ */

// --- Code Evolution Data ---
const ancientCode = `// ❌ Ancient Java (verbose & archaic)
public class Main {
    public static void main(String[] args) {
        for (int i = 0; i < 10; i++) {
            System.out.println("Step " + i);
        }
        // Hundreds of lines for simple logic...
    }
}`;

const modernCode = `// ✅ Modern Java (Loom & Records)
record Step(int index, String label) {}

var steps = IntStream.range(0, 10)
    .mapToObj(i -> new Step(i, "Step " + i))
    .toList();

steps.forEach(System.out::println);
// Clean, expressive, powerful ⚡`;

// --- DOM Ready ---
document.addEventListener('DOMContentLoaded', () => {
    initCodeToggle();
    initRoadmapModal();
    initCommunityModal();
    initNavbar();
    initHamburger();
});

// ============================================================
// CODE TOGGLE
// ============================================================
function initCodeToggle() {
    const toggle = document.getElementById('codeToggle');
    const block  = document.getElementById('codeBlock');
    const tag    = document.getElementById('codeLangTag');

    if (!toggle || !block) return;

    // Set initial state
    block.textContent = ancientCode;
    block.style.color = '#888';
    if (tag) tag.textContent = 'Ancient Java';

    toggle.addEventListener('change', () => {
        if (toggle.checked) {
            block.textContent = modernCode;
            block.style.color = '#7dcfff';
            if (tag) tag.textContent = 'Modern Java';
        } else {
            block.textContent = ancientCode;
            block.style.color = '#888';
            if (tag) tag.textContent = 'Ancient Java';
        }
    });
}

// ============================================================
// ROADMAP IMAGE MODAL
// ============================================================
function initRoadmapModal() {
    const modal    = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const closeBtn = document.getElementById('modalClose');
    const cards    = document.querySelectorAll('.card');

    if (!modal) return;

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const imgSrc = card.dataset.img;
            const title  = card.dataset.title || '';
            if (imgSrc) {
                modalImg.src = imgSrc;
                modalImg.alt = title;
                if (modalTitle) modalTitle.textContent = title;
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    const closeModal = () => {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

// ============================================================
// COMMUNITY MODAL
// ============================================================
function initCommunityModal() {
    const modal    = document.getElementById('communityModal');
    const closeBtn = document.getElementById('closeCommunity');
    const triggers = [
        document.getElementById('joinBtn'),
        document.getElementById('joinBtnMob'),
        document.getElementById('joinBtnHero'),
        document.getElementById('joinBtnAbout'),
    ];

    if (!modal) return;

    const openModal  = () => { modal.classList.add('show'); document.body.style.overflow = 'hidden'; };
    const closeModal = () => { modal.classList.remove('show'); document.body.style.overflow = ''; };

    triggers.forEach(btn => { if (btn) btn.addEventListener('click', openModal); });
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
}

// ============================================================
// NAVBAR — Scroll Shadow
// ============================================================
function initNavbar() {
    const nav = document.getElementById('navbar');
    if (!nav) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.5)';
        } else {
            nav.style.boxShadow = 'none';
        }
    }, { passive: true });
}

// ============================================================
// HAMBURGER MENU
// ============================================================
function initHamburger() {
    const btn       = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    if (!btn || !mobileNav) return;

    btn.addEventListener('click', () => {
        mobileNav.classList.toggle('open');
    });

    // Close when a link is clicked
    mobileNav.querySelectorAll('.mob-link, .mob-join').forEach(el => {
        el.addEventListener('click', () => mobileNav.classList.remove('open'));
    });
}
