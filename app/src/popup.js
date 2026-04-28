/**
 * @file popup js file
 */
import { CORE_APPS, EXTRA_APPS } from './apps.js';

function renderApps(apps) {
    return apps.map(({ href, text, position }) => `
        <li class="app-item">
            <a target="_blank" href="${href}" class="app-btn">
                <span class="app-icon" style="background-position: ${position};"></span>
                <span class="app-text">${text}</span>
            </a>
        </li>
    `).join('');
}

document.querySelector('.core-apps').innerHTML = renderApps(CORE_APPS);
document.querySelector('.extra-apps').innerHTML = renderApps(EXTRA_APPS);
