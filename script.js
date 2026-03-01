// Modern Data Array
const roadmaps = [
    { title: "Modern Java", tech: "Loom & GraalVM" },
    { title: "Python", tech: "PyTorch & Fast API" },
    { title: "React", tech: "Server Components" },
    { title: "SQL Mastery", tech: "Vector DBs" },
    { title: "C#", tech: "backend development" },
];

// Modern Function to Render Cards
const renderRoadmaps = () => {
    const grid = document.querySelector('.grid');
    
    grid.innerHTML = roadmaps.map(item => 
        <div class="card">
            <h3>${item.title}</h3>
            <p>Focus: ${item.tech}</p>
            <small style="color: #00d1ff;">Upcoming Standard</small>
        </div>
    ).join('');
};



// Initialize
document.addEventListener('DOMContentLoaded', renderRoadmaps);
const codeToggle = document.getElementById('codeToggle');
const codeBlock = document.getElementById('codeBlock');
codeToggle.addEventListener('change', () => {
    codeBlock.innerText = codeToggle.checked ? modernCode : ancientCode;
    codeBlock.style.color = codeToggle.checked ? '#00d1ff' : '#888';
});


const joinBtn = document.getElementById("joinBtn");
const communityModal = document.getElementById("communityModal");
const closeCommunity = document.getElementById("closeCommunity");

joinBtn.addEventListener("click", () => {
    communityModal.style.display = "flex";
});

closeCommunity.addEventListener("click", () => {
    communityModal.style.display = "none";
});

communityModal.addEventListener("click", (e) => {
    if (e.target === communityModal) {
        communityModal.style.display = "none";
    }
});
// Modal Functionality
const modal = document.getElementById("communityModal");
const btn = document.getElementById("joinBtn");
const span = document.getElementsByClassName("close")[0];   
btn.onclick = function() {
    modal.style.display = "block";
}   
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

document.addEventListener("DOMContentLoaded", function() {

    const exploreBtn = document.getElementById("exploreBtn");

    exploreBtn.addEventListener("click", function() {
        window.location.href = "roadmap.html";
    });

});


