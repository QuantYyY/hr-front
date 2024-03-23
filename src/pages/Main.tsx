import React, { FC } from "react";

const Main: FC = () => {

    return (
        <>
            <h1>Главная</h1>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '80vh'
                }}
            >
                <img
                    src='../../public/cat-lightsaber.jpg'
                    alt=""
                    width="auto"
                    height="100%"
                />
            </div>

        </>
    )
}

export default Main;