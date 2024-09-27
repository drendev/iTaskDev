
import { Workspace, Member, PendingMember, User, Task, ProjectInformation, ProjectSdlc } from '@prisma/client'

export type ProjectWithMembers = Workspace & {
    members: (Member & { user: User})[]
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