document.addEventListener('DOMContentLoaded', () => {

    initMobileMenu();
    initTimeline();

});

function initMobileMenu() {

    const menuButton =
        document.getElementById('mobile-menu-btn');

    const navigation =
        document.getElementById('main-navigation');

    if (!menuButton || !navigation) {
        return;
    }

    menuButton.addEventListener('click', () => {

        const isOpen =
            menuButton.classList.toggle('active');

        navigation.classList.toggle(
            'active',
            isOpen
        );

        menuButton.setAttribute(
            'aria-expanded',
            String(isOpen)
        );

        menuButton.setAttribute(
            'aria-label',
            isOpen
                ? 'Close navigation menu'
                : 'Open navigation menu'
        );

    });

    navigation.querySelectorAll('a').forEach((link) => {

        link.addEventListener('click', () => {

            menuButton.classList.remove('active');
            navigation.classList.remove('active');

            menuButton.setAttribute(
                'aria-expanded',
                'false'
            );

            menuButton.setAttribute(
                'aria-label',
                'Open navigation menu'
            );

        });

    });

}

function initTimeline() {

    const nodes =
        document.querySelectorAll('.timeline-node');

    const progressBar =
        document.getElementById('timeline-progress');

    const inspectorStep =
        document.getElementById('inspector-step');

    const inspectorTitle =
        document.getElementById('inspector-title');

    const inspectorDesc =
        document.getElementById('inspector-desc');

    const inspectorCard =
        document.getElementById('timeline-inspector');

    if (
        nodes.length === 0 ||
        !progressBar ||
        !inspectorStep ||
        !inspectorTitle ||
        !inspectorDesc
    ) {
        return;
    }

    function isMobile() {
        return window.innerWidth <= 868;
    }

    function updateProgressBar(activeIndex) {

        const totalNodes = nodes.length;

        if (totalNodes <= 1) {
            progressBar.style.width = '100%';
            progressBar.style.height = '100%';
            return;
        }

        const percentage =
            (activeIndex / (totalNodes - 1)) * 100;

        if (isMobile()) {

            progressBar.style.width = '100%';
            progressBar.style.height =
                `${percentage}%`;

        } else {

            progressBar.style.height = '100%';
            progressBar.style.width =
                `${percentage}%`;

        }

    }

    function updateInspectorContent(node) {

        if (!node) {
            return;
        }

        const step =
            node.getAttribute('data-step') || '01';

        const title =
            node.getAttribute('data-title') || '';

        const description =
            node.getAttribute('data-desc') || '';

        if (inspectorCard) {

            inspectorCard.style.opacity = '0.4';
            inspectorCard.style.transform =
                'translateY(6px)';

        }

        setTimeout(() => {

            inspectorStep.textContent =
                `STAGE ${step}`;

            inspectorTitle.textContent =
                title;

            inspectorDesc.textContent =
                description;

            if (inspectorCard) {

                inspectorCard.style.opacity = '1';
                inspectorCard.style.transform =
                    'translateY(0)';

            }

        }, 120);

    }

    function setActiveNode(selectedIndex) {

        nodes.forEach((node, index) => {

            node.classList.toggle(
                'active',
                index === selectedIndex
            );

        });

        const selectedNode =
            nodes[selectedIndex];

        updateInspectorContent(
            selectedNode
        );

        updateProgressBar(
            selectedIndex
        );

    }

    nodes.forEach((node, index) => {

        node.addEventListener('click', () => {

            setActiveNode(index);

        });

        node.addEventListener(
            'mouseenter',
            () => {

                if (window.innerWidth > 868) {
                    updateInspectorContent(node);
                }

            }
        );

        node.addEventListener(
            'mouseleave',
            () => {

                if (window.innerWidth > 868) {

                    const activeNode =
                        document.querySelector(
                            '.timeline-node.active'
                        );

                    if (activeNode) {
                        updateInspectorContent(
                            activeNode
                        );
                    }

                }

            }
        );

    });

    let resizeTimeout;

    window.addEventListener('resize', () => {

        clearTimeout(resizeTimeout);

        resizeTimeout = setTimeout(() => {

            const activeNode =
                document.querySelector(
                    '.timeline-node.active'
                );

            const activeIndex =
                Array.from(nodes).indexOf(
                    activeNode
                );

            updateProgressBar(
                activeIndex >= 0
                    ? activeIndex
                    : 0
            );

        }, 100);

    });

    setActiveNode(0);

}
export {};
