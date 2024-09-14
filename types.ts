import { Workspace, Member } from '@prisma/client'

export type ProjectWithMembers = Workspace & {
    members: Member[]
}