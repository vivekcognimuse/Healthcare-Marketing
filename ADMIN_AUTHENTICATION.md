# Admin Authentication Setup

## Overview

The admin dashboard is now protected with authentication. Only authorized users can access the admin panel to manage events, bookings, and payments.

## Credentials

- **Username:** `admin`
- **Password:** `admin@cognimuse`

## How It Works

### Authentication Flow

1. **Login Page** (`/admin/login`)
   - Users must enter username and password
   - Credentials are verified client-side
   - Session is stored in `sessionStorage`

2. **Session Management**
   - Session expires after 8 hours of inactivity
   - Session is stored in browser's `sessionStorage`
   - Session persists across page refreshes but not across browser tabs

3. **Protected Routes**
   - `/admin` - Main dashboard
   - `/admin/events/create` - Create event page
   - `/admin/events/edit/[eventId]` - Edit event page

### Security Features

- ✅ Session timeout (8 hours)
- ✅ Automatic redirect to login if not authenticated
- ✅ Logout functionality
- ✅ Protected route checks on all admin pages
- ✅ Session validation on page load

## Usage

### Accessing Admin Dashboard

1. Navigate to `/admin/login`
2. Enter credentials:
   - Username: `admin`
   - Password: `admin@cognimuse`
3. Click "Login"
4. You'll be redirected to `/admin` dashboard

### Logging Out

1. Click the "Logout" button in the top-right corner of the admin dashboard
2. Confirm logout
3. You'll be redirected to the login page

### Session Expiry

- Sessions automatically expire after 8 hours
- If your session expires, you'll be redirected to the login page
- Simply log in again to continue

## File Structure

```
lib/auth/
  └── admin-auth.ts          # Authentication utilities

app/admin/
  ├── login/
  │   └── page.tsx           # Login page
  ├── page.tsx                # Dashboard (protected)
  └── events/
      ├── create/
      │   └── page.tsx        # Create event (protected)
      └── edit/
          └── [eventId]/
              └── page.tsx    # Edit event (protected)
```

## Security Notes

⚠️ **Important Security Considerations:**

1. **Client-Side Authentication**: Current implementation uses client-side authentication for simplicity. For production:
   - Consider implementing server-side authentication
   - Use JWT tokens or session cookies
   - Implement rate limiting on login attempts
   - Add password hashing (currently plain text comparison)

2. **Session Storage**: Sessions are stored in `sessionStorage`:
   - Cleared when browser tab is closed
   - Not shared across tabs
   - Consider using `localStorage` for longer sessions (with proper expiry)

3. **Password Security**: 
   - Password is currently stored in code (not ideal for production)
   - Consider moving to environment variables
   - Implement password hashing (bcrypt, etc.)
   - Add password change functionality

4. **Additional Security Measures** (Recommended):
   - Add CSRF protection
   - Implement login attempt limiting
   - Add 2FA (Two-Factor Authentication)
   - Log admin actions for audit trail
   - IP whitelisting for admin access

## Future Enhancements

- [ ] Server-side authentication
- [ ] Password hashing
- [ ] JWT token-based auth
- [ ] Remember me functionality
- [ ] Password reset functionality
- [ ] Multiple admin accounts
- [ ] Role-based access control
- [ ] Activity logging
- [ ] Login attempt limiting
- [ ] Email notifications for admin logins

## Troubleshooting

### Can't Access Admin Dashboard

1. **Check URL**: Make sure you're accessing `/admin/login` first
2. **Clear Session**: Clear browser `sessionStorage` and try again
3. **Check Credentials**: Verify username and password are correct
4. **Session Expired**: If session expired, simply log in again

### Session Not Persisting

- Sessions are stored in `sessionStorage`, which clears when tab is closed
- If you need longer sessions, consider using `localStorage` (modify `admin-auth.ts`)

### Redirect Loop

- If you see a redirect loop, clear browser storage:
  ```javascript
  sessionStorage.clear();
  ```
- Then navigate to `/admin/login` directly

---

**Last Updated**: February 5, 2026
**Status**: ✅ Basic authentication implemented and working
