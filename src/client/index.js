import * as tools from './tools.js';

(function() {
    function getData() {
        return {
            userAgent: navigator.userAgent,
            appVersion: navigator.appVersion,
            language: navigator.language,
            languages: navigator.languages,
            doNotTrack: navigator.doNotTrack || navigator.msDoNotTrack || window.doNotTrack || 'unknown',
            cookiesEnabled: navigator.cookieEnabled,
            online: navigator.onLine,
            referrer: document.referrer,
            plugins: tools.getPluginsInfo(),
            mimeTypes: tools.getMimeTypesInfo(),

            screen: {
                width: screen.width,
                height: screen.height,
                availWidth: screen.availWidth,
                availHeight: screen.availHeight,
                colorDepth: screen.colorDepth,
                devicePixelRatio: window.devicePixelRatio,
            },
            graphics: tools.getGraphicsInfo(),

            platform: navigator.platform,
            hardwareConcurrency: navigator.hardwareConcurrency,
            deviceMemory: navigator.deviceMemory || 'unknown',
            touchCapabilities: tools.getTouchCapabilities(),

            network: tools.getNetworkInfo(),
            // webRTCLocalIPs: tools.getWebRTCLocalIPs(),

            mediaDevices: navigator.mediaDevices ? 'Available' : 'Not available',
            mediaCapabilities: tools.getMediaCapabilities(),
            // audioFingerprint: tools.getAudioFingerprint(),

            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,

            fonts: tools.getFontsInfo(),
        }
    }

    fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(getData()),
    });
})();
