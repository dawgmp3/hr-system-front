import React, {useEffect, useState} from 'react';
import '../../styles/Popup-Menu-Style.css'
import '../../styles/Page-Candidate.css'
import {
    IonBadge,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonItem,
    IonLabel,
    IonMenuButton,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import PopupMenuCandidate from "../sidebar-menu/Popup-Menu-Candidate";
import moment from 'moment';
import handleToken from "../../scripts/CookiesToken";

const PageCandidateTasks = () => {

    interface Stage {
        name: string;
        id: string;
        deadline: Date;
        result: string;
        additional: null;
        state: string;
    }

    interface Vacancy {
        responseStatus: string;
        creationDate: string;
        vacancyName: string;
        stages: Stage[];
        vacancyId: string;
    }


    const [usersChallenge, setUsersChallenge] = useState<any[]>([])
    const fetchDataVacancyCards = () => {
        fetch('/api/userInfo/getUsersResponses?userId=' + handleToken())
            .then(response => {
                return response.json()
            })
            .then(data => {
                setUsersChallenge(data)
            })
    }
    useEffect(() => {
        fetchDataVacancyCards()
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
                        <IonTitle>Мои Задания</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    {usersChallenge.map((challenge: Vacancy) => (
                        <div>
                            <div className="response-vacancy-header" key={challenge.vacancyId}>
                                <h1>{challenge.vacancyName}</h1>
                            </div>
                            <IonGrid style={{margin: "10px"}}>
                                <IonRow style={{marginLeft: "0px"}}>
                                    {challenge.stages.length === 0 ? (
                                        <div className="empty-stages-message">
                                            На данный момент по этой вакансии заданий нет
                                        </div>
                                    ) : (challenge.stages).map((stage: Stage) => (
                                        <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="6" sizeLg="5" sizeXl="3"
                                                className="vacancy-cards-list" key={stage.id}>

                                            <IonCard className="vacancy-cards" style={{borderRadius: '20px'}}>
                                                <IonCardHeader>
                                                    <IonCardTitle style={{fontWeight: 600}}>{stage.name}</IonCardTitle>
                                                </IonCardHeader>
                                                <IonCardContent>
                                                    <IonItem>
                                                        <IonLabel>Дедлайн</IonLabel>
                                                        <IonItem>{moment(stage.deadline).format('DD.MM.YY HH:mm')}</IonItem>
                                                    </IonItem>
                                                    <IonItem>
                                                        <IonLabel>Статус</IonLabel>
                                                        <IonBadge color="warning" slot="end">{stage.state}</IonBadge>
                                                    </IonItem>
                                                    <IonItem>
                                                        <IonLabel>Результат</IonLabel>
                                                        <IonLabel color="medium"
                                                                  slot="end"><i>{stage.result}</i></IonLabel>
                                                    </IonItem>
                                                    <IonButton expand="block" fill="clear" color="transparent"
                                                               style={{fontSize: "13px"}}>Перейти к
                                                        заданию</IonButton>
                                                    {/*<IonButton expand="block" fill="clear" color="transparent"*/}
                                                    {/*           style={{fontSize: "13px"}}*/}
                                                    {/*           onClick={() => openExternalSite('https://calendar.google.com/calendar/u/0/r/eventedit?text=${stage.name}' +*/}
                                                    {/*               `&dates=${moment(stage.deadline).subtract(1, 'hour').format('YYYYMMDDTHHmmssZ')}/${moment(stage.deadline).format('YYYYMMDDTHHmmssZ')}` +*/}
                                                    {/*               '&details=ID этапа: ${stage.id} ')}>Добавить в*/}
                                                    {/*    календарь</IonButton>*/}
                                                </IonCardContent>
                                            </IonCard>
                                        </IonCol>
                                    ))}
                                </IonRow>
                            </IonGrid>
                        </div>
                    ))}
                </IonContent>
            </IonPage>
        </>
    );
}

export default PageCandidateTasks;