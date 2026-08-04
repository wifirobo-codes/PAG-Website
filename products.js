/**
 * PAG (Perfect Agro Group) - Products Catalog Interactive Logic
 * File: products.js
 */

// Extended Product Technical Specifications Data Store
const PRODUCT_DATA = {
    'lions-mane': {
        badge: 'Fresh Harvest',
        title: "Gourmet Lion's Mane",
        category: 'Fresh Yield',
        description: 'Hericium erinaceus. Hand-harvested organic clusters grown on pasteurized hardwood sawdust. Distinctive dense, icicle-like spines with a mild seafood-like flavor profile.',
        price: '$18.50 / kg',
        specs: {
            'Moisture Content': '88-92%',
            'Shelf Life': '10-14 Days (Refrigerated)',
            'Bioactives': 'Hericenones & Erinacines',
            'Cultivation Substrate': 'Oak Hardwood Blend'
        }
    },
    'reishi-tincture': {
        badge: 'Triple Dual-Extracted',
        title: 'Reishi Tincture (Ganoderma)',
        category: 'Bio-Extract',
        description: 'Standardized liquid dual-extract derived from mature Ganoderma lucidum red reishi fruiting bodies. Uses ultrasonic-assisted extraction to preserve sensitive triterpenes and polysaccharides.',
        price: '$42.00 / 100ml',
        specs: {
            'Beta-Glucan Concentration': '> 30%',
            'Triterpenes': '> 4%',
            'Carrier Vehicle': 'Organic Cane Alcohol (30% ABV)',
            'Purity Standard': 'Heavy Metal & Pesticide Free'
        }
    },
    'substrate-bag': {
        badge: 'Lab Grade',
        title: "Master's Mix Substrate Bag",
        category: 'Substrate & Supplies',
        description: 'Sterilized commercial mushroom substrate formulation consisting of 50% pelleted oak hardwood and 50% soy hulls. Hydrated to 60% moisture content and pressure cooked at 15 PSI.',
        price: '$8.50 / 5lb Bag',
        specs: {
            'Sterilization Time': '150 Mins @ 15 PSI',
            'Filter Patch': '0.2 Micron High Efficiency',
            'Hydration Level': '60% Target Moisture',
            'Bag Type': '14-Mil Autoclavable Polypropylene'
        }
    },
    'pearl-oyster': {
        badge: 'Fresh Harvest',
        title: 'Pearl Oyster Clusters',
        category: 'Fresh Yield',
        description: 'Pleurotus ostreatus harvested in uniform clusters at peak maturity. Firm texture and velvety gray-white caps, perfect for high-volume culinary distribution.',
        price: '$14.00 / kg',
        specs: {
            'Harvest Window': 'Daily Yields',
            'Storage Temp': '2°C - 4°C (35°F - 39°F)',
            'Package Format': 'Breathable Aerated Containers',
            'Protein Content': '3.3g / 100g'
        }
    },
    'cordyceps-powder': {
        badge: 'High Potency',
        title: 'Cordyceps Concentrated Powder',
        category: 'Bio-Extract',
        description: 'Pure Cordyceps militaris fruiting body extract powder. Processed using low-temperature vacuum drying and ultra-fine micronization for optimum bioavailability.',
        price: '$55.00 / 250g',
        specs: {
            'Cordycepin Level': '> 1.5% (HPLC Verified)',
            'Adenosine Level': '> 0.2%',
            'Solubility': '100% Water Soluble',
            'Mesh Size': '200 Mesh Powder'
        }
    },
    'culture-syringe': {
        badge: 'Isolated Strain',
        title: 'Isolated Culture Syringe (10ml)',
        category: 'Substrate & Genetics',
        description: 'Genetically isolated, high-yield commercial liquid culture suspended in nutrient-rich solution. Tested for vigorous mycelial growth and contamination resistance.',
        price: '$16.00 / Syringe',
        specs: {
            'Volume': '10 ml Luer-Lock Syringe',
            'Needle Included': '18 Gauge Sterile Needle',
            'Storage Life': '6 Months Refrigerated',
            'Quality Guarantee': 'Zero Contamination Verified'
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initFilterAndSearch();
    initModalLogic();
});

/**
 * Filter Tabs and Real-Time Search Logic
 */
function initFilterAndSearch() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('product-search');
    const productCards = document.querySelectorAll('.product-card');

    let activeCategory = 'all';
    let searchQuery = '';

    function applyFilters() {
        productCards.forEach((card) => {
            const cardCategory = card.getAttribute('data-category') || '';
            const cardTitle = card.querySelector('h3')?.innerText.toLowerCase() || '';
            const cardDesc = card.querySelector('p')?.innerText.toLowerCase() || '';

            const matchesCategory = (activeCategory === 'all' || cardCategory === activeCategory);
            const matchesSearch = cardTitle.includes(searchQuery) || cardDesc.includes(searchQuery);

            if (matchesCategory && matchesSearch) {
                card.style.display = 'flex';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 200);
            }
        });
    }

    // Filter Tab Clicks
    filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            filterBtns.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.getAttribute('data-filter') || 'all';
            applyFilters();
        });
    });

    // Search Input Handler
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            applyFilters();
        });
    }
}

/**
 * Modal Inspector Popup Logic
 */
function initModalLogic() {
    const modalOverlay = document.getElementById('product-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const detailBtns = document.querySelectorAll('.details-btn');

    const modalBadge = document.getElementById('modal-badge');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-description');
    const modalPrice = document.getElementById('modal-price');
    const modalSpecsContainer = document.getElementById('modal-specs');

    if (!modalOverlay || !modalCloseBtn) return;

    function openModal(productId) {
        const data = PRODUCT_DATA[productId];
        if (!data) return;

        if (modalBadge) modalBadge.innerText = data.badge;
        if (modalTitle) modalTitle.innerText = data.title;
        if (modalDesc) modalDesc.innerText = data.description;
        if (modalPrice) modalPrice.innerText = data.price;

        // Render Specs Grid
        if (modalSpecsContainer) {
            modalSpecsContainer.innerHTML = '';
            Object.entries(data.specs).forEach(([key, val]) => {
                const specDiv = document.createElement('div');
                specDiv.className = 'spec-item';
                specDiv.innerHTML = `<span>${key}</span><span>${val}</span>`;
                modalSpecsContainer.appendChild(specDiv);
            });
        }

        modalOverlay.classList.add('active');
        modalOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        modalOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // Attach Event Listeners to View Specs Buttons
    detailBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const productId = btn.getAttribute('data-id');
            if (productId) openModal(productId);
        });
    });

    // Close Modal Triggers
    modalCloseBtn.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
}