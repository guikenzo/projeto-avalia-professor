'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Button, Input } from '@/components/ui';
import colors from '@/theme/colors';
import { LoginForm, LoginSchema } from '@/validation/login.validation';
import { FatecImg } from '@public/images';

const Login = () => {
  const router = useRouter();

  const { control, handleSubmit } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: 'dasdsa@gmai.com',
      password: '12134',
    },
  });

  const onSubmit = (data: LoginForm) => {
    console.log(data);
    router.replace('/home');
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <Image
        alt="LoginImage"
        src={FatecImg}
        style={{ width: '100%', position: 'fixed', zIndex: -20 }}
      />

      <div
        className="absolute -z-10 h-full w-full"
        style={{ background: 'rgba(36, 54, 110, 0.6)' }}
      />

      <div
        className="flex w-[492px] flex-col items-center justify-center gap-10 rounded-3xl p-4"
        style={{ background: 'rgba(255, 255, 255, 0.8)' }}
      >
        <span className="text-primary-100 text-2xl font-semibold">
          Área do professor
        </span>

        <Input
          control={control}
          label="E-mail"
          name="email"
          placeholder="Digite seu e-mail"
          type="email"
        />

        <Input
          password
          control={control}
          label="Senha"
          name="password"
          placeholder="Digite sua senha"
          type="password"
        />

        <Button
          color={colors.primary[100]}
          style={{
            width: '100%',
            backgroundColor: colors.primary[100],
            color: '#FFFFFF',
            cursor: 'pointer',
            borderColor: colors.primary[100],
          }}
          text="Entrar"
          wired={false}
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </div>
  );
};

export default Login;
