import { Workspace, Member, PendingMember, User } from '@prisma/client'

export type ProjectWithMembers = Workspace & {
    members: (Member & { user: User})[]
}

export type ProjectWithPending = Workspace & {
    pending: (PendingMember & { user: User})[]
}