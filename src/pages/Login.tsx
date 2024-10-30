import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

const loginSchema = z.object({
  discordNickname: z.string().min(3, 'Discord nickname is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    // TODO: Implement login logic
    console.log(data);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8 bg-gray-900/50 p-8 rounded-xl backdrop-blur-sm">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-purple-600 rounded-full flex items-center justify-center">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-400">
            Sign in to your Throne and Liberty account
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Discord Nickname"
            {...register('discordNickname')}
            error={errors.discordNickname?.message}
            placeholder="Your Discord nickname"
          />

          <Input
            label="Password"
            type="password"
            {...register('password')}
            error={errors.password?.message}
            placeholder="Your password"
          />

          <Button type="submit" className="w-full">
            Sign in
          </Button>

          <p className="text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <a href="/register" className="text-purple-400 hover:text-purple-300">
              Register now
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}