import { db } from "@/lib/db";
import { Locations } from "./_components/locations";
import { SearchInput } from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { CoursesList } from "@/components/courses-list";

interface SearchPageProps {
    searchParams: {
        title: string;
        locationId: string;
    }
};

const SearchPage = async({
    searchParams
}: SearchPageProps) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const locations = await db.location.findMany({
        orderBy: {
            name: "asc"
        }
    });

    const courses = await getCourses({
        userId,
        ...searchParams,
    });

    return (
        <>
        <div className="px-6 pt-6 md:hidden md:mb-0 block">
            <SearchInput />
        </div>
            <div className="p-6 space-y-4">
                <Locations 
                    items={locations}
                />

                <CoursesList items={courses}/>
            </div>
        </>
      );
}
 
export default SearchPage;