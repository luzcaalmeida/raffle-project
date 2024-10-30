import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useRaffleStore } from '../store/raffleStore';
import { Button } from '../components/Button';
import { CreateRaffle } from '../components/AdminPanel/CreateRaffle';
import { UserManagement } from '../components/AdminPanel/UserManagement';
import { ItemManagement } from '../components/AdminPanel/ItemManagement';

export function Dashboard() {
  const { user, isAdmin } = useAuthStore();
  const { getRafflesForClass } = useRaffleStore();
  const [activePanel, setActivePanel] = useState<'raffles' | 'users' | 'items' | null>(null);

  // Get raffles available for the user's class
  const availableRaffles = user 
    ? getRafflesForClass(user.characterClass)
    : [];

  return (
    <div className="min-h-screen p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Welcome, {user?.gameNickname}</h1>
        <p className="text-gray-400">
          {user?.characterClass} | {isAdmin ? 'Administrator' : 'Player'}
          {user?.isTopContributor && ' | Top Contributor'}
          {user?.priority2 && ' | Priority 2'}
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {/* Admin Controls */}
        {isAdmin && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Admin Controls</h2>
            <div className="flex gap-4">
              <Button
                onClick={() => setActivePanel('raffles')}
                variant={activePanel === 'raffles' ? 'primary' : 'secondary'}
              >
                Create Raffle
              </Button>
              <Button
                onClick={() => setActivePanel('users')}
                variant={activePanel === 'users' ? 'primary' : 'secondary'}
              >
                Manage Users
              </Button>
              <Button
                onClick={() => setActivePanel('items')}
                variant={activePanel === 'items' ? 'primary' : 'secondary'}
              >
                Manage Items
              </Button>
            </div>

            {/* Admin Panels */}
            {activePanel === 'raffles' && <CreateRaffle />}
            {activePanel === 'users' && <UserManagement />}
            {activePanel === 'items' && <ItemManagement />}
          </div>
        )}

        {/* Available Raffles */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Available Raffles</h2>
          {availableRaffles.length === 0 ? (
            <p className="text-gray-400">No raffles available for your class.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableRaffles.map((raffle) => (
                <div
                  key={raffle.id}
                  className="bg-gray-800/50 p-4 rounded-lg space-y-4"
                >
                  <img
                    src={raffle.itemImage}
                    alt={raffle.itemName}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold">{raffle.itemName}</h3>
                    <p className="text-sm text-gray-400">
                      Boss: {raffle.bossId}
                    </p>
                    <p className="text-sm text-gray-400">
                      Classes: {raffle.allowedClasses.join(', ')}
                    </p>
                  </div>
                  <Button className="w-full">
                    Enter Raffle
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}