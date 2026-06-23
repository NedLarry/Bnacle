import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-user-profile-component',
  imports: [FormsModule],
  templateUrl: './user-profile-component.html',
  styleUrl: './user-profile-component.css',
})
export class UserProfileComponent implements OnInit {
  userId: string = '1'; // Get from auth service or route params

  UserToReturn: any = {
    userId: '1',
    firstName: 'Adeola',
    lastName: 'Okonkwo',
    email: 'AOkonkwo@gmail.com',
    phoneNumber: '08012345678',
    TotalBorowed: 100000,
    TotalRepaid: 50000,
    TotalOutstanding: 50000,
    Gender: "Male",
    StateOfResidence: "Lagos State",
    Nationality: "Nigerian",
    ResidentialAddress: "14 Admiralty Way, Lekki Phase 1, Lagos",
    DateOfBirth: '07-07-1890',
    Loan: [{ loanId: 'loan1', amount: 100000, status: 'active', repaymentSchedule: 'monthly', repaymentAmount: 10000, repaymentDueDate: '2023-12-31' }],
    Transactions: [{transactionDate: '2023-01-01', amount: 10000, type: 'repayment', status: 'successful'}],
  }

  isLoading: boolean = false;
  error: string | null = null;
  successMessage: string | null = null;

  constructor() {}

  ngOnInit() {
    this.loadUserProfile();
  }

  /**
   * Load user profile from server
   */
  loadUserProfile() {
    this.isLoading = true;
    this.error = null;

    console.log(`Loading profile for user: ${this.userId}`);

    // TODO: Replace with actual API call
    // Example:
    // this.http.get(`/api/users/${this.userId}`).subscribe(
    //   (response: any) => {
    //     this.userProfile = response;
    //     this.isLoading = false;
    //   },
    //   (error) => {
    //     this.error = 'Failed to load profile';
    //     this.isLoading = false;
    //   }
    // );
  }

  /**
   * Update complete profile information (PUT request)
   */
  updateProfile() {
    this.isLoading = true;
    this.error = null;
    this.successMessage = null;

    console.log('Updating full profile:', this.UserToReturn);

    // TODO: Replace with actual API call
    // Example:
    // this.http.put(`/api/users/${this.userId}`, updatedProfile).subscribe(
    //   (response: any) => {
    //     this.userProfile = response;
    //     this.successMessage = 'Profile updated successfully';
    //     this.isLoading = false;
    //     console.log('Profile updated:', response);
    //   },
    //   (error) => {
    //     this.error = 'Failed to update profile';
    //     this.isLoading = false;
    //     console.error('Error updating profile:', error);
    //   }
    // );

    // Mock update
    this.mockUpdateProfile(this.UserToReturn);
  }

  /**
   * Update individual profile field (PATCH request)
   * @param fieldName - Name of the field to update
   * @param fieldValue - New value for the field
   */
  patchProfileField(fieldName: string, fieldValue: any) {
    this.isLoading = true;
    this.error = null;
    this.successMessage = null;

    const patchData = {
      [fieldName]: fieldValue
    };

    console.log(`Patching profile field - ${fieldName}: ${fieldValue}`);

    // TODO: Replace with actual API call
    // Example:
    // this.http.patch(`/api/users/${this.userId}`, patchData).subscribe(
    //   (response: any) => {
    //     this.userProfile[fieldName] = fieldValue;
    //     this.successMessage = `${fieldName} updated successfully`;
    //     this.isLoading = false;
    //     console.log('Field updated:', response);
    //   },
    //   (error) => {
    //     this.error = `Failed to update ${fieldName}`;
    //     this.isLoading = false;
    //     console.error('Error updating field:', error);
    //   }
    // );

    // Mock patch
    this.mockPatchField(fieldName, fieldValue);
  }

  /**
   * Mock update complete profile (remove when real API is implemented)
   */
  private mockUpdateProfile(updatedProfile: any) {
    setTimeout(() => {
      this.UserToReturn = { ...this.UserToReturn, ...updatedProfile };
      this.successMessage = 'Profile updated successfully';
      this.isLoading = false;
      console.log('Mock: Profile updated', this.UserToReturn);
    }, 800);
  }

  /**
   * Mock patch individual field (remove when real API is implemented)
   */
  private mockPatchField(fieldName: string, fieldValue: any) {
    setTimeout(() => {
      this.UserToReturn[fieldName] = fieldValue;
      this.successMessage = `${fieldName} updated successfully`;
      this.isLoading = false;
      console.log(`Mock: Field ${fieldName} updated to ${fieldValue}`);
    }, 600);
  }
}
