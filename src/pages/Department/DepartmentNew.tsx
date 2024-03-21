import { FC } from 'react';
import '@/sass/new.sass';
import { Button } from "@consta/uikit/Button";

import { useForm } from "react-hook-form";
import { postDepartment } from "@/api/requests";

export const DepartmentNew: FC = () => {

    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    const onSubmit = (data: any) => {
        postDepartment(data);
        reset();
    }

    return (
        <>
            <div className="new">

                <form onSubmit={handleSubmit(onSubmit)}>

                    <label className="text-field__label">Название отдела</label>
                    <input
                        className="text-field__input"
                        type="text"
                        {...register('Name', {
                            required: true
                        })}
                    />

                    <label className="text-field__label">Описание</label>
                    <input
                        className="text-field__input"
                        type="text"
                        {...register('Description', {
                            required: true
                        })}
                    />

                    <label className="text-field__label">Id Начальника</label>
                    <input
                        className="text-field__input"
                        type="text"
                        {...register('id_director', {
                            required: true
                        })}
                    />

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