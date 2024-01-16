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

export interface KanbanErrorTypes {
  error: {
    status: string;
    data: { error: string };
  };
  isUnhandledError: boolean;
  meta: {
    request: {};
    response: {};
  };
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

export interface AuthTypes {
  email: string;
  password: string;
}

export type UserId = {
  userId: string;
};

export type BoardId = {
  boardId: string;
};

export type ColumnId = {
  columnId: string;
};

export type TaskId = {
  taskId: string;
};

export type TokenId = {
  idToken: string;
};

export interface BasicEntityInfo {
  title: string;
  description: string;
}

export interface BasicEntity extends BasicEntityInfo {
  id: string;
  order: number;
}

export interface TaskTypes extends BasicEntity {
  ancestors: UserId & BoardId & ColumnId;
}

export interface ColumnDataTypes {
  [itemId: string]: TaskTypes;
}

export interface ColumnTypes extends BasicEntity {
  data: ColumnDataTypes;
  ancestors: UserId & BoardId;
}

export interface BoardDataTypes {
  [columnId: string]: ColumnTypes;
}

export interface BoardTypes extends BasicEntity {
  data: BoardDataTypes;
  ancestors: UserId;
}

export interface BoardListTypes {
  [boardId: string]: BoardTypes;
}
