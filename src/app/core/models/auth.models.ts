export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface RegisterRequestDto {
  email: string;
  password: string;
  fullName: string;
  username: string;
  academicYear: number;
  universityId: string;
}

export interface ResetPasswordDto {
  newPassword: string;
  token: string | null;
  email: string | null;
}

export interface RefreshTokenRequest {
  refreshToken: string;
  accessToken: string;
}

export interface LogoutRequest {
  refreshToken: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;
  academicYear: number;
  nationalId?: number;
  kycStatus: KycStatus;
  status: UserState;
  universityName?: string;
}

export enum KycStatus {
  Approved = "Approved", // KYC Approved
  Pending = "Pending", // KYC Pending
  Rejected = "Rejected", // KYC Rejected
  Expired = "Expired", // KYC Expired
  UnderReview = "UnderReview", // KYC Under Review
  NotSubmitted = "NotSubmitted", // KYC Not Submitted
  Blocked = "Blocked" // KYC Blocked
}

export enum UserState {
  PendingVerification = "PendingVerification", // Registered but not verified (Ghost)
  EmailVerified = "EmailVerified",       // Registered and email verified (Partily Verified)
  Active = "Active",              // Active user (KYC Approved)
  Blacklisted = "Blacklisted",         // Blocked from our system
  Deleted = "Deleted"              // Deleted user
} 