/**
 * @file popup js file
 */
import { CORE_APPS, EXTRA_APPS } from './apps.js';

/** chrome.storage.local 中存储排序数组的键名 */
const STORAGE_KEYS = {
    coreApps: 'coreAppsOrder',
    extraApps: 'extraAppsOrder',
};

/** core-apps 区域最多允许容纳的应用数量 */
const CORE_MAX = 9;

/**
 * 从 chrome.storage.local 读取两个区域的排序，联合计算并返回最终的应用列表。
 *
 * 关键原则：两个容器必须作为整体处理。
 * - 从 core 拖到 extra 的 app，在 CORE_APPS 中仍然存在，但不能被误判为"新 app"追加回 core。
 * - 只有「两个容器的存储都不包含」的 app，才视为 apps.js 新增的 app，追加到 extra 末尾。
 * - 若存储中有已删除 app 的 id，自动忽略。
 * - 若存储为空（首次使用），使用 CORE_APPS / EXTRA_APPS 默认值。
 *
 * @returns {Promise<{coreApps: Array, extraApps: Array}>}
 */
async function loadOrderedApps() {
    const result = await chrome.storage.local.get([STORAGE_KEYS.coreApps, STORAGE_KEYS.extraApps]);
    const coreOrder = result[STORAGE_KEYS.coreApps];
    const extraOrder = result[STORAGE_KEYS.extraApps];

    // 首次使用，没有任何存储数据，直接返回默认值
    if (!coreOrder && !extraOrder) {
        return { coreApps: CORE_APPS, extraApps: EXTRA_APPS };
    }

    // 全量 app 索引，用于快速查找和过滤已删除的 id
    const ALL_APPS = [...CORE_APPS, ...EXTRA_APPS];
    const appMap = new Map(ALL_APPS.map(app => [app.id, app]));
    const allIds = new Set(appMap.keys());

    // 两个容器中已被跟踪的 id（用于识别 apps.js 新增的 app）
    const trackedIds = new Set([...(coreOrder || []), ...(extraOrder || [])]);

    // 按存储顺序还原，过滤掉 apps.js 中已删除的 id
    const coreApps = (coreOrder || [])
        .filter(id => allIds.has(id))
        .map(id => appMap.get(id));

    // apps.js 中新增但两个容器都未跟踪的 app，追加到 extra 末尾
    const newApps = ALL_APPS.filter(app => !trackedIds.has(app.id));
    const extraApps = [
        ...(extraOrder || []).filter(id => allIds.has(id)).map(id => appMap.get(id)),
        ...newApps,
    ];

    return { coreApps, extraApps };
}

/**
 * 读取两个容器当前的 DOM 顺序，将 id 数组持久化到 chrome.storage.local。
 * 拖拽完成后调用，保证下次打开 popup 时排序不变。
 *
 * @param {HTMLElement} coreContainer - .core-apps 容器元素
 * @param {HTMLElement} extraContainer - .extra-apps 容器元素
 */
async function saveBothOrders(coreContainer, extraContainer) {
    const coreOrder = [...coreContainer.querySelectorAll('.app-item')].map(el => el.dataset.id);
    const extraOrder = [...extraContainer.querySelectorAll('.app-item')].map(el => el.dataset.id);
    await chrome.storage.local.set({
        [STORAGE_KEYS.coreApps]: coreOrder,
        [STORAGE_KEYS.extraApps]: extraOrder,
    });
}

/**
 * 将应用列表渲染为 HTML 并写入容器。
 * 每个 app 渲染为一个带 data-id 属性的 <li>，供 SortableJS 识别顺序。
 *
 * @param {Array} apps - 应用列表（含 id、href、text、position）
 * @param {HTMLElement} container - 目标容器元素
 */
function renderApps(apps, container) {
    container.innerHTML = apps.map(({ id, href, text, position }) => `
        <li class="app-item" data-id="${id}">
            <a target="_blank" href="${href}" class="app-btn">
                <span class="app-icon" style="background-position: ${position};"></span>
                <span class="app-text">${text}</span>
            </a>
        </li>
    `).join('');
}

/**
 * 初始化两个区域的 SortableJS 拖拽排序，支持跨容器拖拽。
 *
 * 核心约束：core-apps 最多容纳 CORE_MAX 个应用。
 * 实现方式：
 *   - 当 extra item 进入 full core 时（onMove），预先将 core 末位 item 踢到
 *     extra 头部（displacedItem），保证 core 在拖拽预览阶段始终不超过 CORE_MAX。
 *   - 当 item 从 core 返回 extra 时（extraContainer.onMove），立即还原 displacedItem。
 *   - 当拖拽结束时（extraContainer.onEnd），兜底处理 displacedItem 并保存排序。
 *
 * @param {HTMLElement} coreContainer - .core-apps 容器元素
 * @param {HTMLElement} extraContainer - .extra-apps 容器元素
 */
function initSortable(coreContainer, extraContainer) {
    const save = () => saveBothOrders(coreContainer, extraContainer);

    // 记录被预先踢出 core 的 item，用于取消拖拽时恢复原位
    let displacedItem = null;

    // core 内部排序：无需特殊处理，拖拽起源为 core 时 onMove 才会在这里触发
    Sortable.create(coreContainer, {
        group: 'apps',
        animation: 150,
        onEnd: save,
    });

    // extra 排序 + 跨容器逻辑：
    // SortableJS 的 onMove 始终在「拖拽起源」的 Sortable 上触发，
    // 因此从 extra 发起的所有拖拽（包括跨容器进入 core）都在这里处理
    Sortable.create(extraContainer, {
        group: 'apps',
        animation: 150,
        onMove(evt) {
            if (evt.to === coreContainer) {
                // 拖拽元素即将进入 core（尚未插入）
                // evt.dragged.parentElement !== coreContainer 排除 core 内部移位的情况
                if (evt.dragged.parentElement !== coreContainer && !displacedItem) {
                    const items = coreContainer.querySelectorAll('.app-item');
                    if (items.length >= CORE_MAX) {
                        // core 已满：踢出末位 item 腾位，SortableJS 随后插入拖拽元素
                        displacedItem = items[items.length - 1];
                        extraContainer.insertBefore(displacedItem, extraContainer.firstChild);
                    }
                }
            } else if (evt.to === extraContainer) {
                // 拖拽元素正从 core 移回 extra（$.parentElement 仍为 core）
                if (evt.dragged.parentElement === coreContainer && displacedItem) {
                    coreContainer.appendChild(displacedItem);
                    displacedItem = null;
                }
            }
        },
        onEnd(evt) {
            if (displacedItem) {
                // 兜底：若拖拽最终落回 extra，还原 displacedItem 到 core 末尾
                if (evt.to !== coreContainer) {
                    coreContainer.appendChild(displacedItem);
                }
                displacedItem = null;
            }
            save();
        },
    });
}

/**
 * 页面初始化入口：读取存储中的排序 → 渲染应用列表 → 初始化拖拽。
 */
async function init() {
    const coreContainer = document.querySelector('.core-apps');
    const extraContainer = document.querySelector('.extra-apps');

    const { coreApps, extraApps } = await loadOrderedApps();

    renderApps(coreApps, coreContainer);
    renderApps(extraApps, extraContainer);

    initSortable(coreContainer, extraContainer);
}

document.addEventListener('DOMContentLoaded', init);
