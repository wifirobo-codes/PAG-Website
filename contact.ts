document.addEventListener('DOMContentLoaded', () => {

    initMobileMenu();
    initFaqAccordion();

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

function initFaqAccordion() {

    const accordionHeaders =
        document.querySelectorAll(
            '.accordion-header'
        );

    accordionHeaders.forEach((header) => {

        header.addEventListener('click', () => {

            const currentItem =
                header.parentElement;

            const body =
                currentItem.querySelector<HTMLElement>('.accordion-body');

            const isOpen =
                currentItem.classList.contains('active');

            document
                .querySelectorAll('.accordion-item')
                .forEach((item) => {

                    item.classList.remove('active');

                    const itemHeader =
                        item.querySelector('.accordion-header');

                    const itemBody =
                        item.querySelector<HTMLElement>('.accordion-body');

                    if (itemHeader) {
                        itemHeader.setAttribute(
                            'aria-expanded',
                            'false'
                        );
                    }

                    if (itemBody) {
                        itemBody.style.maxHeight = null;
                    }

                });

            if (!isOpen && body) {

                currentItem.classList.add('active');

                header.setAttribute(
                    'aria-expanded',
                    'true'
                );

                body.style.maxHeight =
                    `${body.scrollHeight}px`;

            }

        });

    });

}
export {};
