export class ClientPortalUser {
  public userName: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public phoneNumber: string;
  public password: string;
}

export class ClientPortalUserList {
  public CreationDateUtc: Date;
  public Department: string;
  public Email: string;
  public IsApproved: boolean;
  public IsLockedOut: boolean;
  public LastLoginDateUtc: Date;
  public LastName: string;
  public LastPasswordResetDateUtc: Date;
  public LockOutEndDateUtc: Date;
  public UserName: string;
}
