import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

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
    const {
        register,
        handleSubmit,
        formState: { errors } } = useForm({
            resolver: yupResolver(schema)
        });

    function handleFormSignUp(data: any) {
        console.log(data);
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

