import { FC, useEffect, useState } from "react";
import { getApplicant, getVacancy, putApplicant } from "@/api/requests";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@consta/uikit/Button";
import dayjs from "dayjs";

export const ApplicantEdit: FC = () => {
    const { id } = useParams();

    const [applicant, setApplicant] = useState<applicantType>();
    const [vacancy, setVacancy] = useState<vacancyType[]>([]);

    const getApplicantData = () => {
        getApplicant()
            .then((result) => {
                setApplicant(result.find((el: applicantType) => el.id_applicant === Number(id)));
            })
            .catch((err) => {
                console.log(err)
            })
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
        getApplicantData();
        getVacancyData();
    }, [])

    const onSubmit = async (data: any) => {
        const newData = {
            ...data,
            Birthday: dayjs(`${data.Birthday} GMT`, 'YYYY-MM-DD').toISOString()
        }
        await putApplicant(Number(id), newData);
        reset();
        getApplicantData();
    }

    const {
        register,
        handleSubmit,
        reset
    } = useForm({
        values: applicant
    });

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
                        placeholder="YYYY-MM-DD"
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
                        label='Сохранить'
                        type="submit"
                        size="m"
                        className="submit-button"
                    />
                </form>
            </div>
        </>
    )
}
