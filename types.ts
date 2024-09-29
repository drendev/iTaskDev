
import { Workspace, Member, PendingMember, User, Task, ProjectInformation, ProjectSdlc, MemberRole } from '@prisma/client'

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