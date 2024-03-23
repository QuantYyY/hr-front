import { FC, useEffect, useState } from 'react';
import '@/sass/auth.sass';

import { TextField } from '@consta/uikit/TextField';
import { Card } from '@consta/uikit/Card';
import { Button } from '@consta/uikit/Button';
import { authLogin, getUser } from '@/api/requests';

export const Auth: FC = () => {
    const [login, setLogin] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);

    const onClick = () => {
        const data = {
            grant_type: 'password',
            username: login,
            password: password,
            scope: 'read_write',
            client_id: 'your_client_id',
            client_secret: 'your_client_secret',
        };

        setLogin(null);
        setPassword(null);
        authLogin(data)
            .then((result) => {
                localStorage.setItem('token', result.access_token)
                getUser()
                    .then((el) => {
                        localStorage.setItem('user', el.username);
                        localStorage.setItem('role_name', el.role_name);
                        location.reload();
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    }


    return (
        <>
            <div className="auth-container">
                <Card className="auth-card">

                    <TextField
                        onChange={(value) => setLogin(value)}
                        value={login}
                        type="text"
                        placeholder="test@gmail.com"
                        label='Email'
                        className='auth-input'
                    />

                    <TextField
                        onChange={(value) => setPassword(value)}
                        value={password}
                        type="password"
                        label='Пароль'
                        className='auth-input'
                    />

                    <Button
                        label="Войти"
                        onClick={onClick}
                    />
                </Card>
            </div>
        </>
    )
}

