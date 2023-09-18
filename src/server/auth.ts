import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
	DefaultSession,
	getServerSession,
	type NextAuthOptions,
} from "next-auth";
import { z } from "zod";
import { prisma } from "~/server/db";
import Auth0Provider from "next-auth/providers/auth0";
import { env } from "~/env.mjs";

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
		} & DefaultSession["user"];
	}
}

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		Auth0Provider({
			clientId: env.DISCORD_CLIENT_ID,
			clientSecret: env.DISCORD_CLIENT_SECRET,
			issuer: "https://srivatsa.au.auth0.com",
		}),
	],
	callbacks: {
		session: ({ session, user}) => {
			if (session?.user) {
				session.user.id = z.string().parse(user.id);
			}
			return session;
		},
	},
};

export const getServerAuthSession = (ctx: {
	req: GetServerSidePropsContext["req"];
	res: GetServerSidePropsContext["res"];
}) => {
	return getServerSession(ctx.req, ctx.res, authOptions);
};
