import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { IInputsValue } from '../interfaces/signUpInterface';

const schema = yup.object({
    name: yup.string()
        .required('O nome é obrigatório'),
    email: yup.string()
        .required('O e-mail é obrigatório')
        .email('E-mail inválido'),
    password: yup.string()
        .required('A senha é obrigatória')
        .min(8, 'A senha precisa ter pelo menos 8 caracteres'),
    passwordConfirmation: yup.string()
        .required('Confirmação de senha é obrigatória')
        .oneOf([yup.ref('password')], 'As senhas devem ser iguais'),
});

export function SignUp() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors } } = useForm({
            resolver: yupResolver(schema)
        });

    async function handleFormSignUp(inputsValue: IInputsValue) {
        try {
            const { data } = await api.post('/usuario', {
                "nome": inputsValue.name,
                "email": inputsValue.email,
                "senha": inputsValue.password
            });

            if (data) {
                alert('Cadastrado com sucesso');
                navigate('/login');
            }
        } catch (error) {
            alert('Ocorreu um erro');
        }
    }

    return (
        <main>
            <form onSubmit={handleSubmit(handleFormSignUp)}>
                <h2>Cadastre-se</h2>

                <label>
                    Nome
                    <input
                        {...register('name')}
                        type='text'
                    />
                </label>
                <p>{errors.name?.message}</p>

                <label>
                    E-mail
                    <input
                        {...register('email')}
                        type="text"
                    />
                </label>
                <p>{errors.email?.message}</p>

                <label>
                    Senha
                    <input
                        {...register('password')}
                        type='password'
                    />
                </label>
                <p>{errors.password?.message}</p>

                <label>
                    Confirmação de senha
                    <input
                        {...register('passwordConfirmation')}
                        type='password'
                    />
                </label>
                <p>{errors.passwordConfirmation?.message}</p>

                <button>Cadastrar</button>
                <Link to="/login">Já tem um cadastro? Clique aqui!</Link>
            </form>
        </main>
    )
}

