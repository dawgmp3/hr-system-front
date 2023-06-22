import {
    IonBadge, IonButton,
    IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonCol,
    IonContent, IonGrid,
    IonHeader, IonItem,
    IonLabel, IonList,
    IonMenuButton, IonPage, IonRadio, IonRadioGroup,
    IonRow, IonSearchbar,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import React, {useEffect, useState} from "react";
import {warning} from "ionicons/icons";
import PopupMenuCandidate from "../sidebar-menu/Popup-Menu-Candidate";
import PageCandidateVacancyInfo from "./Page-Candidate-Vacancy-Info";


interface WorkExperienceProps {
    workExperience: string;
}

function formatWorkExperience(workExperience: string): string {
    return workExperience === "WithoutExperience" ? "Без опыта работы" : workExperience;
}


function PageCandidateVacancyList() {
    interface WorkExperienceProps {
        workExperience: string;
    }

    const [vacancy, setVacancy] = useState<any[]>([])
    const fetchDataVacancies = () => {
        fetch("/api/vacancy/allVacanciesForUser")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setVacancy(data)
                console.log(vacancy)
            })
    }
    useEffect(() => {
        fetchDataVacancies()
    }, [])


    return (
        <>
            <PopupMenuCandidate/>
            <IonPage id="main-content">
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                        <IonTitle>Вакансии</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="3" sizeXs="12" sizeSm="3" sizeMd="3" sizeLg="3" sizeXl="4">
                                <IonSearchbar searchIcon="public/images/search-outline.svg"
                                              placeholder="Поиск по вакансиям"></IonSearchbar>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="4">
                                <IonCard style={{borderRadius: '20px'}}>
                                    <IonCardHeader>
                                        <IonCardTitle>
                                            Опыт работы
                                        </IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <IonList>
                                            <IonRadioGroup>
                                                <IonItem>
                                                    <IonRadio justify="space-between" value="dogs">Нет опыта</IonRadio>
                                                    <br/>
                                                </IonItem>
                                                <IonItem>
                                                    <IonRadio justify="space-between" value="cats">1-3 лет</IonRadio>
                                                    <br/>
                                                </IonItem>
                                                <IonItem>
                                                    <IonRadio justify="space-between" value="turtles">4-5 лет</IonRadio>
                                                    <br/>
                                                </IonItem>
                                                <IonItem>
                                                    <IonRadio justify="space-between" value="fish">Больше 5</IonRadio>
                                                    <br/>
                                                </IonItem>
                                            </IonRadioGroup>
                                        </IonList>
                                    </IonCardContent>
                                </IonCard>
                                {vacancy.map(vac => (

                                        <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="6" sizeLg="5" sizeXl="3"
                                                className="vacancy-cards-list" key={vac.vacancyId}>
                                            <IonCard className="vacancy-cards" style={{borderRadius: '20px'}} onClick={PageCandidateVacancyInfo}>
                                                <IonCardHeader>
                                                    <IonCardTitle style={{fontWeight: 600}}>{vac.vacancyName}</IonCardTitle>
                                                </IonCardHeader>
                                                <IonItem>
                                                    <IonBadge slot="start" color={"success"}>{vac.description}</IonBadge>
                                                    <IonBadge slot="end" color={"warning"}>{formatWorkExperience(vac.workExperience)}</IonBadge>
                                                </IonItem>
                                            </IonCard>
                                        </IonCol>
                                    )
                                )}
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonPage>
        </>
    )
}

export default PageCandidateVacancyList;