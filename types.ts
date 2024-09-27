
import { Workspace, Member, PendingMember, User, Task, ProjectInformation } from '@prisma/client'

export type ProjectWithMembers = Workspace & {
    members: (Member & { user: User})[]
}

export type ProjectWithPending = Workspace & {
    pending: (PendingMember & { user: User})[]
}

export type ProjectWithInformation = Workspace & {
    info: ProjectInformation[]
}