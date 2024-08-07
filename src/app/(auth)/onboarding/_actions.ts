'use server';

import { auth, clerkClient } from '@clerk/nextjs/server';
import { OnboardingSchema } from '@/validators/onboarding';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Function to complete the onboarding process
export const completeOnboarding = async (
  data: z.infer<typeof OnboardingSchema>
) => {
  const { userId } = auth(); // Retrieve the authentication info of the current user
  const { company } = data; // Extract the company name from the provided onboarding data

  // Check if a user is logged in
  if (!userId) {
    return { success: false, message: 'No Logged In User' };
  }

  try {
    // Create a new organization
    await clerkClient().organizations.createOrganization({
      name: company,
      createdBy: userId,
    });

    // Update the user information to mark onboarding as complete
    await clerkClient().users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
      },
    });

    revalidatePath('/dashboard');

    // Successful response
    return { success: true };
  } catch (err) {
    console.error(
      'Error updating user metadata or creating organization:',
      err
    );
    // Error response
    return {
      success: false,
      error:
        'There was an error updating the user metadata or creating the organization.',
    };
  }
};
