import site from "../../config/site.js";
import sections from "../../config/sections.js";
import content from "../../config/content.js";

const app = document.querySelector("#app");

async function loadSection(name) {
    const response = await fetch(`./src/sections/${name}.html`);

    if (!response.ok) {
        throw new Error(`Failed to load section: ${name}`);
    }

    return response.text();
}

async function renderWebsite() {
    if (!app) {
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

function updateSiteInformation() {
    document.title = site.name;

    const siteNameElements = document.querySelectorAll("[data-site-name]");

    siteNameElements.forEach((element) => {
        element.textContent = site.name;
    });
}

function updateContent() {
    updateHeroContent();
}

function updateHeroContent() {
    if (!content.hero) {
        return;
    }

    const hero = content.hero;

    const eyebrow = document.querySelector("[data-hero-eyebrow]");

    const titleMain = document.querySelector("[data-hero-title-main]");

    const titleHighlight = document.querySelector("[data-hero-title-highlight]");

    const description = document.querySelector("[data-hero-description]");

    const primaryAction = document.querySelector("[data-hero-primary-action]");

    const primaryLabel = document.querySelector("[data-hero-primary-label]");

    const secondaryAction = document.querySelector("[data-hero-secondary-action]");

    const secondaryLabel = document.querySelector("[data-hero-secondary-label]");

    if (eyebrow) {
        eyebrow.textContent = hero.eyebrow;
    }

    if (titleMain) {
        titleMain.textContent = hero.title.main;
    }

    if (titleHighlight) {
        titleHighlight.textContent = hero.title.highlight;
    }

    if (description) {
        description.textContent = hero.description;
    }

    if (primaryAction) {
        primaryAction.href = hero.primaryAction.href;
    }

    if (primaryLabel) {
        primaryLabel.textContent = hero.primaryAction.label;
    }

    if (secondaryAction) {
        secondaryAction.href = hero.secondaryAction.href;
    }

    if (secondaryLabel) {
        secondaryLabel.textContent = hero.secondaryAction.label;
    }
}

renderWebsite();
