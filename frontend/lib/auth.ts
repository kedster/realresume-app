export async function getSession(req: any) {
  // Mock session for development
  return {
    user: {
      role: 'seeker', // Change to 'recruiter', 'admin', or 'tech' to test other routes
    },
  };
}