import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../Input';
import { Select } from '../Select';
import { Button } from '../Button';
import { useRaffleStore } from '../../store/raffleStore';
import { CharacterClass } from '../../types';

const raffleSchema = z.object({
  bossId: z.string().min(1, 'Boss is required'),
  itemName: z.string().min(1, 'Item name is required'),
  itemImage: z.string().url('Must be a valid URL'),
  allowedClasses: z.array(z.enum(['DPS', 'Tank', 'Healer'])).min(1, 'Select at least one class'),
});

type RaffleForm = z.infer<typeof raffleSchema>;

export function CreateRaffle() {
  const { bosses, addRaffle } = useRaffleStore();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<RaffleForm>({
    resolver: zodResolver(raffleSchema),
  });

  const onSubmit = (data: RaffleForm) => {
    addRaffle(data);
    reset();
  };

  const classes: CharacterClass[] = ['DPS', 'Tank', 'Healer'];

  return (
    <div className="bg-gray-800/50 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Create New Raffle</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Select
          label="Boss"
          {...register('bossId')}
          error={errors.bossId?.message}
        >
          <option value="">Select a boss</option>
          {bosses.map((boss) => (
            <option key={boss.id} value={boss.id}>
              {boss.name}
            </option>
          ))}
        </Select>

        <Input
          label="Item Name"
          {...register('itemName')}
          error={errors.itemName?.message}
          placeholder="Enter item name"
        />

        <Input
          label="Item Image URL"
          {...register('itemImage')}
          error={errors.itemImage?.message}
          placeholder="https://example.com/item-image.png"
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200">
            Allowed Classes
          </label>
          <div className="flex gap-4">
            {classes.map((className) => (
              <label key={className} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={className}
                  {...register('allowedClasses')}
                  className="rounded border-gray-700 bg-gray-800 text-purple-600 focus:ring-purple-500"
                />
                <span>{className}</span>
              </label>
            ))}
          </div>
          {errors.allowedClasses && (
            <p className="text-sm text-red-400">{errors.allowedClasses.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full">
          Create Raffle
        </Button>
      </form>
    </div>
  );
}