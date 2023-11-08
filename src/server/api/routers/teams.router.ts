import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import kalasangamaError from "~/utils/customError";
import {
	createAccount,
	getCollegeById,
	setLeader,
	setTeamCompleteStatus,
} from "~/utils/helpers";

export const TeamRouter = createTRPCRouter({
	register: protectedProcedure
		.input(
			z.object({
				college_id: z.string(),
				leader_character: z.string().nullable(),
				leader_idUrl: z.string().nullable(),
				leader_contact: z.string(),
				members: z.array(
					z.object({
						name: z.string(),
						character_id: z.string(),
						id_url: z.string(),
					})
				),
			})
		)
		.mutation(async ({ ctx, input }) => {
			try {
				//Create or return team
				console.log(input);
				const college = await getCollegeById(input.college_id);
				//Set team leader
				if (college.Team.isComplete)
					throw new kalasangamaError(
						"Create Team Error",
						"Team is already complete"
					);
				await setLeader(
					ctx.session.user.id,
					college.Team.id,
					college.id,
					input.leader_character,
					input.leader_idUrl,
					input.leader_contact
				);
				//Create an array of prisma promises for transaction
				const addUsersTransaction = input.members.map((user) => {
					return createAccount(user, college.name, college.id);
				});
				//Create user accounts in transaction
				await ctx.prisma.$transaction(addUsersTransaction);
				//Set team complete status to true to prevent edits
				await setTeamCompleteStatus(college.Team.id, true);
			} catch (error) {
				if (error instanceof kalasangamaError) {
					throw new TRPCError({
						message: error.message,
						code: "CONFLICT",
					});
				} else {
					console.log(error);
					throw "An error occurred!";
				}
			}
		}),
	checkPassword: protectedProcedure
		.input(
			z.object({
				password: z.string(),
				college_id: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const college = await ctx.prisma.college.findUnique({
				where: { id: input.college_id },
			});
			if (college) {
				if (input.password === college.password) {
					return { message: "success" };
				}
			} else {
				throw new kalasangamaError(
					"Create Team Error",
					"Team password is invalid"
				);
			}
		}),
});

export default TeamRouter;
