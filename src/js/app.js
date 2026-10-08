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
| START WEBSITE
|--------------------------------------------------------------------------
*/

renderWebsite();
