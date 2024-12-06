import React from 'react';
import UserProfile from './user';


/*
en teoría esto lo hice para que acá se llame
al usuario con las credenciales del que está
logeado, el user.tsx es un perfil de usuario
random que en realidad también se usa aquí
pero los separé para que cuando la persona
logeada vea otro usuario, lo cargue con esa
plantilla
*/
const index = () => {
  return <UserProfile/>
};

export default index;

