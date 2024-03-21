import { FC, useEffect, useState } from "react";
import '@/sass/new.sass';
import { Button } from "@consta/uikit/Button";

import { useForm } from "react-hook-form";
import { getVacancy, postApplicant } from "@/api/requests";
import dayjs from "dayjs";

const ApplicantNew: FC = () => {
    const [vacancy, setVacancy] = useState<vacancyType[]>([]);

    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    const onSubmit = (data: any) => {
        const newData = {
            ...data,
            Birthday: dayjs(data.Birthday).toISOString()
        }
        postApplicant(newData);
        reset();
    }

    const getVacancyData = () => {
        getVacancy()
            .then((result) => {
                setVacancy(result);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getVacancyData();
    }, [])


    return (
        <>
            <div className="new">

                <form onSubmit={handleSubmit(onSubmit)}>

                    <label className="text-field__label">ФИО</label>
                    <input
                        className="text-field__input"
                        type="text"
                        {...register('FIO', {
                            required: true
                        })}
                    />

                    <label className="text-field__label">Пасспорт</label>
                    <input
                        className="text-field__input"
                        type="text"
                        {...register('Passport', {
                            required: true
                        })}
                    />

                    <label className="text-field__label">ИНН</label>
                    <input
                        className="text-field__input"
                        type="text"
                        {...register('INN', {
                            required: true
                        })}
                    />

                    <label className="text-field__label">Дата</label>
                    <input
                        className="text-field__input"
                        type="text"
                        {...register('Birthday', {
                            required: true
                        })}
                    />

                    <label className="text-field__label">Пол</label>
                    <input
                        className="text-field__input"
                        type="text"
                        {...register('Gender', {
                            required: true
                        })}
                    />

                    <label className="text-field__label">Адрес</label>
                    <input
                        className="text-field__input"
                        type="text"
                        {...register('Address', {
                            required: true
                        })}
                    />

                    <label className="text-field__label">Резюме</label>
                    <input
                        className="text-field__input"
                        type="text"
                        {...register('Resume', {
                            required: true
                        })}
                    />

                    <label className="text-field__label">Email</label>
                    <input
                        className="text-field__input"
                        type="text"
                        {...register('email', {
                            required: true
                        })}
                    />

                    <label className="text-field__label">Id Вакансии</label>
                    <select
                        style={{ padding: '0' }}
                        className="text-field__input"
                        {...register('id_vacancy', {
                            required: true
                        })}
                    >
                        {
                            vacancy.map(el => (
                                <option value={el.id_vacancy}>{el.Post}</option>
                            ))
                        }
                    </select>

                    <Button
                        label='Отправить'
                        type="submit"
                        size="m"
                        className="submit-button"
                    />
                </form>
            </div>
        </>
    )
}

export { ApplicantNew };