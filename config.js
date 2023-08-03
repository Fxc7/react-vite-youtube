import { SiConvertio } from 'react-icons/si';
import { MdOutlineFlashOn, MdMobileFriendly } from 'react-icons/md';
import { PiCloudCheckBold } from 'react-icons/pi';
import { FaDownload } from 'react-icons/fa';
import { BiSolidUserPlus } from 'react-icons/bi';

const configs = {
    title: 'xcoders - youtube downloader',
    url: 'https://cors-fxc7.cloud.okteto.net/'
};

const rows = [
    {
        id: 1,
        icon: SiConvertio,
        size: '55',
        data_aos: 'fade-up-right',
        title: 'Unlimited Conversions',
        description: 'We offers unlimited conversions of youtube videos to mp3 and mp4.'
    },
    {
        id: 2,
        icon: FaDownload,
        size: '55',
        data_aos: 'fade-up-left',
        title: 'Auto Fetch from Youtube',
        description: 'We automatically fetch data from Youtube, you just have to copy and paste the youtube URL.'
    },
    {
        id: 3,
        icon: BiSolidUserPlus,
        size: '55',
        data_aos: 'fade-up-right',
        title: 'No Registration Required',
        description: 'You don\'t need to register to convert and download youtube videos to mp4 and mp3 format.'
    },
    {
        id: 4,
        icon: MdOutlineFlashOn,
        size: '55',
        data_aos: 'fade-up-left',
        title: 'Faster Video Conversion',
        description: 'We use the latest technologies for encoding system, so you don\'t have to wait much for the conversion.'
    },
    {
        id: 5,
        icon: PiCloudCheckBold,
        size: '55',
        data_aos: 'fade-up-right',
        title: 'Browser Compatibility',
        description: 'Our web app is fully compatible with the latest browsers like Chrome, Firefox, Safari, Microsoft Edge, etc.'
    },
    {
        id: 6,
        icon: MdMobileFriendly,
        size: '55',
        data_aos: 'fade-up-left',
        title: 'Completely Mobile friendly',
        description: 'Our site can be used on any device to download your favorite youtube videos to mp4 and mp3.'
    },
]

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
    rows,
    formatSize,
    calculateDownloadSpeed
}