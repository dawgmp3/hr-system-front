import React, {useEffect, useState} from 'react';
import {
    IonAlert,
    IonBadge, IonButton,
    IonButtons,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol,
    IonContent, IonFab, IonFabButton, IonGrid,
    IonHeader, IonIcon, IonItem,
    IonMenuButton,
    IonPage, IonRow, IonText, IonTextarea,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import '../../styles/Page-HR.css'
import PopupMenuHr from "../sidebar-menu/PopupMenuHr";
import handleToken from "../../scripts/CookiesToken";
import {useParams} from "react-router";

import {formatWorkExperience, formatWorkStatus} from "../../scripts/utils";

const HR6VacancyCardForView = () => {
    interface VacancyParam {
        vacancyId: string;
    }

    const [handlerMessage, setHandlerMessage] = useState('');
    const [roleMessage, setRoleMessage] = useState('');
    const [vacancy, setVacancy] = useState<any>([])
    const { vacancyId } = useParams<VacancyParam>();
    const [activeResponses, setActiveResponses] = useState<any>([])


    const fetchVacancyData = () => {
        fetch('/api/vacancy/getVacancyInfo?vacancyId=' + vacancyId)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setVacancy(data)
                console.log(vacancy)
            })
    }

    const fetchDataActiveResponses = () => {
        fetch("/api/response/countAllResponsesForVacancy?vacancyId=" + vacancyId)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setActiveResponses(data)
                console.log(data)
            })
    }

    useEffect(() => {
        fetchVacancyData()
        fetchDataActiveResponses()
    }, [])

    return (
        <>
            <PopupMenuHr/>
            <IonPage id="main-content">

                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                        <IonTitle>Вакансия</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent className="ion-padding">
                        <h1 style={{marginLeft: "20px"}}>{vacancy.name}</h1>
                    <IonGrid>
                        <IonRow>
                                <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="4">
                                    <IonCard className="vacancy-cards" style={{borderRadius: '20px'}}>
                                        <IonCardHeader>
                                            <IonTitle>
                                                Информация о вакансии
                                            </IonTitle>
                                        </IonCardHeader>
                                        <IonCardContent>
                                            <IonItem>
                                                Статус
                                                <IonBadge slot="end"
                                                color={
                                                    vacancy.vacancyStatus === "Opened" ? "success" :
                                                        vacancy.vacancyStatus === "OnModeration" ? "warning" :
                                                "danger"
                                                }>
                                                    {formatWorkStatus(vacancy.vacancyStatus)}</IonBadge>
                                            </IonItem>
                                            <IonItem>
                                                Опыт работы
                                                <IonBadge slot="end" color={
                                                    vacancy.workExperience === "WithoutExperience" ? "success" :
                                                        vacancy.workExperience === "MoreTwoYears" ? "danger" :
                                                            "warning"
                                                }>
                                                    {formatWorkExperience(vacancy.workExperience)}</IonBadge>
                                            </IonItem>
                                            <IonItem>
                                                Отклики
                                                <IonBadge slot="end" color={"primary"}>{activeResponses.num}</IonBadge>
                                            </IonItem>
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                            <IonCol style={{marginLeft: "20px"}}>
                                <IonButton fill="outline">Редактировать</IonButton>
                                <IonButton fill="outline">В архив</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>

                    <IonGrid>
                        <IonRow>
                                <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="8">
                                    <IonCard style={{borderRadius: '20px'}}>
                                        <IonCardHeader>Описание</IonCardHeader>
                                        <IonCardContent>
                                            {vacancy.description}
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                        </IonRow>
                    </IonGrid>

                    <IonGrid>
                        <IonRow>
                            <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="4">
                                <IonCard className="vacancy-cards" style={{borderRadius: '20px'}}>
                                    <IonCardHeader>
                                        <IonTitle>
                                            Тестирование
                                        </IonTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <IonItem>
                                            <IonText>
                                                До какого числа
                                            </IonText>
                                            <IonText slot="end">
                                                30.07.2023
                                            </IonText>
                                        </IonItem>
                                        <IonItem>
                                            Статус
                                            <IonBadge slot="end" color={"danger"}>Недоступно</IonBadge>
                                        </IonItem>
                                        <IonItem>
                                            <IonText>
                                                Результат
                                            </IonText>
                                            <IonText slot="end">
                                                max: 10
                                            </IonText>
                                        </IonItem>
                                        <IonButton
                                            expand="block" fill="clear" color="transparent">Перейти к заданию
                                        </IonButton>
                                        <IonButton id="present-alert"
                                                   expand="block" fill="clear" color="transparent">Удалить
                                        </IonButton>
                                        <IonAlert
                                            header="Вы действительно хотите удалить?"
                                            trigger="present-alert"
                                            buttons={[
                                                {
                                                    text: 'Отмена',
                                                    role: 'cancel',
                                                    handler: () => {
                                                        setHandlerMessage('Alert canceled');
                                                    },
                                                },
                                                {
                                                    text: 'Да',
                                                    role: 'confirm',
                                                    handler: () => {
                                                        setHandlerMessage('Alert confirmed');
                                                    },
                                                },
                                            ]}
                                            onDidDismiss={({ detail }) => setRoleMessage(`Dismissed with role: ${detail.role}`)}
                                        ></IonAlert>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                            <IonCol>
                                <IonCard className="vacancy-cards" style={{borderRadius: '20px'}}>
                                    <IonCardHeader>
                                        <IonTitle>
                                            Тестирование
                                        </IonTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <IonItem>
                                            <IonText>
                                                До какого числа
                                            </IonText>
                                            <IonText slot="end">
                                                30.07.2023
                                            </IonText>
                                        </IonItem>
                                        <IonItem>
                                            Статус
                                            <IonBadge slot="end" color={"danger"}>Недоступно</IonBadge>
                                        </IonItem>
                                        <IonItem>
                                            <IonText>
                                                Результат
                                            </IonText>
                                            <IonText slot="end">
                                                max: 10
                                            </IonText>
                                        </IonItem>
                                        <IonButton
                                            expand="block" fill="clear" color="transparent">Перейти к заданию
                                        </IonButton>
                                        <IonButton id="present-alert"
                                                   expand="block" fill="clear" color="transparent">Удалить
                                        </IonButton>
                                        <IonAlert
                                            header="Вы действительно хотите удалить?"
                                            trigger="present-alert"
                                            buttons={[
                                                {
                                                    text: 'Отмена',
                                                    role: 'cancel',
                                                    handler: () => {
                                                        setHandlerMessage('Alert canceled');
                                                    },
                                                },
                                                {
                                                    text: 'Да',
                                                    role: 'confirm',
                                                    handler: () => {
                                                        setHandlerMessage('Alert confirmed');
                                                    },
                                                },
                                            ]}
                                            onDidDismiss={({ detail }) => setRoleMessage(`Dismissed with role: ${detail.role}`)}
                                        ></IonAlert>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                            <IonCol>
                                <IonCard style={{borderRadius: '20px', marginTop: '120px'}}>
                                    <IonCardContent>
                                        <IonButton routerLink="/hr-test-page"
                                            expand="block" fill="clear" color="transparent">Добавить этап
                                        </IonButton>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    </IonGrid>

                </IonContent>
            </IonPage>
        </>
    );
}

export default HR6VacancyCardForView;