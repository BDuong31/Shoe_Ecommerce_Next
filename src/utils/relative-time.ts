import { useTranslation } from "react-i18next";
import '@/utils/i18n';

export const relativeTime = (isoString: Date, t: any): string => {
    // const { t } = useTranslation();
    const data = new Date(isoString);
    const now = new Date();

    const seconds = Math.floor((now.getTime() - data.getTime()) / 1000);

    if (seconds < 60) {
        return t('just now');
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return `${minutes} ${t('minutes ago')}`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24){
        return `${hours} ${t('hours ago')}`;
    }

    const days = Math.floor(hours / 24);
    if (days < 30){
        return `${days} ${t('days ago')}`;
    }

    const months = Math.floor(days / 30);
    if (months === 1){
        return t('a month ago');
    }
    if (months < 12){
        return `${months} ${t('months ago')}`;
    }

    const years = Math.floor(months / 12);
    if (years === 1){
        return t('a year ago');
    }
    return `${years} ${t('years ago')}`;
};