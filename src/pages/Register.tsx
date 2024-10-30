import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Shield } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { CharacterClass } from '../types';
import { Select } from '../components/Select';

// Validation schema for registration
const registerSchema = z.object({
  discordNickname: z.string().min(3, 'Discord nickname is required'),
  gameNickname: z.string().min(3, 'Game nickname is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  characterClass: z.enum(['DPS', 'Tank', 'Healer'] as const),
});

type RegisterForm = z.infer<typeof registerSchema>;

export function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterForm) => {
    // Check if user should be admin based on password
    const isAdmin = data.password === 'Admin123@';
    // TODO: Implement registration logic with API
    console.log({ ...data, isAdmin });
  };

  const classes: CharacterClass[] = ['DPS', 'Tank', 'Healer'];

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8 bg-gray-900/50 p-8 rounded-xl backdrop-blur-sm">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-purple-600 rounded-full flex items-center justify-center">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold">Create Account</h2>
          <p className="mt-2 text-sm text-gray-400">
            Join the Throne and Liberty community
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
            label="Game Nickname"
            {...register('gameNickname')}
            error={errors.gameNickname?.message}
            placeholder="Your in-game nickname"
          />

          <Select
            label="Character Class"
            {...register('characterClass')}
            error={errors.characterClass?.message}
          >
            <option value="">Select your class</option>
            {classes.map((className) => (
              <option key={className} value={className}>
                {className}
              </option>
            ))}
          </Select>

          <Input
            label="Password"
            type="password"
            {...register('password')}
            error={errors.password?.message}
            placeholder="Create a password"
          />

          <Button type="submit" className="w-full">
            Register
          </Button>

          <p className="text-center text-sm text-gray-400">
            Already have an account?{' '}
            <a href="/" className="text-purple-400 hover:text-purple-300">
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}