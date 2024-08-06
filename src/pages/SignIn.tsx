import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { ISignIn } from '../interfaces/signInInterface';

const schema = yup
    .object({
        email: yup.string()
            .required('O e-mail é obrigatório')
            .email('E-mail inválido'),
        password: yup.string()
            .required('A senha é obrigatória')
            .min(8, 'A senha precisa ter pelo menos 8 caracteres'),
    })
    .required()

export function SignIn() {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(schema),
    })

    async function handleFormSignIn(inputsValue: ISignIn) {
        try {
            const { data } = await api.post('/login', {
                "email": inputsValue.email,
                "senha": inputsValue.password
            });

            if (data) {
                localStorage.setItem('token', data.token)
                localStorage.setItem('user', JSON.stringify(data.usuario))
                console.log(data)
                navigate('/home')
            }
        } catch (error) {
            alert('Ocorreu um erro')
        }
    }

    return (
        <main>
            <form onSubmit={handleSubmit(handleFormSignIn)}>
                <h1>Login</h1>

                <div>
                    <label>E-mail</label>
                    <input {...register('email')} type="text" placeholder="Email" />
                    <p>{errors.email?.message}</p>
                </div>

                <div>
                    <label>Password</label>
                    <input {...register('password')} type="password" placeholder="Senha" />
                    <p>{errors.password?.message}</p>
                </div>

                <button>Entrar</button>
            </form>
        </main>
    )
}