import React from 'react';
import { useUserStore } from '../../store/userStore';
import { Button } from '../Button';
import { User } from '../../types';

export function UserManagement() {
  const { users, toggleTopContributor, togglePriority2, removeUser } = useUserStore();

  const handleToggleTopContributor = (userId: string) => {
    toggleTopContributor(userId);
  };

  const handleTogglePriority2 = (userId: string) => {
    togglePriority2(userId);
  };

  return (
    <div className="bg-gray-800/50 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">User Management</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-700">
              <th className="pb-2">Discord Nickname</th>
              <th className="pb-2">Game Nickname</th>
              <th className="pb-2">Class</th>
              <th className="pb-2">Status</th>
              <th className="pb-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr key={user.id} className="border-b border-gray-700/50">
                <td className="py-3">{user.discordNickname}</td>
                <td>{user.gameNickname}</td>
                <td>{user.characterClass}</td>
                <td>
                  <div className="space-x-2">
                    {user.isTopContributor && (
                      <span className="px-2 py-1 text-xs bg-purple-600 rounded-full">
                        Top Contributor
                      </span>
                    )}
                    {user.priority2 && (
                      <span className="px-2 py-1 text-xs bg-blue-600 rounded-full">
                        Priority 2
                      </span>
                    )}
                  </div>
                </td>
                <td>
                  <div className="space-x-2">
                    <Button
                      size="sm"
                      variant={user.isTopContributor ? 'danger' : 'primary'}
                      onClick={() => handleToggleTopContributor(user.id)}
                    >
                      {user.isTopContributor ? 'Remove TC' : 'Add TC'}
                    </Button>
                    <Button
                      size="sm"
                      variant={user.priority2 ? 'danger' : 'primary'}
                      onClick={() => handleTogglePriority2(user.id)}
                    >
                      {user.priority2 ? 'Remove P2' : 'Add P2'}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}