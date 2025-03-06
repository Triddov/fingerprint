(function() {
    function getData() {
        return {
            userAgent: navigator.userAgent,
            language: navigator.language,
            screen: { width: screen.width, height: screen.height },
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            platform: navigator.platform,
            hardwareConcurrency: navigator.hardwareConcurrency,
            memory: navigator.deviceMemory || 'unknown',
        };
    }

    function detectDevTools() {
        const threshold = 160;
        setInterval(() => {
            const width = window.outerWidth - window.innerWidth > threshold;
            const height = window.outerHeight - window.innerHeight > threshold;
            if (width || height) location.reload();
        }, 1000);
    }

    detectDevTools();

    fetch('/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(getData())
    });
})();
