export const  redirectToExternalSite = (url: string) => {
    window.location.href = url;
    // or
    // window.open(url, '_blank');
};

export const openExternalSite = (url: string) => {
    const newWindow = window.open(url, '_blank', 'noopener');
    if (newWindow) {
        newWindow.opener = null;
    }
};

export function formatWorkExperience(workExperience: string): string {
    return workExperience === "WithoutExperience" ? "Без опыта" :
        workExperience === "MoreTwoYears" ? "Более двух лет" :
            workExperience === "CoupleOfYears" ? "1-2 года" :
                "not-documented"
}

export function formatWorkStatus(vacancyStatus: string): string {
    return vacancyStatus === "Opened" ? "Активная" :
        vacancyStatus === "OnModeration" ? "На модерации" :
            vacancyStatus === "Closed" ? "В архиве" :
                "not-documented"
}

export function nullifyAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
}