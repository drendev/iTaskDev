
import { Workspace, Member, PendingMember, User, Task, ProjectInformation, ProjectSdlc, MemberRole, TaskMember } from '@prisma/client'

export type ProjectWithMembers = Workspace & {
    members: (Member & { user: User})[]
}
export type ProjectWithRole = Workspace & {
    role: MemberRole
}
export type ProjectWithPending = Workspace & {
    pending: (PendingMember & { user: User})[]
}

export type ProjectWithInformation = Workspace & {
    info: ProjectInformation[]
}

export type SdlcWithInformation = Workspace & {
    info: ProjectSdlc
}

// Github types

export type Owner = {
    avatar_url: string;
    login: string;
};

export type Repository = {
    id: number;
    name: string;
    description: string;
    html_url: string;
    owner: Owner;
}

export type Commit = {
    sha: string;
    commit: {
        author: {
            name: string;
        }
    };
    message: string;
}

// Task with Members

export type Tasks = Task & {
    members: {
        member: Member & { user: User }
    }[]
}