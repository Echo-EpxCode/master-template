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
    updatePortfolioContent();
    updateProcessContent();
    updateTeamContent();
    updateStatisticsContent();
    updateGalleryContent();
    updateVideoContent();
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
| MENU CONTENT
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
| PORTFOLIO CONTENT
|--------------------------------------------------------------------------
*/
function updatePortfolioContent() {
    const portfolio = content.portfolio;

    if (!portfolio) {
        return;
    }

    /*
    |--------------------------------------------------------------------------
    | Portfolio Elements
    |--------------------------------------------------------------------------
    */

    const eyebrow = document.querySelector("[data-portfolio-eyebrow]");

    const titleMain = document.querySelector("[data-portfolio-title-main]");

    const titleHighlight = document.querySelector("[data-portfolio-title-highlight]");

    const description = document.querySelector("[data-portfolio-description]");

    const grid = document.querySelector("[data-portfolio-grid]");

    /*
    |--------------------------------------------------------------------------
    | Eyebrow
    |--------------------------------------------------------------------------
    */

    if (eyebrow) {
        eyebrow.textContent = portfolio.eyebrow;
    }

    /*
    |--------------------------------------------------------------------------
    | Title
    |--------------------------------------------------------------------------
    */

    if (titleMain && portfolio.title) {
        titleMain.textContent = portfolio.title.main;
    }

    if (titleHighlight && portfolio.title) {
        titleHighlight.textContent = portfolio.title.highlight;
    }

    /*
    |--------------------------------------------------------------------------
    | Description
    |--------------------------------------------------------------------------
    */

    if (description) {
        description.textContent = portfolio.description;
    }

    /*
    |--------------------------------------------------------------------------
    | Portfolio Cards
    |--------------------------------------------------------------------------
    */

    if (grid && Array.isArray(portfolio.items)) {
        grid.replaceChildren();

        portfolio.items.forEach((project) => {
            const card = document.createElement("article");

            card.className =
                "group overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]";

            /*
                |--------------------------------------------------------------------------
                | Project Image
                |--------------------------------------------------------------------------
                */

            const imageWrapper = document.createElement("div");

            imageWrapper.className =
                "relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-[var(--color-surface-soft)]";

            if (project.image) {
                const image = document.createElement("img");

                image.src = project.image;

                image.alt = project.title || "";

                image.className = "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105";

                imageWrapper.appendChild(image);
            } else {
                const placeholder = document.createElement("div");

                placeholder.className = "flex h-full w-full flex-col items-center justify-center";

                const icon = document.createElement("i");

                icon.className = "bi bi-image text-5xl text-[var(--color-primary)]";

                icon.setAttribute("aria-hidden", "true");

                const placeholderText = document.createElement("span");

                placeholderText.className = "mt-3 text-sm font-medium text-[var(--color-text-muted)]";

                placeholderText.textContent = "Project Image";

                placeholder.append(icon, placeholderText);

                imageWrapper.appendChild(placeholder);
            }

            /*
                |--------------------------------------------------------------------------
                | Project Content
                |--------------------------------------------------------------------------
                */

            const contentWrapper = document.createElement("div");

            contentWrapper.className = "p-6";

            /*
                |--------------------------------------------------------------------------
                | Category
                |--------------------------------------------------------------------------
                */

            const category = document.createElement("p");

            category.className = "text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-primary)]";

            category.textContent = project.category || "";

            /*
                |--------------------------------------------------------------------------
                | Title
                |--------------------------------------------------------------------------
                */

            const title = document.createElement("h3");

            title.className = "mt-2 text-xl font-bold tracking-tight text-[var(--color-text)]";

            title.textContent = project.title;

            /*
                |--------------------------------------------------------------------------
                | Description
                |--------------------------------------------------------------------------
                */

            const text = document.createElement("p");

            text.className = "mt-3 text-base leading-7 text-[var(--color-text-muted)]";

            text.textContent = project.description || "";

            /*
                |--------------------------------------------------------------------------
                | Project Link
                |--------------------------------------------------------------------------
                */

            const link = document.createElement("a");

            link.href = project.link || "#";

            link.className = "mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)]";

            link.textContent = "View Project";

            const arrow = document.createElement("i");

            arrow.className = "bi bi-arrow-right transition-transform duration-300 group-hover:translate-x-1";

            arrow.setAttribute("aria-hidden", "true");

            link.appendChild(arrow);

            contentWrapper.append(category, title, text, link);

            card.append(imageWrapper, contentWrapper);

            grid.appendChild(card);
        });
    }
}
/*
|--------------------------------------------------------------------------
| PROCESS CONTENT
|--------------------------------------------------------------------------
*/
function updateProcessContent() {
    const process = content.process;

    if (!process) {
        return;
    }

    /*
    |--------------------------------------------------------------------------
    | Process Elements
    |--------------------------------------------------------------------------
    */

    const eyebrow = document.querySelector("[data-process-eyebrow]");

    const titleMain = document.querySelector("[data-process-title-main]");

    const titleHighlight = document.querySelector("[data-process-title-highlight]");

    const description = document.querySelector("[data-process-description]");

    const grid = document.querySelector("[data-process-grid]");

    /*
    |--------------------------------------------------------------------------
    | Eyebrow
    |--------------------------------------------------------------------------
    */

    if (eyebrow) {
        eyebrow.textContent = process.eyebrow;
    }

    /*
    |--------------------------------------------------------------------------
    | Title
    |--------------------------------------------------------------------------
    */

    if (titleMain && process.title) {
        titleMain.textContent = process.title.main;
    }

    if (titleHighlight && process.title) {
        titleHighlight.textContent = process.title.highlight;
    }

    /*
    |--------------------------------------------------------------------------
    | Description
    |--------------------------------------------------------------------------
    */

    if (description) {
        description.textContent = process.description;
    }

    /*
    |--------------------------------------------------------------------------
    | Process Steps
    |--------------------------------------------------------------------------
    */

    if (grid && Array.isArray(process.steps)) {
        grid.replaceChildren();

        const stepsWrapper = document.createElement("div");

        stepsWrapper.className = "grid gap-8 md:grid-cols-2 lg:grid-cols-4";

        process.steps.forEach((step, index) => {
            const card = document.createElement("article");

            card.className = "group relative";

            /*
                |--------------------------------------------------------------------------
                | Connector
                |--------------------------------------------------------------------------
                */

            if (index < process.steps.length - 1) {
                const connector = document.createElement("div");

                connector.className =
                    "absolute left-[calc(50%+3rem)] right-[calc(-50%+3rem)] top-7 hidden h-px bg-[var(--color-border)] lg:block";

                connector.setAttribute("aria-hidden", "true");

                card.appendChild(connector);
            }

            /*
                |--------------------------------------------------------------------------
                | Number + Icon
                |--------------------------------------------------------------------------
                */

            const visual = document.createElement("div");

            visual.className =
                "relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] transition-all duration-300 group-hover:border-[var(--color-primary)] group-hover:bg-[var(--color-primary)]";

            const icon = document.createElement("i");

            icon.className = `bi ${step.icon || "bi-check-circle"} text-2xl text-[var(--color-primary)] transition-colors duration-300 group-hover:text-[var(--color-surface)]`;

            icon.setAttribute("aria-hidden", "true");

            visual.appendChild(icon);

            /*
                |--------------------------------------------------------------------------
                | Step Number
                |--------------------------------------------------------------------------
                */

            const number = document.createElement("span");

            number.className =
                "absolute -right-2 -top-2 flex h-7 min-w-7 items-center justify-center rounded-full bg-[var(--color-primary)] px-1.5 text-xs font-bold text-[var(--color-surface)]";

            number.textContent = step.number || String(index + 1).padStart(2, "0");

            visual.appendChild(number);

            /*
                |--------------------------------------------------------------------------
                | Content
                |--------------------------------------------------------------------------
                */

            const title = document.createElement("h3");

            title.className = "mt-6 text-center text-xl font-bold tracking-tight text-[var(--color-text)]";

            title.textContent = step.title;

            const text = document.createElement("p");

            text.className = "mx-auto mt-3 max-w-xs text-center text-base leading-7 text-[var(--color-text-muted)]";

            text.textContent = step.description;

            card.append(visual, title, text);

            stepsWrapper.appendChild(card);
        });

        grid.appendChild(stepsWrapper);
    }
}
/*
|--------------------------------------------------------------------------
| TEAM CONTENT
|--------------------------------------------------------------------------
*/
function updateTeamContent() {
    const team = content.team;

    if (!team) {
        return;
    }

    /*
    |--------------------------------------------------------------------------
    | Team Elements
    |--------------------------------------------------------------------------
    */

    const eyebrow = document.querySelector("[data-team-eyebrow]");

    const titleMain = document.querySelector("[data-team-title-main]");

    const titleHighlight = document.querySelector("[data-team-title-highlight]");

    const description = document.querySelector("[data-team-description]");

    const grid = document.querySelector("[data-team-grid]");

    /*
    |--------------------------------------------------------------------------
    | Eyebrow
    |--------------------------------------------------------------------------
    */

    if (eyebrow) {
        eyebrow.textContent = team.eyebrow;
    }

    /*
    |--------------------------------------------------------------------------
    | Title
    |--------------------------------------------------------------------------
    */

    if (titleMain && team.title) {
        titleMain.textContent = team.title.main;
    }

    if (titleHighlight && team.title) {
        titleHighlight.textContent = team.title.highlight;
    }

    /*
    |--------------------------------------------------------------------------
    | Description
    |--------------------------------------------------------------------------
    */

    if (description) {
        description.textContent = team.description;
    }

    /*
    |--------------------------------------------------------------------------
    | Team Members
    |--------------------------------------------------------------------------
    */

    if (grid && Array.isArray(team.members)) {
        grid.replaceChildren();

        team.members.forEach((member) => {
            const card = document.createElement("article");

            card.className =
                "group overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]";

            /*
                |--------------------------------------------------------------------------
                | Member Image
                |--------------------------------------------------------------------------
                */

            const imageWrapper = document.createElement("div");

            imageWrapper.className =
                "relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[var(--color-surface-soft)]";

            if (member.image) {
                const image = document.createElement("img");

                image.src = member.image;

                image.alt = member.name || "";

                image.className = "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105";

                imageWrapper.appendChild(image);
            } else {
                const placeholder = document.createElement("div");

                placeholder.className = "flex h-full w-full flex-col items-center justify-center";

                const icon = document.createElement("i");

                icon.className = "bi bi-person text-6xl text-[var(--color-primary)]";

                icon.setAttribute("aria-hidden", "true");

                const placeholderText = document.createElement("span");

                placeholderText.className = "mt-3 text-sm font-medium text-[var(--color-text-muted)]";

                placeholderText.textContent = "Team Photo";

                placeholder.append(icon, placeholderText);

                imageWrapper.appendChild(placeholder);
            }

            /*
                |--------------------------------------------------------------------------
                | Member Content
                |--------------------------------------------------------------------------
                */

            const contentWrapper = document.createElement("div");

            contentWrapper.className = "p-6 text-center";

            const name = document.createElement("h3");

            name.className = "text-xl font-bold tracking-tight text-[var(--color-text)]";

            name.textContent = member.name;

            const role = document.createElement("p");

            role.className = "mt-1 text-sm font-semibold text-[var(--color-primary)]";

            role.textContent = member.role;

            const text = document.createElement("p");

            text.className = "mt-4 text-base leading-7 text-[var(--color-text-muted)]";

            text.textContent = member.description || "";

            /*
                |--------------------------------------------------------------------------
                | Social Links
                |--------------------------------------------------------------------------
                */

            const social = document.createElement("div");

            social.className = "mt-5 flex items-center justify-center gap-2";

            const socialLinks = [
                {
                    key: "facebook",
                    icon: "bi-facebook",
                    label: "Facebook",
                },
                {
                    key: "instagram",
                    icon: "bi-instagram",
                    label: "Instagram",
                },
                {
                    key: "linkedin",
                    icon: "bi-linkedin",
                    label: "LinkedIn",
                },
            ];

            socialLinks.forEach((socialItem) => {
                const url = member.social?.[socialItem.key];

                if (!url) {
                    return;
                }

                const link = document.createElement("a");

                link.href = url;

                link.className =
                    "flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] transition-all duration-300 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-surface)]";

                link.setAttribute("aria-label", socialItem.label);

                const icon = document.createElement("i");

                icon.className = `bi ${socialItem.icon}`;

                icon.setAttribute("aria-hidden", "true");

                link.appendChild(icon);

                social.appendChild(link);
            });

            contentWrapper.append(name, role, text, social);

            card.append(imageWrapper, contentWrapper);

            grid.appendChild(card);
        });
    }
}
/*
|--------------------------------------------------------------------------
| STATISTIC CONTENT
|--------------------------------------------------------------------------
*/
function updateStatisticsContent() {
    const statistics = content.statistics;

    if (!statistics) {
        return;
    }

    const eyebrow = document.querySelector("[data-statistics-eyebrow]");

    const titleMain = document.querySelector("[data-statistics-title-main]");

    const titleHighlight = document.querySelector("[data-statistics-title-highlight]");

    const description = document.querySelector("[data-statistics-description]");

    const grid = document.querySelector("[data-statistics-grid]");

    if (eyebrow) {
        eyebrow.textContent = statistics.eyebrow;
    }

    if (titleMain && statistics.title) {
        titleMain.textContent = statistics.title.main;
    }

    if (titleHighlight && statistics.title) {
        titleHighlight.textContent = statistics.title.highlight;
    }

    if (description) {
        description.textContent = statistics.description;
    }

    if (!grid || !Array.isArray(statistics.items)) {
        return;
    }

    grid.replaceChildren();

    statistics.items.forEach((item) => {
        const card = document.createElement("article");

        card.className =
            "rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 text-center shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)] sm:p-6";

        const iconWrapper = document.createElement("div");

        iconWrapper.className =
            "mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]";

        const icon = document.createElement("i");

        icon.className = `bi ${item.icon || "bi-bar-chart"}`;

        icon.setAttribute("aria-hidden", "true");

        iconWrapper.appendChild(icon);

        const value = document.createElement("p");

        value.className = "text-3xl font-bold tracking-tight text-[var(--color-primary)] sm:text-4xl";

        value.textContent = item.value;

        const label = document.createElement("p");

        label.className = "mt-2 text-sm font-medium leading-6 text-[var(--color-text-muted)]";

        label.textContent = item.label;

        card.append(iconWrapper, value, label);

        grid.appendChild(card);
    });
}
/*
|--------------------------------------------------------------------------
| GALLERY CONTENT
|--------------------------------------------------------------------------
*/
function updateGalleryContent() {
    const gallery = content.gallery;

    if (!gallery) {
        return;
    }

    const eyebrow = document.querySelector("[data-gallery-eyebrow]");

    const titleMain = document.querySelector("[data-gallery-title-main]");

    const titleHighlight = document.querySelector("[data-gallery-title-highlight]");

    const description = document.querySelector("[data-gallery-description]");

    const grid = document.querySelector("[data-gallery-grid]");

    if (eyebrow) {
        eyebrow.textContent = gallery.eyebrow || "";
    }

    if (titleMain && gallery.title) {
        titleMain.textContent = gallery.title.main || "";
    }

    if (titleHighlight && gallery.title) {
        titleHighlight.textContent = gallery.title.highlight || "";
    }

    if (description) {
        description.textContent = gallery.description || "";
    }

    if (!grid || !Array.isArray(gallery.items)) {
        return;
    }

    grid.replaceChildren();

    gallery.items.forEach((item) => {
        const card = document.createElement("figure");

        card.className =
            "group relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)]";

        if (item.image) {
            const image = document.createElement("img");

            image.src = item.image;
            image.alt = item.alt || item.caption || "";
            image.loading = "lazy";
            image.decoding = "async";

            image.className =
                "aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105";

            image.addEventListener(
                "error",
                () => {
                    image.removeAttribute("src");
                    image.alt = "Image unavailable";
                    image.className = "aspect-[4/5] w-full bg-[var(--color-surface-soft)] object-contain";
                },
                { once: true },
            );

            card.appendChild(image);
        } else {
            const placeholder = document.createElement("div");

            placeholder.className =
                "flex aspect-[4/5] items-center justify-center bg-[var(--color-surface-soft)] text-sm text-[var(--color-text-muted)]";

            placeholder.textContent = "Add an image path";

            card.appendChild(placeholder);
        }

        if (item.caption) {
            const caption = document.createElement("figcaption");

            caption.className = "px-3 py-3 text-sm font-medium text-[var(--color-text)] sm:px-4";

            caption.textContent = item.caption;

            card.appendChild(caption);
        }

        grid.appendChild(card);
    });
}
/*
|--------------------------------------------------------------------------
| VIDEO CONTENT
|--------------------------------------------------------------------------
*/
function updateVideoContent() {
    const video = content.video;

    if (!video) {
        return;
    }

    const eyebrow = document.querySelector("[data-video-eyebrow]");

    const titleMain = document.querySelector("[data-video-title-main]");

    const titleHighlight = document.querySelector("[data-video-title-highlight]");

    const description = document.querySelector("[data-video-description]");

    const container = document.querySelector("[data-video-container]");

    const caption = document.querySelector("[data-video-caption]");

    const captionDescription = document.querySelector("[data-video-caption-description]");

    if (eyebrow) {
        eyebrow.textContent = video.eyebrow || "";
    }

    if (titleMain && video.title) {
        titleMain.textContent = video.title.main || "";
    }

    if (titleHighlight && video.title) {
        titleHighlight.textContent = video.title.highlight || "";
    }

    if (description) {
        description.textContent = video.description || "";
    }

    if (caption) {
        caption.textContent = video.caption || "";
    }

    if (captionDescription) {
        captionDescription.textContent = video.captionDescription || "";
    }

    if (!container) {
        return;
    }

    container.replaceChildren();

    const embedUrl = video.embedUrl || "";

    const isAllowedYouTubeEmbed =
        /^https:\/\/www\.youtube-nocookie\.com\/embed\/[a-zA-Z0-9_-]+(?:\?[a-zA-Z0-9_=&%-]*)?$/.test(embedUrl);

    if (!isAllowedYouTubeEmbed) {
        const placeholder = document.createElement("div");

        placeholder.className =
            "flex h-full min-h-48 items-center justify-center px-6 text-center text-sm text-[var(--color-text-muted)]";

        placeholder.textContent = "Add a valid YouTube video embed URL in config/content.js.";

        container.appendChild(placeholder);

        return;
    }

    const iframe = document.createElement("iframe");

    iframe.src = embedUrl;
    iframe.title = video.caption || "Business video";
    iframe.loading = "lazy";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;

    iframe.className = "h-full w-full border-0";

    container.appendChild(iframe);
}
/*
|--------------------------------------------------------------------------
| TESTIMONIAL CONTENT
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| REVIEW CONTENT
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| RATINGS CONTENT
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| SOCIAL PROOF CONTENT
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| CTA CONTENT
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| SOCIAL CTA CONTENT
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| CONTACT CONTENT
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| BOOKING CONTENT
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| LOCATION CONTENT
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| FINAL CTA CONTENT
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| FOOTER CONTENT
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| START WEBSITE
|--------------------------------------------------------------------------
*/

renderWebsite();
