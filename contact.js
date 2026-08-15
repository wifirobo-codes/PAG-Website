document.addEventListener('DOMContentLoaded', () => {
    initFaqAccordion();
});

function initFaqAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach((header) => {
        header.addEventListener('click', () => {
            const currentItem = header.parentElement;
            const body = currentItem.querySelector('.accordion-body');
            const isOpen = currentItem.classList.contains('active');

            document.querySelectorAll('.accordion-item').forEach((item) => {
                item.classList.remove('active');

                const itemHeader = item.querySelector('.accordion-header');
                const itemBody = item.querySelector('.accordion-body');

                if (itemHeader) {
                    itemHeader.setAttribute('aria-expanded', 'false');
                }

                if (itemBody) {
                    itemBody.style.maxHeight = null;
                }
            });

            if (!isOpen) {
                currentItem.classList.add('active');
                header.setAttribute('aria-expanded', 'true');
                body.style.maxHeight = body.scrollHeight + 'px';
            }
        });
    });
}