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
| START WEBSITE
|--------------------------------------------------------------------------
*/

renderWebsite();
