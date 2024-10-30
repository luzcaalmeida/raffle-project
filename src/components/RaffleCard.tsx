import React from 'react';
import { useAuthStore } from '../store/authStore';
import { useRaffleStore } from '../store/raffleStore';
import { Raffle } from '../types';
import { Button } from './Button';

interface RaffleCardProps {
  raffle: Raffle;
}

export function RaffleCard({ raffle }: RaffleCardProps) {
  const { user } = useAuthStore();
  const { enterRaffle, participants } = useRaffleStore();

  const hasEntered = user && participants[raffle.id]?.includes(user.id);

  const handleEnterRaffle = () => {
    if (!user) return;
    enterRaffle(raffle.id, user.id);
  };

  const participantCount = participants[raffle.id]?.length || 0;

  return (
    <div className="bg-gray-800/50 p-4 rounded-lg space-y-4">
      <img
        src={raffle.itemImage}
        alt={raffle.itemName}
        className="w-full h-48 object-cover rounded-lg"
      />
      <div>
        <h3 className="font-semibold text-lg">{raffle.itemName}</h3>
        <p className="text-sm text-gray-400">
          Boss: {raffle.bossId}
        </p>
        <p className="text-sm text-gray-400">
          Classes: {raffle.allowedClasses.join(', ')}
        </p>
        <p className="text-sm text-purple-400 mt-2">
          {participantCount} {participantCount === 1 ? 'participant' : 'participants'}
        </p>
      </div>
      <Button
        className="w-full"
        variant={hasEntered ? 'secondary' : 'primary'}
        disabled={hasEntered}
        onClick={handleEnterRaffle}
      >
        {hasEntered ? 'Entered' : 'Enter Raffle'}
      </Button>
    </div>
  );
}