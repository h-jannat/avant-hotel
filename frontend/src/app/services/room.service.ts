import { Injectable, resource } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  userResource = resource({
    loader: async (params) => {
      const response = await fetch(`/api/users?sort=${params.request.sort}`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return await response.json();
    },
  });
  reloadUsers(sortOrder: 'asc' | 'desc') {
    this.userResource.reload({ request: { sort: sortOrder } });
  }
}
