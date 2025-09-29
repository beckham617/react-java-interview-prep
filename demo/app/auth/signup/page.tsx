import React from 'react';

export default function SignUpPage() {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <h1>Sign Up</h1>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <input type="password" placeholder="Confirm Password" required />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <a href="/auth/signin">Sign In</a>
      </p>
    </main>
  );
}
