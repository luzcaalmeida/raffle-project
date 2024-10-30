import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useItemStore } from '../../store/itemStore';
import { Input } from '../Input';
import { Select } from '../Select';
import { Button } from '../Button';
import { CharacterClass } from '../../types';

const itemSchema = z.object({
  name: z.string().min(1, 'Item name is required'),
  imageUrl: z.string().url('Must be a valid URL'),
  bossId: z.string().min(1, 'Boss is required'),
  allowedClasses: z.array(z.enum(['DPS', 'Tank', 'Healer'])).min(1, 'Select at least one class'),
});

type ItemForm = z.infer<typeof itemSchema>;

export function ItemManagement() {
  const { items, addItem, removeItem } = useItemStore();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ItemForm>({
    resolver: zodResolver(itemSchema),
  });

  const onSubmit = (data: ItemForm) => {
    addItem(data);
    reset();
  };

  const classes: CharacterClass[] = ['DPS', 'Tank', 'Healer'];

  return (
    <div className="bg-gray-800/50 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Item Management</h2>
      
      {/* Add New Item Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
        <Input
          label="Item Name"
          {...register('name')}
          error={errors.name?.message}
          placeholder="Enter item name"
        />

        <Input
          label="Item Image URL"
          {...register('imageUrl')}
          error={errors.imageUrl?.message}
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

        <Button type="submit">Add Item</Button>
      </form>

      {/* Item List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-gray-700/50 p-4 rounded-lg">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-32 object-cover rounded-lg mb-2"
            />
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-400">
              Classes: {item.allowedClasses.join(', ')}
            </p>
            <Button
              variant="danger"
              size="sm"
              className="mt-2"
              onClick={() => removeItem(item.id)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}