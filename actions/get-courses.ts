import { Location, Course } from "@prisma/client";
import { getProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";

type CourseWithProgressWithLocation = Course & {
    location: Location | null;
    chapters: { id: string }[];
    progress: number | null;
};

type GetCourses = {
    userId: string;
    title?: string;
    locationId?: string;
};

export const getCourses = async ({
    userId,
    title,
    locationId
}: GetCourses): Promise<CourseWithProgressWithLocation[]> => {
    try {
        const courses = await db.course.findMany({
            where: {
                isPublished: true,
                title: {
                    contains: title,
                },
                locationId,
            },
            include: {
                location: true,
                chapters: {
                    where: {
                        isPublished: true,
                    },
                    select: {
                        id: true,
                    }
                },
                purchases: {
                    where: {
                        userId,
                    }
                }
            },
            orderBy: {
                createdAt: "desc",
            }
        });

        const coursesWithProgress: CourseWithProgressWithLocation[] = await Promise.all(
            courses.map(async course => {
                if(course.purchases.length === 0) {
                    return {
                        ...course,
                        progress: null,
                    }
                }

                const progressPercentage = await getProgress(userId, course.id);

                return {
                    ...course,
                    progress: progressPercentage,
                };
            })
        );

        return coursesWithProgress;

    } catch(error) {
        console.log("[GET_COURSES]", error);
        return [];
    }
}