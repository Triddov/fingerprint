(function() {
    function getData() {
        function getIP() {
            const timeout = 6000;
            const controller = new AbortController();
            const signal = controller.signal;

            const timeoutId = setTimeout(() => controller.abort(), timeout);

            return fetch('https://api.ipify.org?format=json', { signal })
                .then(response => response.json())
                .then(data => {
                    clearTimeout(timeoutId);
                    return fetch(`https://ipinfo.io/${data.ip}/json`);
                })
                .then(response => response.json())
                .then(info => {
                    return {
                        ipAddress: info.ip,
                        city: info.city,
                        country: info.country,
                        provider: info.org
                    };
                })
                .catch(err => {
                    clearTimeout(timeoutId);
                    return { ipAddress: null, city: null, country: null, provider: null };
                });
        }

        function getGraphicsInfo() {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

            if (gl) {
                const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                if (debugInfo) {
                    const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
                    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                    return { vendor, renderer };
                }
            }
            return { vendor: 'unknown', renderer: 'unknown' };
        }

        return getIP().then(ipData => {
            const graphicsInfo = getGraphicsInfo();
            return {
                ...ipData,
                userAgent: navigator.userAgent,
                language: navigator.language,
                languages: navigator.languages,
                screen: { width: screen.width, height: screen.height },
                availScreen: { width: screen.availWidth, height: screen.availHeight },
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                platform: navigator.platform,
                appVersion: navigator.appVersion,
                hardwareConcurrency: navigator.hardwareConcurrency,
                memory: navigator.deviceMemory || 'unknown',
                colorDepth: screen.colorDepth,
                devicePixelRatio: window.devicePixelRatio,
                online: navigator.onLine,
                cookiesEnabled: navigator.cookieEnabled,
                touchSupport: 'ontouchstart' in window,
                referrer: document.referrer,
                fonts: (function() {
                    const fontList = ['Arial', 'Verdana', 'Courier New', 'Times New Roman', 'Georgia'];
                    const detectedFonts = [];
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    fontList.forEach(font => {
                        context.font = `20px ${font}, sans-serif`;
                        if (context.measureText('test').width !== 0) {
                            detectedFonts.push(font);
                        }
                    });
                    return detectedFonts;
                })(),
                geoLocation: new Promise((resolve, reject) => {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(position => {
                            resolve({
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude
                            });
                        }, reject);
                    } else {
                        resolve({ latitude: null, longitude: null });
                    }
                }),
                connectionType: navigator.connection ? navigator.connection.effectiveType : 'unknown',
                connectionDownlink: navigator.connection ? navigator.connection.downlink : 'unknown',
                maxTouchPoints: navigator.maxTouchPoints,
                mediaDevices: navigator.mediaDevices ? 'Available' : 'Not available',
                connection: navigator.connection ? navigator.connection.type : 'unknown',
                graphics: graphicsInfo
            };
        });
    }

    getData().then(data => {
        fetch('/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    });
})();
