(function() {
    function getData() {
        // Функция для получения IP-адреса с таймаутом
        function getIP() {
            const timeout = 6000;
            const controller = new AbortController();
            const signal = controller.signal;

            const timeoutId = setTimeout(() => controller.abort(), timeout);

            return fetch('https://api.ipify.org?format=json', { signal })
                .then(response => response.json())
                .then(data => {
                    clearTimeout(timeoutId);
                    return data.ip;
                })
                .catch(err => {
                    clearTimeout(timeoutId);
                    return null;
                });
        }

        return getIP().then(ip => {
            return {
                ipAddress: ip,
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
                geoLocation: (function() {
                    return new Promise((resolve, reject) => {
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
                    });
                })(),
                connectionType: navigator.connection ? navigator.connection.effectiveType : 'unknown',
                connectionDownlink: navigator.connection ? navigator.connection.downlink : 'unknown',
                maxTouchPoints: navigator.maxTouchPoints,
                mediaDevices: navigator.mediaDevices ? 'Available' : 'Not available',
                deviceMemory: navigator.deviceMemory || 'unknown',
                connection: navigator.connection ? navigator.connection.type : 'unknown'
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
