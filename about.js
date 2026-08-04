/**
 * PAG (Perfect Agro Group) - About Us Page Interactive Logic
 * File: about.js
 */

document.addEventListener('DOMContentLoaded', () => {
    const nodes = document.querySelectorAll('.timeline-node');
    const progressBar = document.getElementById('timeline-progress');
    const inspectorStep = document.getElementById('inspector-step');
    const inspectorTitle = document.getElementById('inspector-title');
    const inspectorDesc = document.getElementById('inspector-desc');
    const inspectorCard = id('timeline-inspector');

    function id(elementId) {
        return document.getElementById(elementId);
    }

    // Calculate and update connecting track progress percentage
    function updateProgressBar(activeIndex) {
        if (!progressBar) return;

        const totalNodes = nodes.length;
        if (totalNodes <= 1) {
            progressBar.style.width = '100%';
            return;
        }

        // Is mobile view (vertical timeline) or desktop (horizontal timeline)
        const isMobile = window.innerWidth <= 868;
        const percentage = (activeIndex / (totalNodes - 1)) * 100;

        if (isMobile) {
            progressBar.style.width = '100%';
            progressBar.style.height = `${percentage}%`;
        } else {
            progressBar.style.height = '100%';
            progressBar.style.width = `${percentage}%`;
        }
    }

    // Update Inspector Card Display with smooth fade effect
    function updateInspectorContent(node) {
        if (!node || !inspectorTitle || !inspectorDesc || !inspectorStep) return;

        const step = node.getAttribute('data-step') || '01';
        const title = node.getAttribute('data-title') || '';
        const desc = node.getAttribute('data-desc') || '';

        if (inspectorCard) {
            inspectorCard.style.opacity = '0.4';
            inspectorCard.style.transform = 'translateY(6px)';
        }

        setTimeout(() => {
            inspectorStep.innerText = `STAGE ${step}`;
            inspectorTitle.innerText = title;
            inspectorDesc.innerText = desc;

            if (inspectorCard) {
                inspectorCard.style.opacity = '1';
                inspectorCard.style.transform = 'translateY(0)';
            }
        }, 150);
    }

    // Handle active node state selection
    function setActiveNode(selectedIndex) {
        nodes.forEach((node, idx) => {
            if (idx === selectedIndex) {
                node.classList.add('active');
                updateInspectorContent(node);
            } else {
                node.classList.remove('active');
            }
        });

        updateProgressBar(selectedIndex);
    }

    // Attach click and hover event listeners to each timeline step
    nodes.forEach((node, index) => {
        // Click event for permanent selection
        node.addEventListener('click', () => {
            setActiveNode(index);
        });

        // Hover event for quick inspection without losing primary click context
        node.addEventListener('mouseenter', () => {
            updateInspectorContent(node);
        });

        // Reset inspector content to active node when mouse leaves timeline
        node.addEventListener('mouseleave', () => {
            const activeNode = document.querySelector('.timeline-node.active');
            if (activeNode) {
                updateInspectorContent(activeNode);
            }
        });
    });

    // Handle window resize to recalculate progress orientation
    window.addEventListener('resize', () => {
        const activeNode = document.querySelector('.timeline-node.active');
        if (activeNode) {
            const activeIndex = Array.from(nodes).indexOf(activeNode);
            updateProgressBar(activeIndex >= 0 ? activeIndex : 0);
        }
    });

    // Initialize timeline with Step 01 active
    setActiveNode(0);
});