import React, {useEffect, useState} from 'react';
import '../../styles/Page-HR.css'
import {
    IonBadge, IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonMenuButton,
    IonPage,
    IonRow,
    IonSelect,
    IonSelectOption,
    IonText,
    IonThumbnail,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import PopupMenuHr from "../sidebar-menu/PopupMenuHr";
import {useParams} from "react-router";

const CandidateCardForHR = () => {
    interface RouteParams {
        id: string
    }

    const [response, setResponse] = useState<any[]>([])
    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const {id} = useParams<RouteParams>();

    const fetchDataResponse = () => {
        fetch("/api/userInfo/getUsersResponses?userId=" + id)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setResponse(data)
            })
    }

    const fetchUsersInfo = () => {
        fetch("/api/userInfo/getUsersInfo?userId=" + id)
            .then(response => {
                return response.json()
            })
            .then(dataCandidate => {
                setImage(dataCandidate.image_url)
                setName(dataCandidate.name)
                setPhone(dataCandidate.phoneNumber)
                setEmail(dataCandidate.email)
            })
    }

    useEffect(() => {
        fetchUsersInfo()
        fetchDataResponse()
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
                        <IonTitle>Личные данные кандидата</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent>

                    <IonGrid className="candidate-data">
                        <IonRow>
                            <IonCol>
                                <IonThumbnail className="candidate-image-thumbnail">
                                    <img className="candidate-image" alt="Silhouette of mountains"
                                         src={image}/>
                                </IonThumbnail>
                            </IonCol>

                            <IonCol className="candidate-card">
                                <IonCard className="ion-no-margin" style={{borderRadius: '20px', width: "40vh"}}>
                                    <IonCardHeader>
                                        <IonCardTitle>{name}</IonCardTitle>
                                        <IonCardSubtitle>Информация:</IonCardSubtitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <IonList>
                                            <IonItem>
                                                <IonLabel>Телефон</IonLabel>
                                                <IonLabel slot="end">{phone}</IonLabel>
                                            </IonItem>

                                            <IonItem>
                                                <IonLabel>Почта</IonLabel>
                                                <IonLabel slot="end">{email}</IonLabel>
                                            </IonItem>
                                        </IonList>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>

                        </IonRow>
                    </IonGrid>

                    <IonCol style={{marginLeft: "40px"}}>
                        <IonText style={{fontSize: "30px"}}>Активные отклики</IonText>
                    </IonCol>
                    <IonGrid>
                        <IonRow>
                            {response.map(otk => (
                                <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="4" key={otk.id}>
                                    <IonCard className="vacancy-cards" style={{borderRadius: '20px'}}>
                                        <IonCardHeader>
                                            <IonCardTitle>{otk.vacancyName}</IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent>

                                            <IonItem>
                                                <IonLabel>Последний пройденный этап</IonLabel>
                                                <IonBadge color="warning">Тест на знание Java</IonBadge>
                                            </IonItem>
                                            <IonItem routerLink="/">
                                                <IonLabel>Тест</IonLabel>
                                                <IonIcon icon="../images/chevron-forward-outline.svg"
                                                         slot="end"></IonIcon>
                                            </IonItem>
                                            <IonItem routerLink="/">
                                                <IonLabel>Результаты этапов</IonLabel>
                                                <IonIcon icon="../images/chevron-forward-outline.svg"
                                                         slot="end"></IonIcon>
                                            </IonItem>

                                            <IonButton expand="block" fill="clear" color="transparent">
                                                <IonList>
                                                    <IonItem>
                                                        <IonSelect interface="popover" placeholder="Назначить этап">
                                                            <IonSelectOption value="apples">Интервью</IonSelectOption>
                                                            <IonSelectOption
                                                                value="oranges">Тестирование</IonSelectOption>
                                                        </IonSelect>
                                                    </IonItem>
                                                </IonList>
                                            </IonButton>

                                            <IonButton expand="block" fill="clear" color="transparent">
                                                <IonList>
                                                    <IonItem>
                                                        <IonSelect interface="popover" placeholder="Выдать результат">
                                                            <IonSelectOption value="apples">Назначить
                                                                предложение</IonSelectOption>
                                                            <IonSelectOption value="oranges">Отказ</IonSelectOption>
                                                        </IonSelect>
                                                    </IonItem>
                                                </IonList>
                                            </IonButton>

                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                            ))}
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonPage>
        </>
    );
}

export default CandidateCardForHR;