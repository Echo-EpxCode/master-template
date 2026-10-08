import site from "../../config/site.js";
import sections from "../../config/sections.js";
import content from "../../config/content.js";

const app = document.querySelector("#app");

/*
|--------------------------------------------------------------------------
| SECTION LOADER
|--------------------------------------------------------------------------
*/

async function loadSection(name) {
    const response = await fetch(`./src/sections/${name}.html`);

    if (!response.ok) {
        throw new Error(`Failed to load section: ${name}`);
    }

    return response.text();
}

/*
|--------------------------------------------------------------------------
| WEBSITE RENDERER
|--------------------------------------------------------------------------
*/

async function renderWebsite() {
    if (!app) {
        console.error('App container "#app" was not found.');

        return;
    }

    try {
        for (const section of sections) {
            if (!section.enabled) {
                continue;
            }

            const markup = await loadSection(section.name);

            app.insertAdjacentHTML("beforeend", markup);
        }

        updateSiteInformation();
        updateContent();
    } catch (error) {
        console.error("Website rendering failed:", error);
    }
}

/*
|--------------------------------------------------------------------------
| SITE CONFIGURATION
|--------------------------------------------------------------------------
*/

function updateSiteInformation() {
    document.title = site.name;

    const siteNameElements = document.querySelectorAll("[data-site-name]");

    siteNameElements.forEach((element) => {
        element.textContent = site.name;
    });
}

// Testing
// function updateSiteInformation() {
//     console.log("SITE CONFIG:", site);

//     document.title = site.name;

//     const siteNameElements = document.querySelectorAll("[data-site-name]");

//     siteNameElements.forEach((element) => {
//         element.textContent = site.name;
//     });
// }

/*
|--------------------------------------------------------------------------
| CONTENT CONFIGURATION
|--------------------------------------------------------------------------
*/

function updateContent() {
    updateHeroContent();
    updateAboutContent();
    updateServicesContent();
    updateFeaturesContent();
    updateProductsContent();
    updateMenuContent();
}

/*
|--------------------------------------------------------------------------
| HERO CONTENT
|--------------------------------------------------------------------------
*/

function updateHeroContent() {
    const hero = content.hero;

    if (!hero) {
        return;
    }

    /*
    |--------------------------------------------------------------------------
    | Hero Elements
    |--------------------------------------------------------------------------
    */

    const eyebrow = document.querySelector("[data-hero-eyebrow]");

    const titleMain = document.querySelector("[data-hero-title-main]");

    const titleHighlight = document.querySelector("[data-hero-title-highlight]");

    const description = document.querySelector("[data-hero-description]");

    const primaryAction = document.querySelector("[data-hero-primary-action]");

    const primaryLabel = document.querySelector("[data-hero-primary-label]");

    const secondaryAction = document.querySelector("[data-hero-secondary-action]");

    const secondaryLabel = document.querySelector("[data-hero-secondary-label]");

    const highlights = document.querySelector("[data-hero-highlights]");

    const cardTitle = document.querySelector("[data-hero-card-title]");

    const cardDescription = document.querySelector("[data-hero-card-description]");

    const heroImage = document.querySelector("[data-hero-image]");

    /*
    |--------------------------------------------------------------------------
    | Hero Image
    |--------------------------------------------------------------------------
    */

    if (heroImage && hero.image && hero.image.src) {
        heroImage.innerHTML = "";

        const image = document.createElement("img");

        image.src = hero.image.src;

        image.alt = hero.image.alt || "";

        image.className = "h-full w-full object-cover";

        heroImage.appendChild(image);
    }

    /*
    |--------------------------------------------------------------------------
    | Hero Eyebrow
    |--------------------------------------------------------------------------
    */

    if (eyebrow) {
        eyebrow.textContent = hero.eyebrow;
    }

    /*
    |--------------------------------------------------------------------------
    | Hero Title
    |--------------------------------------------------------------------------
    */

    if (titleMain && hero.title) {
        titleMain.textContent = hero.title.main;
    }

    if (titleHighlight && hero.title) {
        titleHighlight.textContent = hero.title.highlight;
    }

    /*
    |--------------------------------------------------------------------------
    | Hero Description
    |--------------------------------------------------------------------------
    */

    if (description) {
        description.textContent = hero.description;
    }

    /*
    |--------------------------------------------------------------------------
    | Primary Action
    |--------------------------------------------------------------------------
    */

    if (primaryAction && hero.primaryAction) {
        primaryAction.href = hero.primaryAction.href;
    }

    if (primaryLabel && hero.primaryAction) {
        primaryLabel.textContent = hero.primaryAction.label;
    }

    /*
    |--------------------------------------------------------------------------
    | Secondary Action
    |--------------------------------------------------------------------------
    */

    if (secondaryAction && hero.secondaryAction) {
        secondaryAction.href = hero.secondaryAction.href;
    }

    if (secondaryLabel && hero.secondaryAction) {
        secondaryLabel.textContent = hero.secondaryAction.label;
    }

    /*
    |--------------------------------------------------------------------------
    | Hero Highlights
    |--------------------------------------------------------------------------
    */

    if (highlights && Array.isArray(hero.highlights)) {
        highlights.replaceChildren();

        hero.highlights.forEach((highlight) => {
            const item = document.createElement("div");

            item.className = "flex items-center gap-2";

            const icon = document.createElement("i");

            icon.className = "bi bi-check-circle-fill text-[var(--color-primary)]";

            icon.setAttribute("aria-hidden", "true");

            const text = document.createElement("span");

            text.textContent = highlight;

            item.append(icon, text);

            highlights.appendChild(item);
        });
    }

    /*
    |--------------------------------------------------------------------------
    | Hero Card
    |--------------------------------------------------------------------------
    */

    if (cardTitle && hero.card) {
        cardTitle.textContent = hero.card.title;
    }

    if (cardDescription && hero.card) {
        cardDescription.textContent = hero.card.description;
    }
}

/*
|--------------------------------------------------------------------------
| ABOUT CONTENT
|--------------------------------------------------------------------------
*/
function updateAboutContent() {
    const about = content.about;

    if (!about) {
        return;
    }

    /*
    |--------------------------------------------------------------------------
    | About Elements
    |--------------------------------------------------------------------------
    */

    const eyebrow = document.querySelector("[data-about-eyebrow]");

    const titleMain = document.querySelector("[data-about-title-main]");

    const titleHighlight = document.querySelector("[data-about-title-highlight]");

    const description = document.querySelector("[data-about-description]");

    const highlights = document.querySelector("[data-about-highlights]");

    const cardLabel = document.querySelector("[data-about-card-label]");

    const cardTitle = document.querySelector("[data-about-card-title]");

    const cardDescription = document.querySelector("[data-about-card-description]");

    const cardIcon = document.querySelector("[data-about-card-icon]");

    /*
    |--------------------------------------------------------------------------
    | Eyebrow
    |--------------------------------------------------------------------------
    */

    if (eyebrow) {
        eyebrow.textContent = about.eyebrow;
    }

    /*
    |--------------------------------------------------------------------------
    | Title
    |--------------------------------------------------------------------------
    */

    if (titleMain && about.title) {
        titleMain.textContent = about.title.main;
    }

    if (titleHighlight && about.title) {
        titleHighlight.textContent = about.title.highlight;
    }

    /*
    |--------------------------------------------------------------------------
    | Description
    |--------------------------------------------------------------------------
    */

    if (description) {
        description.textContent = about.description;
    }

    /*
|--------------------------------------------------------------------------
| Highlights
|--------------------------------------------------------------------------
*/

    if (highlights && Array.isArray(about.highlights)) {
        highlights.replaceChildren();

        about.highlights.forEach((highlight) => {
            const item = document.createElement("div");

            item.className =
                "rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-sm)]";

            const iconWrapper = document.createElement("div");

            iconWrapper.className =
                "mb-4 flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]";

            const icon = document.createElement("i");

            icon.className = `bi ${highlight.icon || "bi-check-lg"}`;

            icon.setAttribute("aria-hidden", "true");

            iconWrapper.appendChild(icon);

            const text = document.createElement("p");

            text.className = "font-semibold text-[var(--color-text)]";

            text.textContent = highlight.text;

            item.append(iconWrapper, text);

            highlights.appendChild(item);
        });
    }

    /*
    |--------------------------------------------------------------------------
    | Card
    |--------------------------------------------------------------------------
    */

    if (cardLabel && about.card) {
        cardLabel.textContent = about.card.label;
    }

    if (cardTitle && about.card) {
        cardTitle.textContent = about.card.title;
    }

    if (cardDescription && about.card) {
        cardDescription.textContent = about.card.description;
    }

    if (cardIcon && about.card && about.card.icon) {
        cardIcon.className = `bi ${about.card.icon} text-2xl`;
    }
}

/*
|--------------------------------------------------------------------------
| SERVICES CONTENT
|--------------------------------------------------------------------------
*/
function updateServicesContent() {
    const services = content.services;

    if (!services) {
        return;
    }

    /*
    |--------------------------------------------------------------------------
    | Services Elements
    |--------------------------------------------------------------------------
    */

    const eyebrow = document.querySelector("[data-services-eyebrow]");

    const titleMain = document.querySelector("[data-services-title-main]");

    const titleHighlight = document.querySelector("[data-services-title-highlight]");

    const description = document.querySelector("[data-services-description]");

    const grid = document.querySelector("[data-services-grid]");

    /*
    |--------------------------------------------------------------------------
    | Eyebrow
    |--------------------------------------------------------------------------
    */

    if (eyebrow) {
        eyebrow.textContent = services.eyebrow;
    }

    /*
    |--------------------------------------------------------------------------
    | Title
    |--------------------------------------------------------------------------
    */

    if (titleMain && services.title) {
        titleMain.textContent = services.title.main;
    }

    if (titleHighlight && services.title) {
        titleHighlight.textContent = services.title.highlight;
    }

    /*
    |--------------------------------------------------------------------------
    | Description
    |--------------------------------------------------------------------------
    */

    if (description) {
        description.textContent = services.description;
    }

    /*
    |--------------------------------------------------------------------------
    | Service Cards
    |--------------------------------------------------------------------------
    */

    if (grid && Array.isArray(services.items)) {
        grid.replaceChildren();

        services.items.forEach((service) => {
            const card = document.createElement("article");

            card.className =
                "group rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)] sm:p-7";

            /*
                |--------------------------------------------------------------------------
                | Icon
                |--------------------------------------------------------------------------
                */

            const iconWrapper = document.createElement("div");

            iconWrapper.className =
                "mb-6 flex h-12 w-12 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-primary)]/10 text-[var(--color-primary)] transition-colors duration-300 group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-surface)]";

            const icon = document.createElement("i");

            icon.className = `bi ${service.icon || "bi-check-circle"}`;

            icon.setAttribute("aria-hidden", "true");

            iconWrapper.appendChild(icon);

            /*
                |--------------------------------------------------------------------------
                | Title
                |--------------------------------------------------------------------------
                */

            const title = document.createElement("h3");

            title.className = "text-xl font-bold tracking-tight text-[var(--color-text)]";

            title.textContent = service.title;

            /*
                |--------------------------------------------------------------------------
                | Description
                |--------------------------------------------------------------------------
                */

            const text = document.createElement("p");

            text.className = "mt-3 text-base leading-7 text-[var(--color-text-muted)]";

            text.textContent = service.description;

            /*
                |--------------------------------------------------------------------------
                | Arrow
                |--------------------------------------------------------------------------
                */

            const arrow = document.createElement("div");

            arrow.className = "mt-6 flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)]";

            const arrowText = document.createElement("span");

            arrowText.textContent = "Learn More";

            const arrowIcon = document.createElement("i");

            arrowIcon.className = "bi bi-arrow-right transition-transform duration-300 group-hover:translate-x-1";

            arrowIcon.setAttribute("aria-hidden", "true");

            arrow.append(arrowText, arrowIcon);

            /*
                |--------------------------------------------------------------------------
                | Assemble Card
                |--------------------------------------------------------------------------
                */

            card.append(iconWrapper, title, text, arrow);

            grid.appendChild(card);
        });
    }
}
/*
|--------------------------------------------------------------------------
| FEATURES CONTENT
|--------------------------------------------------------------------------
*/
function updateFeaturesContent() {
    const features = content.features;

    if (!features) {
        return;
    }

    /*
    |--------------------------------------------------------------------------
    | Features Elements
    |--------------------------------------------------------------------------
    */

    const eyebrow = document.querySelector("[data-features-eyebrow]");

    const titleMain = document.querySelector("[data-features-title-main]");

    const titleHighlight = document.querySelector("[data-features-title-highlight]");

    const description = document.querySelector("[data-features-description]");

    const grid = document.querySelector("[data-features-grid]");

    /*
    |--------------------------------------------------------------------------
    | Eyebrow
    |--------------------------------------------------------------------------
    */

    if (eyebrow) {
        eyebrow.textContent = features.eyebrow;
    }

    /*
    |--------------------------------------------------------------------------
    | Title
    |--------------------------------------------------------------------------
    */

    if (titleMain && features.title) {
        titleMain.textContent = features.title.main;
    }

    if (titleHighlight && features.title) {
        titleHighlight.textContent = features.title.highlight;
    }

    /*
    |--------------------------------------------------------------------------
    | Description
    |--------------------------------------------------------------------------
    */

    if (description) {
        description.textContent = features.description;
    }

    /*
    |--------------------------------------------------------------------------
    | Feature Cards
    |--------------------------------------------------------------------------
    */

    if (grid && Array.isArray(features.items)) {
        grid.replaceChildren();

        features.items.forEach((feature) => {
            const card = document.createElement("article");

            card.className =
                "group rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)] sm:p-7";

            const iconWrapper = document.createElement("div");

            iconWrapper.className =
                "mb-6 flex h-12 w-12 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-primary)]/10 text-[var(--color-primary)] transition-colors duration-300 group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-surface)]";

            const icon = document.createElement("i");

            icon.className = `bi ${feature.icon || "bi-check-circle"}`;

            icon.setAttribute("aria-hidden", "true");

            iconWrapper.appendChild(icon);

            const title = document.createElement("h3");

            title.className = "text-xl font-bold tracking-tight text-[var(--color-text)]";

            title.textContent = feature.title;

            const text = document.createElement("p");

            text.className = "mt-3 text-base leading-7 text-[var(--color-text-muted)]";

            text.textContent = feature.description;

            card.append(iconWrapper, title, text);

            grid.appendChild(card);
        });
    }
}
/*
|--------------------------------------------------------------------------
| PRODUCT CONTENT
|--------------------------------------------------------------------------
*/
function updateProductsContent() {
    const products = content.products;

    if (!products) {
        return;
    }

    /*
    |--------------------------------------------------------------------------
    | Products Elements
    |--------------------------------------------------------------------------
    */

    const eyebrow = document.querySelector("[data-products-eyebrow]");

    const titleMain = document.querySelector("[data-products-title-main]");

    const titleHighlight = document.querySelector("[data-products-title-highlight]");

    const description = document.querySelector("[data-products-description]");

    const grid = document.querySelector("[data-products-grid]");

    /*
    |--------------------------------------------------------------------------
    | Eyebrow
    |--------------------------------------------------------------------------
    */

    if (eyebrow) {
        eyebrow.textContent = products.eyebrow;
    }

    /*
    |--------------------------------------------------------------------------
    | Title
    |--------------------------------------------------------------------------
    */

    if (titleMain && products.title) {
        titleMain.textContent = products.title.main;
    }

    if (titleHighlight && products.title) {
        titleHighlight.textContent = products.title.highlight;
    }

    /*
    |--------------------------------------------------------------------------
    | Description
    |--------------------------------------------------------------------------
    */

    if (description) {
        description.textContent = products.description;
    }

    /*
    |--------------------------------------------------------------------------
    | Product Cards
    |--------------------------------------------------------------------------
    */

    if (grid && Array.isArray(products.items)) {
        grid.replaceChildren();

        products.items.forEach((product) => {
            const card = document.createElement("article");

            card.className =
                "group overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]";

            /*
                |--------------------------------------------------------------------------
                | Product Image
                |--------------------------------------------------------------------------
                */

            const imageWrapper = document.createElement("div");

            imageWrapper.className =
                "relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[var(--color-surface-soft)]";

            if (product.image) {
                const image = document.createElement("img");

                image.src = product.image;

                image.alt = product.title || "";

                image.className = "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105";

                imageWrapper.appendChild(image);
            } else {
                const placeholder = document.createElement("div");

                placeholder.className = "flex h-full w-full flex-col items-center justify-center";

                const icon = document.createElement("i");

                icon.className = `bi ${product.icon || "bi-image"} text-5xl text-[var(--color-primary)]`;

                icon.setAttribute("aria-hidden", "true");

                const placeholderText = document.createElement("span");

                placeholderText.className = "mt-3 text-sm font-medium text-[var(--color-text-muted)]";

                placeholderText.textContent = "Product Image";

                placeholder.append(icon, placeholderText);

                imageWrapper.appendChild(placeholder);
            }

            /*
                |--------------------------------------------------------------------------
                | Product Content
                |--------------------------------------------------------------------------
                */

            const contentWrapper = document.createElement("div");

            contentWrapper.className = "p-6";

            const title = document.createElement("h3");

            title.className = "text-xl font-bold tracking-tight text-[var(--color-text)]";

            title.textContent = product.title;

            const text = document.createElement("p");

            text.className = "mt-3 text-base leading-7 text-[var(--color-text-muted)]";

            text.textContent = product.description;

            /*
                |--------------------------------------------------------------------------
                | Price
                |--------------------------------------------------------------------------
                */

            const footer = document.createElement("div");

            footer.className = "mt-6 flex items-center justify-between gap-4";

            const price = document.createElement("span");

            price.className = "text-lg font-bold text-[var(--color-primary)]";

            price.textContent = product.price || "";

            const arrow = document.createElement("i");

            arrow.className =
                "bi bi-arrow-right text-lg text-[var(--color-primary)] transition-transform duration-300 group-hover:translate-x-1";

            arrow.setAttribute("aria-hidden", "true");

            footer.append(price, arrow);

            contentWrapper.append(title, text, footer);

            card.append(imageWrapper, contentWrapper);

            grid.appendChild(card);
        });
    }
}
/*
|--------------------------------------------------------------------------
| PRODUCT CONTENT
|--------------------------------------------------------------------------
*/
function updateMenuContent() {
    const menu = content.menu;

    if (!menu) {
        return;
    }

    /*
    |--------------------------------------------------------------------------
    | Menu Elements
    |--------------------------------------------------------------------------
    */

    const eyebrow = document.querySelector("[data-menu-eyebrow]");

    const titleMain = document.querySelector("[data-menu-title-main]");

    const titleHighlight = document.querySelector("[data-menu-title-highlight]");

    const description = document.querySelector("[data-menu-description]");

    const container = document.querySelector("[data-menu-container]");

    /*
    |--------------------------------------------------------------------------
    | Eyebrow
    |--------------------------------------------------------------------------
    */

    if (eyebrow) {
        eyebrow.textContent = menu.eyebrow;
    }

    /*
    |--------------------------------------------------------------------------
    | Title
    |--------------------------------------------------------------------------
    */

    if (titleMain && menu.title) {
        titleMain.textContent = menu.title.main;
    }

    if (titleHighlight && menu.title) {
        titleHighlight.textContent = menu.title.highlight;
    }

    /*
    |--------------------------------------------------------------------------
    | Description
    |--------------------------------------------------------------------------
    */

    if (description) {
        description.textContent = menu.description;
    }

    /*
    |--------------------------------------------------------------------------
    | Menu Categories
    |--------------------------------------------------------------------------
    */

    if (container && Array.isArray(menu.categories)) {
        container.replaceChildren();

        menu.categories.forEach((category) => {
            const categoryWrapper = document.createElement("div");

            categoryWrapper.className =
                "overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)]";

            /*
                |--------------------------------------------------------------------------
                | Category Header
                |--------------------------------------------------------------------------
                */

            const categoryHeader = document.createElement("div");

            categoryHeader.className =
                "border-b border-[var(--color-border)] bg-[var(--color-surface-soft)] px-6 py-5 sm:px-7";

            const categoryTitle = document.createElement("h3");

            categoryTitle.className = "text-xl font-bold tracking-tight text-[var(--color-text)] sm:text-2xl";

            categoryTitle.textContent = category.name;

            categoryHeader.appendChild(categoryTitle);

            /*
                |--------------------------------------------------------------------------
                | Menu Items
                |--------------------------------------------------------------------------
                */

            const itemsWrapper = document.createElement("div");

            itemsWrapper.className = "divide-y divide-[var(--color-border)]";

            if (Array.isArray(category.items)) {
                category.items.forEach((item) => {
                    const menuItem = document.createElement("div");

                    menuItem.className =
                        "flex items-start justify-between gap-6 px-6 py-5 transition-colors duration-300 hover:bg-[var(--color-surface-soft)] sm:px-7";

                    /*
                            |--------------------------------------------------------------------------
                            | Item Information
                            |--------------------------------------------------------------------------
                            */

                    const itemInfo = document.createElement("div");

                    itemInfo.className = "min-w-0";

                    const itemName = document.createElement("h4");

                    itemName.className = "font-semibold text-[var(--color-text)]";

                    itemName.textContent = item.name;

                    const itemDescription = document.createElement("p");

                    itemDescription.className = "mt-1 max-w-2xl text-sm leading-6 text-[var(--color-text-muted)]";

                    itemDescription.textContent = item.description || "";

                    itemInfo.append(itemName, itemDescription);

                    /*
                            |--------------------------------------------------------------------------
                            | Price
                            |--------------------------------------------------------------------------
                            */

                    const price = document.createElement("span");

                    price.className = "shrink-0 font-bold text-[var(--color-primary)]";

                    price.textContent = item.price || "";

                    menuItem.append(itemInfo, price);

                    itemsWrapper.appendChild(menuItem);
                });
            }

            categoryWrapper.append(categoryHeader, itemsWrapper);

            container.appendChild(categoryWrapper);
        });
    }
}
/*
|--------------------------------------------------------------------------
| START WEBSITE
|--------------------------------------------------------------------------
*/

renderWebsite();
