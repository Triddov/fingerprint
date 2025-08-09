export function getGraphicsInfo() {
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


export function getFontsInfo() {
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
}


export function getPluginsInfo() {
    if (navigator.plugins) {
        return Array.from(navigator.plugins).map(p => p.name);
    }
    return [];
}


export function getMimeTypesInfo() {
    if (navigator.mimeTypes) {
        return Array.from(navigator.mimeTypes).map(m => m.type);
    }
    return [];
}


export function getMediaCapabilities() {
    if (navigator.mediaCapabilities) {
        return {
            audio: navigator.mediaCapabilities.decodingInfo ? 'supported' : 'unknown',
            video: navigator.mediaCapabilities.decodingInfo ? 'supported' : 'unknown',
        };
    }
    return { audio: 'unknown', video: 'unknown' };
}


export function getTouchCapabilities() {
    return {
        touchEvent: 'ontouchstart' in window,
        maxTouchPoints: navigator.maxTouchPoints || 0,
        multitouch: navigator.maxTouchPoints > 1,
    };
}


export function getNetworkInfo() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection || {};
    return {
        type: connection.type || 'unknown',
        effectiveType: connection.effectiveType || 'unknown',
        downlink: connection.downlink || 'unknown',
        rtt: connection.rtt || 'unknown',
        saveData: connection.saveData || false,
    };
}
