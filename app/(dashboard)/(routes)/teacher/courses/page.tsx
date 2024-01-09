import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataTable } from "./_components/data-table";

async function getData(): Promise<any[]> {
    // Fetch data from your API here.
    return [
      {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },
      // ...
    ]
  }

const CoursesPage = () => {
    return (
        <DataTable columns={columns} data={data} />
      );
}
 
export default CoursesPage;