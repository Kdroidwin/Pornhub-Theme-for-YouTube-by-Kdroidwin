// ==UserScript==
// @name         Pornhub-Theme-for-YouTube-by-Kdroidwin
// @version      1.0
// @description  Pornhub風に
// @author       Kdroidwin
// @license      GPL-3.0 license
// @match        https://www.youtube.com/*
// @grant        none
// @namespace https://greasyfork.org/users/1344730
// @downloadURL https://update.greasyfork.org/scripts/542961/Pornhub-Theme-for-YouTube-by-Kdroidwin.user.js
// @updateURL https://update.greasyfork.org/scripts/542961/Pornhub-Theme-for-YouTube-by-Kdroidwin.meta.js
// ==/UserScript==

(function () {
    'use strict';

    window.addEventListener('load', () => {
        const observer = new MutationObserver(() => {
            const logoIcon = document.querySelector("ytd-logo yt-icon");
            const signInBtn = document.querySelector("a[href^='https://accounts.google.com']");
            const uploadButton = document.querySelector("ytd-button-renderer[button-renderer][target-id='upload-icon'] yt-icon");

            if (!logoIcon || signInBtn) return;

            if (!logoIcon.dataset.phLogoInjected) {
                // Replace logo with Pornhub logo
                logoIcon.innerHTML = '';
                const img = document.createElement('img');
                img.src = 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Pornhub-logo.svg';
                img.alt = 'Pornhub';
                img.style.height = '24px';
                img.style.width = 'auto';
                img.style.objectFit = 'contain';
                logoIcon.appendChild(img);
                logoIcon.dataset.phLogoInjected = 'true';
            }

            // Replace upload icon with gray camera
            if (uploadButton && !uploadButton.dataset.phCameraReplaced) {
                uploadButton.innerHTML = `
                    <svg viewBox="0 0 24 24" height="24" width="24" fill="#aaa">
                        <path d="M10 8v8l6-4-6-4zm12-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/>
                    </svg>
                `;
                uploadButton.dataset.phCameraReplaced = 'true';
            }

            applyPornhubStyles();
            observer.disconnect();
        });

        observer.observe(document.body, { childList: true, subtree: true });

        function applyPornhubStyles() {
            const style = document.createElement('style');
            style.textContent = `
                /* General dark theme */
                body, ytd-app {
                    background-color: #111 !important;
                    color: #eee !important;
                }

                ytd-masthead, #container.ytd-masthead {
                    background-color: #000 !important;
                    border-bottom: none !important;
                }

                #search-input, input, textarea {
                    background-color: #222 !important;
                    color: #fff !important;
                }

                a#video-title {
                    color: #ff9900 !important;
                }

                ytd-thumbnail:hover {
                    filter: brightness(1.2);
                }

                paper-button, ytd-button-renderer {
                    background-color: #ff9900 !important;
                    color: #000 !important;
                }

                /* Video player progress bar */
                .ytp-play-progress,
                .ytp-swatch-background-color,
                .ytp-load-progress,
                .ytp-progress-bar,
                .ytp-buffered,
                .ytp-progress-linear-live-buffer {
                    background-color: #ff9900 !important;
                }

                .ytp-play-button svg path {
                    fill: #ff9900 !important;
                }

                .ytp-chrome-bottom,
                .ytp-chrome-top {
                    background: #000 !important;
                }

                .html5-video-player {
                    background-color: #000 !important;
                }
            `;
            document.head.appendChild(style);
        }
    });
})();
