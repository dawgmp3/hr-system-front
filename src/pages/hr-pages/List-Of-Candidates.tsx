import '../../styles/Page-Candidate.css'
import moment from 'moment';
import {
    IonBadge, IonButton,
    IonButtons,
    IonCard,
    IonCardContent, IonChip, IonCol,
    IonContent, IonGrid,
    IonHeader, IonIcon, IonItem, IonLabel, IonList,
    IonMenuButton, IonMenuToggle,
    IonPage, IonRow, IonSearchbar, IonSelect, IonSelectOption, IonText, IonThumbnail,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import React, {useEffect, useState} from 'react';
import PopupMenuHr from "../sidebar-menu/PopupMenuHr";
import {useHistory, useParams} from "react-router";

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

interface RouteParams {
    id: string
}

const ListCandidates = () => {
    const { id } = useParams<RouteParams>();
    const [candidate, setCandidate] = useState<any[]>([])
    const [data, setData] = useState<any>([]);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([])

    const history = useHistory();

    const navigateToPage = (id: string) => {
        history.push(`/candidate-card/${id}`);
    };

    const fetchData = () => {
        fetch("/api/vacancy/getCandidatesByVacancy?vacancyId=" + id)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setCandidate(data)
            })
    }

    const fetchVacancyData = () => {
        fetch("/api/vacancy/getVacancyInfo?vacancyId=" + id)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setData(data)
                console.log(data)
            })
    }

    const handleSearch = () => {
        fetch('/api/userInfo/userSpecification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([{ key: 'name', value: query, operation: 'LIKE' }]),
        })
            .then(response => response.json())
            .then(data => setResults(data))
            .catch(error => console.error(error));
    };

    useEffect(() => {
        fetchData()
        fetchVacancyData()
    }, [])

    useEffect(() => {
        handleSearch();
    }, [query]);

    return (
        <>
            <PopupMenuHr/>
            <IonPage id="main-content">

                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                        <IonTitle>Список кандидатов</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    <IonItem color="transparent" lines="none">
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonCard style={{borderRadius: '20px'}}>
                                        <IonCardContent>
                                            <IonList>
                                                <IonItem>
                                                    <IonLabel>Вакансия</IonLabel>
                                                    <IonChip>
                                                        <IonIcon icon="../images/calendar-outline.svg"></IonIcon>
                                                        <IonLabel>{data.vacancyName}</IonLabel>
                                                    </IonChip>
                                                </IonItem>

                                                <IonItem>
                                                    <IonLabel>Прошел этап</IonLabel>
                                                    <IonList>
                                                        <IonItem>
                                                            <IonSelect aria-label="Fruit" interface="popover"
                                                                       placeholder="Выберите этап">
                                                                <IonSelectOption value="apples">Тест на знание
                                                                    Java</IonSelectOption>
                                                                <IonSelectOption value="oranges">Тест на знание
                                                                    C#</IonSelectOption>
                                                                <IonSelectOption value="bananas">Тест на знание
                                                                    C++</IonSelectOption>
                                                            </IonSelect>
                                                        </IonItem>
                                                    </IonList>
                                                </IonItem>

                                                <IonItem>
                                                    <IonLabel>Получил результат</IonLabel>
                                                    <IonList>
                                                        <IonItem>
                                                            <IonSelect aria-label="Fruit" interface="popover"
                                                                       placeholder="Выберите результат">
                                                                <IonSelectOption value="apples">Больше
                                                                    5</IonSelectOption>
                                                                <IonSelectOption value="oranges">Больше
                                                                    10</IonSelectOption>
                                                                <IonSelectOption value="bananas">Больше
                                                                    15</IonSelectOption>
                                                            </IonSelect>
                                                        </IonItem>
                                                    </IonList>
                                                </IonItem>
                                            </IonList>
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>

                                <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="6" className="vacancy-cards-list">
                                    <div className="search-button">
                                        <IonSearchbar
                                            searchIcon="../images/search-outline.svg"
                                            placeholder="Поиск по имени"
                                            value={query ?? ''}
                                            onIonChange={e => setQuery(e.detail.value!)}
                                        ></IonSearchbar>
                                    </div>

                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>

                    {/*<IonGrid>*/}
                    {/*    <IonRow>*/}
                    {/*        <IonCol size="2" sizeXs="8" sizeSm="8" sizeMd="8" sizeLg="2">*/}
                    {/*            <IonChip>*/}
                    {/*                <IonIcon icon="../images/calendar-outline.svg"></IonIcon>*/}
                    {/*                <IonLabel>Java Backend Junior</IonLabel>*/}
                    {/*                <IonIcon icon="../images/close-circle-outline.svg"></IonIcon>*/}
                    {/*            </IonChip>*/}
                    {/*        </IonCol>*/}
                    {/*        <IonCol size="2" sizeXs="8" sizeSm="8" sizeMd="8" sizeLg="2">*/}
                    {/*            <IonChip>*/}
                    {/*                <IonIcon icon="../images/star-outline.svg"></IonIcon>*/}
                    {/*                <IonLabel>Больше 10</IonLabel>*/}
                    {/*                <IonIcon icon="../images/close-circle-outline.svg"></IonIcon>*/}
                    {/*            </IonChip>*/}
                    {/*        </IonCol>*/}
                    {/*    </IonRow>*/}
                    {/*</IonGrid>*/}

                    <IonGrid style={{margin: "0px"}}>
                        <IonRow style={{margin: "0px"}}>
                            {results.map(can => (
                                <IonCol size="12" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="4" key={can.id}>
                                    <IonCard className="vacancy-cards" style={{borderRadius: '20px'}}>
                                        <IonCardContent>
                                            <IonItem>
                                                <IonThumbnail slot="start">
                                                    <img className="candidate-image" alt="Silhouette of mountains"
                                                         src={can.image_url}/>
                                                </IonThumbnail>
                                                <IonLabel>{can.name}</IonLabel>
                                            </IonItem>

                                            <IonItem>
                                                <IonLabel>Статус заявки</IonLabel>
                                                <IonBadge color="warning">{can.responseStatus}</IonBadge>
                                            </IonItem>

                                            <IonItem>
                                                <IonLabel>Пройденный этап</IonLabel>
                                                <IonLabel color="medium" slot="end"><i>to-be-done</i></IonLabel>
                                            </IonItem>

                                            <IonButton
                                                onClick={() => navigateToPage(can.userId)}
                                                expand="block"
                                                fill="clear"
                                                color="transparent">
                                                Подробнее о кандидате
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

export default ListCandidates;