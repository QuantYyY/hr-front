import { FC, useEffect, useState } from "react";
import '@/sass/pages.sass';

import { CollapseGroup } from '@consta/uikit/CollapseGroup';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';

import { IconTrash } from '@consta/icons/IconTrash';
import { IconEdit } from '@consta/icons/IconEdit';
import { IconAdd } from '@consta/icons/IconAdd';
import { deleteApplicant, getApplicant, getVacancy } from "@/api/requests";
import { NavLink } from "react-router-dom";

const applicantAlias: Record<string, string> = {
    "id_applicant": "Id",
    "FIO": "ФИО",
    "Passport": "Пасспорт",
    "INN": "ИНН",
    "Birthday": "Дата",
    "Gender": "Пол",
    "Address": "Адрес",
    "Resume": "Резюме",
    "email": "Email",
    "id_vacancy": "Id Вакансии"
}

const Appilicant: FC = () => {
    const [applicant, setApplicant] = useState<applicantType[]>([]);

    const getApplicantData = () => {
        getApplicant()
            .then((result) => {
                setApplicant(result);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getApplicantData();
    }, [])

    const handleDeleteAppilicant = async (id: number) => {
        await deleteApplicant(id);
        await getApplicantData()
    }

    const getItemContent = (item: applicantType) => {
        const contentItem = Object.entries(item);

        return (
            <>
                <div className="collapse-container">
                    {
                        contentItem.map(([title, value]) => {
                            return (
                                <>
                                    <Text size="l" view="secondary">
                                        {applicantAlias[title]}: <Text as="span" size="xl" view="primary">{value}</Text>
                                    </Text>
                                </>
                            )
                        })
                    }
                    <NavLink to={`${item.id_applicant!}`} end>
                        <Button
                            label="Редактировать"
                            onlyIcon
                            view="ghost"
                            size="s"
                            style={{ marginTop: '20px' }}
                            iconRight={IconEdit}
                        />
                    </NavLink>
                    <Button
                        label="Удалить"
                        onlyIcon
                        view="ghost"
                        size="s"
                        style={{ marginTop: '20px', marginLeft: '15px' }}
                        iconRight={IconTrash}
                        onClick={() => {
                            handleDeleteAppilicant(item.id_applicant!)
                        }}
                    />
                </div>
            </>
        )
    }

    return (
        <>
            <div className="header wrap">
                <h1>Соискатели</h1>

                <div className="buttons">
                    <NavLink to='new' end>
                        <Button
                            label="Добавить"
                            iconRight={IconAdd}
                        />
                    </NavLink>

                </div>
            </div>

            <CollapseGroup
                items={applicant}
                getItemLabel={(item) => item.FIO}
                getItemContent={getItemContent}
            />

        </>
    )
}

export default Appilicant;