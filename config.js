const configs = {
    title: 'xcoders - youtube downloader',
    apikey: 'YOUR APIKEY'
};

const formatSize = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
};

const calculateDownloadSpeed = (startTime, receivedSize) => {
    const endTime = Date.now();
    const elapsedTimeInMs = endTime - startTime;
    const downloadSpeedInBytesPerSec = receivedSize / (elapsedTimeInMs / 1000);
    return downloadSpeedInBytesPerSec;
}

export default {
    configs,
    formatSize,
    calculateDownloadSpeed
}