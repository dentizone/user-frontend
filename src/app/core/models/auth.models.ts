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
  token: string;
  email: string;
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
  Pending = 1,
  InProgress = 2,
  Approved = 3,
  Rejected = 4,
  Expired = 5,
  Cancelled = 6,
  Suspended = 7
}

export enum UserState {
  Active = 0,
  Inactive = 1,
  Blocked = 2,
  Deleted = 3,
  Pending = 4,
  Suspended = 5
} 