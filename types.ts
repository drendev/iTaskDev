
import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";
import { Workspace, Member, PendingMember, User } from '@prisma/client'

export type ProjectWithMembers = Workspace & {
    members: (Member & { user: User})[]
}

export type ProjectWithPending = Workspace & {
    pending: (PendingMember & { user: User})[]
}

export type NextApiResponseServerIo = NextApiResponse & {
    socket: Socket & {
        server: NetServer & {
            io: SocketIOServer
        };
    };
};