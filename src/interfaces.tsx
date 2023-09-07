export interface AuthErrorTypes {
  error: {
    errors: [
      {
        domain: string;
        reason: string;
        message: string;
      },
    ];
    code: number;
    message: string;
  };
}

export interface ActiveUserDataTypes {
  localId: string;
  email: string;
  emailVerified: boolean;
  displayName: string;
  providerUserInfo: [
    {
      providerId: string;
      displayName: string;
      photoUrl: string;
      federatedId: string;
      email: string;
      rawId: string;
      screenName: string;
    },
  ];
  photoUrl: string;
  passwordHash: string;
  passwordUpdatedAt: number;
  validSince: string;
  disabled: boolean;
  lastLoginAt: string;
  createdAt: string;
  customAuth: boolean;
  initialEmail: string;
}

export interface ActiveUserListDataTypes {
  kind: string;
  users: ActiveUserDataTypes[];
}

export interface ActiveUserTypes {
  kind: string;
  localId: string;
  email: string;
  displayName: string;
  idToken: string;
  registered: boolean;
  refreshToken: string;
  expiresIn: string;
  profilePicture: string;
}

export interface SignInUpArgsTypes {
  email: string;
  password: string;
}

export interface ChangePasswordArgsTypes {
  idToken: string;
  password: string;
}

export interface ChangeEmailArgsTypes {
  idToken: string;
  email: string;
}

export interface TaskTypes {
  taskId: string;
  title: string;
  description: string;
  order: number;
  ancestors: {
    columnId: string;
    boardId: string;
    userId: string;
  };
}

export interface ColumnDataTypes {
  [itemId: string]: TaskTypes;
}

export interface ColumnTypes {
  columnId: string;
  title: string;
  description: string;
  order: number;
  ancestors: {
    boardId: string;
    userId: string;
  };
  data: ColumnDataTypes;
}

export interface BoardDataTypes {
  [columnId: string]: ColumnTypes;
}

export interface BoardTypes {
  boardId: string;
  title: string;
  description: string;
  order: number;
  ancestors: {
    userId: string;
  };
  data: BoardDataTypes;
}

export interface BoardListTypes {
  [boardId: string]: BoardTypes;
}
