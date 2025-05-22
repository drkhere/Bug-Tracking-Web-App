// import { CanActivateFn, Router } from '@angular/router';
// import { inject } from '@angular/core';
// import { AuthService } from './auth.service';

// export const authGuard: CanActivateFn = (route, state) => {
//   const authService = inject(AuthService);
//   const router = inject(Router);

//   if (!authService.isAuthenticated()) {
//     router.navigate(['/login']);
//     return false;
//   }

//   const requiredRoles = route.data?.['roles'] as string[] | undefined;
//   const userRole = authService.getRole();

//   if (requiredRoles && (!userRole || !requiredRoles.includes(userRole))) {
//     router.navigate(['/home']); // Redirect to a safe page
//     return false;
//   }

//   return true;
// };

import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // 🚀 Check if the user is authenticated
  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  // 🎯 Check if the user has the correct role
  const requiredRoles = route.data?.['roles'] as string[] | undefined;
  const userRole = authService.getRole(); // Get the user's role

  if (requiredRoles && (!userRole || !requiredRoles.includes(userRole))) {
    router.navigate(['/pagenotfound']); // Redirect unauthorized users
    return false;
  }

  return true; // ✅ Allow access if everything is correct
};
